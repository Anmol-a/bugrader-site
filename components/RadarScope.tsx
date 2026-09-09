const blips = [
  { top: "22%", left: "58%", tagTop: "14%", tagLeft: "58%", label: "Homepage", lost: false },
  { top: "64%", left: "76%", tagTop: "68%", tagLeft: "80%", label: "Cart", lost: false },
  { top: "78%", left: "40%", tagTop: "83%", tagLeft: "22%", label: "Checkout — lost signal", lost: true },
  { top: "34%", left: "16%", tagTop: "26%", tagLeft: "2%", label: "Login", lost: false },
];

export default function RadarScope() {
  return (
    <div className="bg-panel rounded-[10px] p-5 pb-5 shadow-[0_20px_50px_-20px_rgba(13,19,29,0.45)]">
      <div className="flex justify-between mb-4 pb-3.5 border-b border-panel-line">
        <div>
          <div className="text-[11px] text-panel-muted mb-0.5">Environment</div>
          <div className="font-display text-[15px] font-semibold text-panel-ink">Production</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-panel-muted mb-0.5">Journeys live</div>
          <div className="font-display text-[15px] font-semibold text-panel-ink">7</div>
        </div>
      </div>

      <div className="relative aspect-square my-1.5">
        <div className="absolute inset-0">
          <div className="absolute border border-panel-line rounded-full inset-[37.5%]" />
          <div className="absolute border border-panel-line rounded-full inset-[25%]" />
          <div className="absolute border border-panel-line rounded-full inset-[12.5%]" />
          <div className="absolute border border-panel-line rounded-full inset-0" />
        </div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-panel-line" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-panel-line" />
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-px origin-left animate-sweep opacity-80"
          style={{ background: "linear-gradient(90deg, #E7C578, transparent)" }}
        />
        {blips.map((b) => (
          <div key={b.label}>
            <div
              className={`absolute w-[7px] h-[7px] rounded-full ${
                b.lost ? "bg-alert animate-blip" : "bg-gold-soft"
              }`}
              style={{ top: b.top, left: b.left }}
            />
            <div
              className={`absolute text-[11px] whitespace-nowrap ${
                b.lost ? "text-alert" : "text-panel-muted"
              }`}
              style={{ top: b.tagTop, left: b.tagLeft }}
            >
              {b.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3.5 bg-alert/10 border border-alert/30 rounded-md px-3.5 py-2.5 text-[13px] text-alert flex justify-between items-center">
        <span>Checkout lost signal, 41s ago</span>
        <span className="text-[11.5px] text-panel-muted">Escalating to on-call</span>
      </div>
    </div>
  );
}
