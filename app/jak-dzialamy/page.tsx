import PageLayout from "@/components/PageLayout";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jak dzialamy - Firma Dla Kazdego",
  description: "Dowiedz sie, jak wyglada wspolpraca z inkubatorem przedsiebiorczosci Firma Dla Kazdego. Proces krok po kroku.",
};

const processFaqItems = [
  {
    question: "Ile trwa podpisanie umowy?",
    answer: "<p>Caly proces podpisania umowy trwa zazwyczaj od 1 do 3 dni roboczych. Po przeslaniu wymaganych dokumentow i ich weryfikacji przez nasz zespol, umowa jest gotowa do podpisu. Mozliwe jest podpisanie umowy elektronicznie (podpis kwalifikowany lub zaufany) lub osobiscie w naszym biurze w Warszawie.</p>",
  },
  {
    question: "Czy potrzebuje wlasnej firmy?",
    answer: "<p>Nie! To wlasnie jest glowna zaleta inkubatora przedsiebiorczosci. Nie musisz zakladac wlasnej dzialalnosci gospodarczej. Dzialasz w ramach osobowosci prawnej Fundacji Firma Dla Kazdego, co oznacza brak koniecznosci rejestracji w CEIDG czy KRS. Otrzymujesz NIP i REGON Fundacji do wystawiania faktur.</p>",
  },
  {
    question: "Jakie dokumenty sa potrzebne?",
    answer: "<p>Do rozpoczecia wspolpracy potrzebujemy: dowodu osobistego lub paszportu (w przypadku cudzoziemcow rowniez karty pobytu), numeru PESEL (lub jego odpowiednika), danych kontaktowych (adres, telefon, e-mail) oraz krotkiego opisu planowanej dzialalnosci. Wszystkie dokumenty mozna przeslac elektronicznie.</p>",
  },
  {
    question: "Jak szybko moge zaczac wystawiac faktury?",
    answer: "<p>Po podpisaniu umowy wspolpracy i otwarciu subkonta bankowego mozesz zaczac wystawiac faktury natychmiast. Caly proces od pierwszego kontaktu do wystawienia pierwszej faktury trwa zazwyczaj od 1 do 5 dni roboczych, w zaleznosci od szybkosci dostarczenia dokumentow.</p>",
  },
  {
    question: "Ile kosztuje wspolpraca z inkubatorem?",
    answer: "<p>Podstawowa oplata administracyjna wynosi 400 PLN netto miesiecznie. W ramach tej kwoty otrzymujesz pelna obsluge ksiegowa, kadrowa, doradztwo prawne (do 5 godzin w ciagu 12 miesiecy) oraz dostep do wszystkich uslug inkubatora. Jesli Fundacja zarobi minimum 400 PLN netto z Twojej dzialalnosci, oplata jest pokryta. Szczegolowy cennik znajdziesz w regulaminie.</p>",
  },
  {
    question: "Czy moge prowadzic dzialalnosc zdalnie?",
    answer: "<p>Tak, 100% wspolpracy moze odbywac sie zdalnie. Umowe mozna podpisac elektronicznie, dokumenty przesylac mailem, a kontakt z naszym zespolem odbywa sie telefonicznie lub mailowo. Nie musisz odwiedzac naszego biura, chociaz jest to mozliwe.</p>",
  },
];

