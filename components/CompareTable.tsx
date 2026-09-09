import { compareRows } from "@/lib/content";

export default function CompareTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse mt-2">
        <thead>
          <tr>
            <th className="text-left py-4 px-5 border-b border-line" />
            <th className="text-left py-4 px-5 border-b border-line font-display text-[13px] font-semibold text-ink-soft">
              Traditional QA
            </th>
            <th className="text-left py-4 px-5 border-b border-line font-display text-[13px] font-semibold text-ink-soft">
              BugRadar
            </th>
          </tr>
        </thead>
        <tbody>
          {compareRows.map((row) => (
            <tr key={row.label}>
              <td className="py-4 px-5 border-b border-line text-[13.5px] text-ink-soft whitespace-nowrap">
                {row.label}
              </td>
              <td className="py-4 px-5 border-b border-line text-[14.5px]">{row.traditional}</td>
              <td className="py-4 px-5 border-b border-line text-[14.5px] font-medium">{row.bugradar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
