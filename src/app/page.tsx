import Link from "next/link";
import {
  ArrowRight,
  Users,
  Zap,
  Globe,
  ShieldCheck,
  Clock,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const stats = [
  { label: "Informal workers in Africa", value: "400M+" },
  { label: "Without bank accounts", value: "57%" },
  { label: "Average payment delay", value: "7–14 days" },
  { label: "Transaction fees saved", value: "Up to 90%" },
];

const problems = [
  {
    icon: Clock,
    title: "Delayed payments",
    description:
      "Gig workers and market traders wait weeks for payment through slow bank transfers and mobile money systems with high fees.",
  },
  {
    icon: Globe,
    title: "No bank account required",
    description:
      "Over half of Africa's workforce is unbanked. Traditional payroll systems exclude them entirely.",
  },
  {
    icon: TrendingUp,
    title: "High transaction costs",
    description:
      "Cross-border payments in Africa cost 8–12% on average. Workers lose a significant portion of their earnings to fees.",
  },
];

const stellarReasons = [
  {
    title: "Near-zero fees",
    description: "Stellar transactions cost fractions of a cent, making micro-payments viable for the first time.",
  },
  {
    title: "5-second finality",
    description: "Payments settle in seconds, not days. Workers get paid instantly when work is done.",
  },
  {
    title: "USDC native support",
    description: "USDC on Stellar provides dollar-stable payments without volatility risk for workers.",
  },
  {
    title: "No bank required",
    description: "A Stellar wallet address is all a worker needs to receive payments from anywhere in the world.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
            Open-source · Built on Stellar
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Payroll for{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Africa&apos;s workforce
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            PayrollDAO lets startups, DAOs, and small businesses pay freelancers, gig workers,
            and market traders in USDC or XLM on Stellar — instantly, with near-zero fees,
            no bank account required.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-black hover:bg-emerald-400 transition-colors"
            >
              Launch App
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/payrolldao/payrolldao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-base font-semibold text-white hover:border-white/40 transition-colors"
            >
              <GitBranch className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section id="problem" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              The payroll problem in Africa
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              400 million informal workers across Africa are underserved by traditional financial
              infrastructure. Payroll is broken for the people who need it most.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <problem.icon className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{problem.title}</h3>
                <p className="text-sm text-gray-400">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution section */}
      <section id="solution" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                On-chain payroll that actually works
              </h2>
              <p className="mt-4 text-gray-400">
                PayrollDAO replaces slow, expensive, exclusionary payroll systems with a simple
                on-chain alternative. Employers create payroll groups, add workers by wallet
                address, and send payments in seconds.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Create payroll groups for teams, gig workers, or traders",
                  "Add workers by Stellar wallet address — no KYC required",
                  "Send one-time or recurring payments in USDC or XLM",
                  "Full transaction history and payment status tracking",
                  "Open-source and self-hostable",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
                >
                  Try the demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Mock dashboard preview */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-3">
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="text-xs text-gray-500">Total paid this month</div>
                  <div className="mt-1 text-2xl font-bold text-emerald-400">$9,100 USDC</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="text-xs text-gray-500">Active workers</div>
                    <div className="mt-1 text-xl font-bold">25</div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="text-xs text-gray-500">Payroll groups</div>
                    <div className="mt-1 text-xl font-bold">3</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {["Amara Diallo", "Kwame Asante", "Fatima Nkosi"].map((name) => (
                    <div key={name} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Users className="h-3 w-3 text-emerald-400" />
                        </div>
                        <span className="text-sm">{name}</span>
                      </div>
                      <span className="text-xs text-emerald-400">Paid ✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Stellar */}
      <section id="stellar" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400">
              Powered by Stellar
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Why we chose Stellar
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Stellar was purpose-built for financial inclusion. It&apos;s the only blockchain
              that makes micro-payments to unbanked workers economically viable at scale.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stellarReasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6"
              >
                <h3 className="mb-2 font-semibold text-cyan-300">{reason.title}</h3>
                <p className="text-sm text-gray-400">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to build with us?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            PayrollDAO is open-source and community-driven. Whether you&apos;re a developer,
            designer, or operator — there&apos;s a place for you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-black hover:bg-emerald-400 transition-colors"
            >
              Launch App
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/payrolldao/payrolldao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-base font-semibold text-white hover:border-white/40 transition-colors"
            >
              <GitBranch className="h-4 w-4" />
              Contribute on GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
