import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

type EmailSignup = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  source: string;
  created_at: string;
};

type InvestorInquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function exportCSV(rows: Record<string, unknown>[], filename: string) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

export default function Admin() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<"signups" | "investors">("signups");

  const [signups, setSignups] = useState<EmailSignup[]>([]);
  const [investors, setInvestors] = useState<InvestorInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Persist secret in session so page refresh doesn't log out
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_secret");
    if (saved) { setSecret(saved); setAuthed(true); }
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetchData();
  }, [authed]);

  async function fetchData() {
    setLoading(true);
    setFetchError("");
    try {
      const headers = { "x-admin-secret": secret };
      const [s, i] = await Promise.all([
        fetch(`${API_URL}/api/signups`, { headers }).then((r) => {
          if (r.status === 401) throw new Error("unauthorized");
          return r.json();
        }),
        fetch(`${API_URL}/api/investor-inquiries`, { headers }).then((r) => r.json()),
      ]);
      setSignups(s);
      setInvestors(i);
    } catch (e: unknown) {
      if (e instanceof Error && e.message === "unauthorized") {
        setAuthError("Incorrect secret.");
        setAuthed(false);
        sessionStorage.removeItem("admin_secret");
      } else {
        setFetchError(`Could not reach the API. Trying: "${API_URL}/api/signups" — check VITE_API_URL in Railway variables.`);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!secret.trim()) return;
    sessionStorage.setItem("admin_secret", secret);
    setAuthed(true);
  }

  // ── Login screen ──────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="font-[var(--f-display)] text-2xl font-medium text-primary mb-1">GereOM Admin</div>
          <p className="font-[var(--f-ui)] text-sm text-muted-foreground mb-8">Enter your admin secret to continue.</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Admin secret"
              className="w-full border border-border rounded-[10px] px-4 py-3 font-[var(--f-ui)] text-[15px] bg-white outline-none focus:ring-2 focus:ring-primary/20"
            />
            {authError && <p className="font-[var(--f-ui)] text-sm text-destructive">{authError}</p>}
            <button
              type="submit"
              className="bg-primary text-white border-none rounded-[10px] px-5 py-3 font-[var(--f-ui)] text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="bg-primary px-8 py-5 flex items-center justify-between max-md:px-5">
        <span className="font-[var(--f-display)] text-white text-xl font-medium">GereOM Admin</span>
        <button
          onClick={() => { setAuthed(false); sessionStorage.removeItem("admin_secret"); }}
          className="font-[var(--f-ui)] text-white/60 text-sm bg-transparent border-none cursor-pointer hover:text-white transition-colors"
        >
          Sign out
        </button>
      </div>

      <div className="max-w-[1100px] mx-auto px-8 py-10 max-md:px-5">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-10 max-md:grid-cols-1">
          <div className="bg-white rounded-[14px] border border-border p-6 shadow-[var(--sh-sm)]">
            <div className="font-[var(--f-ui)] text-[13px] font-medium text-muted-foreground mb-1">Waitlist signups</div>
            <div className="font-[var(--f-display)] text-4xl font-medium text-primary">{signups.length}</div>
          </div>
          <div className="bg-white rounded-[14px] border border-border p-6 shadow-[var(--sh-sm)]">
            <div className="font-[var(--f-ui)] text-[13px] font-medium text-muted-foreground mb-1">Investor inquiries</div>
            <div className="font-[var(--f-display)] text-4xl font-medium text-primary">{investors.length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[hsl(var(--dew))] rounded-[10px] p-1 w-fit mb-6">
          {(["signups", "investors"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-[var(--f-ui)] text-sm font-medium px-5 py-2 rounded-[8px] border-none cursor-pointer transition-all ${
                tab === t
                  ? "bg-white text-primary shadow-[var(--sh-sm)]"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "signups" ? "Waitlist" : "Investors"}
            </button>
          ))}
        </div>

        {loading && <p className="font-[var(--f-ui)] text-sm text-muted-foreground">Loading…</p>}
        {fetchError && <p className="font-[var(--f-ui)] text-sm text-destructive mb-4">{fetchError}</p>}

        {/* Table */}
        {!loading && (
          <div className="bg-white rounded-[14px] border border-border shadow-[var(--sh-sm)] overflow-hidden">
            {/* Table header row */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <span className="font-[var(--f-ui)] text-[13px] font-medium text-muted-foreground">
                {tab === "signups" ? `${signups.length} entries` : `${investors.length} entries`}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={fetchData}
                  className="font-[var(--f-ui)] text-[13px] text-muted-foreground bg-transparent border border-border rounded-[8px] px-3 py-1.5 cursor-pointer hover:text-foreground transition-colors"
                >
                  Refresh
                </button>
                <button
                  onClick={() =>
                    tab === "signups"
                      ? exportCSV(signups as unknown as Record<string, unknown>[], "waitlist.csv")
                      : exportCSV(investors as unknown as Record<string, unknown>[], "investors.csv")
                  }
                  className="font-[var(--f-ui)] text-[13px] text-white bg-primary border-none rounded-[8px] px-3 py-1.5 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  Export CSV
                </button>
              </div>
            </div>

            {tab === "signups" && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-[hsl(var(--stone))]">
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">#</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">First Name</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">Last Name</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">Email</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">Phone</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-10 text-center font-[var(--f-ui)] text-sm text-muted-foreground">No signups yet.</td></tr>
                  ) : (
                    signups.map((row, i) => (
                      <tr key={row.id} className={i % 2 === 0 ? "" : "bg-[hsl(var(--stone))/40]"}>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[13px] text-muted-foreground">{row.id}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[14px] text-foreground font-medium">{row.first_name || "—"}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[14px] text-foreground">{row.last_name || "—"}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[14px] text-foreground">{row.email}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[13px] text-muted-foreground">{row.phone || "—"}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[13px] text-muted-foreground">{formatDate(row.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {tab === "investors" && (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-[hsl(var(--stone))]">
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">#</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">Name</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">Email</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">Phone</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">Role</th>
                    <th className="text-left font-[var(--f-ui)] text-[12px] font-semibold text-muted-foreground px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {investors.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-10 text-center font-[var(--f-ui)] text-sm text-muted-foreground">No inquiries yet.</td></tr>
                  ) : (
                    investors.map((row, i) => (
                      <tr key={row.id} className={i % 2 === 0 ? "" : "bg-[hsl(var(--stone))/40]"}>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[13px] text-muted-foreground">{row.id}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[14px] text-foreground font-medium">{row.name}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[14px] text-foreground">{row.email}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[13px] text-muted-foreground">{row.phone || "—"}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[13px] text-muted-foreground">{row.role || "—"}</td>
                        <td className="px-6 py-3 font-[var(--f-ui)] text-[13px] text-muted-foreground">{formatDate(row.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