const steps = [
  {
    num: "01",
    title: "Kontakt i konsultacja",
    shortDesc: "Skontaktuj sie z nami telefonicznie, mailowo lub przez formularz kontaktowy.",
    fullDesc: [
      "Pierwszy krok to nawiazanie kontaktu z naszym zespolem. Mozesz do nas zadzwonic, napisac maila lub skorzystac z formularza kontaktowego na stronie. Nasi konsultanci sa dostepni w jezyku polskim, angielskim, ukrainskim i rosyjskim.",
      "Podczas bezplatnej konsultacji omowimy Twoj pomysl na biznes, odpowiemy na wszystkie pytania dotyczace inkubatora i przedstawimy najlepsze rozwiazanie dopasowane do Twoich potrzeb. Doradzimy takze w kwestii formy wspolpracy i optymalnych rozwiazan podatkowych.",
      "Konsultacja jest calkowicie bezplatna i niezobowiazujaca. Mozesz tez umowic sie na spotkanie online lub osobiscie w naszym biurze w Warszawie.",
    ],
  },
  {
    num: "02",
    title: "Podpisanie umowy",
    shortDesc: "Podpisujemy umowe wspolpracy. Otrzymujesz NIP, REGON i mozliwosc wystawiania faktur.",
    fullDesc: [
      "Po podjęciu decyzji o wspolpracy przygotowujemy umowe wspolpracy. Dokument jest jasny i przejrzysty — okreslamy w nim zakres uslug, prawa i obowiazki obu stron, a takze zasady rozliczen.",
      "Umowe mozna podpisac elektronicznie (podpisem kwalifikowanym lub zaufanym przez ePUAP) lub osobiscie w naszym biurze. Caly proces zajmuje od 1 do 3 dni roboczych.",
      "Po podpisaniu umowy otrzymujesz dostep do NIP i REGON Fundacji, co pozwala Ci legalnie wystawiac faktury i nawiazywac relacje B2B. Otwieramy rowniez indywidualne subkonto bankowe do obslugi Twojej dzialalnosci.",
    ],
  },
  {
    num: "03",
    title: "Rozpoczecie dzialalnosci",
    shortDesc: "Zaczynasz dzialac legalnie. Wystawiasz faktury, obsluguesz klientow, rozwijasz biznes.",
    fullDesc: [
      "Od momentu podpisania umowy mozesz w pelni legalnie prowadzic swoja dzialalnosc. Wystawiasz faktury korzystajac z danych Fundacji, przyjmujesz platnosci na indywidualne subkonto bankowe i budujesz relacje z klientami.",
      "Nasz zespol przejmuje na siebie obsluge ksiegowa — nie musisz martwic sie o rozliczenia podatkowe, deklaracje VAT, PIT czy sprawozdawczosc. Wszystko jest obslugiwane przez naszych specjalistow.",
      "Mozesz skoncentrowac sie wylacznie na tym, co najwazniejsze — rozwoju swojego biznesu, pozyskiwaniu klientow i doskonaleniu oferty. My zajmiemy sie cala reszta.",
    ],
  },
  {
    num: "04",
    title: "Biezace wsparcie",
    shortDesc: "Zapewniamy ksiegowosc, doradztwo prawne i biznesowe przez caly okres wspolpracy.",
    fullDesc: [
      "Przez caly okres wspolpracy masz dostep do kompleksowego wsparcia naszego zespolu. Obsluga ksiegowa i kadrowa jest wliczona w abonament, a doradztwo prawne dostepne jest w wymiarze do 5 godzin w ciagu 12 miesiecy.",
      "Nasi specjalisci pomagaja w kwestiach podatkowych, kadrowych i prawnych. Mozesz liczyc na pomoc w optymalizacji kosztow, wyborze najkorzystniejszych form rozliczen oraz w rozwiazywaniu biezacych problemow.",
      "Dodatkowo oferujemy dostep do powierzchni biurowej w Warszawie (do 5 godzin miesiecznie), prawo do uzywania znaku towarowego Fundacji oraz mozliwosc korzystania z uslug dodatkowych, takich jak wirtualne biuro czy pomoc w pozyskiwaniu dotacji.",
    ],
  },
];

export default function HowWeWorkPage() {
  return (
    <PageLayout title="Jak dzialamy">
      {/* Process steps - detailed */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-bigger text-[var(--body-color)] mb-12">
              Wspolpraca z inkubatorem przedsiebiorczosci Firma Dla Kazdego jest prosta
              i przejrzysta. Poznaj proces krok po kroku — od pierwszego kontaktu do pelnego
              wsparcia w prowadzeniu dzialalnosci.
            </p>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={step.num} className="relative">
                  {/* Step header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-[var(--accent)] text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                        {step.num}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">{step.title}</h2>
                      <p className="text-lg text-[var(--accent)] font-medium">{step.shortDesc}</p>
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="ml-0 md:ml-[104px] space-y-4 text-[var(--body-color)] text-bigger">
                    {step.fullDesc.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block ml-10 mt-8 w-0.5 h-8 bg-[var(--accent)]/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ about the process */}
      <section className="py-12 md:py-20 bg-[var(--bg-light)]">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-10">
              Najczesciej zadawane pytania o wspolprace
            </h2>
            <FAQ items={processFaqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-3xl mb-6">Gotowy, zeby zaczac?</h2>
          <p className="text-bigger text-[var(--body-color)] mb-8 max-w-2xl mx-auto">
            Skontaktuj sie z nami i rozpocznij swoja dzialalnosc juz dzis.
            Pierwsza konsultacja jest bezplatna i niezobowiazujaca.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+48575594500" className="btn-fdk text-lg px-10 py-4">
              Zadzwon: +48 575 594 500
            </a>
            <Link href="/kontakt" className="btn-accent text-lg px-10 py-4">
              Formularz kontaktowy
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
