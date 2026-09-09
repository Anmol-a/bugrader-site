export default function HeroBackdrop() {
  return (
    <svg
      className="absolute -top-24 -right-40 md:-right-24 w-[900px] h-[900px] pointer-events-none select-none"
      viewBox="0 0 900 900"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="450" cy="450" r="120" stroke="#DBE0E7" />
      <circle cx="450" cy="450" r="220" stroke="#DBE0E7" />
      <circle cx="450" cy="450" r="320" stroke="#DBE0E7" opacity="0.7" />
      <circle cx="450" cy="450" r="420" stroke="#DBE0E7" opacity="0.4" />
      <line x1="450" y1="30" x2="450" y2="870" stroke="#DBE0E7" opacity="0.5" />
      <line x1="30" y1="450" x2="870" y2="450" stroke="#DBE0E7" opacity="0.5" />
    </svg>
  );
}