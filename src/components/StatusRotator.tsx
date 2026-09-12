"use client";

import { useEffect, useState } from "react";

export function StatusRotator({ messages }: { messages: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex items-center gap-2">
      <span className="size-2.5 shrink-0 rounded-full bg-green-500" />
      <p
        key={index}
        className="animate-[fade-in_0.5s_ease-out] font-body text-body-lg text-text-subdued"
      >
        {messages[index]}
      </p>
    </div>
  );
}
