import Link from "next/link";
import StageIndicator from "@/components/StageIndicator";

const ASSURANCES = [
  {
    title: "Your files never leave this device",
    body: "Images are fingerprinted locally with your browser's cryptography. The picture itself is never uploaded, transmitted, or stored anywhere.",
  },
  {
    title: "No account, no tracking",
    body: "There is no sign-up and no cloud database. Your case log lives only in this browser and can be deleted by you at any moment.",
  },
  {
    title: "You stay in control",
    body: "You decide what to prepare, review, edit, and send. Nothing is submitted automatically without you.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Discover & assess",
    body: "Understand your options calmly, at your own pace.",
  },
  {
    n: "2",
    title: "Find your reporting pathway",
    body: "Tell us where the content is hosted and we'll point you to the right route.",
  },
  {
    n: "3",
    title: "Prepare your report",
    body: "We draft a DSA-compliant notice you can review and edit.",
  },
  {
    n: "4",
    title: "Follow up",
    body: "Track every report in a private log — and sync it to your phone without a cloud account.",
  },
];

export default function HomePage() {
  return (
    <div>
      <StageIndicator current="discover" />

      <section className="rds-card bg-gradient-to-br from-white to-lavender-50">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-lavender-100 px-3 py-1 text-xs font-medium text-lavender-700">
          Private · On your device · EU-focused
        </p>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-calm-900 sm:text-4xl">
          A calm, private way to respond to non-consensual intimate imagery
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-calm-600">
          This navigator helps you document evidence, prepare takedown notices
          that align with the EU Digital Services Act, and keep track of your
          reports — all without ever uploading the image itself. You are not
          alone, and you set the pace.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/report" className="rds-btn-primary">
            Start preparing a report
          </Link>
          <Link href="/dashboard" className="rds-btn-secondary">
            View my case log
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {ASSURANCES.map((a) => (
          <div key={a.title} className="rds-card">
            <h2 className="text-base font-semibold text-calm-800">{a.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-calm-600">{a.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 rds-card">
        <h2 className="text-lg font-semibold text-calm-800">How it works</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-3">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-calm-100 text-sm font-semibold text-calm-700">
                {s.n}
              </span>
              <div>
                <h3 className="font-medium text-calm-800">{s.title}</h3>
                <p className="mt-0.5 text-sm text-calm-600">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 rounded-2xl border border-lavender-200 bg-lavender-50 p-6">
        <h2 className="text-base font-semibold text-lavender-800">
          A note on what this tool is — and isn't
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-lavender-900/80">
          This is a structured navigation and drafting aid. It does not provide
          legal or clinical advice, does not replace human support services, and
          cannot guarantee that content will be removed. For emotional support or
          legal guidance, please reach out to a trusted person or an accredited
          support organisation in your country.
        </p>
      </section>
    </div>
  );
}
