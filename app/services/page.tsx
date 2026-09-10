import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PageIntro from "@/components/PageIntro";
import ModuleList from "@/components/ModuleList";
import MonitorGrid from "@/components/MonitorGrid";
import AlertFlow from "@/components/AlertFlow";
import VitalsRings from "@/components/VitalsRings";
import CompareTable from "@/components/CompareTable";
import BeyondModules from "@/components/BeyondModules";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  monitoredJourneys,
  alertSteps,
  serviceModules,
  secondaryCapabilities,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — BugRadar",
  description: "Test automation, RPA, data automation, process automation, alerting and continuous monitoring.",
};

const relatedModules = serviceModules.filter((m) =>
  ["rpa", "process-automation", "data-automation"].includes(m.slug)
);

export default function Services() {
  return (
    <>
      <section className="pt-16 pb-10">
        <div className="max-w-[1180px] mx-auto px-8">
          <PageIntro
            title="Services"
            description="Production QA monitoring is the core of what we do. Everything here builds on that one job."
          />
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-[1180px] mx-auto px-8">
          <ModuleList items={serviceModules} />
        </div>
      </section>

      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="What we monitor"
            description="The journeys where a failure costs you a customer, not just a bug ticket."
          />
          <MonitorGrid items={monitoredJourneys} />
        </div>
      </section>

      <section className="py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="Alerts your team won't miss"
            description="A confirmed failure goes wherever your team already works, with an escalation path if nobody responds."
          />
          <RevealOnScroll>
            <AlertFlow steps={alertSteps} />
          </RevealOnScroll>
        </div>
      </section>

      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="A dashboard that reads at a glance"
            description="Sample view, illustrative data — each ring is a journey's health over the last 24 hours."
          />
          <RevealOnScroll>
            <VitalsRings />
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading title="Why BugRadar, not just more QA" />
          <CompareTable />
        </div>
      </section>

      <section className="bg-paper-alt py-20 border-t border-line">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="Beyond the modules"
            description="Once the core monitoring is in place, some clients bring us in for more."
          />
          <BeyondModules aiCapability={secondaryCapabilities[0]} relatedModules={relatedModules} />
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