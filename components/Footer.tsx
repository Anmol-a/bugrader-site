export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="max-w-[1180px] mx-auto px-8 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2.5 font-display font-semibold text-[17px]">
          <span className="relative w-4 h-4">
            <span className="absolute inset-[5px] bg-gold rounded-full" />
            <span className="absolute inset-0 border border-gold rounded-full opacity-45" />
          </span>
          BugRadar
        </div>
        <p className="text-[13.5px] text-ink-soft">Catch failures before your customers do.</p>
        <p className="text-[13.5px] text-ink-soft opacity-65">© 2026 BugRadar</p>
      </div>
    </footer>
  );
}
