import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Link from "next/link";

const faqItems = [
  {
    question: "Na czym polega inkubator przedsiebiorczosci?",
    answer: "<p>Inkubator przedsiebiorczosci to podmiot, ktory pomaga poczatkujacym, czesto niedoswiadczonym przedsiebiorcom w stawianiu pierwszych krokow na rynku. Ich sposob dzialania polega na udostepnieniu wlasnej osobowosci prawnej wraz z kompleksowym pakietem uslug: ksiegowych, kadrowych, prawnych i biurowych, dajac pelne srodowisko do zaistnienia z wlasnym pomyslem na biznes. W zamian za to pobieraja najczesciej niewielka zryczaltowana oplate miesieczna, konkurencyjna w stosunku do rynkowych cen uslug dla biznesu.</p>",
  },
  {
    question: "Czy inkubator przedsiebiorczosci sie oplaca?",
    answer: "<p>Prowadzenie wlasnej dzialalnosci to duzo wiecej niz tylko swiadczenie uslug, czy aktywna sprzedaz produktow. Istnieje szereg obowiazkow, ktorych regularne wypelnianie jest konieczne. Nieoceniona pomoc niosa biura rachunkowe, doradcy podatkowi albo Inkubator Przedsiebiorczosci oferujacy pelna obsluge pomyslu biznesowego. Zespol takiego inkubatora zlozony jest z grupy osob posiadajacych specjalistyczna wiedze z zakresu rachunkowosci, prawa podatkowego, czy rozliczen i obowiazkow sprawozdawczych wobec poszczegolnych instytucji.</p>",
  },
  {
    question: "Ile kosztuje pomoc inkubatora przedsiebiorczosci?",
    answer: "<p>Pomoc swiadczona przez inkubator przedsiebiorczosci najczesciej obciazona jest kosztem kilkuset zlotych miesiecznego abonamentu, w ramach ktorego przedsiebiorca otrzymuje kompleksowe wsparcie w funkcjonowaniu w realiach rynkowych. W zamian za zoptymalizowana do niewielkiej sumy, np. 400 zl netto, oplaty, mozna liczyc na fachowa obsluge ksiegowa, prowadzenie calosci rozliczen i sprawozdawczosci wobec instytucji podatkowych oraz biezaca pomoc i doradztwo w doborze optymalnego i bezpiecznego sposobu dzialania.</p>",
  },
  {
    question: "Jak dziala inkubator przedsiebiorczosci?",
    answer: "<p>Inkubator przedsiebiorczosci to cos wiecej niz tylko biuro rachunkowe. Forma dzialania to najczesciej organizacja pozarzadowa, ktora udostepnia swoja podmiotowosc prawna, nazwe w celach rozliczeniowych i umozliwiajac nawiazywanie relacji B2B, pozwalajac jednoczesnie na budowanie wlasnej marki, rozpoznawalnosci na rynku. Inkubator przejmuje przy tym obowiazki rozliczeniowe, pozwalajac pomyslodawcy inkubowanego biznesu skupic sie na rozwoju dzialalnosci.</p>",
  },
  {
    question: "Jakie uslugi oferuje inkubator przedsiebiorczosci?",
    answer: "<p>W ramach szeroko pojetej uslugi preinkubacji pomyslu na biznes, inkubator przedsiebiorczosci udostepnia: wlasna osobowosc prawna, brak koniecznosci rejestracji podmiotu, kompleksowa ksiegowosc, wystawianie faktur w systemie inkubatora oraz ich rozliczanie, brak koniecznosci odprowadzania skladek na ZUS, dostep do indywidualnego rachunku bankowego, doradztwo biezace i fachowa obsluge prawna, a takze dodatkowe uslugi, tj.: obsluge korespondencji, szkolenia dla Beneficjentow inkubatora, czy dostep do specjalnych ofert podmiotow partnerskich.</p>",
  },
  {
    question: "Jak wyplacic pieniadze z inkubatora przedsiebiorczosci?",
    answer: "<p>W ramach inkubatora przedsiebiorczosci otrzymujesz rachunek bankowy do obslugi rozliczen swojej dzialalnosci. Masz tez do niego biezacy, staly dostep, wiec zawsze mozesz sprawdzic status platnosci wystawionych faktur. Ten rachunek sluzy Ci takze do dokonywania zaplaty za zakupione na potrzeby dzialalnosci uslugi, produkty do sprzedazy, czy urzadzenia potrzebne do biezacego funkcjonowania. Najprzyjemniejsza operacja, jaka mozesz wprowadzic, jest wyplata wynagrodzenia z wypracowanych przez Ciebie zyskow.</p>",
  },
  {
    question: "Co zyskuje osoba, ktora prowadzi firme w ramach inkubatora?",
    answer: "<p>Prowadzenie dzialalnosci w ramach inkubatora przedsiebiorczosci daje przede wszystkim szanse na bezpieczne przetestowanie pomyslu na biznes. Oferuje przy tym specjalistyczne wsparcie formalne i doradcze ze strony menedzerow inkubatorow. Najwazniejsze obszary takiego wsparcia to przede wszystkim doradztwo ksiegowe i prawne, skomplikowane dla osob bez duzego doswiadczenia w biznesie, a takze np. brak koniecznosci oplacania skladek na ZUS.</p>",
  },
  {
    question: "Czym sa akademickie inkubatory przedsiebiorczosci (AIP)?",
    answer: "<p>Akademickie inkubatory przedsiebiorczosci (w skrocie AIP) to najczesciej jednostki powolywane do istnienia przez uczelnie wyzsze. Maja na celu wspieranie dzialalnosci gospodarczej pracownikow uczelni, studentow czy doktorantow. W praktyce takie wsparcie oznacza brak koniecznosci rejestracji wlasnej firmy w jakiejkolwiek formie, dzieki tzw. uzyczeniu osobowosci prawnej podmiotu swiadczacego usluge inkubatora.</p>",
  },
  {
    question: "Czym sa akceleratory biznesu?",
    answer: "<p>Akceleratory biznesu to miejsca, podmioty, programy wspierajace firmy we wczesnej fazie ich istnienia na rynku. Ich zadaniem jest nadanie kierunku i odpowiedniego tempa rozwoju mlodej firmy. W odruznieniu od inkubatorow, akceleratory wymagaja dzialajacej juz firmy i udzielaja wsparcia przede wszystkim mentoringowego, w postaci kontaktow biznesowych i wsparcia doradczego w kierunku pozyskania finansowania dalszego rozwoju.</p>",
  },
  {
    question: "Co to jest startup?",
    answer: "<p>Start-up, czy tez startup, to zwykle nowo powstala firma, mloda organizacja, ktora znajduje sie na etapie wypracowywania modelu biznesowego majacego zapewnic jej osiagniecie zysku. Najczestszymi cechami startupow sa: krotki dotychczasowy okres ich istnienia, innowacyjnosc pomyslu, jego skalowalnosc, czy nieprzecienty spodziewany zysk z jednoczesnym wyzszym ryzykiem w przypadku niepowodzenia.</p>",
  },
  {
    question: "Czy kazda firma to startup?",
    answer: "<p>Startup to zwykle mloda firma, ktora nie posiada jeszcze w pelni opracowanego modelu biznesowego i dopiero poszukuje najskuteczniejszego sposobu wejscia na rynek, zwykle z nowym, innowacyjnym pomyslem, produktem. Z uwagi na fakt, ze nie mozna jego przyszlego dzialania odwzorowac na zadnym innym przykladzie, niesie ze soba wieksze ryzyko niepowodzenia, zas w przypadku powodzenia - rowniez spodziewany zysk zwykle jest duzo wyzszy.</p>",
  },
  {
    question: "Czym sie rozni startup od firmy?",
    answer: "<p>Start-up to zwykle mlody podmiot, najczesciej z krotka historia istnienia na rynku, poszukujacy odpowiedniej drogi rozwoju i optymalizacji modelu biznesowego. W praktyce oznacza to badanie, okreslanie najlepszego sposobu wprowadzenia produktu lub uslugi na rynek, z jednoczesnym stalym jego ulepszaniem. Gdy opracowany model biznesowy prowadzi do osiagniecia zysku i zapewnia rentownosc na stalym poziomie, przestaje byc okreslany mianem start-upu i staje sie firma.</p>",
  },
  {
    question: "Jak pozyskac pieniadze na startup?",
    answer: "<p>Dobry pomysl na biznes to tylko czesc drogi do sukcesu start-upu. Konieczne jest jeszcze jego sfinansowanie i najczestszym zrodlem sa srodki wlasne. Ich udzial wg raportu Polskie Startupy 2022 opracowanego przez Fundacje Startup Poland, to az 68% przypadkow. Istnieje jednak wiele zewnetrznych zrodel finansowania, wsrod ktorych wymienic nalezy przede wszystkim krajowe fundusze Venture Capital, aniolow biznesu, fundusze NCBiR, wsparcie PARP, krajowe akceleratory biznesu, czy srodki PFR.</p>",
  },
];

