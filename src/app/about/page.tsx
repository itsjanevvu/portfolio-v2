import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageReveal } from "@/components/PageReveal";
import { BookShelf } from "@/components/BookShelf";

export const metadata: Metadata = {
  title: "About — Jane Wu",
};

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  aspect: string;
  grow: number;
};

const funThingsRowOne: GalleryImage[] = [
  {
    src: "/about/battery-boost-schematic.jpg",
    alt: "Battery boost converter schematic",
    caption: "Battery boost converter schematic",
    aspect: "455/310",
    grow: 455,
  },
  {
    src: "/about/fall-detection-device.jpg",
    alt: "Fall detection device",
    caption: "Fall detection device",
    aspect: "322/304",
    grow: 322,
  },
];

const funThingsRowTwo: GalleryImage[] = [
  {
    src: "/about/beauty-brand-branding.jpg",
    alt: "Branding for a beauty brand",
    caption: "Branding for a beauty brand",
    aspect: "226/223",
    grow: 226,
  },
  {
    src: "/about/wallpaper-design.jpg",
    alt: "Wallpaper design",
    caption: "Wallpaper design",
    aspect: "231/223",
    grow: 231,
  },
  {
    src: "/about/lipstick-packaging.jpg",
    alt: "Lipstick packaging design",
    caption: "Lipstick packaging design",
    aspect: "305/224",
    grow: 305,
  },
];

const bookCovers = [
  { src: "/about/book-alchemist.jpg", alt: "The Alchemist by Paulo Coelho" },
  { src: "/about/book-animal-farm.jpg", alt: "Animal Farm by George Orwell" },
  { src: "/about/book-fifth-business.jpg", alt: "Fifth Business by Robertson Davies" },
  { src: "/about/book-1984.jpg", alt: "1984 by George Orwell" },
  { src: "/about/book-crime-and-punishment.jpg", alt: "Crime and Punishment by Fyodor Dostoevsky" },
];

function GalleryRow({ images }: { images: GalleryImage[] }) {
  return (
    <div className="flex w-full flex-col items-start gap-[15px] sm:flex-row sm:gap-[16px]">
      {images.map((image) => (
        <div
          key={image.src}
          className="flex w-full flex-col items-start gap-2 sm:w-auto sm:flex-[var(--grow)]"
          style={{ "--grow": image.grow } as React.CSSProperties}
        >
          <div
            className="w-full overflow-hidden"
            style={{ aspectRatio: image.aspect }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="size-full object-cover"
            />
          </div>
          {image.caption ? (
            <p className="font-body text-label-md text-text-subdued">
              {image.caption}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-background-home">
      <div className="mx-auto flex w-full max-w-[784px] flex-col gap-[90px] px-6 py-8 lg:max-w-[860px] xl:max-w-[940px]">
        <Navbar current="about" />

        <div className="flex flex-col gap-[90px]">
          <PageReveal
            delay={1000}
            className="flex w-full flex-col items-start gap-[32px] md:flex-row"
          >
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[24px]">
              <p className="font-heading text-display-md font-normal text-[#312b88]">
                Hi, it&rsquo;s nice to meet you!
              </p>
              <div className="flex flex-col gap-[24px] font-body text-body-md text-text-subdued">
                <p>
                  I&rsquo;m Jane, a product designer who loves making complex,
                  technical systems easier to understand and use.
                </p>
                <p>
                  Studying Systems Design Engineering at the University of
                  Waterloo taught me to think in systems, breaking down
                  complexity, and designing solutions that work as a whole.
                  That mindset has taken me across fintech, healthcare,
                  e-commerce, and AI.
                </p>
                <p>
                  I&rsquo;m now looking for 2027 new-grad roles in spaces where
                  I can tackle deeply technical problems with care and beauty.
                </p>
              </div>
              <div className="flex items-center gap-2 font-body text-body-md text-text-subdued">
                <span className="size-[10px] shrink-0 rounded-full bg-[#19da63]" />
                <p>
                  Have an interesting problem?{" "}
                  <a
                    href="mailto:ja2wu@uwaterloo.ca"
                    className="underline decoration-from-font transition-colors hover:text-text-heading-accent"
                  >
                    Reach out.
                  </a>
                </p>
              </div>
            </div>

            <div className="relative w-full max-w-[306px] shrink-0">
              <div className="drop-shadow-[0px_4px_2px_rgba(219,219,219,0.4)]">
                <div className="relative flex flex-col items-center gap-[20px] bg-white px-[20px] pb-[30px] pt-[20px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/about/profile-polaroid.jpg"
                    alt="Jane standing by a canal in Venice"
                    className="aspect-[266/308] w-full object-cover"
                  />
                  <p className="font-handwriting text-[20px] leading-5 text-black">
                    Nice to meet you!
                  </p>
                </div>
              </div>
            </div>
          </PageReveal>

          <div className="flex flex-col gap-[100px]">
            <PageReveal
              delay={2000}
              className="flex w-full flex-col items-start gap-[32px]"
            >
              <div className="flex w-full flex-col items-start gap-2">
                <p className="font-heading text-[32px] font-normal leading-[normal] text-text-heading-accent">
                  I like to build fun things
                </p>
                <p className="font-body text-body-md text-text-subdued">
                  In my free time, I like to build hardware projects with
                  friends, design brand concepts and vibe code.
                </p>
              </div>
              <div className="flex w-full flex-col gap-[15px]">
                <GalleryRow images={funThingsRowOne} />
                <GalleryRow images={funThingsRowTwo} />
              </div>
            </PageReveal>

            <PageReveal
              trigger="scroll"
              className="flex w-full flex-col items-start gap-[32px]"
            >
              <div className="flex w-full flex-col items-start gap-2">
                <p className="font-heading text-[32px] font-normal leading-[normal] text-text-heading-accent">
                  I love to read &amp; discuss classical fiction
                </p>
                <p className="font-body text-body-md text-text-subdued">
                  Here are a few of my favourite books sitting on my
                  bookshelf. I love to write and discuss themes.
                </p>
              </div>
              <BookShelf books={bookCovers} />
            </PageReveal>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
