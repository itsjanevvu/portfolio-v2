import Link from "next/link";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-24">
      <header className="mb-16">
        <h1 className="text-2xl font-semibold tracking-tight">Jane Wu</h1>
        <p className="mt-2 max-w-lg text-zinc-600 dark:text-zinc-400">
          Product designer &amp; design engineer. Selected case studies below.
        </p>
      </header>

      <section className="flex flex-col gap-10">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group flex flex-col gap-1 border-b border-zinc-200 pb-8 last:border-none dark:border-zinc-800"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-medium group-hover:underline">
                {project.title}
              </h2>
              <span className="shrink-0 text-sm text-zinc-500">
                {project.year}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              {project.summary}
            </p>
            <div className="mt-2 flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
