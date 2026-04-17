import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wynajem adresu - Firma Dla Kazdego",
  description: "Wynajem prestizowego adresu do rejestracji firmy w Warszawie.",
};

export default function RentPage() {
  return (
    <PageLayout title="Wynajem adresu">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mt-4 mb-6">
              Wynajem adresu do rejestracji firmy
            </h2>
            <div className="text-justify text-bigger mb-8">
              <p className="mb-4">
                Oferujemy wynajem prestizowego adresu w centrum Warszawy do rejestracji
                Twojej firmy. Jest to idealne rozwiazanie dla osob, ktore nie potrzebuja
                fizycznego biura, ale chca miec profesjonalny adres firmy.
              </p>
              <p>
                W ramach uslugi zapewniamy obsluge korespondencji firmowej, skanowanie
                i przesylanie pism oraz powiadomienia o nowej korespondencji.
              </p>
            </div>

            <div className="card-shadow p-8 mb-8">
              <h3 className="font-medium text-lg mb-4">W cenie uslugi:</h3>
              <ul className="space-y-3">
                {[
                  "Adres do rejestracji firmy w KRS/CEIDG",
                  "Obsluga korespondencji firmowej",
                  "Skanowanie i przekazywanie dokumentow",
                  "Powiadomienia o nowej korespondencji",
                  "Mozliwosc korzystania z sali konferencyjnej",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <Link href="/kontakt" className="btn-secondary px-10 py-3 text-lg">
                Zapytaj o szczegoly
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
