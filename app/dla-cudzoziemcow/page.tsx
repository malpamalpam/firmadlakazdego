import PageLayout from "@/components/PageLayout";
import CooperationSteps from "@/components/CooperationSteps";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dla cudzoziemcow - Firma Dla Kazdego",
  description: "Kompleksowa obsluga cudzoziemcow w Polsce: zakladanie firm, karta pobytu, PESEL, rejestracja dzialalnosci.",
};

const services = [
  {
    icon: "01",
    title: "Zakladanie firmy",
    description: "Pomoc w wyborze formy prawnej i kompletna rejestracja dzialalnosci gospodarczej.",
    link: "/kontakt",
  },
  {
    icon: "02",
    title: "Karta pobytu",
    description: "Wsparcie w procedurze uzyskania karty pobytu czasowego i stalego.",
    link: "/kontakt",
  },
  {
    icon: "03",
    title: "Numer PESEL",
    description: "Pomoc w uzyskaniu numeru PESEL, niezbednego do prowadzenia firmy w Polsce.",
    link: "/kontakt",
  },
  {
    icon: "04",
    title: "Obsluga prawna",
    description: "Kompleksowa obsluga prawna w jezyku polskim, angielskim, rosyjskim i ukrainskim.",
    link: "/kontakt",
  },
  {
    icon: "05",
    title: "Ksiegowosc",
    description: "Pelna obsluga ksiegowa firmy, rozliczenia podatkowe, ZUS i inne obowiazki.",
    link: "/kontakt",
  },
  {
    icon: "06",
    title: "Zezwolenie na prace",
    description: "Pomoc w uzyskaniu zezwolenia na prace typu A, B, C oraz oswiadczen.",
    link: "/kontakt",
  },
  {
    icon: "07",
    title: "Tlumaczenia",
    description: "Profesjonalne tlumaczenia przysiegle dokumentow na jezyk polski i z polskiego.",
    link: "/kontakt",
  },
];

export default function ForeignersPage() {
  return (
    <PageLayout title="Dla cudzoziemcow" bgImage="/img/bg-headline-foreigners.png">
      {/* Intro */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <div className="text-justify text-bigger mb-6">
              <p>
                Specjalizujemy sie w kompleksowej obsludze cudzoziemcow, ktorzy chca rozpoczac
                lub prowadzic dzialalnosc gospodarcza w Polsce. Swiadczymy uslugi w jezyku polskim,
                angielskim, rosyjskim i ukrainskim. Nasz doswiadczony zespol przeprowadzi Ciebie
                przez caly proces - od uzyskania wymaganych dokumentow po rejestracj firmy.
              </p>
            </div>
            <div className="hr-arrow mt-6 mb-8">
              <svg width="56" height="26" viewBox="0 0 56 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999998 0.999999L28 24L55 1" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <h2 className="text-center text-xl md:text-3xl mb-8">
            Nasze uslugi dla cudzoziemcow
          </h2>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
            {services.map((service, index) => (
              <div key={index} className="card-shadow text-center p-6 flex flex-col">
                <div className="text-primary text-3xl font-bold mb-2">{service.icon}</div>
                <div className="text-bigger font-medium mb-4 flex-1">{service.title}</div>
                <p className="text-body text-sm mb-4">{service.description}</p>
                <Link href={service.link} className="btn-secondary px-4 py-2 text-sm w-full text-center">
                  DOWIEDZ SIE WIECEJ
                </Link>
              </div>
            ))}
          </div>

          <div className="my-8 text-center">
            <h4 className="uppercase font-medium mb-4">Jestes zainteresowany?</h4>
            <Link href="/konsultacje" className="btn-primary text-white px-6 py-3">
              Kliknij TUTAJ i umow sie na spotkanie
            </Link>
          </div>
        </div>
      </section>

      <CooperationSteps />
    </PageLayout>
  );
}
