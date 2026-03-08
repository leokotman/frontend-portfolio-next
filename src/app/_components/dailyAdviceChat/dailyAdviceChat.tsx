/* eslint-disable @next/next/no-img-element */
'use client';

import { useMemo, useState } from 'react';
import Card from '../card/card';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

const openingPrompts = [
  "What's on your mind right now? I'll share one small idea for today.",
  'How are you feeling today? A sentence is enough.',
  'Is there anything stressing you out today?',
  'What would you like to feel more of today (for example: calm, focus, motivation)?',
  'Tell me one situation from today that feels a bit heavy or confusing.',
];

const HISTORY_LENGTH = 6;

const getRandomOpeningPrompt = () =>
  openingPrompts[Math.floor(Math.random() * openingPrompts.length)];

export default function DailyAdviceChat() {
  const initialPrompt = useMemo(() => getRandomOpeningPrompt(), []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      text: initialPrompt,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    if (trimmed.length > 800) {
      setError(
        'Your message is quite long. Please keep it under 800 characters for a short daily reflection.',
      );
      return;
    }

    setError(null);
    setIsLoading(true);

    const nextMessages: Message[] = [
      ...messages,
      {
        id: messages.length,
        role: 'user',
        text: trimmed,
      },
    ];
    setMessages(nextMessages);
    setInput('');

    // Get the last 5 messages + the new user message = 6 messages total
    const historyForContext = [
      ...messages,
      { role: 'user', text: trimmed },
    ].slice(-HISTORY_LENGTH);

    if (messages.length >= HISTORY_LENGTH) {
      setShowWarning(true);
    }

    try {
      const response = await fetch('/api/ai/daily-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          history: historyForContext,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const messageFromServer =
          typeof data.error === 'string'
            ? data.error
            : 'Something went wrong. Please try again in a little while.';
        setError(messageFromServer);
        setIsLoading(false);
        return;
      }

      const data = (await response.json()) as { text?: string };
      const advice = data.text?.trim();

      if (!advice) {
        setError(
          'I was not able to generate advice this time. Please try again.',
        );
        setIsLoading(false);
        return;
      }

      setMessages((current) => [
        ...current,
        {
          id: current.length,
          role: 'assistant',
          text: advice,
        },
      ]);
    } catch (_err) {
      setError(
        'There was a network problem while contacting the advice service. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };
  // Update clearChat to reset the warning
  const clearChat = () => {
    setMessages([{ id: 0, role: 'assistant', text: getRandomOpeningPrompt() }]);
    setShowWarning(false);
    setError(null);
  };

  return (
    <Card propsClasses="mt-6 text-left max-w-screen-md mx-auto">
      <h3 className="text-lg mb-2">Daily psychological advice (AI)</h3>
      <p className="text-sm text-gray-600 mb-4">
        This experimental AI coach offers short, gentle suggestions for the rest
        of your day. It focuses only on everyday psychology and wellbeing and is
        not a substitute for professional help or emergency services.
      </p>

      <div className="border rounded-md p-3 max-h-80 overflow-y-auto bg-white/60">
        <ul className="flex flex-col gap-3">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`flex ${
                message.role === 'user'
                  ? 'justify-end text-right'
                  : 'justify-start text-left'
              }`}
            >
              <div
                className={`rounded-lg px-3 py-2 max-w-[80%] text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'bg-slate-100 text-slate-900'
                }`}
              >
                {message.text}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3 items-stretch"
      >
        <label className="text-sm text-gray-700" htmlFor="daily-advice-input">
          Share a few words about how you&apos;re doing today:
        </label>
        <textarea
          id="daily-advice-input"
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows={3}
          maxLength={800}
          placeholder="For example: I'm feeling a bit overwhelmed with tasks and would like to slow down."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isLoading}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={clearChat}
            className="border text-gray-600 rounded-md px-4 py-2 hover:bg-gray-50"
          >
            Clear Chat
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`border text-indigo-900 rounded-md px-4 py-2 m-0 transition duration-500 ease select-none focus:outline-none focus:shadow-outline ${
              isLoading
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-white hover:bg-indigo-50'
            }`}
          >
            {isLoading ? 'Thinking…' : 'Get advice'}
          </button>
        </div>
      </form>
    </Card>
  );
}
