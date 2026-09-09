"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
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
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong sending that. Try emailing us directly instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line rounded-lg p-6 text-[15px]">
        Thanks — that's been received. We'll get back to you shortly.
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
        <label htmlFor="message" className="block text-[13.5px] text-ink-soft mb-1.5">
          What do you sell, and where does it tend to break?
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
