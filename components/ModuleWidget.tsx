import {
  Cog,
  Search,
  Bot,
  Database,
  Workflow,
  Circle,
  BellRing,
  Radar,
} from "lucide-react";

type Props = {
  slug: string;
  size?: "sm" | "lg";
};

export default function ModuleWidget({ slug, size = "sm" }: Props) {
  const box = size === "lg" ? "w-14 h-14" : "w-10 h-10";
  const iconSize = size === "lg" ? 26 : 18;
  const badgeSize = size === "lg" ? 15 : 11;

  return (
    <div className={`relative ${box} rounded-lg bg-panel-2 group-hover:bg-panel flex items-center justify-center shrink-0 overflow-hidden transition-colors`}>
      {slug === "test-automation" && (
        <>
          <Cog
            size={iconSize}
            strokeWidth={1.75}
            className="text-gold-soft transition-transform duration-700 ease-out group-hover:rotate-180"
          />
          <Search
            size={badgeSize}
            strokeWidth={2}
            className="absolute bottom-1 right-1 text-panel-ink transition-all duration-300 ease-out translate-x-1 translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </>
      )}

      {slug === "rpa" && (
        <>
          <Bot
            size={iconSize}
            strokeWidth={1.75}
            className="text-gold-soft transition-transform duration-500 group-hover:-rotate-6"
          />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-clear opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
        </>
      )}

      {slug === "data-automation" && (
        <>
          <Database size={iconSize} strokeWidth={1.75} className="text-gold-soft" />
          <span className="absolute left-1.5 right-1.5 h-px bg-gold-soft/80 opacity-0 group-hover:opacity-100 group-hover:animate-scan" />
        </>
      )}

      {slug === "process-automation" && (
        <>
          <Workflow size={iconSize} strokeWidth={1.75} className="text-gold-soft" />
          <Circle
            size={badgeSize - 5}
            fill="currentColor"
            className="absolute text-clear opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out left-2 group-hover:left-[calc(100%-14px)]"
          />
        </>
      )}

      {slug === "alerting" && (
        <>
          <BellRing
            size={iconSize}
            strokeWidth={1.75}
            className="text-gold-soft origin-top transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="absolute inset-2 rounded-full border border-alert opacity-0 group-hover:opacity-70 group-hover:animate-ping" />
        </>
      )}

      {slug === "continuous-monitoring" && (
        <>
          <Radar size={iconSize} strokeWidth={1.75} className="text-gold-soft" />
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="absolute top-1/2 left-1/2 w-1/2 h-px bg-gradient-to-r from-clear to-transparent origin-left group-hover:animate-sweep" />
          </span>
        </>
      )}
    </div>
  );
}