import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type Props = {
  href: string;
  icon: LucideIcon;
  title: string;
  summary: string;
};

export default function ModuleCard({ href, icon: Icon, title, summary }: Props) {
  return (
    <Link
      href={href}
      className="group border border-line rounded-xl p-6 flex flex-col gap-4 bg-white hover:border-ink-soft transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-paper-alt flex items-center justify-center">
        <Icon size={19} strokeWidth={1.75} className="text-ink" />
      </div>
      <div>
        <h3 className="font-display font-semibold text-[16px] mb-1.5">{title}</h3>
        <p className="text-[13.5px] text-ink-soft leading-relaxed">{summary}</p>
      </div>
      <span className="mt-auto flex items-center gap-1.5 text-[13px] font-medium">
        View module
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  );
}
