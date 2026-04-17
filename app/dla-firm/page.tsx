import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dla firm - Firma Dla Kazdego",
  description: "Zakladanie i prowadzenie firm w Polsce. Kompleksowa obsluga od rejestracji po biezace wsparcie.",
};

const checkboxItems = [
  "Rejestracja jednoosobowej dzialalnosci gospodarczej (JDG)",
  "Zakladanie spolki z ograniczona odpowiedzialnoscia (sp. z o.o.)",
  "Rejestracja spolki cywilnej i jawnej",
  "Obsluga ksiegowa i kadrowa",
  "Doradztwo podatkowe i optymalizacja",
];

export default function CompaniesPage() {
  return (
    <PageLayout title="Dla firm" bgImage="/img/bg-headline-companies.png">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {/* Left - text */}
              <div>
                <h2 className="text-2xl md:text-3xl mb-6">
                  Zakladanie i prowadzenie firm
                </h2>
                <div className="text-bigger mb-8 text-justify">
                  <p className="mb-4">
                    Pomagamy w zalozeniu kazdej formy dzialalnosci gospodarczej w Polsce.
                    Nasz zespol zajmie sie wszelkimi formalnosciami, abys mogl skupic sie
                    na rozwoju swojego biznesu.
                  </p>
                  <p>
                    Od wyboru optymalnej formy prawnej, przez kompletna rejestracje,
                    az po biezaca obsluge ksiegowa i prawna - zapewniamy kompleksowe wsparcie
                    na kazdym etapie.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/kontakt" className="btn-secondary px-6 py-3 text-center">
                    Skontaktuj sie z nami
                  </Link>
                  <Link href="/oferta" className="text-primary hover:underline flex items-center justify-center py-3">
                    Pelna oferta &rarr;
                  </Link>
                </div>
              </div>

              {/* Right - checkboxes */}
              <div className="space-y-4 pt-2">
                {checkboxItems.map((item, index) => (
                  <div key={index} className="card-shadow rounded-full py-4 px-6">
                    <div className="flex items-center gap-4">
                      <svg width="42" height="36" viewBox="0 0 52 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                        <path d="M43.465 22.2188C43.465 26.9684 41.9037 31.3581 39.2642 34.8974C38.5225 35.892 37.6956 36.8194 36.7944 37.6688C35.9208 38.4921 34.9774 39.2421 33.9738 39.9088C31.3791 41.6326 28.3824 42.8001 25.1523 43.2402" stroke="#00BBFF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.1806 42.5632C7.40519 39.9673 1 31.8409 1 22.219C1 10.509 10.509 1 22.219 1C26.246 1 30.0081 2.11877 33.2158 4.06692" stroke="#00BBFF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.94531 17.9864L21.9656 30.035L51.0006 1" stroke="#00BBFF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-smaller leading-snug">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
