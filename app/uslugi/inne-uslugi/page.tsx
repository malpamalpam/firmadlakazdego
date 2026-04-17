import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inne uslugi - Firma Dla Kazdego",
  description: "Obsluga ksiegowa, doradztwo podatkowe, koncesje i zezwolenia.",
};

export default function OtherServicesPage() {
  return (
    <PageLayout title="Inne uslugi">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mt-4 mb-6">
              Dodatkowe uslugi
            </h2>
            <div className="text-justify text-bigger mb-8">
              <p>
                Oferujemy szeroki zakres dodatkowych uslug wspierajacych prowadzenie
                dzialalnosci gospodarczej: obsluga ksiegowa, doradztwo podatkowe,
                pomoc w uzyskaniu koncesji, zezwolen i licencji, oraz wiele wiecej.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { title: "Obsluga ksiegowa", desc: "Pelna obsluga ksiegowa firmy, rozliczenia podatkowe, VAT, CIT, PIT." },
                { title: "Doradztwo podatkowe", desc: "Optymalizacja podatkowa, planowanie podatkowe, interpretacje indywidualne." },
                { title: "Koncesje i zezwolenia", desc: "Pomoc w uzyskaniu wymaganych koncesji, zezwolen i licencji." },
                { title: "Obsluga kadrowa", desc: "Zarzadzanie kadrami, umowy o prace, zlecenia, rozliczenia ZUS." },
              ].map((service, i) => (
                <div key={i} className="card-shadow p-6">
                  <h3 className="font-medium text-lg mb-2">{service.title}</h3>
                  <p className="text-body text-sm">{service.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/kontakt" className="btn-secondary px-10 py-3 text-lg">
                Skontaktuj sie z nami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
