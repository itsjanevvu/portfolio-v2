"use client";

import { useState } from "react";
import Link from "next/link";
import { LottiePlayer } from "@/components/LottiePlayer";
import { HeroVideo } from "@/components/HeroVideo";
import type { Project } from "@/data/projects";

// The cursor's "Read case study" hover state (.cursor-spin) is only
// enabled once the cover media has actually finished loading, so it
// can't show up over a still-loading video/Lottie cover.

export function ProjectCard({ project }: { project: Project }) {
  const hasMedia = Boolean(project.coverLottie || project.coverVideo);
  const [loaded, setLoaded] = useState(!hasMedia);

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group flex flex-col gap-[14px] ${loaded ? "cursor-spin" : ""} ${
        hasMedia ? "" : "h-[80vh]"
      }`}
    >
      {project.coverLottie ? (
        <LottiePlayer
          src={project.coverLottie}
          onReady={() => setLoaded(true)}
          className="aspect-[4/3] w-full rounded-[8px] border border-border-default bg-background-offset transition-opacity group-hover:opacity-70"
        />
      ) : project.coverVideo ? (
        <HeroVideo
          src={project.coverVideo}
          startTime={project.coverVideoStart}
          onReady={() => setLoaded(true)}
          className="aspect-[4/3] w-full rounded-[8px] border border-border-default bg-background-offset object-cover transition-opacity group-hover:opacity-70"
        />
      ) : (
        <div className="w-full flex-1 rounded-[8px] border border-border-default bg-background-offset transition-opacity group-hover:opacity-70" />
      )}
      <div className="flex flex-col gap-2 font-body">
        <p className="text-body-md uppercase text-text-subdued">
          {project.eyebrow} &bull; Shipped {project.shipYear}
        </p>
        <p className="font-heading text-[32px] font-normal leading-[normal] text-text-heading-accent">
          {project.title}
        </p>
      </div>
    </Link>
  );
}
