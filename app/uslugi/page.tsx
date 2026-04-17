import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uslugi - Firma Dla Kazdego",
  description: "Nasze uslugi: wynajem adresu, biznesplan, obsluga ksiegowa i wiele innych.",
};

const services = [
  {
    title: "Wynajem adresu",
    description: "Oferujemy wynajem prestizowego adresu w centrum Warszawy do rejestracji firmy. W ramach uslugi zapewniamy obsluge korespondencji firmowej.",
    link: "/uslugi/wynajem-adresu",
  },
  {
    title: "Przygotowanie biznesplanu",
    description: "Profesjonalne przygotowanie biznesplanu na potrzeby bankow, inwestorow i instytucji dotacyjnych. Zawiera analiza rynku i prognoze finansowa.",
    link: "/uslugi/biznesplan",
  },
  {
    title: "Obsluga affiliacyjna",
    description: "Wsparcie w programach partnerskich i afiliacyjnych. Pomagamy w budowaniu sieci partnerskiej i optymalizacji wspolpracy.",
    link: "/uslugi/inne-uslugi",
  },
  {
    title: "Inne uslugi",
    description: "Szeroki zakres dodatkowych uslug: obsluga ksiegowa, doradztwo podatkowe, pomoc w uzyskaniu koncesji, zezwolen i licencji.",
    link: "/uslugi/inne-uslugi",
  },
];

export default function ServicesPage() {
  return (
    <PageLayout title="Uslugi">
      {/* Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mt-4 mb-6">
              Nasze uslugi dla biznesu
            </h2>
            <div className="text-justify text-bigger mb-8">
              <p>
                Oferujemy kompleksowe uslugi wspierajace prowadzenie dzialalnosci gospodarczej
                w Polsce. Niezaleznie od tego, czy dopiero zaczynasz, czy juz prowadzisz firme -
                mamy dla Ciebie odpowiednie rozwiazanie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="pb-8 md:pb-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              {services.map((service, index) => (
                <div key={index} className="card-shadow text-center p-6 flex flex-col">
                  <h4 className="text-lg font-semibold mb-3">{service.title}</h4>
                  <div className="text-body text-justify flex-1 mb-4">{service.description}</div>
                  <div>
                    <Link href={service.link} className="btn-secondary px-6 py-2 text-sm">
                      SPRAWDZ
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-8 md:pb-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center border-t border-gray py-12">
            <h3 className="text-xl font-light uppercase mb-4">MASZ PYTANIA?</h3>
            <div className="text-lg font-semibold mb-6">
              Chetnie odpowiemy<br />i doradzimy.
            </div>
            <Link href="/kontakt" className="btn-secondary text-lg px-10 py-3">
              SPRAWDZ
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
