type TypeStyle = {
  name: string;
  className: string;
  weightLabel: string;
  size: number;
  lineHeight: number;
};

const displayStyles: TypeStyle[] = [
  { name: "Display/XLarge", className: "font-display text-display-xl font-bold", weightLabel: "Bold (700)", size: 56, lineHeight: 64 },
  { name: "Display/XLarge subdued", className: "font-display text-display-xl font-normal", weightLabel: "Regular (400)", size: 56, lineHeight: 64 },
  { name: "Display/Large", className: "font-display text-display-lg font-bold", weightLabel: "Bold (700)", size: 48, lineHeight: 56 },
  { name: "Display/Large subdued", className: "font-display text-display-lg font-normal", weightLabel: "Regular (400)", size: 48, lineHeight: 56 },
  { name: "Display/Medium", className: "font-display text-display-md font-bold", weightLabel: "Bold (700)", size: 40, lineHeight: 48 },
  { name: "Display/Medium subdued", className: "font-display text-display-md font-normal", weightLabel: "Regular (400)", size: 40, lineHeight: 48 },
  { name: "Display/Small", className: "font-display text-display-sm font-bold", weightLabel: "Bold (700)", size: 32, lineHeight: 40 },
  { name: "Display/Small subdued", className: "font-display text-display-sm font-normal", weightLabel: "Regular (400)", size: 32, lineHeight: 40 },
];

const headingStyles: TypeStyle[] = [
  { name: "Heading/XLarge", className: "font-heading text-heading-xl font-bold", weightLabel: "Bold (700)", size: 28, lineHeight: 36 },
  { name: "Heading/XLarge subdued", className: "font-heading text-heading-xl font-normal", weightLabel: "Regular (400)", size: 28, lineHeight: 36 },
  { name: "Heading/Large", className: "font-heading text-heading-lg font-bold", weightLabel: "Bold (700)", size: 24, lineHeight: 32 },
  { name: "Heading/Large subdued", className: "font-heading text-heading-lg font-normal", weightLabel: "Regular (400)", size: 24, lineHeight: 32 },
  { name: "Heading/Medium", className: "font-heading text-heading-md font-bold", weightLabel: "Bold (700)", size: 20, lineHeight: 28 },
  { name: "Heading/Medium subdued", className: "font-heading text-heading-md font-normal", weightLabel: "Regular (400)", size: 20, lineHeight: 28 },
  { name: "Heading/Small", className: "font-heading text-heading-sm font-bold", weightLabel: "Bold (700)", size: 16, lineHeight: 24 },
  { name: "Heading/Small subdued", className: "font-heading text-heading-sm font-normal", weightLabel: "Regular (400)", size: 16, lineHeight: 24 },
  { name: "Heading/XSmall", className: "font-heading text-heading-xs font-bold", weightLabel: "Bold (700)", size: 12, lineHeight: 20 },
  { name: "Heading/XSmall subdued", className: "font-heading text-heading-xs font-normal", weightLabel: "Regular (400)", size: 12, lineHeight: 20 },
];

const bodyStyles: TypeStyle[] = [
  { name: "Body/Large", className: "font-body text-body-lg font-normal", weightLabel: "Regular (400)", size: 18, lineHeight: 28 },
  { name: "Body/Large emphasized", className: "font-body text-body-lg font-semibold", weightLabel: "Semibold (600)", size: 18, lineHeight: 28 },
  { name: "Body/Medium", className: "font-body text-body-md font-normal", weightLabel: "Regular (400)", size: 16, lineHeight: 24 },
  { name: "Body/Medium emphasized", className: "font-body text-body-md font-semibold", weightLabel: "Semibold (600)", size: 16, lineHeight: 24 },
];

const labelStyles: TypeStyle[] = [
  { name: "Label/Medium", className: "font-body text-label-md font-normal", weightLabel: "Regular (400)", size: 14, lineHeight: 20 },
  { name: "Label/Medium emphasized", className: "font-body text-label-md font-semibold", weightLabel: "Semibold (600)", size: 14, lineHeight: 20 },
];

function TypeSection({ title, styles }: { title: string; styles: TypeStyle[] }) {
  return (
    <section className="mt-16">
      <h2 className="mb-8 text-sm font-medium uppercase tracking-wide text-zinc-500">
        {title}
      </h2>
      <div className="flex flex-col gap-10">
        {styles.map((style) => (
          <div
            key={style.name}
            className="flex flex-col gap-2 border-b border-zinc-200 pb-8 last:border-none"
          >
            <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-[#533afd]">
              <span>{style.name}</span>
              <span>{style.weightLabel}</span>
              <span>Size {style.size}</span>
              <span>Line height {style.lineHeight}</span>
            </div>
            <p className={`text-[#1a2c44] ${style.className}`}>
              The quick brown fox
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function StyleGuide() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">Style guide</h1>
      <p className="mt-2 text-zinc-600">
        Typography tokens pulled from Figma. Compare against the Figma frame
        to sanity-check.
      </p>

      <TypeSection title="Display" styles={displayStyles} />
      <TypeSection title="Heading" styles={headingStyles} />
      <TypeSection title="Body" styles={bodyStyles} />
      <TypeSection title="Label" styles={labelStyles} />
    </main>
  );
}
