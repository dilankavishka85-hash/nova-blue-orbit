import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { PageHeader, Panel, Field, NativeSelect, PrimaryButton, DemoBadge, ErrorText, inputCls, fakeDelay } from "@/components/nova/ui";

export const Route = createFileRoute("/translator")({
  head: () => ({
    meta: [
      { title: "AI Translator — NOVA AI" },
      { name: "description", content: "Translate text between languages with NOVA AI." },
      { property: "og:title", content: "AI Translator — NOVA AI" },
      { property: "og:description", content: "Fast AI translation for the world." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Translator,
});

const LANGS = ["English", "Spanish", "French", "German", "Sinhala", "Tamil", "Hindi", "Japanese", "Chinese", "Arabic"];

function Translator() {
  const [from, setFrom] = useState("English");
  const [to, setTo] = useState("Spanish");
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = async () => {
    if (!text.trim()) return setError("Enter some text to translate.");
    if (from === to) return setError("Source and target languages are the same — pick a different target.");
    setError(null); setLoading(true); setOut("");
    await fakeDelay();
    setOut(`[Sample ${to} translation] ${text.trim()}`);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHeader title="AI Translator" subtitle="Break language barriers instantly." />
      <Panel className="space-y-4">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end">
          <div className="flex-1"><Field label="From"><NativeSelect value={from} onChange={(e) => setFrom(e.target.value)} options={LANGS} /></Field></div>
          <button aria-label="Swap languages" onClick={() => { setFrom(to); setTo(from); }} className="grid h-10 w-10 place-items-center self-center rounded-xl border border-border hover:bg-muted">
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          <div className="flex-1"><Field label="To"><NativeSelect value={to} onChange={(e) => setTo(e.target.value)} options={LANGS} /></Field></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder="Type or paste text…" className={inputCls} />
          <div className="relative rounded-xl border border-border bg-secondary/60 p-3 text-sm">
            {out ? <><p className="leading-relaxed">{out}</p><div className="mt-3"><DemoBadge /></div></>
              : <p className="text-muted-foreground">{loading ? "Translating…" : "Translation appears here."}</p>}
          </div>
        </div>
        <ErrorText msg={error} />
        <PrimaryButton loading={loading} onClick={translate}>{loading ? "Translating…" : "Translate"}</PrimaryButton>
      </Panel>
    </div>
  );
}
