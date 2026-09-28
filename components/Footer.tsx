export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="max-w-[1180px] mx-auto px-8 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-3 font-display font-semibold text-[17px]">
          <svg viewBox="0 0 100 100" className="w-[30px] h-[30px] shrink-0" aria-hidden="true">
            <rect width="100" height="100" rx="22" className="fill-panel" />
            <path d="M 46 58 L 65.7 20.9 A 42 42 0 0 1 87.8 62.4 Z" className="fill-gold" />
            <circle cx="46" cy="58" r="5.5" className="fill-gold" />
          </svg>
          BugRadar
        </div>
        <p className="text-[13.5px] text-ink-soft">Catch failures before your customers do.</p>
        <p className="text-[13.5px] text-ink-soft opacity-65">© 2026 BugRadar</p>
      </div>
    </footer>
  );
}
