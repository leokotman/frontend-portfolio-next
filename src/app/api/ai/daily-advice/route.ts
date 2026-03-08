import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

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
  if (!process.env.GEMINI_API_KEY) {
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

  const { message, history } = await req.json();

  // 2. Format history for the Gemini SDK
  // Note: We map 'assistant' to 'model' so Gemini understands the roles.
  const formattedContents = history.map((msg: any) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.text }],
  }));

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

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      },
    });

    const text = response.text;

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error from Gemini API', error);
    return NextResponse.json(
      {
        error:
          'Something went wrong while generating advice. Please try again in a moment.',
      },
      { status: 500 },
    );
  }
}
