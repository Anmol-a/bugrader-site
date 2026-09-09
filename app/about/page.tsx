import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { fitItems, fitTags, impactStatements, teamParagraphs } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — BugRadar",
  description: "Who's behind BugRadar, who it's built for, and why unnoticed failures cost more than they seem to.",
};

export default function About() {
  return (
    <>
      {/* Team */}
      <section className="pt-16 pb-20">
        <div className="max-w-[1180px] mx-auto px-8 grid md:grid-cols-[1fr_260px] gap-14 items-start">
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
          <div className="bg-panel rounded-xl p-6 flex flex-col items-center justify-center gap-3 aspect-square">
            <span className="relative w-8 h-8">
              <span className="absolute inset-[9px] bg-gold rounded-full" />
              <span className="absolute inset-0 border border-gold rounded-full opacity-45" />
            </span>
            <span className="text-panel-muted text-[12.5px] text-center">Founder-led,<br />network-backed</span>
          </div>
        </div>
      </section>

      {/* Industry fit */}
      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="Built for teams without a QA function"
            description="You don't need to run a testing team for this to matter to you. You need a business where a broken journey costs a customer."
          />
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 mb-10">
            {fitItems.map((item) => (
              <div key={item.title}>
                <h4 className="text-[15.5px] font-semibold mb-1.5">{item.title}</h4>
                <p className="text-[14px] text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {fitTags.map((tag) => (
              <span key={tag} className="border border-line rounded-full px-4 py-1.5 text-[13px] text-ink-soft">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Business impact */}
      <section className="py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading title="What an unnoticed failure actually costs" />
          <div className="flex flex-col max-w-[640px]">
            {impactStatements.map((statement, i) => (
              <p
                key={i}
                className="text-[17px] leading-relaxed py-4.5 border-b border-line last:border-b-0"
              >
                {statement}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}