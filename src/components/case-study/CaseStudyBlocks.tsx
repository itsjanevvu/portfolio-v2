import type { ReactNode } from "react";
import Link from "next/link";
import { LottiePlayer } from "@/components/LottiePlayer";
import { HeroVideo } from "@/components/HeroVideo";

/* Reusable building blocks for case study pages. Each block maps to a
   recurring pattern in the Figma case study frames (Text, Stats, Callout,
   Image, Case study navigator, etc.) using the design tokens in
   globals.css instead of raw Figma values, so new case studies can be
   assembled the same way. */

export function CaseStudyHeader({
  title,
  eyebrow,
  heroSrc,
  heroAlt,
  heroLottie,
  heroVideo,
  heroVideoStart,
}: {
  title: string;
  eyebrow?: string;
  heroSrc?: string;
  heroAlt?: string;
  heroLottie?: string;
  heroVideo?: string;
  heroVideoStart?: number;
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        {eyebrow ? (
          <p className="font-body text-body-md uppercase text-text-subdued">
            {eyebrow}
          </p>
        ) : null}
        <p className="font-heading text-display-lg font-normal text-text-heading-accent">
          {title}
        </p>
      </div>
      {heroLottie ? (
        <LottiePlayer
          src={heroLottie}
          className="aspect-[4/3] w-full rounded-[8px] border border-border-default bg-background-case-study-offset"
        />
      ) : heroVideo ? (
        <HeroVideo
          src={heroVideo}
          startTime={heroVideoStart}
          className="aspect-[4/3] w-full rounded-[8px] border border-border-default bg-background-case-study-offset object-cover"
        />
      ) : heroSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroSrc}
          alt={heroAlt ?? ""}
          className="w-full rounded-[8px] border border-border-default bg-background-case-study-offset object-cover"
        />
      ) : (
        <div className="h-[500px] w-full rounded-[8px] border border-border-default bg-background-case-study-offset" />
      )}
    </div>
  );
}

export function MetaPanel({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-4 font-body text-body-md text-text-subdued md:w-[202px] md:shrink-0">
      {children}
    </div>
  );
}

export function MetaItem({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p>{label}</p>
      <div>{children}</div>
    </div>
  );
}

export function SectionText({
  eyebrow,
  heading,
  body,
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      {eyebrow ? (
        <p className="font-body text-label-md uppercase text-text-subdued">
          {eyebrow}
        </p>
      ) : null}
      <p className="font-heading text-heading-lg text-text-heading-accent">
        {heading}
      </p>
      {body ? (
        <div className="flex flex-col gap-4 font-body text-body-md text-text-subdued">
          {body}
        </div>
      ) : null}
    </div>
  );
}

export function StatsRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:gap-8">
      {children}
    </div>
  );
}

export function StatCard({
  emoji,
  children,
}: {
  emoji: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full items-start gap-2 rounded-lg bg-background-case-study-offset p-4 md:flex-1">
      <span className="font-body text-body-md">{emoji}</span>
      <div className="flex-1 font-body text-body-md text-text-subdued">
        {children}
      </div>
    </div>
  );
}

export function FindingsList({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-col gap-4">{children}</div>;
}

export function FindingCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full items-start gap-2 rounded-lg bg-background-case-study-offset p-4 md:flex-1">
      <span className="font-body text-body-md text-text-subdued">
        {icon}
      </span>
      <div className="flex flex-1 flex-col justify-center gap-2">
        <p className="font-body text-body-lg font-semibold text-text-default">
          {title}
        </p>
        <div className="font-body text-body-md text-text-subdued">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Callout({
  eyebrow,
  heading,
  body,
  accent = false,
}: {
  eyebrow: string;
  heading: ReactNode;
  body?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col items-start gap-2 rounded-lg bg-background-case-study-offset p-8 ${accent ? "border-l-[10px] border-text-heading-accent" : ""}`}
    >
      <p className="font-body text-label-md uppercase text-text-subdued">
        {eyebrow}
      </p>
      <p className="font-heading text-heading-lg text-text-heading-accent">
        {heading}
      </p>
      {body ? (
        <p className="font-body text-body-md text-text-subdued">{body}</p>
      ) : null}
    </div>
  );
}

export function CaseImage({
  src,
  alt,
  aspect,
  bordered = false,
}: {
  src: string;
  alt: string;
  aspect?: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${bordered ? "rounded-[8px] border border-border-default" : ""}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
    </div>
  );
}

export function CaseVideo({
  src,
  title,
  aspect = "16/9",
}: {
  src: string;
  title: string;
  aspect?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[8px] border border-border-default"
      style={{ aspectRatio: aspect }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="absolute inset-0 size-full"
      />
    </div>
  );
}

export function ImagePlaceholder({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-[8px] border border-border-default bg-background-case-study-offset font-body text-label-md text-text-subdued ${className ?? "h-20 w-full"}`}
    >
      {label}
    </div>
  );
}

export function ScreenshotItem({
  src,
  alt,
  caption,
  bordered = false,
}: {
  src: string;
  alt: string;
  caption: string;
  bordered?: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-3 md:flex-1">
      <div
        className={`relative w-full overflow-hidden ${bordered ? "rounded-[8px] border border-border-default" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full object-cover" />
      </div>
      <p className="text-center font-body text-body-md text-text-subdued">
        {caption}
      </p>
    </div>
  );
}

export function IterationBlock({
  label,
  title,
  points,
  image,
}: {
  label: string;
  title: string;
  points: { positive: boolean; text: string }[];
  image?: { src: string; alt: string; aspect: string };
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 md:flex-row md:items-center">
      <div className="flex w-full flex-col gap-2 font-body text-body-md md:w-[239px] md:shrink-0">
        <p className="text-text-subdued">{label}</p>
        <p className="font-semibold text-text-default">{title}</p>
        {points.map((point, i) => (
          <div key={i} className="flex items-start gap-2 text-text-subdued">
            <span>{point.positive ? "✅" : "❌"}</span>
            <p className="flex-1">{point.text}</p>
          </div>
        ))}
      </div>
      <div className="w-full overflow-hidden rounded-[8px] border border-border-default md:flex-1">
        {image ? (
          <CaseImage src={image.src} alt={image.alt} aspect={image.aspect} />
        ) : (
          <ImagePlaceholder className="h-[280px] w-full" />
        )}
      </div>
    </div>
  );
}

export function Quote({
  children,
  avatarSrc,
  name,
  role,
}: {
  children: ReactNode;
  avatarSrc: string;
  name: string;
  role: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-[18px] rounded-lg bg-background-case-study-offset px-4 py-[26px]">
      <div className="font-body text-body-md text-text-default">{children}</div>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt=""
          className="size-[41px] rounded-full object-cover"
        />
        <div className="flex flex-col font-body text-body-md text-text-subdued">
          <p className="font-semibold">{name}</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
}

export function CaseStudyNavigator({
  title,
  eyebrow,
  shipYear,
  href,
}: {
  title: string;
  eyebrow: string;
  shipYear: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex w-full flex-col items-center gap-2 rounded-lg bg-background-case-study-offset p-8 text-center transition-colors hover:bg-[#EAE9F9]"
    >
      <p className="font-body text-label-md uppercase text-text-subdued">
        Next up
      </p>
      <p className="font-heading text-heading-lg text-text-heading-accent">{title}</p>
      <p className="font-body text-body-md uppercase text-text-subdued">
        {eyebrow} &bull; Shipped {shipYear}
      </p>
    </Link>
  );
}
