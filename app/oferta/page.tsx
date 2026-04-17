import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oferta - Firma Dla Kazdego",
  description: "Poznaj nasza oferte: zakladanie firm, obsluga cudzoziemcow, dofinansowania, uslugi dla biznesu.",
};

const offers = [
  {
    title: "Zakladanie firm",
    description: "Pomagamy w zalozeniu jednoosobowej dzialalnosci gospodarczej, spolki z o.o., spolki cywilnej i innych form prawnych. Pelna obsluga od rejestracji po pierwsze kroki w biznesie.",
    link: "/dla-firm",
  },
  {
    title: "Obsluga cudzoziemcow",
    description: "Kompleksowa pomoc dla cudzoziemcow chcacych zalozyc lub prowadzic firme w Polsce. Pomoc w uzyskaniu karty pobytu, numeru PESEL, rejestracji firmy.",
    link: "/dla-cudzoziemcow",
  },
  {
    title: "Dofinansowania i dotacje",
    description: "Pomagamy w identyfikacji dostepnych zrodel dofinansowania, przygotowaniu wnioskow i dokumentacji. Programy unijne i krajowe.",
    link: "/dofinansowania",
  },
  {
    title: "Wynajem adresu",
    description: "Oferujemy wynajem adresu do rejestracji firmy w Warszawie. Obsluga korespondencji, prestizowy adres dla Twojej firmy.",
    link: "/uslugi/wynajem-adresu",
  },
  {
    title: "Biznesplan",
    description: "Profesjonalne przygotowanie biznesplanu na potrzeby bankow, inwestorow i instytucji dotacyjnych. Analiza rynku i prognoza finansowa.",
    link: "/uslugi/biznesplan",
  },
  {
    title: "Inne uslugi",
    description: "Obsluga ksiegowa, doradztwo podatkowe, pomoc w uzyskaniu koncesji i zezwolen. Szeroki zakres uslug dla biznesu.",
    link: "/uslugi/inne-uslugi",
  },
];

export default function OfferPage() {
  return (
    <PageLayout title="Oferta" bgImage="/img/bg-headline-offer.png">
      {/* Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl mt-4 mb-6">
              Co mozemy dla Ciebie zrobic?
            </h2>
            <div className="text-justify text-bigger mb-8">
              <p>
                Oferujemy szeroki zakres uslug zwiazanych z zakladaniem i prowadzeniem firm w Polsce.
                Nasze uslugi sa skierowane zarowno do polskich przedsiebiorcow, jak i do cudzoziemcow
                chcacych rozpoczac dzialalnosc gospodarcza w naszym kraju.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer cards */}
      <section className="pb-8 md:pb-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              {offers.map((offer, index) => (
                <div key={index} className="card-shadow text-center p-6 flex flex-col">
                  <h3 className="text-lg font-semibold mb-3">{offer.title}</h3>
                  <div className="text-body text-justify flex-1 mb-4">{offer.description}</div>
                  <div>
                    <Link href={offer.link} className="btn-secondary px-6 py-2 text-sm">
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
