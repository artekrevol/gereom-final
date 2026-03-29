import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LeadQuestionnaire from "@/components/LeadQuestionnaire";
import gereomLogo from "@/assets/gereom-logo.svg";
import gereomLogoWhite from "@/assets/gereom-logo-white.svg";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-[11px] h-[11px]">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Nav */}
      <nav className="sticky top-0 z-[100] bg-[#08364D] border-b border-white/10">
        <div className="flex items-center justify-between px-[52px] py-[18px] max-md:px-5 max-md:py-[14px]">
          <div className="flex items-center gap-3">
            <img src={gereomLogo} alt="GereOM" className="h-10 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => document.getElementById("whats-inside")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden md:inline-flex bg-transparent text-white/70 border-none px-4 py-[11px] font-[var(--f-ui)] text-sm font-medium cursor-pointer transition-all hover:text-white"
            >
              What we offer
            </button>
            <button
              onClick={() => navigate("/investors")}
              className="hidden md:inline-flex bg-transparent text-white/70 border-none px-4 py-[11px] font-[var(--f-ui)] text-sm font-medium cursor-pointer transition-all hover:text-white"
            >
              Investors
            </button>
            <button
              onClick={() => document.getElementById("questionnaire")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden md:inline-flex bg-primary text-primary-foreground border-none rounded-[10px] px-5 py-[11px] font-[var(--f-ui)] text-sm font-semibold cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px"
            >
              Get early access
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden bg-transparent border-none text-white cursor-pointer p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-1">
            <button
              onClick={() => { document.getElementById("whats-inside")?.scrollIntoView({ behavior: "smooth" }); setMobileMenuOpen(false); }}
              className="bg-transparent text-white/80 border-none px-0 py-3 font-[var(--f-ui)] text-sm font-medium cursor-pointer text-left border-b border-white/10 hover:text-white transition-colors"
            >
              What we offer
            </button>
            <button
              onClick={() => { navigate("/investors"); setMobileMenuOpen(false); }}
              className="bg-transparent text-white/80 border-none px-0 py-3 font-[var(--f-ui)] text-sm font-medium cursor-pointer text-left border-b border-white/10 hover:text-white transition-colors"
            >
              Investors
            </button>
            <button
              onClick={() => { document.getElementById("questionnaire")?.scrollIntoView({ behavior: "smooth" }); setMobileMenuOpen(false); }}
              className="mt-2 bg-primary text-primary-foreground border-none rounded-[10px] px-5 py-[11px] font-[var(--f-ui)] text-sm font-semibold cursor-pointer transition-all hover:opacity-90"
            >
              Get early access
            </button>
          </div>
        )}
      </nav>

      {/* Hero — Emotion-first, large type for 55+ readability */}
      <section className="relative z-[1] max-w-[980px] mx-auto px-8 pt-[80px] pb-12 text-center max-md:px-5 max-md:pt-14 max-md:pb-10">
        <div className="animate-up inline-flex items-center gap-2 bg-[hsl(var(--dew))] text-secondary rounded-full px-4 py-2 font-[var(--f-ui)] text-xs font-semibold uppercase tracking-[0.8px] mb-8">
          <span className="w-[7px] h-[7px] rounded-full bg-secondary pulse-dot" />
          Coming soon
        </div>

        <h1 className="animate-up-1 font-[var(--f-display)] text-[clamp(42px,6.5vw,76px)] font-medium leading-[1.06] tracking-[-0.8px] text-primary mb-6">
          Aging care that feels<br />
          <span className="text-accent italic">human</span> again.
        </h1>

        <p className="animate-up-2 font-[var(--f-display)] text-[clamp(18px,2.2vw,22px)] leading-[1.7] font-normal text-muted-foreground max-w-[640px] mx-auto mb-10">
          Clear tools, trusted guidance, and practical education for families navigating aging — and the professionals who support them.
        </p>

        <div className="animate-up-3 flex gap-3 justify-center flex-wrap mb-4">
          <button
            onClick={() => document.getElementById("questionnaire")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-[10px] px-7 py-[16px] font-[var(--f-ui)] text-[15px] font-semibold cursor-pointer transition-all bg-primary text-primary-foreground border-none hover:opacity-[0.92] hover:-translate-y-px shadow-[0_4px_20px_hsl(var(--primary)/0.15)]"
          >
            Request early access →
          </button>
          <button
            onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-[10px] px-7 py-[16px] font-[var(--f-ui)] text-[15px] font-semibold cursor-pointer transition-all bg-transparent text-primary border-[1.5px] border-primary/40 hover:bg-card/60"
          >
            Learn more
          </button>
        </div>

        <div className="animate-up-4 font-[var(--f-ui)] text-[14px] font-normal text-[hsl(var(--faint))] mb-0">
          No spam. Just early access to tools that help.
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center animate-bounce">
          <button
            onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-transparent border-none cursor-pointer text-primary/30 hover:text-primary/60 transition-colors p-2"
            aria-label="Scroll down"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative z-[1] max-w-[820px] mx-auto px-8 pb-20 max-md:px-5 max-md:pb-14">
        <div className="animate-up-5 grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-3">
          {[
            {
              stat: "10+", label: "Years in aging care",
              icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>
            },
            {
              stat: "3", label: "Service lines, one philosophy",
              icon: <><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" /></>
            },
            {
              stat: "USA & LATAM", label: "Active locations today",
              icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 bg-card/70 border border-border rounded-[14px] px-5 py-4">
              <div className="w-9 h-9 shrink-0 rounded-[8px] flex items-center justify-center bg-primary/[0.08] text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  {item.icon}
                </svg>
              </div>
              <div>
                <div className="font-[var(--f-ui)] text-[20px] font-bold text-primary leading-tight">{item.stat}</div>
                <div className="font-[var(--f-ui)] text-[13px] text-muted-foreground leading-snug">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem — Empathy section */}
      <section id="problem" className="relative z-[1] max-w-[980px] mx-auto px-8 pb-24 max-md:px-5 max-md:pb-16 scroll-mt-24">
        <div className="max-w-[720px] mx-auto text-center mb-12">
          <div className="font-[var(--f-ui)] text-[11px] font-semibold uppercase tracking-[2px] text-secondary mb-3">The reality</div>
          <h2 className="font-[var(--f-display)] text-[clamp(28px,3.5vw,44px)] font-medium tracking-[-0.3px] leading-[1.12] text-primary mb-5">
            A calmer, clearer way<br className="max-md:hidden" /> to think about aging
          </h2>
          <p className="font-[var(--f-display)] text-[18px] leading-[1.75] text-muted-foreground max-w-[580px] mx-auto">
            The system is complex, fragmented, and reactive. Families face crisis-driven decisions with little guidance, high costs, and overwhelming confusion.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[860px]:grid-cols-1">
          {[
            {
              pain: "Crisis-driven decisions",
              detail: "A parent falls. Suddenly you're navigating hospitals, insurance, and care options with no preparation and no playbook.",
              icon: <><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></>,
              featured: true,
            },
            {
              pain: "Guilt, stress, and isolation",
              detail: "You're juggling work, your own family, and the fear of not doing enough — without knowing if you're making the right choices.",
              icon: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></>,
              featured: true,
            },
            {
              pain: "Inconsistent, impersonal care",
              detail: "High caregiver turnover means your parent sees different faces every week. No continuity, no real connection.",
              icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="17" y1="8" x2="23" y2="8" /></>,
              featured: false,
            },
            {
              pain: "Confusing, expensive systems",
              detail: "Care managers charge $200–$250/hr. Full support costs $30,000–$50,000/month. Most families simply can't sustain it.",
              icon: <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
              featured: false,
            },
          ].map((item, i) => (
            <div key={i} className={`p-6 border rounded-[16px] transition-all hover:shadow-[var(--sh-md)] ${item.featured ? "bg-[hsl(var(--dew))] border-secondary/20" : "bg-card border-border"}`}>
              <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center mb-4 ${item.featured ? "bg-secondary/[0.12] text-secondary" : "bg-accent/[0.10] text-accent"}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  {item.icon}
                </svg>
              </div>
              <h3 className="font-[var(--f-ui)] text-[17px] font-semibold text-primary mb-2">{item.pain}</h3>
              <p className="font-[var(--f-ui)] text-[15px] text-muted-foreground leading-[1.65]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transition — Our approach */}
      <section className="relative z-[1] max-w-[720px] mx-auto px-8 pb-8 text-center max-md:px-5">
        <div className="bg-[hsl(165,40%,13%)] rounded-[20px] p-10 md:p-14 shadow-[var(--sh-lg)]">
          <h2 className="font-[var(--f-display)] text-[clamp(24px,3vw,36px)] font-medium tracking-[-0.3px] leading-[1.15] text-primary-foreground mb-4">
            We believe aging is a chapter to be <em>shared</em> — not managed.
          </h2>
          <p className="font-[var(--f-display)] text-[17px] leading-[1.75] text-primary-foreground/70 max-w-[520px] mx-auto">
            GereOM combines home care, day clubs, and online education into one integrated model — built on trust, dignity, and real human connection.
          </p>
        </div>
      </section>

      {/* What's Inside — Products */}
      <section id="whats-inside" className="relative z-[1] max-w-[980px] mx-auto px-8 py-24 max-md:px-5 max-md:py-16 scroll-mt-24">
        <div className="text-center mb-14">
          <div className="font-[var(--f-ui)] text-[11px] font-semibold uppercase tracking-[2px] text-secondary mb-3">What's inside</div>
          <h2 className="font-[var(--f-display)] text-[clamp(28px,3.5vw,44px)] font-medium tracking-[-0.3px] leading-[1.12] text-primary mb-4">
            The Masterclass of Conscious Aging
          </h2>
          <p className="font-[var(--f-display)] text-[18px] leading-[1.75] text-muted-foreground max-w-[560px] mx-auto">
            Practical tools for real decisions to shape your aging experience.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-[860px]:grid-cols-1">
          {[
            {
              type: "Assessments",
              tagColor: "bg-accent/[0.12] text-accent",
              iconBg: "bg-accent",
              icon: <><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M9 12h6M9 16h4" /></>,
              count: "15–20 tools",
              title: "Health & Daily Living Assessments",
              desc: "Evaluate memory, hydration, nutrition, mobility, and daily function — the same tools professionals use, made accessible for families.",
              bullets: ["Nutrition & hydration checks", "Memory & cognition screens", "Mobility & fall-risk evaluations"],
            },
            {
              type: "Checklists",
              tagColor: "bg-secondary/[0.12] text-secondary",
              iconBg: "bg-secondary",
              icon: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
              count: "15–20 guides",
              title: "Checklists for Difficult Choices",
              desc: "Step-by-step guidance for the moments that need clarity fast — facility selection, care transitions, and diagnosis navigation.",
              bullets: ["Facility comparison criteria", "Questions to ask providers", "Transition planning steps"],
            },
            {
              type: "Courses",
              tagColor: "bg-[hsl(var(--mist))]/20 text-primary",
              iconBg: "bg-[hsl(var(--mist))]",
              icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></>,
              count: "15–20 modules",
              title: "Courses & Certifications",
              desc: "Structured education and professional pathways for families wanting deeper knowledge and caregivers advancing their careers.",
              bullets: ["Caregiver Foundations", "Holistic aging care training", "End of life care"],
            },
          ].map((product) => (
            <div key={product.type} className="bg-card border border-border rounded-[18px] p-6 pb-7 transition-all hover:-translate-y-1 hover:shadow-[var(--sh-md)] flex flex-col">
              <div className={`inline-flex items-center gap-[6px] self-start px-3 py-[5px] rounded-full font-[var(--f-ui)] text-[11px] font-semibold uppercase tracking-[0.8px] mb-5 ${product.tagColor}`}>
                <span className="w-[5px] h-[5px] rounded-full bg-current" />
                {product.type}
              </div>
              <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center mb-5 ${product.iconBg}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                  {product.icon}
                </svg>
              </div>
              <div className="font-[var(--f-ui)] text-[12px] font-semibold uppercase tracking-[1px] text-[hsl(var(--faint))] mb-2">{product.count}</div>
              <h3 className="font-[var(--f-ui)] text-[18px] font-semibold text-primary mb-2 leading-snug">{product.title}</h3>
              <p className="font-[var(--f-ui)] text-[14px] text-muted-foreground leading-[1.65] mb-5">{product.desc}</p>
              <ul className="mt-auto flex flex-col gap-2">
                {product.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 font-[var(--f-ui)] text-[13px] font-medium text-foreground">
                    <span className="w-[18px] h-[18px] shrink-0 rounded-full flex items-center justify-center bg-secondary/[0.12] text-secondary">
                      <CheckIcon />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Audience — Who it's for */}
      <section className="relative z-[1] max-w-[980px] mx-auto px-8 pb-24 max-md:px-5 max-md:pb-16">
        <div className="text-center mb-12">
          <div className="font-[var(--f-ui)] text-[11px] font-semibold uppercase tracking-[2px] text-secondary mb-3">Who it's for</div>
          <h2 className="font-[var(--f-display)] text-[clamp(28px,3.5vw,44px)] font-medium tracking-[-0.3px] leading-[1.12] text-primary mb-4">
            Built for families and professionals alike
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
          {/* Families */}
          <div className="p-8 rounded-[20px] border border-border bg-card">
            <div className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center mb-5 bg-accent/[0.12] text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="font-[var(--f-display)] text-[26px] font-medium tracking-[-0.2px] mb-2 text-primary">For families</h3>
            <p className="font-[var(--f-display)] text-[16px] font-normal leading-[1.75] mb-6 text-muted-foreground">
              Adults 35+ balancing work and family while navigating a parent's changing needs. You need clarity, not more confusion.
            </p>
            <div className="font-[var(--f-ui)] text-[11px] font-semibold uppercase tracking-[1.2px] text-[hsl(var(--faint))] mb-3">What you'll get</div>
            <ul className="flex flex-col gap-[10px] list-none">
              {[
                "Know what to assess before a crisis hits",
                "Know the right questions to ask providers",
                "Make confident decisions — not panicked ones",
                "Plan proactively for the road ahead",
              ].map((item) => (
                <li key={item} className="flex items-start gap-[10px] font-[var(--f-ui)] text-[14px] font-medium text-foreground leading-snug">
                  <span className="w-[20px] h-[20px] mt-[1px] shrink-0 rounded-full flex items-center justify-center bg-secondary/[0.12] text-secondary">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Professionals */}
          <div className="p-8 rounded-[20px] border border-transparent bg-primary">
            <div className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center mb-5 bg-primary-foreground/[0.12] text-primary-foreground/90">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <h3 className="font-[var(--f-display)] text-[26px] font-medium tracking-[-0.2px] mb-2 text-primary-foreground">For professionals</h3>
            <p className="font-[var(--f-display)] text-[16px] font-normal leading-[1.75] mb-6 text-primary-foreground/70">
              Caregivers, educators, and aging specialists who want consistent tools, structured training, and stronger trust with families.
            </p>
            <div className="font-[var(--f-ui)] text-[11px] font-semibold uppercase tracking-[1.2px] text-primary-foreground/50 mb-3">What you'll get</div>
            <ul className="flex flex-col gap-[10px] list-none">
              {[
                "Structured Trainings",
                "Professional certifications & credentials",
                "Career advancement pathways",
                "Tools to build family trust & communication",
              ].map((item) => (
                <li key={item} className="flex items-start gap-[10px] font-[var(--f-ui)] text-[14px] font-medium text-primary-foreground/90 leading-snug">
                  <span className="w-[20px] h-[20px] mt-[1px] shrink-0 rounded-full flex items-center justify-center bg-primary-foreground/[0.12] text-primary-foreground/90">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our approach — Values */}
      <section className="relative z-[1] max-w-[980px] mx-auto px-8 pb-24 max-md:px-5 max-md:pb-16">
        <div className="text-center mb-12">
          <div className="font-[var(--f-ui)] text-[11px] font-semibold uppercase tracking-[2px] text-secondary mb-3">Our approach</div>
          <h2 className="font-[var(--f-display)] text-[clamp(28px,3.5vw,44px)] font-medium tracking-[-0.3px] leading-[1.12] text-primary mb-4">
            Care that protects independence
          </h2>
          <p className="font-[var(--f-display)] text-[18px] leading-[1.75] text-muted-foreground max-w-[560px] mx-auto">
            We don't "parent" your parents. We support autonomy, dignity, and whole-person well-being.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[860px]:grid-cols-1">
          {[
            {
              icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
              bg: "bg-accent/[0.10] text-accent",
              title: "Relationship over transaction",
              desc: "Care is built on trust, consistency, and genuine human connection — not task lists and time sheets.",
            },
            {
              icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
              bg: "bg-secondary/[0.10] text-secondary",
              title: "Proactive, not reactive",
              desc: "We focus on prevention and lifestyle medicine — nutrition, movement, cognitive and social engagement — before crisis hits.",
            },
            {
              icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
              bg: "bg-[hsl(var(--mist))]/15 text-primary",
              title: "Whole-person care",
              desc: "Body, mind, spirit, relationships, and environment are interconnected. We support all of them because each impacts the others.",
            },
            {
              icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h6M9 15h4" /></>,
              bg: "bg-accent/[0.10] text-accent",
              title: "Clarity over complexity",
              desc: "No jargon, no fear-based marketing. Just clear, honest communication so families always know what to expect.",
            },
          ].map((v, i) => (
            <div key={i} className="flex items-start gap-5 p-6 bg-card border border-border rounded-[16px] transition-all hover:shadow-[var(--sh-md)]">
              <div className={`w-11 h-11 shrink-0 rounded-[10px] flex items-center justify-center ${v.bg}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  {v.icon}
                </svg>
              </div>
              <div>
                <h3 className="font-[var(--f-ui)] text-[17px] font-semibold text-primary mb-1 leading-snug">{v.title}</h3>
                <p className="font-[var(--f-ui)] text-[14px] text-muted-foreground leading-[1.65]">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Capture Questionnaire */}
      <LeadQuestionnaire />

      {/* Bottom CTA */}
      <section className="relative z-[1] max-w-[720px] mx-auto px-8 pb-28 text-center max-md:px-5 max-md:pb-20">
        <div className="bg-card border border-border rounded-[24px] p-12 px-10 shadow-[var(--sh-md)] max-md:p-8 max-md:px-6">
          <h2 className="font-[var(--f-display)] text-[clamp(26px,3.5vw,40px)] font-medium tracking-[-0.3px] leading-[1.12] text-primary mb-4">
            Be first to explore GereOM
          </h2>
          <p className="font-[var(--f-display)] text-[17px] font-normal text-muted-foreground leading-[1.75] mb-8 max-w-[460px] mx-auto">
            Join the waitlist for early access to the first release of tools, guides, and learning resources.
          </p>
          <div className="grid grid-cols-[1fr_auto] gap-[10px] bg-[hsl(var(--stone))] border border-border rounded-[14px] p-2 shadow-[var(--sh-sm)] max-md:grid-cols-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full border-none outline-none bg-transparent px-4 py-[15px] font-[var(--f-ui)] text-[15px] text-foreground placeholder:text-[hsl(var(--faint))]"
            />
            <button className="bg-primary text-primary-foreground border-none px-5 py-[14px] rounded-[10px] font-[var(--f-ui)] text-sm font-semibold cursor-pointer whitespace-nowrap max-md:w-full transition-all hover:opacity-90">
              Join the waitlist
            </button>
          </div>
          <div className="mt-4 font-[var(--f-ui)] text-[13px] font-normal text-[hsl(var(--faint))]">
            Early access invites will be sent before public launch.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-[1] border-t border-border py-10 px-8 max-md:px-5">
        <div className="max-w-[980px] mx-auto flex items-center justify-between gap-8 max-md:flex-col max-md:items-start max-md:gap-6">
          <div className="font-[var(--f-display)] text-[15px] font-medium text-foreground">GereOM</div>
          <nav className="flex items-center gap-6 max-md:flex-wrap max-md:gap-4">
            {[
              { label: "What we offer", target: "whats-inside" },
              { label: "Who it's for", target: "problem" },
              { label: "Our approach", target: "whats-inside" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth" })}
                className="bg-transparent border-none font-[var(--f-ui)] text-[13px] text-[hsl(var(--faint))] cursor-pointer hover:text-foreground transition-colors p-0"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate("/investors")}
              className="bg-transparent border-none font-[var(--f-ui)] text-[13px] text-[hsl(var(--faint))] cursor-pointer hover:text-foreground transition-colors p-0"
            >
              Investors
            </button>
          </nav>
          <div className="font-[var(--f-ui)] text-[13px] text-[hsl(var(--faint))]">
            © {new Date().getFullYear()} GereOM
          </div>
        </div>
      </footer>
      
    </>
  );
};

export default Index;
