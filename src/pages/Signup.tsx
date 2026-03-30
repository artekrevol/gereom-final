import { useState } from "react";
import { useNavigate } from "react-router-dom";

const gereomLogo = "/gereom-logo-white.png";
const API_URL = import.meta.env.VITE_API_URL || "";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.email.includes("@")) {
      setError("Please enter your first name and a valid email.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      {/* Nav */}
      <nav className="bg-primary border-b border-white/10 px-[52px] py-[18px] flex items-center max-md:px-5 max-md:py-[14px]">
        <button onClick={() => navigate("/")} className="bg-transparent border-none p-0 cursor-pointer">
          <img src={gereomLogo} alt="GereOM" className="h-20 w-auto" />
        </button>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-[480px]">
          {status === "success" ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--dew))] flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-secondary">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="font-[var(--f-display)] text-[28px] font-medium text-primary mb-3">You're on the list.</h2>
              <p className="font-[var(--f-ui)] text-[16px] text-muted-foreground mb-8 leading-relaxed">
                We'll send you early access before the public launch. Keep an eye on your inbox.
              </p>
              <button
                onClick={() => navigate("/")}
                className="font-[var(--f-ui)] text-sm font-medium text-muted-foreground bg-transparent border-none cursor-pointer hover:text-foreground transition-colors"
              >
                ← Back to home
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-[hsl(var(--dew))] text-secondary rounded-full px-4 py-2 font-[var(--f-ui)] text-[13px] font-medium tracking-[0.3px] mb-5">
                  <span className="w-[7px] h-[7px] rounded-full bg-secondary pulse-dot" />
                  Early access
                </div>
                <h1 className="font-[var(--f-display)] text-[32px] font-medium text-primary leading-[1.2] mb-3">
                  Join the waitlist
                </h1>
                <p className="font-[var(--f-ui)] text-[16px] text-muted-foreground leading-relaxed">
                  Be first to access tools, guides, and resources for families navigating aging.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[var(--f-ui)] text-[13px] font-medium text-foreground">
                      First name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.first_name}
                      onChange={set("first_name")}
                      placeholder="Maria"
                      required
                      className="border border-border rounded-[10px] px-4 py-3 font-[var(--f-ui)] text-[15px] bg-white outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-[hsl(var(--faint))]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[var(--f-ui)] text-[13px] font-medium text-foreground">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={form.last_name}
                      onChange={set("last_name")}
                      placeholder="Garcia"
                      className="border border-border rounded-[10px] px-4 py-3 font-[var(--f-ui)] text-[15px] bg-white outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-[hsl(var(--faint))]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-[var(--f-ui)] text-[13px] font-medium text-foreground">
                    Email address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="maria@example.com"
                    required
                    className="border border-border rounded-[10px] px-4 py-3 font-[var(--f-ui)] text-[15px] bg-white outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-[hsl(var(--faint))]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-[var(--f-ui)] text-[13px] font-medium text-foreground">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+1 (555) 000-0000"
                    className="border border-border rounded-[10px] px-4 py-3 font-[var(--f-ui)] text-[15px] bg-white outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-[hsl(var(--faint))]"
                  />
                </div>

                {error && (
                  <p className="font-[var(--f-ui)] text-[13px] text-destructive">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 bg-primary text-white border-none rounded-[10px] px-5 py-[15px] font-[var(--f-ui)] text-[15px] font-semibold cursor-pointer transition-all hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? "Joining…" : "Join the waitlist →"}
                </button>

                <p className="font-[var(--f-ui)] text-[13px] text-center text-[hsl(var(--faint))]">
                  No spam. Early access invites only.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
