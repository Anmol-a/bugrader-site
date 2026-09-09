import type { Metadata } from "next";
import Link from "next/link";
import { LogIn, ShoppingCart, Tag, CreditCard, Search, UserCog, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageIntro from "@/components/PageIntro";
import ModuleList from "@/components/ModuleList";
import VitalsRings from "@/components/VitalsRings";
import CompareTable from "@/components/CompareTable";
import { monitoredJourneys, monitoredJourneysIntro, alertSteps, serviceModules, secondaryCapabilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — BugRadar",
  description: "Test automation, RPA, data automation, process automation, alerting and continuous monitoring.",
};

const journeyIcons: Record<string, LucideIcon> = {
  login: LogIn,
  cart: ShoppingCart,
  tag: Tag,
  payment: CreditCard,
  search: Search,
  account: UserCog,
};

export default function Services() {
  return (
    <>
      <section className="pt-16 pb-4">
        <div className="max-w-[1180px] mx-auto px-8">
          <PageIntro
            title="Services"
            description="Production QA monitoring is the core of what we do. Everything here builds on that one job."
          />
        </div>
      </section>

      {/* Module directory */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-8">
          <ModuleList items={serviceModules} />
        </div>
      </section>

      {/* What we monitor */}
      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="What we monitor"
            description="The journeys where a failure costs you a customer, not just a bug ticket."
          />
          <p className="text-[14px] text-ink-soft leading-relaxed max-w-[62ch] mb-8 -mt-4">
            {monitoredJourneysIntro}
          </p>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-1 border-t border-line md:border-t-0">
            {monitoredJourneys.map((j) => {
              const Icon = journeyIcons[j.icon];
              return (
                <div key={j.label} className="flex gap-4 py-5 border-b border-line">
                  <div className="w-9 h-9 rounded-lg bg-white border border-line flex items-center justify-center shrink-0">
                    <Icon size={17} strokeWidth={1.75} className="text-ink" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-[15px] mb-1">{j.label}</div>
                    <div className="text-ink-soft text-[14px] leading-relaxed">{j.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="Alerts your team won't miss"
            description="A confirmed failure goes wherever your team already works, with an escalation path if nobody responds."
          />
          <div className="grid md:grid-cols-3 border-t border-line">
            {alertSteps.map((a, i) => (
              <div
                key={a.title}
                className={`pt-6 pb-6 md:pb-0 pr-7 ${
                  i < alertSteps.length - 1 ? "border-b md:border-b-0 md:border-r border-line" : ""
                }`}
              >
                <h4 className="text-[16px] font-semibold mb-2">{a.title}</h4>
                <p className="text-[14px] text-ink-soft leading-relaxed max-w-[28ch]">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="A dashboard that reads at a glance"
            description="Sample view, illustrative data — each ring is a journey's health over the last 24 hours."
          />
          <VitalsRings />
        </div>
      </section>

      {/* Why BugRadar */}
      <section className="py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading title="Why BugRadar, not just more QA" />
          <CompareTable />
        </div>
      </section>

      {/* AI-assisted QA */}
      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="Beyond the modules"
            description="Once the core monitoring is in place, some clients bring us in for more."
          />
          <div className="flex flex-col gap-6 max-w-[640px]">
            {secondaryCapabilities.map((c) => (
              <div key={c.title}>
                <h4 className="text-[15.5px] font-semibold mb-1.5 text-ink-soft">{c.title}</h4>
                <p className="text-[14px] text-ink-soft leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-panel py-16 text-center">
        <div className="max-w-[560px] mx-auto px-8">
          <h2 className="font-display text-[26px] font-semibold text-panel-ink mb-3">
            Ready to see it running on your site?
          </h2>
          <Link href="/contact" className="inline-block bg-gold text-[#241703] px-5 py-3 rounded-md font-semibold text-[14.5px]">
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}