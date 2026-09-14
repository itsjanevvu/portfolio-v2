"use client";

import { useEffect, useRef, useState } from "react";

type Book = {
  src: string;
  alt: string;
};

// Horizontally-scrolling, snap-to-item carousel with dot pagination below
// it — used instead of a plain flex row so the book covers never bleed
// off the edge of narrow (mobile) viewports.
export function BookShelf({ books }: { books: Book[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = itemRefs.current.indexOf(
            entry.target as HTMLDivElement,
          );
          if (index !== -1) setActiveIndex(index);
        }
      },
      { root: scroller, threshold: 0.6 },
    );

    for (const el of itemRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [books.length]);

  const scrollToIndex = (index: number) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        ref={scrollerRef}
        className="scrollbar-hide flex h-[235px] w-full snap-x snap-mandatory gap-[16px] overflow-x-auto scroll-smooth"
      >
        {books.map((book, index) => (
          <div
            key={book.src}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="h-full w-[150px] shrink-0 snap-start sm:w-[180px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.src}
              alt={book.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {books.map((book, index) => (
          <button
            key={book.src}
            type="button"
            aria-label={`Jump to ${book.alt}`}
            aria-current={index === activeIndex}
            onClick={() => scrollToIndex(index)}
            className={`size-2 shrink-0 rounded-full transition-colors ${
              index === activeIndex
                ? "bg-text-action-primary"
                : "bg-border-default"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
