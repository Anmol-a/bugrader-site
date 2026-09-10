import type { Metadata } from "next";
import { Globe, Rocket, UserX, Link2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import RevealOnScroll from "@/components/RevealOnScroll";
import NetworkGraph from "@/components/NetworkGraph";
import { fitItems, fitTags, impactStatements, teamParagraphs, teamStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — BugRadar",
  description: "Who's behind BugRadar, who it's built for, and why unnoticed failures cost more than they seem to.",
};

const fitIcons = [Globe, Rocket, UserX, Link2];

export default function About() {
  return (
    <>
      <section className="pt-16 pb-4">
        <div className="max-w-[1180px] mx-auto px-8 grid md:grid-cols-[1fr_280px] gap-14 items-start">
          <div>
            <h1 className="font-display text-[34px] md:text-[42px] font-semibold leading-tight mb-6 max-w-[16ch]">
              Who&apos;s behind this
            </h1>
            <div className="flex flex-col gap-3.5">
              {teamParagraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <RevealOnScroll>
            <NetworkGraph />
          </RevealOnScroll>
        </div>
      </section>

      <section className="border-t border-line py-10 mt-12">
        <div className="max-w-[1180px] mx-auto px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
            {teamStats.map((s) => (
              <div key={s.label} className="border-l-2 border-gold pl-4">
                <div className="font-display text-[17px] md:text-[19px] font-semibold leading-tight mb-1">
                  {s.value}
                </div>
                <div className="text-[12.5px] text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="Built for teams without a QA function"
            description="You don't need to run a testing team for this to matter to you. You need a business where a broken journey costs a customer."
          />
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {fitItems.map((item, i) => {
              const Icon = fitIcons[i];
              return (
                <RevealOnScroll key={item.title} delay={(i % 2) * 80}>
                  <div className="h-full bg-white border border-line rounded-xl p-6 hover:border-ink-soft hover:shadow-[0_12px_28px_-16px_rgba(16,22,31,0.25)] transition-all duration-300">
                    <div className="w-11 h-11 rounded-lg bg-paper-alt border border-line flex items-center justify-center mb-5">
                      <Icon size={19} strokeWidth={1.75} className="text-ink" />
                    </div>
                    <h4 className="text-[15.5px] font-semibold mb-1.5">{item.title}</h4>
                    <p className="text-[14px] text-ink-soft leading-relaxed">{item.body}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {fitTags.map((tag) => (
              <span key={tag} className="border border-line rounded-full px-4 py-1.5 text-[13px] text-ink-soft bg-white">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading title="What an unnoticed failure actually costs" />
          <div className="flex flex-col max-w-[640px]">
            {impactStatements.map((statement, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="flex gap-5 items-start py-4.5 border-b border-line last:border-b-0">
                  <span className="font-display text-[13px] text-gold font-semibold pt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[17px] leading-relaxed">{statement}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}