export default function HomePage() {
  return (
    <>
      <Header transparent />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section text-white">
          <div className="hero-bg" style={{ backgroundImage: "url('/img/fdk_poster.jpg')" }} />

          <div className="container mx-auto px-5 relative z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-8 max-w-3xl">
              Najlepiej oceniany inkubator przedsiebiorczosci w&nbsp;Polsce
            </h1>

            {/* Benefits list */}
            <div className="space-y-3 mb-8">
              {[
                "Wlasna firma w 15 minut",
                "100% wspolpraca zdalna",
                "Zero ryzyka prowadzenia firmy",
                "Niskie koszty prowadzenia firmy",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <p className="text-base md:text-lg max-w-2xl mb-8 opacity-90">
              Chcesz rozpoczac swoja dzialalnosc? Sprawdz, ile mozesz z nami zaoszczedzic.
              Skontaktuj sie z nami i zacznij juz dzis.
            </p>

            <a href="#kontakt" className="btn-fdk text-lg px-10 py-4">
              Skontaktuj sie z nami
            </a>
          </div>

          {/* Animated chevron */}
          <div className="absolute bottom-0 left-1/2 bounce-chevron pb-6 md:pb-10">
            <svg width="40" height="40" viewBox="0 0 66 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M64.3377 2L33.1688 21.4805L2 2" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M64.3377 22.2598L33.1688 41.7403L2 22.2598" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        </section>

        {/* Section: Intro */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-5">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl mb-6">
                Inkubator przedsiebiorczosci - Jak Ci mozemy pomoc?
              </h2>
              <p className="text-bigger text-justify mb-10">
                Jestesmy najlepiej ocenianym inkubatorem przedsiebiorczosci w Polsce.
                Mozesz spelnic marzenie o wlasnej firmie i zalozyc ja juz w ciagu 15 minut.
                Gwarantujemy rowniez niskie koszty prowadzenia dzialalnosci.
                Dowiedz sie, jak dziala Firma Dla Kazdego i jakie daje korzysci.
                Naszym celem jest wspieranie przedsiebiorczosci zarowno wsrod Polakow, jak i obcokrajowcow.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Jak Dzialamy - Process Steps */}
        <section className="pb-12 md:pb-20">
          <div className="container mx-auto px-5">
            <h2 className="text-2xl md:text-3xl text-center mb-4">Jak dzialamy?</h2>
            <p className="text-center text-[var(--body-color)] mb-12 max-w-2xl mx-auto">
              Wspolpraca z nami jest prosta i przejrzysta. Caly proces mozna zamknac w 4 krokach.
            </p>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                {[
                  {
                    num: "01",
                    title: "Kontakt i konsultacja",
                    desc: "Skontaktuj sie z nami. Omowimy Twoj pomysl na biznes i dopasujemy najlepsze rozwiazanie.",
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    ),
                  },
                  {
                    num: "02",
                    title: "Podpisanie umowy",
                    desc: "Podpisujemy umowe wspolpracy. Otrzymujesz NIP, REGON i mozliwosc wystawiania faktur.",
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    ),
                  },
                  {
                    num: "03",
                    title: "Rozpoczecie dzialalnosci",
                    desc: "Zaczynasz dzialac legalnie. Wystawiasz faktury, obsluguesz klientow, rozwijasz biznes.",
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    ),
                  },
                  {
                    num: "04",
                    title: "Biezace wsparcie",
                    desc: "Zapewniamy ksiegowosc, doradztwo prawne i biznesowe przez caly okres wspolpracy.",
                    icon: (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    ),
                  },
                ].map((step, index) => (
                  <div key={step.num} className="relative text-center px-4 py-8 group">
                    {/* Connector line */}
                    {index < 3 && (
                      <div className="hidden md:block absolute top-[72px] right-0 w-1/2 h-0.5 bg-gradient-to-r from-[var(--accent)]/40 to-[var(--accent)]/40 z-0" />
                    )}
                    {index > 0 && (
                      <div className="hidden md:block absolute top-[72px] left-0 w-1/2 h-0.5 bg-gradient-to-r from-[var(--accent)]/40 to-[var(--accent)]/40 z-0" />
                    )}
                    {/* Number */}
                    <div className="text-5xl font-bold text-[var(--accent)]/15 mb-2">{step.num}</div>
                    {/* Icon circle */}
                    <div className="w-16 h-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-[var(--body-color)] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link href="/jak-dzialamy" className="btn-fdk text-lg px-10 py-4">
                  Dowiedz sie wiecej
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Co jeszcze - Icon Cards */}
        <section className="py-12 md:py-20 bg-[var(--bg-light)]">
          <div className="container mx-auto px-5">
            <h2 className="text-2xl md:text-3xl text-center mb-10">
              Co jeszcze mozemy Ci zaoferowac jako inkubator przedsiebiorczosci?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Uzyczenie osobowosci prawnej",
                  icon: (
                    <svg className="w-16 h-16 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                },
                {
                  title: "Zalozenie konta bankowego",
                  icon: (
                    <svg className="w-16 h-16 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  ),
                },
                {
                  title: "Dostep do wiedzy i doswiadczenia",
                  icon: (
                    <svg className="w-16 h-16 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="icon-card py-10">
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Korzysci */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-5">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center mb-6">
                Jakie korzysci daje wspolpraca z inkubatorem przedsiebiorczosci Firma dla Kazdego?
              </h2>
              <div className="text-bigger text-justify">
                <p>
                  Jest ich o wiele wiecej niz tutaj wymienione. Do powyzszych mozemy jeszcze dodac
                  mozliwosc oplacania podatku PIT jedynie w wysokosci 6%. Mozesz rowniez wrzucic
                  w koszty zakupy na firme oraz ograniczyc wydatki stale zwiazane z prowadzeniem
                  dzialalnosci. Jezeli chcesz poczuc, jak to jest zostac wlasnym szefem, ale
                  jednoczesnie potrzebujesz wsparcia na samym poczatku, to zglos sie do Firmy Dla
                  Kazdego. Pomozemy Ci rozwinac skrzydla!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Opinie Section */}
        <section id="opinie" className="py-12 md:py-20">
          <div className="container mx-auto px-5">
            <h2 className="text-2xl md:text-3xl text-center mb-10">
              Opinie naszych klientow
            </h2>
            <div>
              <script src="https://elfsightcdn.com/platform.js" async></script>
              <div className="elfsight-app-604a7529-e26f-40f6-b3e0-0fff024a9959" data-elfsight-app-lazy></div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 md:py-20 bg-[var(--bg-light)]">
          <div className="container mx-auto px-5">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center mb-10">
                FAQ - najczesciej zadawane pytania
              </h2>
              <FAQ items={faqItems} />
            </div>
          </div>
        </section>

        {/* Contact anchor */}
        <section id="kontakt" className="py-12 md:py-20">
          <div className="container mx-auto px-5 text-center">
            <h2 className="text-2xl md:text-3xl mb-6">Skontaktuj sie z nami</h2>
            <p className="text-bigger mb-4">
              <a href="tel:+48575594500" className="text-[var(--accent)] hover:underline font-semibold text-xl">+48 575 594 500</a>
            </p>
            <p className="text-bigger mb-8">
              <a href="mailto:kontakt@firmadlakazdego.pl" className="text-[var(--accent)] hover:underline">kontakt@firmadlakazdego.pl</a>
            </p>
            <Link href="/kontakt" className="btn-fdk text-lg px-10 py-4">
              Formularz kontaktowy
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
