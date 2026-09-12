export type Project = {
  slug: string;
  eyebrow: string;
  shipYear: number;
  title: string;
  coverLottie?: string;
  coverVideo?: string;
  coverVideoStart?: number;
};

// Add a new project by adding an entry here, then creating
// src/app/work/<slug>/page.mdx with the case study content.
export const projects: Project[] = [
  {
    slug: "stripe-internship",
    eyebrow: "Stripe internship",
    shipYear: 2026,
    title: "Detecting fraudulent API activity for merchants",
    coverVideo: "/work/stripe-internship/cover-video.mp4",
    coverVideoStart: 2,
  },
  {
    slug: "faire-internship",
    eyebrow: "Faire internship",
    shipYear: 2024,
    title: "Reducing retailer membership churn",
    coverLottie: "/work/faire-internship/cover-lottie.json",
  },
  {
    slug: "scispot-internship",
    eyebrow: "Scispot (YC S21) internship",
    shipYear: 2025,
    title: "Building a smart data import tool for scientists",
    coverLottie: "/work/scispot-internship/cover-lottie.json",
  },
];
