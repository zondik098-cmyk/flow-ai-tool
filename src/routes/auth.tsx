import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content: "Sign in or create your free workspace to start generating emails and task plans with AI.",
      },
      { property: "og:title", content: "Sign in — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Sign in or create your free workspace to start generating emails and task plans with AI.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address.");
    if (!forgot && password.length < 6)
      return toast.error("Your password must be at least 6 characters.");
    if (forgot) {
      toast.success("Password reset link sent. Check your inbox.");
      setForgot(false);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signIn(mode === "signup" ? name : name || "Kwanele Zondi", email);
      toast.success(mode === "signup" ? "Workspace created. Welcome!" : "Welcome back!");
      void navigate({ to: "/dashboard" });
    }, 700);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-gradient-primary p-12 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="size-5" aria-hidden="true" /> Workplace AI
        </div>
        <div className="space-y-5">
          <h2 className="text-4xl font-bold leading-tight">
            Turn meetings and inboxes into finished work.
          </h2>
          <p className="max-w-md text-primary-foreground/85">
            Draft emails in seconds, summarize any meeting into decisions and action items, and let
            AI break your goals into a plan you can actually run.
          </p>
          <ul className="space-y-2 text-sm text-primary-foreground/85">
            <li>✦ AI email drafts in five tones</li>
            <li>✦ Meeting notes → action items → tasks</li>
            <li>✦ Kanban, list and calendar planning</li>
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/70">
          Trusted by 4,000+ teams to save 6 hours every week.
        </p>
      </div>

      <div className="flex flex-col justify-center px-5 py-10 sm:px-12">
        <Button asChild variant="ghost" size="sm" className="mb-6 w-fit">
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
          </Link>
        </Button>
        <div className="mx-auto w-full max-w-md">
          {forgot ? (
            <form onSubmit={submit} className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  We'll email you a secure reset link.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reset-email">Work email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>
              <Button type="submit" className="w-full">
                Send reset link
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setForgot(false)}
              >
                Back to sign in
              </Button>
            </form>
          ) : (
            <Tabs value={mode} onValueChange={setMode}>
              <TabsList className="mb-6 w-full">
                <TabsTrigger value="login" className="flex-1">
                  Log in
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex-1">
                  Sign up
                </TabsTrigger>
              </TabsList>
              <div className="mb-6">
                <h1 className="text-2xl font-bold">
                  {mode === "signup" ? "Create your workspace" : "Welcome back"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mode === "signup"
                    ? "Free to start. No credit card required."
                    : "Sign in to pick up where you left off."}
                </p>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <TabsContent value="signup" className="m-0 space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Kwanele Zondi"
                  />
                </TabsContent>
                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox defaultChecked /> Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgot(true)}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? "Signing you in…"
                    : mode === "signup"
                      ? "Create account"
                      : "Log in"}
                </Button>
              </form>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
