import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biznesplan - Firma Dla Kazdego",
  description: "Profesjonalne przygotowanie biznesplanu dla bankow, inwestorow i instytucji dotacyjnych.",
};

export default function BusinessPlanPage() {
  return (
    <PageLayout title="Biznesplan">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mt-4 mb-6">
              Profesjonalny biznesplan
            </h2>
            <div className="text-justify text-bigger mb-8">
              <p className="mb-4">
                Przygotowujemy profesjonalne biznesplany na potrzeby bankow, inwestorow
                i instytucji dotacyjnych. Kazdy biznesplan jest opracowywany indywidualnie
                z uwzglednieniem specyfiki branzy i celow klienta.
              </p>
              <p>
                Biznesplan zawiera analiz rynku, strategie marketingowa, prognoz finansowa
                oraz opis modelu biznesowego. Pomagamy rowniez w prezentacji biznesplanu
                przed inwestorami.
              </p>
            </div>

            <div className="text-center">
              <Link href="/kontakt" className="btn-secondary px-10 py-3 text-lg">
                Zamow biznesplan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
