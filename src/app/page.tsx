import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatusRotator } from "@/components/StatusRotator";
import { PageReveal } from "@/components/PageReveal";
import { ProjectCard } from "@/components/ProjectCard";
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
            <PageReveal delay={1000} className="flex flex-col gap-[32px]">
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
            </PageReveal>

            <PageReveal delay={2000}>
              <StatusRotator messages={statusMessages} />
            </PageReveal>
          </div>

          <div className="flex flex-col gap-[20vh]">
            {projects.map((project) => (
              <PageReveal key={project.slug} delay={3000}>
                <ProjectCard project={project} />
              </PageReveal>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
