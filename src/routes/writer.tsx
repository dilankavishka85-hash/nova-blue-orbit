import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel, Field, NativeSelect, PrimaryButton, DemoBadge, ErrorText, inputCls, fakeDelay } from "@/components/nova/ui";

export const Route = createFileRoute("/writer")({
  head: () => ({
    meta: [
      { title: "AI Writer — NOVA AI" },
      { name: "description", content: "Write emails, blog posts and social captions with NOVA AI." },
      { property: "og:title", content: "AI Writer — NOVA AI" },
      { property: "og:description", content: "Your AI writing workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Writer,
});

function Writer() {
  const [brief, setBrief] = useState("");
  const [type, setType] = useState("Blog post");
  const [tone, setTone] = useState("Professional");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (brief.trim().length < 5) return setError("Tell NOVA a bit more about what you'd like to write (at least a few words).");
    setError(null); setLoading(true); setOut("");
    await fakeDelay(1300);
    setOut(`${type} · ${tone} tone\n\nTitle: ${brief.trim().slice(0, 50)}\n\nThis is sample demo output. In the full NOVA AI, you'd receive a complete ${type.toLowerCase()} written in a ${tone.toLowerCase()} voice, structured with a strong opening, clear key points and a memorable closing line.\n\n• Key point one tailored to your brief\n• Key point two with supporting detail\n• A clear call to action`);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title="AI Writer" subtitle="Describe what you need and pick a style." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Writing type"><NativeSelect value={type} onChange={(e) => setType(e.target.value)} options={["Blog post", "Email", "Social caption", "Essay", "Product description"]} /></Field>
            <Field label="Tone"><NativeSelect value={tone} onChange={(e) => setTone(e.target.value)} options={["Professional", "Friendly", "Persuasive", "Casual", "Inspiring"]} /></Field>
          </div>
          <Field label="Your brief">
            <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={8} placeholder="e.g. Announce our new eco-friendly water bottle…" className={inputCls} />
          </Field>
          <ErrorText msg={error} />
          <PrimaryButton loading={loading} onClick={generate} className="w-full">{loading ? "Writing…" : "Generate"}</PrimaryButton>
        </Panel>
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Output</h3>
            <div className="flex items-center gap-2">
              {out && <DemoBadge />}
              {out && <button aria-label="Copy" onClick={() => { navigator.clipboard?.writeText(out); toast.success("Copied to clipboard"); }} className="rounded-lg p-1.5 hover:bg-muted"><Copy className="h-4 w-4" /></button>}
            </div>
          </div>
          {out ? <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{out}</pre>
            : <p className="text-sm text-muted-foreground">{loading ? "Crafting your draft…" : "Your generated text will appear here."}</p>}
        </Panel>
      </div>
    </div>
  );
}
