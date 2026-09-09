type Props = {
  eyebrowDot?: boolean;
  title: string;
  description?: string;
};

export default function PageIntro({ title, description, eyebrowDot = true }: Props) {
  return (
    <div className="max-w-2xl">
      {eyebrowDot && (
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span className="text-[13px] text-ink-soft">BugRadar</span>
        </div>
      )}
      <h1 className="font-display text-[34px] md:text-[42px] font-semibold leading-tight mb-4 max-w-[18ch]">
        {title}
      </h1>
      {description && (
        <p className="text-[16.5px] text-ink-soft leading-relaxed max-w-[56ch]">{description}</p>
      )}
    </div>
  );
}
