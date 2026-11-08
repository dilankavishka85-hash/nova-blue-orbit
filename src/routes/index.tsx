import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock, Send } from "lucide-react";
import { NAV } from "@/components/nova/AppShell";
import { Panel, ErrorText } from "@/components/nova/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — NOVA AI" },
      { name: "description", content: "Your NOVA AI dashboard: chat, write, learn, plan a business and translate in one place." },
      { property: "og:title", content: "NOVA AI Dashboard" },
      { property: "og:description", content: "Your World. One AI. Five AI tools in one dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const DESC: Record<string, string> = {
  "/chat": "Ask anything and get conversational answers.",
  "/writer": "Draft emails, posts and articles in any tone.",
  "/learning": "Learn any topic at your own level.",
  "/business": "Generate business ideas for your budget.",
  "/translator": "Translate text between dozens of languages.",
};

const ACTIVITY = [
  { tool: "AI Writer", text: "Drafted a product launch email", time: "2h ago" },
  { tool: "AI Chat", text: "Asked about healthy meal plans", time: "5h ago" },
  { tool: "AI Translator", text: "Translated a menu to Spanish", time: "Yesterday" },
  { tool: "AI Learning", text: "Started 'Intro to Astronomy'", time: "2 days ago" },
];

function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const tools = NAV.filter((n) => n.to in DESC);

  const submit = () => {
    if (!prompt.trim()) return setError("Type a question or idea first — NOVA is ready when you are.");
    navigate({ to: "/chat", search: { q: prompt.trim() } });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="animate-rise pt-2">
        <h1 className="text-3xl font-bold md:text-5xl">
          Welcome to <span className="text-gradient">NOVA AI</span>
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">Your World. One AI.</p>
      </section>

      <Panel className="shadow-glow">
        <p className="mb-3 text-sm font-medium text-muted-foreground">What can NOVA help you with today?</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={prompt}
            onChange={(e) => { setPrompt(e.target.value); setError(null); }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="e.g. Plan a 3-day trip to Tokyo…"
            className="flex-1 rounded-xl border border-input bg-background/60 px-4 py-3.5 text-base outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
          <button onClick={submit} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-glow hover:opacity-90">
            <Send className="h-4 w-4" /> Ask NOVA
          </button>
        </div>
        <div className="mt-3"><ErrorText msg={error} /></div>
      </Panel>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t, i) => (
          <Link key={t.to} to={t.to} style={{ animationDelay: `${i * 60}ms` }}
            className="glass group animate-rise rounded-2xl p-5 transition hover:-translate-y-1 hover:border-ring">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <t.icon className="h-5 w-5 text-primary-foreground" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{t.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{DESC[t.to]}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      <Panel>
        <h3 className="mb-4 text-lg font-semibold">Recent activity</h3>
        <ul className="divide-y divide-border">
          {ACTIVITY.map((a) => (
            <li key={a.text} className="flex items-center gap-3 py-3">
              <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{a.text}</p>
                <p className="text-xs text-accent">{a.tool}</p>
              </div>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
