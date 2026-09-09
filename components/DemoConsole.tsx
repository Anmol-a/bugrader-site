import { demoIncident } from "@/lib/content";

export default function DemoConsole() {
  return (
    <div className="bg-panel rounded-xl p-7 md:p-11 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h3 className="font-display text-[25px] font-semibold text-panel-ink mb-4">
          One failed run isn&apos;t an incident. Two in a row is.
        </h3>
        <p className="text-[15px] text-panel-muted leading-relaxed mb-5 max-w-[38ch]">
          A single miss could be a flaky network or a slow third party. BugRadar retries
          before it says anything. Only a confirmed second failure becomes an incident —
          with everything your team needs to fix it already attached.
        </p>
        <a
          href="/contact"
          className="inline-block bg-gold text-[#241703] px-5 py-3 rounded-md font-semibold text-[14.5px]"
        >
          See a sample report
        </a>
      </div>
      <div className="bg-panel-2 border border-panel-line rounded-lg px-5 py-4">
        {demoIncident.map((row) => (
          <div
            key={row.k}
            className="flex justify-between py-2.5 border-b border-panel-line last:border-b-0 text-[13.5px]"
          >
            <span className="text-panel-muted">{row.k}</span>
            <span
              className={`font-medium ${
                row.bad ? "text-alert" : row.good ? "text-clear" : "text-panel-ink"
              }`}
            >
              {row.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
