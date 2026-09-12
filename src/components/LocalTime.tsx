"use client";

import { useEffect, useState } from "react";

function formatTorontoTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Toronto",
  }).format(new Date());
}

export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTorontoTime());
    const interval = setInterval(() => setTime(formatTorontoTime()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      ☼ {time ?? "--:--"} Toronto, Canada
    </>
  );
}
