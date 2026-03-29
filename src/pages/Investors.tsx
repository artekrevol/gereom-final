import { useState } from "react";
import { useNavigate } from "react-router-dom";
const gereomLogo = "/gereom-logo-new.png";
const API_URL = import.meta.env.VITE_API_URL || "";

const Investors = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/investor-inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // Non-blocking — still allow download even if API is unreachable
    }
    setLoading(false);
    setSubmitted(true);
    const link = document.createElement("a");
    link.href = "/GereOM-Investor-Deck.pdf";
    link.download = "GereOM-Investor-Deck.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Nav */}
      <nav className="sticky top-0 z-[100] flex items-center justify-between px-[52px] py-[18px] bg-primary border-b border-white/10 max-md:px-5 max-md:py-[14px]">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0">
          <img src={gereomLogo} alt="GereOM" className="h-14 w-auto" />
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => document.getElementById("deck-form")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary text-primary-foreground border-none rounded-[10px] px-5 py-[11px] font-[var(--f-ui)] text-sm font-semibold cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px"
          >
            Get the deck
          </button>
        </div>
      </nav>

      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Hero */}
      <section className="relative z-[1] max-w-[860px] mx-auto px-8 pt-[80px] pb-16 text-center max-md:px-5 max-md:pt-14">
        <div className="inline-flex items-center gap-2 bg-[hsl(var(--dew))] text-secondary rounded-full px-4 py-2 font-[var(--f-ui)] text-[13px] font-medium tracking-[0.3px] mb-8">
          <span className="w-[7px] h-[7px] rounded-full bg-secondary" />
          Investor Overview — Confidential
        </div>
        <h1 className="font-[var(--f-display)] text-[clamp(36px,5vw,64px)] font-medium leading-[1.08] tracking-[-0.6px] text-primary mb-5">
          Aging is a chapter<br />to be <span className="text-accent italic">shared</span> — not managed.
        </h1>
        <p className="font-[var(--f-display)] text-[clamp(17px,2vw,20px)] leading-[1.7] text-muted-foreground max-w-[600px] mx-auto">
          Building America's first fully integrated, accessible, and scalable aging care ecosystem.
        </p>
      </section>

      {/* The Wave */}
      <section className="relative z-[1] max-w-[980px] mx-auto px-8 pb-20 max-md:px-5">
        <div className="grid grid-cols-4 gap-4 max-[860px]:grid-cols-2">
          {[
            { stat: "11,200", label: "Americans turn 65 every day" },
            { stat: "73M", label: "Baby Boomers now 65+" },
            { stat: "63M", label: "Family caregivers in the U.S." },
            { stat: "4.6M", label: "Unfilled care jobs by 2032" },
          ].map((item) => (
            <div key={item.stat} className="bg-card border border-border rounded-[14px] px-5 py-5 text-center">
              <div className="font-[var(--f-ui)] text-[28px] font-bold text-primary leading-tight mb-1">{item.stat}</div>
              <div className="font-[var(--f-ui)] text-[13px] text-muted-foreground leading-snug">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center font-[var(--f-display)] text-[16px] text-muted-foreground">
          By 2030, the U.S. will have more 65+ residents than children. GereOM is built for this moment.
        </p>
      </section>

      {/* The Ecosystem */}
      <section className="relative z-[1] max-w-[980px] mx-auto px-8 pb-20 max-md:px-5">
        <div className="text-center mb-10">
          <div className="font-[var(--f-ui)] text-[13px] font-medium tracking-[0.3px] text-secondary mb-3">The solution</div>
          <h2 className="font-[var(--f-display)] text-[clamp(26px,3.2vw,40px)] font-medium tracking-[-0.3px] leading-[1.12] text-primary mb-3">
            Three pillars. One ecosystem.
          </h2>
          <p className="font-[var(--f-display)] text-[17px] text-muted-foreground max-w-[520px] mx-auto">
            No competitor integrates all three. That is the structural advantage.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-[860px]:grid-cols-1">
          {[
            {
              label: "In-Home Care",
              name: "Chajinel",
              tag: "Operating since 2014",
              tagColor: "bg-accent/[0.12] text-accent",
              points: ["Same caregiver, every visit — 1:1 ratio", "San Francisco, CA — 10+ years of trust", "Gross margin 36–50%"],
            },
            {
              label: "Senior Day Clubs",
              name: "GereOM",
              tag: "2 locations, Mexico",
              tagColor: "bg-secondary/[0.12] text-secondary",
              points: ["Structured vitality program, 9am–4pm, 365 days", "Joy and community — not medical maintenance", "Replicable, low-capital model"],
            },
            {
              label: "Digital Education",
              name: "Platform",
              tag: "Launching Year 1",
              tagColor: "bg-[hsl(var(--mist))]/20 text-primary",
              points: ["Assessments, checklists, certifications", "Serves families, seniors, and care professionals", "Software margins 65–80%+"],
            },
          ].map((p) => (
            <div key={p.label} className="bg-card border border-border rounded-[18px] p-6 flex flex-col">
              <div className={`inline-flex items-center gap-[6px] self-start px-3 py-[5px] rounded-full font-[var(--f-ui)] text-[12px] font-medium tracking-[0.3px] mb-4 ${p.tagColor}`}>
                <span className="w-[5px] h-[5px] rounded-full bg-current" />
                {p.tag}
              </div>
              <div className="font-[var(--f-ui)] text-[12px] font-medium tracking-[0.3px] text-[hsl(var(--faint))] mb-1">{p.label}</div>
              <h3 className="font-[var(--f-display)] text-[22px] font-medium text-primary mb-4">{p.name}</h3>
              <ul className="flex flex-col gap-2 mt-auto">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 font-[var(--f-ui)] text-[13px] text-muted-foreground leading-snug">
                    <span className="mt-[3px] w-[6px] h-[6px] shrink-0 rounded-full bg-secondary/50" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Market */}
      <section className="relative z-[1] max-w-[980px] mx-auto px-8 pb-20 max-md:px-5">
        <div className="text-center mb-10">
          <div className="font-[var(--f-ui)] text-[13px] font-medium tracking-[0.3px] text-accent mb-3">Market opportunity</div>
          <h2 className="font-[var(--f-display)] text-[clamp(26px,3.2vw,40px)] font-medium tracking-[-0.3px] leading-[1.12] text-primary">
            Three massive, growing markets — one integrated play.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4 max-[860px]:grid-cols-1">
          {[
            { size: "$162B → $381B", label: "U.S. Home Healthcare", cagr: "10% CAGR through 2033" },
            { size: "$18.6B → $31.2B", label: "Adult Day Care Services", cagr: "5.9% CAGR through 2034" },
            { size: "$602M → $1.2B", label: "Senior Care EdTech", cagr: "10.3% CAGR through 2032" },
          ].map((m) => (
            <div key={m.label} className="bg-card border border-border rounded-[16px] p-6 text-center">
              <div className="font-[var(--f-ui)] text-[22px] font-bold text-primary mb-1">{m.size}</div>
              <div className="font-[var(--f-ui)] text-[14px] font-semibold text-primary mb-1">{m.label}</div>
              <div className="font-[var(--f-ui)] text-[12px] text-muted-foreground">{m.cagr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Traction */}
      <section className="relative z-[1] max-w-[720px] mx-auto px-8 pb-20 text-center max-md:px-5">
        <div className="bg-primary rounded-[20px] p-10 md:p-14 shadow-[var(--sh-lg)]">
          <div className="font-[var(--f-ui)] text-[13px] font-medium tracking-[0.3px] text-primary-foreground/60 mb-4">Traction</div>
          <h2 className="font-[var(--f-display)] text-[clamp(22px,2.8vw,32px)] font-medium leading-[1.15] text-primary-foreground mb-8">
            11+ years of operating proof. Not a concept.
          </h2>
          <div className="grid grid-cols-3 gap-5 max-[600px]:grid-cols-1 text-left">
            {[
              { year: "2014", label: "Chajinel founded", detail: "San Francisco in-home care — operating continuously since" },
              { year: "2022", label: "Day Clubs launched", detail: "Two GereOM locations in Mexico — active, community-anchored" },
              { year: "$1.69M", label: "Annual gross revenue", detail: "Comparable established franchise location, 2024" },
            ].map((t) => (
              <div key={t.year}>
                <div className="font-[var(--f-ui)] text-[20px] font-bold text-primary-foreground mb-1">{t.year}</div>
                <div className="font-[var(--f-ui)] text-[13px] font-semibold text-primary-foreground mb-1">{t.label}</div>
                <div className="font-[var(--f-ui)] text-[12px] text-primary-foreground/60 leading-snug">{t.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment thesis */}
      <section className="relative z-[1] max-w-[980px] mx-auto px-8 pb-20 max-md:px-5">
        <div className="text-center mb-10">
          <div className="font-[var(--f-ui)] text-[13px] font-medium tracking-[0.3px] text-secondary mb-3">The thesis</div>
          <h2 className="font-[var(--f-display)] text-[clamp(26px,3.2vw,40px)] font-medium tracking-[-0.3px] leading-[1.12] text-primary">
            Why now. Why GereOM.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 max-[860px]:grid-cols-1">
          {[
            {
              title: "Demographic inevitability",
              desc: "Baby Boomers own 51.8% of U.S. wealth. As they age into their 70s and 80s, care spending becomes the largest household expenditure for tens of millions. This is not a trend — it is biology.",
            },
            {
              title: "A broken market with a clear fixer",
              desc: "The system is fragmented, high-turnover, and incapable of serving the coming wave. GereOM doesn't compete within the broken system — it replaces it.",
            },
            {
              title: "First-mover in untapped integration",
              desc: "No competitor operates across all three pillars under one brand. Building this requires 10+ years of operational credibility — which GereOM already possesses.",
            },
            {
              title: "Built-in network effects",
              desc: "Platform users become care service leads. Certified caregivers become recruitment pipelines. Day Club members become referral sources. Every pillar compounds the others.",
            },
          ].map((t) => (
            <div key={t.title} className="p-6 bg-card border border-border rounded-[16px]">
              <h3 className="font-[var(--f-ui)] text-[16px] font-semibold text-primary mb-2">{t.title}</h3>
              <p className="font-[var(--f-ui)] text-[14px] text-muted-foreground leading-[1.65]">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use of proceeds */}
      <section className="relative z-[1] max-w-[720px] mx-auto px-8 pb-20 max-md:px-5">
        <div className="text-center mb-8">
          <div className="font-[var(--f-ui)] text-[13px] font-medium tracking-[0.3px] text-accent mb-3">Use of proceeds</div>
          <h2 className="font-[var(--f-display)] text-[clamp(24px,3vw,36px)] font-medium tracking-[-0.3px] leading-[1.12] text-primary">
            Capital deployed with purpose.
          </h2>
        </div>
        <div className="bg-card border border-border rounded-[18px] overflow-hidden">
          {[
            { pct: "35%", label: "Platform Development", desc: "Build and launch the digital education platform" },
            { pct: "25%", label: "Operations & Team", desc: "Key hires: tech, marketing, clinical, ops" },
            { pct: "20%", label: "Brand & Marketing", desc: "Master brand launch, SEO, digital acquisition" },
            { pct: "10%", label: "Day Club Expansion", desc: "Third GereOM Day Club location" },
            { pct: "10%", label: "Legal, Compliance & Reserve", desc: "IP, licensing, working capital buffer" },
          ].map((row, i, arr) => (
            <div key={row.label} className={`flex items-center gap-5 px-6 py-4 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
              <div className="w-12 shrink-0 font-[var(--f-ui)] text-[18px] font-bold text-primary">{row.pct}</div>
              <div>
                <div className="font-[var(--f-ui)] text-[14px] font-semibold text-primary">{row.label}</div>
                <div className="font-[var(--f-ui)] text-[13px] text-muted-foreground">{row.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deck download — gated */}
      <section id="deck-form" className="relative z-[1] max-w-[600px] mx-auto px-8 pb-28 max-md:px-5">
        <div className="bg-card border border-border rounded-[24px] p-10 shadow-[var(--sh-md)] text-center max-md:p-8">
          {!submitted ? (
            <>
              <div className="font-[var(--f-ui)] text-[13px] font-medium tracking-[0.3px] text-secondary mb-4">Investor Deck</div>
              <h2 className="font-[var(--f-display)] text-[clamp(22px,3vw,32px)] font-medium tracking-[-0.3px] leading-[1.15] text-primary mb-3">
                Request the full deck
              </h2>
              <p className="font-[var(--f-display)] text-[16px] text-muted-foreground leading-[1.7] mb-8 max-w-[420px] mx-auto">
                Financials, unit economics, full projections, and the detailed data room overview — in one document.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border rounded-[10px] bg-[hsl(var(--stone))] px-4 py-[14px] font-[var(--f-ui)] text-[15px] text-foreground placeholder:text-[hsl(var(--faint))] outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="email"
                  placeholder="Work email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border rounded-[10px] bg-[hsl(var(--stone))] px-4 py-[14px] font-[var(--f-ui)] text-[15px] text-foreground placeholder:text-[hsl(var(--faint))] outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="text"
                  placeholder="Role / firm (optional)"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full border border-border rounded-[10px] bg-[hsl(var(--stone))] px-4 py-[14px] font-[var(--f-ui)] text-[15px] text-foreground placeholder:text-[hsl(var(--faint))] outline-none focus:ring-2 focus:ring-primary/20"
                />
                {error && <p className="font-[var(--f-ui)] text-[13px] text-destructive">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 bg-primary text-primary-foreground border-none rounded-[10px] px-5 py-[15px] font-[var(--f-ui)] text-[15px] font-semibold cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Preparing download…
                    </>
                  ) : "Download investor deck →"}
                </button>
              </form>
              <p className="mt-4 font-[var(--f-ui)] text-[12px] text-[hsl(var(--faint))]">
                Confidential. For accredited investor review only.
              </p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-secondary/[0.12] flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-secondary">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="font-[var(--f-display)] text-[26px] font-medium text-primary mb-3">Your download has started.</h2>
              <p className="font-[var(--f-display)] text-[16px] text-muted-foreground leading-[1.7] mb-6">
                Thank you, {form.name.split(" ")[0]}. The GereOM investor deck should be in your downloads folder.
              </p>
              <a
                href="/GereOM-Investor-Deck.pdf"
                download="GereOM-Investor-Deck.pdf"
                className="inline-block bg-primary text-primary-foreground rounded-[10px] px-6 py-[13px] font-[var(--f-ui)] text-[14px] font-semibold transition-all hover:opacity-90"
              >
                Download again
              </a>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-[1] border-t border-border py-8 px-8 max-md:px-5">
        <div className="max-w-[980px] mx-auto flex items-center justify-between max-md:flex-col max-md:gap-4 max-md:text-center">
          <button onClick={() => navigate("/")} className="font-[var(--f-display)] text-[15px] font-medium text-foreground cursor-pointer bg-transparent border-none p-0">GereOM</button>
          <div className="font-[var(--f-ui)] text-[13px] text-[hsl(var(--faint))]">
            © {new Date().getFullYear()} GereOM · Confidential — For Investor Review Only
          </div>
        </div>
      </footer>
    </>
  );
};

export default Investors;
