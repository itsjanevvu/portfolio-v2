import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LottiePlayer } from "@/components/LottiePlayer";
import { HeroVideo } from "@/components/HeroVideo";
import { StatusRotator } from "@/components/StatusRotator";
import { projects } from "@/data/projects";

const statusMessages = [
  "Seeking new grad roles in 2027",
  "Tinkering with Claude Code",
  "Studying Systems Design Engineering @ UWaterloo",
  "Eating lots of fruits and veggies",
];

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background-home">
      <div className="mx-auto flex w-full max-w-[784px] flex-col gap-[90px] px-6 py-8 lg:max-w-[860px] xl:max-w-[940px]">
        <Navbar current="work" />

        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[32px]">
              <p className="font-heading text-display-lg font-normal text-text-heading-accent">
                Jane Wu is a product designer who transforms complex systems
                into simple delightful experiences.
              </p>

              <div className="flex items-center gap-[27px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/stripe.png" alt="Stripe" width={77} height={32} className="h-[32px] w-auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/faire.png" alt="Faire" width={135} height={46} className="h-[46px] w-auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/scispot.png" alt="Scispot" width={72} height={47} className="h-[47px] w-auto" />
              </div>
            </div>

            <StatusRotator messages={statusMessages} />
          </div>

          <div className="flex flex-col gap-[20vh]">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className={
                  project.coverLottie || project.coverVideo
                    ? "group cursor-spin flex flex-col gap-[14px]"
                    : "group cursor-spin flex h-[80vh] flex-col gap-[14px]"
                }
              >
                {project.coverLottie ? (
                  <LottiePlayer
                    src={project.coverLottie}
                    className="aspect-[4/3] w-full rounded-[8px] border border-border-default bg-background-offset transition-opacity group-hover:opacity-70"
                  />
                ) : project.coverVideo ? (
                  <HeroVideo
                    src={project.coverVideo}
                    startTime={project.coverVideoStart}
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
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
