"use client";

import { LogoMark } from "@/components/brand/LogoMark";
import { motion } from "@/lib/motion";
import {
  Container,
  FadeIn,
  Section,
  SectionHeading,
  SectionLabel,
} from "@/components/ui/section";

const metrics = [
  { label: "State Licensing", value: "12 active", trend: "3 pending", color: "text-blue-400" },
  { label: "Compliance Controls", value: "Current", trend: "All passing", color: "text-emerald-400" },
  { label: "Examination Readiness", value: "Ready", trend: "Evidence current", color: "text-emerald-400" },
  { label: "Policy Library", value: "47 docs", trend: "Up to date", color: "text-violet-400" },
  { label: "Regulatory Reporting", value: "On schedule", trend: "Q1 MCR filed", color: "text-indigo-400" },
  { label: "Expansion Readiness", value: "2 states", trend: "In progress", color: "text-amber-400" },
];

const tasks = [
  { title: "Annual compliance review", status: "In progress", done: false },
  { title: "Control test — advertising", status: "Complete", done: true },
  { title: "CA license renewal package", status: "Scheduled", done: false },
];

const alerts = [
  { type: "info", message: "FL expansion application submitted" },
  { type: "success", message: "Exam evidence package updated this week" },
];

export function DashboardPreview() {
  return (
    <Section className="border-t border-white/5 bg-[#050508]">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionLabel>Compliance command center</SectionLabel>
          <SectionHeading className="mt-6">
            Visibility across{" "}
            <span className="text-gradient-accent">everything that matters.</span>
          </SectionHeading>
          <p className="mt-6 text-lg text-zinc-400">
            Licensing status, compliance controls, exam readiness, policies,
            and regulatory reporting — in one place, always current.
          </p>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-indigo-500/15 via-violet-500/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs text-zinc-600">Compliance Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-white/5" />
                <div className="h-6 w-20 rounded-md bg-white/5" />
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="hidden w-48 shrink-0 border-r border-white/5 p-4 md:block">
                <div className="mb-6 flex items-center gap-2">
                  <LogoMark size="small" className="opacity-80" />
                </div>
                <nav className="space-y-1">
                  {[
                    "State Licensing",
                    "Compliance Controls",
                    "Examination Readiness",
                    "Policy Library",
                    "Regulatory Reporting",
                    "Expansion Readiness",
                  ].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`rounded-lg px-3 py-2 text-xs ${
                          i === 0
                            ? "bg-white/5 font-medium text-white"
                            : "text-zinc-600"
                        }`}
                      >
                        {item}
                      </div>
                    ),
                  )}
                </nav>
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 md:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Compliance overview</h4>
                    <p className="text-xs text-zinc-600">Licensing, controls, and reporting current.</p>
                  </div>
                  <div className="hidden rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 sm:block">
                    Last updated: just now
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                        {metric.label}
                      </p>
                      <p className={`mt-1 text-xl font-semibold ${metric.color}`}>
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[10px] text-zinc-600">{metric.trend}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {/* Licensing tracker */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h5 className="text-xs font-medium text-white">State Licensing</h5>
                      <span className="text-[10px] text-zinc-600">12 states active</span>
                    </div>
                    <div className="space-y-2">
                      {["TX", "CA", "FL", "NY", "GA"].map((state, i) => (
                        <div key={state} className="flex items-center gap-3">
                          <span className="w-6 text-xs font-mono text-zinc-500">{state}</span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${[100, 100, 85, 100, 70][i]}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                              className={`h-full rounded-full ${
                                i === 2 ? "bg-yellow-500/60" : i === 4 ? "bg-yellow-500/60" : "bg-emerald-500/60"
                              }`}
                            />
                          </div>
                          <span className="text-[10px] text-zinc-600">
                            {i === 2 ? "Renewal" : i === 4 ? "Pending" : "Active"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tasks + Alerts */}
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <h5 className="mb-3 text-xs font-medium text-white">Tasks</h5>
                      <div className="space-y-2">
                        {tasks.map((task) => (
                          <div key={task.title} className="flex items-center gap-3">
                            <div
                              className={`h-4 w-4 rounded border ${
                                task.done
                                  ? "border-emerald-500/50 bg-emerald-500/20"
                                  : "border-white/10"
                              }`}
                            />
                            <span className="flex-1 text-xs text-zinc-400">{task.title}</span>
                            <span className="text-[10px] text-zinc-600">{task.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <h5 className="mb-3 text-xs font-medium text-white">Alerts</h5>
                      <div className="space-y-2">
                        {alerts.map((alert) => (
                          <div
                            key={alert.message}
                            className={`flex items-start gap-2 rounded-lg px-3 py-2 text-xs ${
                              alert.type === "success"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-blue-500/10 text-blue-400"
                            }`}
                          >
                            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                            {alert.message}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
