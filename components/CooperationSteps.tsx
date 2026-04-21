interface Step {
  number: number;
  title: string;
  description: string;
}

interface CooperationStepsProps {
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    number: 1,
    title: "Kontakt",
    description: "Napisz do nas lub zadzwon. Odpowiemy na wszystkie pytania dotyczace wspolpracy.",
  },
  {
    number: 2,
    title: "Konsultacja",
    description: "Bezplatna rozmowa o Twoim projekcie. Dopasujemy najlepsze rozwiazanie do Twoich potrzeb.",
  },
  {
    number: 3,
    title: "Dokumenty",
    description: "Podpisanie umowy wspolpracy. Otrzymujesz NIP, REGON i mozliwosc wystawiania faktur.",
  },
  {
    number: 4,
    title: "Start",
    description: "Rozpoczynasz dzialalnosc w ramach Fundacji. Wystawiasz faktury i rozwijasz biznes.",
  },
];

export default function CooperationSteps({ steps = defaultSteps }: CooperationStepsProps) {
  return (
    <section className="py-12 md:py-20 bg-[var(--bg-light)]">
      <div className="container mx-auto px-5">
        <h2 className="text-2xl md:text-3xl text-center mb-12">
          Jak rozpoczac wspolprace?
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {/* Connector line (hidden on mobile, visible on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-[var(--accent)]/30" />
                )}
                {/* Step number circle */}
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                  {step.number}
                </div>
                {/* Step icon */}
                <div className="mb-3">
                  {step.number === 1 && (
                    <svg className="w-8 h-8 mx-auto text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  )}
                  {step.number === 2 && (
                    <svg className="w-8 h-8 mx-auto text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  )}
                  {step.number === 3 && (
                    <svg className="w-8 h-8 mx-auto text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  )}
                  {step.number === 4 && (
                    <svg className="w-8 h-8 mx-auto text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--body-color)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
