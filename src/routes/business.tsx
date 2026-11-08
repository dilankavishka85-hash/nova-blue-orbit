import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { PageHeader, Panel, Field, NativeSelect, PrimaryButton, DemoBadge, ErrorText, inputCls, fakeDelay } from "@/components/nova/ui";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "AI Business — NOVA AI" },
      { name: "description", content: "Generate business ideas tailored to your budget and audience." },
      { property: "og:title", content: "AI Business — NOVA AI" },
      { property: "og:description", content: "AI-powered business idea generator." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Business,
});

type Idea = { name: string; pitch: string; startup: string };

function Business() {
  const [category, setCategory] = useState("Technology");
  const [budget, setBudget] = useState("$1,000 – $10,000");
  const [audience, setAudience] = useState("");
  const [ideas, setIdeas] = useState<Idea[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!audience.trim()) return setError("Describe your target audience so NOVA can tailor ideas.");
    setError(null); setLoading(true); setIdeas(null);
    await fakeDelay(1300);
    setIdeas([
      { name: `${category} Starter Kit`, pitch: `A subscription service helping ${audience} get started in ${category.toLowerCase()}.`, startup: budget },
      { name: `Local ${category} Hub`, pitch: `A community marketplace connecting ${audience} with trusted local providers.`, startup: budget },
      { name: `${category} Coach App`, pitch: `A simple mobile app giving ${audience} daily tips and progress tracking.`, startup: budget },
    ]);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHeader title="AI Business" subtitle="Turn your budget and audience into business ideas." />
      <Panel className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Business category"><NativeSelect value={category} onChange={(e) => setCategory(e.target.value)} options={["Technology", "Food & Drink", "Health & Fitness", "Education", "Fashion", "Travel"]} /></Field>
          <Field label="Budget"><NativeSelect value={budget} onChange={(e) => setBudget(e.target.value)} options={["Under $1,000", "$1,000 – $10,000", "$10,000 – $50,000", "$50,000+"]} /></Field>
          <Field label="Target audience"><input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. busy young parents" className={inputCls} /></Field>
        </div>
        <ErrorText msg={error} />
        <PrimaryButton loading={loading} onClick={generate}>{loading ? "Generating ideas…" : "Generate ideas"}</PrimaryButton>
      </Panel>
      {ideas && (
        <div className="grid gap-4 md:grid-cols-3">
          {ideas.map((i) => (
            <Panel key={i.name}>
              <div className="mb-3 flex items-center justify-between"><Lightbulb className="h-5 w-5 text-accent" /><DemoBadge /></div>
              <h3 className="font-semibold">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.pitch}</p>
              <p className="mt-3 text-xs text-accent">Startup budget: {i.startup}</p>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
