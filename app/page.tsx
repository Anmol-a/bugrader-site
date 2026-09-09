import Link from "next/link";
import RadarScope from "@/components/RadarScope";
import HeroBackdrop from "@/components/HeroBackdrop";
import ModulesPreview from "@/components/ModulesPreview";
import ScenarioReplay from "@/components/ScenarioReplay";
import HowItWorksTimeline from "@/components/HowItWorksTimeline";
import DemoConsole from "@/components/DemoConsole";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroBackdrop />
        <div className="relative max-w-[1180px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-center py-16 md:py-28">
          <div>
            <h1 className="font-display text-[34px] md:text-[48px] font-semibold leading-[1.13] tracking-tight mb-5 max-w-[15ch]">
              Know the moment a journey breaks, not when a customer tells you.
            </h1>
            <p className="text-[17.5px] text-ink-soft max-w-[42ch] mb-8 leading-relaxed">
              BugRadar runs your checkout, cart, coupon and login flows continuously in
              production, confirms real failures before flagging them, and alerts your
              team with evidence attached.
            </p>
            <div className="flex gap-3.5">
              <Link href="/contact" className="bg-ink text-paper px-[22px] py-3.5 rounded-md font-medium text-[15px]">
                Talk to us
              </Link>
              <a
                href="#how"
                className="border border-line px-5 py-3.5 rounded-md font-medium text-[15px] hover:border-ink-soft transition-colors bg-paper"
              >
                See how it works
              </a>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(185,134,47,0.16), transparent 70%)" }}
              aria-hidden="true"
            />
            <RadarScope />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-line py-20">
        <div className="max-w-[1180px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              title="Most teams find out from a customer."
              description="Traditional QA tests before a release. Nothing keeps testing after it ships — until something breaks quietly in production and a customer notices first."
            />
          </div>
          <ScenarioReplay />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-line py-20">
        <div className="max-w-[1180px] mx-auto px-8">
          <h2 className="font-display text-[28px] font-semibold mb-2">How BugRadar runs</h2>
          <p className="text-ink-soft text-[15.5px] mb-14 max-w-[52ch]">
            The same four stages, on every journey we monitor, for as long as we work with you.
          </p>
          <HowItWorksTimeline />
        </div>
      </section>

      {/* Live demo */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-8">
          <SectionHeading
            title="See a failure caught in real time"
            description="The same confirm-then-alert logic that runs on every journey we monitor."
          />
          <DemoConsole />
        </div>
      </section>

      {/* Modules preview */}
      <ModulesPreview />
    </>
  );
}