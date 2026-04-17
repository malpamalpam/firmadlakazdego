import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dofinansowania - Firma Dla Kazdego",
  description: "Pomoc w uzyskaniu dofinansowania i dotacji dla firm. Programy unijne i krajowe.",
};

export default function FundingPage() {
  return (
    <PageLayout title="Dofinansowania" bgImage="/img/bg-headline-funding.png">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mt-4 mb-6">
              Dofinansowania i dotacje
            </h2>
            <div className="text-justify text-bigger mb-8">
              <p className="mb-4">
                Pomagamy przedsiebiorcom w uzyskaniu dofinansowania na rozpoczecie
                lub rozwoj dzialalnosci gospodarczej. Wspolpracujemy zarowno z programami
                unijnymi, jak i krajowymi zrodlami finansowania.
              </p>
              <p>
                Nasz zespol pomoze Ci zidentyfikowac dostepne zrodla dofinansowania,
                przygotowac kompletna dokumentacje wnioskowa i przeprowadzi Ciebie
                przez caly proces aplikacyjny.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card-shadow p-6 text-center">
                <div className="text-primary text-4xl font-bold mb-3">01</div>
                <h4 className="font-medium mb-2">Analiza potrzeb</h4>
                <p className="text-body text-sm">Identyfikacja odpowiednich programow dofinansowania</p>
              </div>
              <div className="card-shadow p-6 text-center">
                <div className="text-primary text-4xl font-bold mb-3">02</div>
                <h4 className="font-medium mb-2">Przygotowanie wniosku</h4>
                <p className="text-body text-sm">Kompletna dokumentacja wnioskowa i biznesplan</p>
              </div>
              <div className="card-shadow p-6 text-center">
                <div className="text-primary text-4xl font-bold mb-3">03</div>
                <h4 className="font-medium mb-2">Rozliczenie dotacji</h4>
                <p className="text-body text-sm">Pomoc w prawidlowym rozliczeniu uzyskanych srodkow</p>
              </div>
            </div>

            <div className="text-center border-t border-gray pt-8">
              <h4 className="uppercase font-medium mb-4">Zainteresowany?</h4>
              <Link href="/konsultacje" className="btn-primary text-white px-8 py-3">
                Umow sie na konsultacje
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
