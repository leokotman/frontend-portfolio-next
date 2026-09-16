import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const MODEL_NAME = 'gemini-2.5-flash';

const systemInstruction = `
You are a warm, practical psychological coach giving a SHORT piece of advice for the rest of today.

Constraints:
- Focus ONLY on everyday psychology, emotional wellbeing, and mindset.
- Give 1–2 concise paragraphs and 1 concrete, simple suggestion or tiny exercise.
- Do NOT give medical, legal, or financial advice.
- Do NOT diagnose, label disorders, or mention medications.
- If the user asks about topics outside psychology or wellbeing (e.g. coding, the website, politics, news, etc.),
  answer briefly: "I'm just here for emotional and psychological support. For this topic, please ask another specialist or agent."
- If the user describes severe distress, self-harm, or danger, respond with empathetic language and
  clearly recommend seeking immediate help from local professionals or emergency services, and avoid detailed instructions.
- Be kind, non-judgmental, and empowering.
`;

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const MIN_INTERVAL_MS = 10_000; // 10 seconds between calls

type RateInfo = {
  count: number;
  windowStart: number;
  lastRequestTime: number;
};

const rateLimitStore = new Map<string, RateInfo>();

const getClientIp = (req: NextRequest): string => {
  const forwardedHeader = req.headers.get('x-forwarded-for');
  if (forwardedHeader) {
    const ip = forwardedHeader.split(',')[0]?.trim();
    if (ip) return ip;
  }

  // Fallback – environment dependent
  const anyReq = req as any;
  if (anyReq.ip) return anyReq.ip as string;

  return 'unknown';
};

const isRateLimited = (
  ip: string,
): { limited: boolean; retryAfterMs?: number } => {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing) {
    rateLimitStore.set(ip, {
      count: 1,
      windowStart: now,
      lastRequestTime: now,
    });
    return { limited: false };
  }

  if (now - existing.windowStart > WINDOW_MS) {
    rateLimitStore.set(ip, {
      count: 1,
      windowStart: now,
      lastRequestTime: now,
    });
    return { limited: false };
  }

  if (now - existing.lastRequestTime < MIN_INTERVAL_MS) {
    const retryAfterMs = MIN_INTERVAL_MS - (now - existing.lastRequestTime);
    return { limited: true, retryAfterMs };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterMs = WINDOW_MS - (now - existing.windowStart);
    return { limited: true, retryAfterMs };
  }

  existing.count += 1;
  existing.lastRequestTime = now;
  rateLimitStore.set(ip, existing);
  return { limited: false };
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      'GEMINI_API_KEY is missing. Check Vercel Project Settings > Environment Variables (Production) and redeploy.',
    );
    return NextResponse.json(
      {
        error:
          'Gemini API is not configured on the server. Please try again later.',
      },
      { status: 500 },
    );
  }

  const ip = getClientIp(req);
  const rateResult = isRateLimited(ip);

  if (rateResult.limited) {
    return NextResponse.json(
      {
        error:
          'You are sending requests too quickly. Please wait a bit before trying again.',
        retryAfterMs: rateResult.retryAfterMs,
      },
      {
        status: 429,
        headers: rateResult.retryAfterMs
          ? {
              'Retry-After': String(Math.ceil(rateResult.retryAfterMs / 1000)),
            }
          : undefined,
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  const { message, history } = (body ?? {}) as {
    message?: unknown;
    history?: unknown;
  };

  if (!message || typeof message !== 'string') {
    return NextResponse.json(
      { error: 'Message is required.' },
      { status: 400 },
    );
  }

  if (message.length > 800) {
    return NextResponse.json(
      {
        error:
          'Message is too long. Please keep it under 800 characters for a short daily reflection.',
      },
      { status: 400 },
    );
  }

  // Format history for the Gemini SDK.
  // Note: We map 'assistant' to 'model' so Gemini understands the roles.
  const safeHistory = Array.isArray(history) ? history : [];
  const formattedContents = safeHistory
    .filter(
      (msg): msg is { role: string; text: string } =>
        !!msg &&
        typeof msg === 'object' &&
        typeof (msg as any).text === 'string' &&
        (msg as any).text.length > 0,
    )
    .map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    }));

  // Gemini requires the first content to be from the user.
  // Drop leading assistant/model messages (e.g. the opening prompt).
  while (
    formattedContents.length > 0 &&
    formattedContents[0].role !== 'user'
  ) {
    formattedContents.shift();
  }

  // Ensure the current message is included even if the client sent no history.
  const contents =
    formattedContents.length > 0
      ? formattedContents
      : [{ role: 'user' as const, parts: [{ text: message }] }];

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      },
    });

    const text = response.text?.trim();

    if (!text) {
      console.error('Gemini API returned empty text', response);
      return NextResponse.json(
        {
          error:
            'I was not able to generate advice this time. Please try again.',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error from Gemini API', error);

    const apiError = error as { status?: number; message?: string };
    const status =
      typeof apiError?.status === 'number' ? apiError.status : 500;

    let details = '';
    try {
      const raw = String(apiError?.message ?? '');
      const jsonText = raw.match(/\{[\s\S]*\}/)?.[0];
      if (jsonText) {
        const parsed = JSON.parse(jsonText) as {
          error?: { message?: string; status?: string; code?: number };
        };
        details = parsed.error?.message ?? '';
      }
    } catch {
      // ignore parse errors, fall back to generic message
    }

    // Surface actionable messages for the common billing/quota case
    // instead of a generic 500.
    if (status === 429) {
      return NextResponse.json(
        {
          error:
            'The AI service is temporarily out of quota. Please try again later.',
          details: details || undefined,
        },
        { status: 429 },
      );
    }

    if (status === 400) {
      return NextResponse.json(
        {
          error: 'The AI request was rejected. Please try a shorter message.',
          details: details || undefined,
        },
        { status: 502 },
      );
    }

    if (status === 401 || status === 403) {
      return NextResponse.json(
        {
          error:
            'The AI service is misconfigured (invalid API key). Please try again later.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error:
          'Something went wrong while generating advice. Please try again in a moment.',
      },
      { status: 500 },
    );
  }
}
