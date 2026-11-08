import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, MessageSquare, PenLine, GraduationCap, Briefcase, Languages, Settings, Menu, Bell, Search, Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";

export const NAV = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "AI Chat", to: "/chat", icon: MessageSquare },
  { title: "AI Writer", to: "/writer", icon: PenLine },
  { title: "AI Learning", to: "/learning", icon: GraduationCap },
  { title: "AI Business", to: "/business", icon: Briefcase },
  { title: "AI Translator", to: "/translator", icon: Languages },
  { title: "Settings", to: "/settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = path === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
        <Sparkles className="h-5 w-5 text-primary-foreground" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        NOVA <span className="text-gradient">AI</span>
      </span>
    </Link>
  );
}

function Profile() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">GU</div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">Guest User</p>
        <p className="truncate text-xs text-muted-foreground">Free demo plan</p>
      </div>
    </div>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Brand />
      <NavList onNavigate={onNavigate} />
      <div className="mt-auto"><Profile /></div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const current = NAV.find((n) => n.to === path)?.title ?? "NOVA AI";

  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarBody />
      </aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarBody onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur md:px-8">
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-muted lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-base font-semibold">{current}</h2>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-2 md:flex">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search tools…"
                className="w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                onKeyDown={(e) => e.key === "Enter" && toast.info("Search is a demo in this preview.")}
              />
            </div>
            <button aria-label="Notifications" onClick={() => toast("No new notifications", { description: "You're all caught up." })} className="relative rounded-lg p-2 hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            </button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">GU</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
