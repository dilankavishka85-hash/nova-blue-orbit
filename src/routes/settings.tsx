import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { PageHeader, Panel, Field, NativeSelect, PrimaryButton, ErrorText, inputCls, fakeDelay } from "@/components/nova/ui";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — NOVA AI" },
      { name: "description", content: "Manage your NOVA AI profile and preferences." },
      { property: "og:title", content: "Settings — NOVA AI" },
      { property: "og:description", content: "Profile and preference settings for NOVA AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Guest User");
  const [email, setEmail] = useState("guest@nova.ai");
  const [lang, setLang] = useState("English");
  const [notify, setNotify] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    if (!name.trim()) return setError("Your name can't be empty.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email address.");
    setError(null); setLoading(true);
    await fakeDelay(800);
    setLoading(false);
    toast.success("Settings saved", { description: "Demo only — changes aren't stored yet." });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Settings" subtitle="Manage your profile and preferences." />
      <Panel className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name"><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} /></Field>
          <Field label="Email"><input value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></Field>
        </div>
        <Field label="Interface language"><NativeSelect value={lang} onChange={(e) => setLang(e.target.value)} options={["English", "Spanish", "French", "Sinhala", "Tamil"]} /></Field>
        <div className="flex items-center justify-between rounded-xl border border-border p-3">
          <div><p className="text-sm font-medium">Email notifications</p><p className="text-xs text-muted-foreground">Product updates and tips</p></div>
          <Switch checked={notify} onCheckedChange={setNotify} />
        </div>
        <ErrorText msg={error} />
        <PrimaryButton loading={loading} onClick={save}>{loading ? "Saving…" : "Save changes"}</PrimaryButton>
      </Panel>
    </div>
  );
}
