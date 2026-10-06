interface SectionHeadingProps {
  index: string
  label: string
  title: string
}

export function SectionHeading({ index, label, title }: SectionHeadingProps) {
  return (
    <div className="mb-12 flex flex-col gap-4 border-t pt-6 md:mb-16 md:flex-row md:items-baseline md:gap-0">
      <p className="eyebrow md:w-1/4">
        <span className="text-accent">{index}</span> / {label}
      </p>
      <h2 className="text-balance text-3xl font-medium tracking-tight md:w-3/4 md:text-5xl">{title}</h2>
    </div>
  )
}
