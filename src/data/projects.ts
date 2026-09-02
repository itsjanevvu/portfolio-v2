export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  year: string;
};

// Add a new project by adding an entry here, then creating
// src/app/work/<slug>/page.mdx with the case study content.
export const projects: Project[] = [
  {
    slug: "example-project-one",
    title: "Example Project One",
    summary: "A short one-line summary of the problem and your role.",
    tags: ["Product Design", "UX Research"],
    year: "2026",
  },
  {
    slug: "example-project-two",
    title: "Example Project Two",
    summary: "A short one-line summary of the problem and your role.",
    tags: ["Design Systems"],
    year: "2025",
  },
];
