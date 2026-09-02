import Link from "next/link";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-24">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        ← Back
      </Link>
      <article className="prose prose-zinc dark:prose-invert mt-8 max-w-none">
        {children}
      </article>
    </main>
  );
}
