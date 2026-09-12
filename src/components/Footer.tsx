import { LocalTime } from "@/components/LocalTime";

export function Footer() {
  return (
    <footer className="flex w-full flex-col gap-[15px]">
      <div className="h-px w-full bg-border-default" />
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-heading text-[32px] font-normal leading-[normal] text-text-heading-accent">
            Thanks for stopping by!
          </p>
          <div className="flex gap-4 font-body text-label-md text-text-subdued">
            <p>Built with matcha lattes &amp; Next.js</p>
            <p>
              <LocalTime />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 font-body text-label-md text-text-subdued">
          <a
            href="https://www.linkedin.com/in/jane-wu-1551a61b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="active:font-medium active:text-text-heading-accent active:underline active:decoration-from-font active:underline-offset-2"
          >
            Linkedin
          </a>
          <a
            href="https://x.com/slayinqirl"
            target="_blank"
            rel="noopener noreferrer"
            className="active:font-medium active:text-text-heading-accent active:underline active:decoration-from-font active:underline-offset-2"
          >
            Twitter
          </a>
          <a
            href="mailto:ja2wu@uwaterloo.ca"
            className="active:font-medium active:text-text-heading-accent active:underline active:decoration-from-font active:underline-offset-2"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
