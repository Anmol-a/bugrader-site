import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { contactEmail } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — BugRadar",
  description: "Tell us what you sell and where it tends to break.",
};

export default function Contact() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1180px] mx-auto px-8 grid md:grid-cols-2 gap-16">
        <div>
          <SectionHeading
            title="Get your critical journeys watched"
            description="Tell us what you sell and where it tends to break. We'll tell you honestly whether BugRadar is a fit."
          />
          <a href={`mailto:${contactEmail}`} className="text-[15px] font-medium underline decoration-line underline-offset-4">
            {contactEmail}
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
