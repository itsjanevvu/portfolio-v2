import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-[784px] flex-col gap-[90px] px-6 py-8 lg:max-w-[860px] xl:max-w-[940px]">
      <Navbar />
      <article className="flex flex-col gap-[90px]">{children}</article>
      <Footer />
    </main>
  );
}
