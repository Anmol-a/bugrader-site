type Props = {
  title: string;
  description?: string;
  onDark?: boolean;
};

export default function SectionHeading({ title, description, onDark = false }: Props) {
  return (
    <div className="max-w-xl mb-11">
      <h2
        className={`font-display text-[28px] font-semibold mb-2.5 ${
          onDark ? "text-panel-ink" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-[15.5px] leading-relaxed max-w-[56ch] ${
            onDark ? "text-panel-muted" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
