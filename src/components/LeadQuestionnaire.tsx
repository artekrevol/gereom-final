import { useState } from "react";

const questions = [
  {
    id: "intent",
    label: "What brings you here?",
    options: [
      { value: "caring-loved-one", label: "Caring for a loved one", icon: "❤️" },
      { value: "caring-myself", label: "Caring for myself", icon: "🌿" },
      { value: "holistic-aging", label: "Holistic approach to aging well", icon: "✨" },
      { value: "professional-dev", label: "Professional development", icon: "📚" },
    ],
  },
  {
    id: "age",
    label: "What is your age range?",
    options: [
      { value: "35-45", label: "35–45" },
      { value: "46-55", label: "46–55" },
      { value: "56-65", label: "56–65" },
      { value: "66-75", label: "66–75" },
      { value: "76-85", label: "76–85" },
      { value: "85+", label: "85+" },
    ],
  },
  {
    id: "referral",
    label: "How did you hear about us?",
    options: [
      { value: "friend-family", label: "Friend or family referral", icon: "👥" },
      { value: "social-media", label: "Social media", icon: "📱" },
      { value: "search", label: "Online search", icon: "🔍" },
      { value: "other", label: "Other", icon: "💬" },
    ],
  },
];

const LeadQuestionnaire = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  const handleSubmit = () => {
    if (!allAnswered) return;
    console.log("Lead capture answers:", answers);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="relative z-[1] max-w-[720px] mx-auto px-8 pb-16 max-md:px-5">
        <div className="bg-card border border-border rounded-[24px] p-10 text-center shadow-[var(--sh-md)] animate-up">
          <div className="w-14 h-14 rounded-full bg-secondary/[0.12] text-secondary flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 className="font-[var(--f-display)] text-2xl font-medium text-primary mb-2">Thank you!</h3>
          <p className="font-[var(--f-ui)] text-sm text-muted-foreground leading-relaxed max-w-[400px] mx-auto">
            We'll use your answers to personalize your experience and send you what matters most.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="questionnaire" className="relative z-[1] max-w-[720px] mx-auto px-8 pb-16 max-md:px-5 scroll-mt-24">
      <div className="bg-card border border-border rounded-[24px] p-8 md:p-10 shadow-[var(--sh-md)] animate-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-[var(--f-display)] text-[clamp(22px,3vw,30px)] font-medium text-primary tracking-[-0.3px] mb-2">
            What brings you here today?
          </h2>
          <p className="font-[var(--f-ui)] text-sm text-muted-foreground">
            A quick questionnaire helps us tailor early access, resources, and the right starting point.
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {questions.map((_, i) => (
            <div
              key={i}
              className="h-[3px] flex-1 rounded-full transition-all duration-500"
              style={{
                background: i < answeredCount
                  ? "hsl(var(--secondary))"
                  : "hsl(var(--primary) / 0.08)",
              }}
            />
          ))}
          <span className="font-[var(--f-ui)] text-[11px] font-semibold text-muted-foreground ml-1 tabular-nums">
            {answeredCount}/{questions.length}
          </span>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-7">
          {questions.map((q, qi) => (
            <div key={q.id}>
              <label className="font-[var(--f-ui)] text-[13px] font-semibold text-primary uppercase tracking-[0.6px] mb-3 block">
                <span className="text-secondary mr-1.5">{qi + 1}.</span>
                {q.label}
              </label>
              <div className={`flex flex-wrap gap-2 ${q.id === "age" ? "" : ""}`}>
                {q.options.map((opt) => {
                  const isSelected = answers[q.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(q.id, opt.value)}
                      className={`
                        flex items-center gap-2 px-4 py-[10px] rounded-[10px] border text-sm font-medium
                        font-[var(--f-ui)] cursor-pointer transition-all duration-200
                        ${isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-[0_2px_8px_hsl(var(--primary)/0.18)]"
                          : "bg-transparent text-foreground border-primary/[0.12] hover:border-primary/[0.3] hover:bg-primary/[0.04]"
                        }
                      `}
                    >
                      {"icon" in opt && <span className="text-base leading-none">{opt.icon}</span>}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`
              w-full max-w-[320px] py-[14px] rounded-[10px] font-[var(--f-ui)] text-sm font-semibold
              cursor-pointer transition-all duration-300 border-none
              ${allAnswered
                ? "bg-primary text-primary-foreground hover:opacity-90 hover:-translate-y-px shadow-[0_4px_16px_hsl(var(--primary)/0.2)]"
                : "bg-primary/[0.08] text-primary/40 cursor-not-allowed"
              }
            `}
          >
            {allAnswered ? "Submit & get early access →" : "Answer all questions to continue"}
          </button>
          <span className="font-[var(--f-ui)] text-[12px] text-[hsl(var(--faint))]">
            Takes less than 30 seconds
          </span>
        </div>
      </div>
    </section>
  );
};

export default LeadQuestionnaire;
