import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    <div className="flex w-full items-start gap-[16px]">
      {images.map((image) => (
        <div
          key={image.src}
          className="flex flex-col items-start gap-2"
          style={{ flex: image.grow }}
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
          <div className="flex w-full items-start gap-[32px]">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[20px]">
              <p className="font-heading text-display-md font-normal text-text-heading-accent">
                Hi, it&rsquo;s nice to meet you!
              </p>
              <p className="font-body text-body-md text-text-subdued">
                I chose product design because I want to create AI tools that
                enable humans to be more productive and healthy. Studying
                Systems design engineering at the University of Waterloo has
                taught me how to think in systems, diagnose problems, and
                solve problems methodically. Across my undergrad, I&rsquo;ve
                gotten to build in different industries across fintech,
                healthcare and e-commerce.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/profile-photo.jpg"
              alt="Jane Wu"
              className="h-[358px] w-[338px] shrink-0 rounded-[8px] border border-border-default object-cover"
            />
          </div>

          <div className="flex flex-col gap-[100px]">
            <div className="flex w-full flex-col items-start gap-[32px]">
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
            </div>

            <div className="flex w-full flex-col items-start gap-[32px]">
              <div className="flex w-full flex-col items-start gap-2">
                <p className="font-heading text-[32px] font-normal leading-[normal] text-text-heading-accent">
                  I love to read &amp; discuss classical fiction
                </p>
                <p className="font-body text-body-md text-text-subdued">
                  Here are a few of my favourite books sitting on my
                  bookshelf. I love to write and discuss themes.
                </p>
              </div>
              <div className="flex h-[235px] w-full items-start gap-[16px]">
                {bookCovers.map((book) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={book.src}
                    src={book.src}
                    alt={book.alt}
                    className="h-full flex-1 object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
