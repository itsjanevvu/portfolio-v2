import Link from "next/link";

const activeLinkClassName =
  "font-medium text-text-heading-accent underline decoration-from-font underline-offset-2";

export function Navbar({
  current,
}: {
  current?: "work" | "about";
}) {
  return (
    <nav className="flex w-full items-center justify-between font-body text-label-md text-text-subdued">
      <Link
        href="/"
        className="font-heading text-text-heading-accent active:font-medium active:text-text-heading-accent active:underline active:decoration-from-font active:underline-offset-2"
      >
        JW
      </Link>
      <div className="flex items-center gap-[18px]">
        <Link
          href="/"
          className={current === "work" ? activeLinkClassName : undefined}
        >
          Work
        </Link>
        <Link
          href="/about"
          className={current === "about" ? activeLinkClassName : undefined}
        >
          About
        </Link>
        <a
          href="https://drive.google.com/file/d/1oaSGZgsmZRUdOslvZCtw9kYHssB-kn-6/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
