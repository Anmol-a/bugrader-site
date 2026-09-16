"use client";

import { useState, FormEvent } from "react";
import { ShoppingBag, ShoppingCart, Tag, LogIn, Search, CreditCard, Plus, type LucideIcon } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const JOURNEY_OPTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "Checkout", icon: ShoppingBag },
  { label: "Cart", icon: ShoppingCart },
  { label: "Coupons & discounts", icon: Tag },
  { label: "Signup / login", icon: LogIn },
  { label: "Search & filters", icon: Search },
  { label: "Payment", icon: CreditCard },
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [selectedJourneys, setSelectedJourneys] = useState<string[]>([]);
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  function toggleJourney(label: string) {
    setSelectedJourneys((prev) =>
      prev.includes(label) ? prev.filter((j) => j !== label) : [...prev, label]
    );
    setOtherChecked(false);
  }

  function toggleOther(checked: boolean) {
    setOtherChecked(checked);
    if (checked) setSelectedJourneys([]);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const journeys = [...selectedJourneys];
    if (otherChecked && otherValue.trim()) {
      journeys.push(otherValue.trim());
    }

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      journeys,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setSelectedJourneys([]);
      setOtherChecked(false);
      setOtherValue("");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong sending that. Try emailing us directly instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line rounded-lg p-6 text-[15px]">
        <span className="font-display font-semibold">Signal received.</span> We read every message ourselves — expect a reply within one business day.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[480px]">
      <div>
        <label htmlFor="name" className="block text-[13.5px] text-ink-soft mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border border-line rounded-md px-3.5 py-2.5 text-[15px] bg-white focus:border-ink-soft"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-[13.5px] text-ink-soft mb-1.5">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-line rounded-md px-3.5 py-2.5 text-[15px] bg-white focus:border-ink-soft"
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-[13.5px] text-ink-soft mb-1.5">
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="w-full border border-line rounded-md px-3.5 py-2.5 text-[15px] bg-white focus:border-ink-soft"
        />
      </div>
      <div>
        <span className="block text-[13.5px] text-ink-soft mb-1.5">
          Which of these matter most on your site?
        </span>
        <div className="flex flex-wrap gap-2">
          {JOURNEY_OPTIONS.map(({ label, icon: Icon }) => (
            <label key={label} className="cursor-pointer">
              <input
                type="checkbox"
                checked={selectedJourneys.includes(label)}
                onChange={() => toggleJourney(label)}
                className="peer sr-only"
              />
              <span className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[13.5px] text-ink-soft transition-colors duration-200 peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-gold">
                <Icon size={14} strokeWidth={1.75} />
                {label}
              </span>
            </label>
          ))}
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={otherChecked}
              onChange={(e) => toggleOther(e.target.checked)}
              className="peer sr-only"
            />
            <span className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[13.5px] text-ink-soft transition-colors duration-200 peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-gold">
              <Plus size={14} strokeWidth={1.75} />
              Other
            </span>
          </label>
        </div>
        {otherChecked && (
          <input
            type="text"
            value={otherValue}
            onChange={(e) => setOtherValue(e.target.value)}
            placeholder="What else should we watch?"
            className="mt-2 w-full border border-line rounded-md px-3.5 py-2.5 text-[15px] bg-white focus:border-ink-soft"
          />
        )}
      </div>
      <div>
        <label htmlFor="message" className="block text-[13.5px] text-ink-soft mb-1.5">
          Your site, and anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full border border-line rounded-md px-3.5 py-2.5 text-[15px] bg-white focus:border-ink-soft"
        />
      </div>
      {status === "error" && <p className="text-[13.5px] text-alert">{error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-ink text-paper px-5 py-3 rounded-md font-medium text-[15px] disabled:opacity-60 self-start"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}