import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas - Firma Dla Kazdego",
  description: "Poznaj zespol Firma Dla Kazdego. Doswiadczeni specjalisci od zakladania i prowadzenia firm.",
};

const team = [
  { name: "Anna Kowalska", title: "Dyrektor Zarzadzajacy", photo: "/img/team-placeholder.svg" },
  { name: "Piotr Nowak", title: "Prawnik", photo: "/img/team-placeholder.svg" },
  { name: "Olena Shevchenko", title: "Specjalista ds. cudzoziemcow", photo: "/img/team-placeholder.svg" },
];

export default function AboutPage() {
  return (
    <PageLayout title="O nas" bgImage="/img/bg-headline-about.png">
      {/* Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mt-4 mb-6">
              Kim jestesmy?
            </h2>
            <div className="text-justify text-bigger mb-6">
              <p className="mb-4">
                <strong>Firma dla Kazdego</strong> to dynamiczny zespol specjalistow z wieloletnim
                doswiadczeniem w obszarze zakladania firm, obslugi prawnej, ksiegowosci
                i doradztwa biznesowego.
              </p>
              <p className="mb-4">
                Od lat pomagamy polskim i zagranicznym przedsiebiorcom w realizacji ich biznesowych celow.
                Nasze biuro miesci sie w Warszawie, ale obslugujemy klientow z calej Polski i zagranicy.
              </p>
              <p>
                Specjalizujemy sie w kompleksowej obsludze cudzoziemcow, ktorzy chca rozpoczac
                lub prowadzic dzialalnosc gospodarcza w Polsce. Pomagamy rowniez w uzyskaniu
                dofinansowania i dotacji.
              </p>
            </div>

            <div className="hr-arrow mt-6 mb-8">
              <svg width="56" height="26" viewBox="0 0 56 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999998 0.999999L28 24L55 1" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pb-8 md:pb-16">
        <div className="container mx-auto px-5">
          <h2 className="text-center text-xl md:text-3xl mb-8 md:mb-12">Nasz zespol</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="card-shadow overflow-hidden text-center">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-64 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="p-4 bg-white/90">
                  <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                  <h4 className="text-base font-light text-body">{member.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
