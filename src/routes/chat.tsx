import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Plus, Send, Sparkles, Loader2 } from "lucide-react";
import { DemoBadge, ErrorText, fakeDelay } from "@/components/nova/ui";

export const Route = createFileRoute("/chat")({
  validateSearch: (s: Record<string, unknown>): { q?: string | undefined } => ({ q: typeof s["q"] === "string" ? (s["q"] as string) : undefined }),
  head: () => ({
    meta: [
      { title: "AI Chat — NOVA AI" },
      { name: "description", content: "Chat with NOVA AI about anything." },
      { property: "og:title", content: "AI Chat — NOVA AI" },
      { property: "og:description", content: "Conversational AI assistant by NOVA AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Chat,
});

type Msg = { role: "user" | "ai"; text: string };
const WELCOME: Msg = { role: "ai", text: "Hi! I'm NOVA. Ask me anything — this preview replies with sample answers." };

function demoReply(q: string) {
  return `Great question about "${q.slice(0, 60)}". In the full version, NOVA would give you a detailed, personalised answer here. For now, this is a sample response showing how replies will look.`;
}

function Chat() {
  const { q } = Route.useSearch();
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const sentQ = useRef(false);

  const send = async (text: string) => {
    if (!text.trim()) return setError("Please type a message before sending.");
    setError(null);
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }]);
    setLoading(true);
    await fakeDelay();
    setMsgs((m) => [...m, { role: "ai", text: demoReply(text) }]);
    setLoading(false);
  };

  useEffect(() => {
    if (q && !sentQ.current) { sentQ.current = true; send(q); }
  }, [q]);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, loading]);

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3"><h1 className="text-2xl font-bold">AI Chat</h1><DemoBadge /></div>
        <button onClick={() => { setMsgs([WELCOME]); setError(null); }} className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm hover:bg-muted">
          <Plus className="h-4 w-4" /> New chat
        </button>
      </div>

      <div className="glass flex-1 space-y-4 overflow-y-auto rounded-2xl p-4 md:p-6">
        {msgs.map((m, i) => (
          <div key={i} className={`flex animate-rise gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "ai" && (
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-primary"><Sparkles className="h-4 w-4 text-primary-foreground" /></span>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-secondary"}`}>
              {m.text}
              {m.role === "ai" && i > 0 && <div className="mt-2"><DemoBadge /></div>}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> NOVA is thinking…</div>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-3 space-y-2">
        <ErrorText msg={error} />
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="glass flex gap-2 rounded-2xl p-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message NOVA…" className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground" />
          <button disabled={loading} aria-label="Send" className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground disabled:opacity-60">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
