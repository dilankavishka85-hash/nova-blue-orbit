import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Atom, Calculator, Globe2, Code2, Palette, Landmark } from "lucide-react";
import { PageHeader, Panel, Field, PrimaryButton, DemoBadge, ErrorText, inputCls, fakeDelay } from "@/components/nova/ui";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "AI Learning — NOVA AI" },
      { name: "description", content: "Learn any subject at your level with NOVA AI." },
      { property: "og:title", content: "AI Learning — NOVA AI" },
      { property: "og:description", content: "Personalised AI lessons for every level." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Learning,
});

const SUBJECTS = [
  { name: "Science", icon: Atom }, { name: "Mathematics", icon: Calculator }, { name: "Geography", icon: Globe2 },
  { name: "Programming", icon: Code2 }, { name: "Art & Design", icon: Palette }, { name: "History", icon: Landmark },
];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

function Learning() {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("Science");
  const [level, setLevel] = useState("Beginner");
  const [lesson, setLesson] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    if (!topic.trim()) return setError("Enter a topic you'd like to learn about.");
    setError(null); setLoading(true); setLesson(null);
    await fakeDelay();
    setLesson([
      `What is ${topic}? A ${level.toLowerCase()}-friendly overview within ${subject}.`,
      `Core concepts of ${topic}, explained step by step.`,
      `Real-world examples and a quick practice exercise.`,
      `Short quiz: 3 questions to check your understanding.`,
    ]);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHeader title="AI Learning" subtitle="Pick a subject, choose your level and start learning." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SUBJECTS.map((s) => (
          <button key={s.name} onClick={() => setSubject(s.name)}
            className={`glass flex flex-col items-center gap-2 rounded-2xl p-4 text-sm font-medium transition hover:-translate-y-0.5 ${subject === s.name ? "border-ring shadow-glow" : ""}`}>
            <s.icon className={`h-6 w-6 ${subject === s.name ? "text-accent" : "text-muted-foreground"}`} />{s.name}
          </button>
        ))}
      </div>
      <Panel className="space-y-4">
        <Field label="Topic"><input value={topic} onChange={(e) => setTopic(e.target.value)} onKeyDown={(e) => e.key === "Enter" && start()} placeholder="e.g. Black holes" className={inputCls} /></Field>
        <div>
          <p className="mb-1.5 text-sm font-medium text-muted-foreground">Learning level</p>
          <div className="inline-flex rounded-xl border border-border p-1">
            {LEVELS.map((l) => (
              <button key={l} onClick={() => setLevel(l)} className={`rounded-lg px-4 py-1.5 text-sm ${level === l ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{l}</button>
            ))}
          </div>
        </div>
        <ErrorText msg={error} />
        <PrimaryButton loading={loading} onClick={start}>{loading ? "Preparing lesson…" : "Start learning"}</PrimaryButton>
      </Panel>
      {lesson && (
        <Panel>
          <div className="mb-3 flex items-center justify-between"><h3 className="font-semibold">Your lesson plan: {topic}</h3><DemoBadge /></div>
          <ol className="space-y-2">
            {lesson.map((s, i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-secondary p-3 text-sm">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">{i + 1}</span>{s}
              </li>
            ))}
          </ol>
        </Panel>
      )}
    </div>
  );
}
