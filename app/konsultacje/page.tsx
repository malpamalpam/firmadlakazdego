import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konsultacje - Firma Dla Kazdego",
  description: "Umow sie na konsultacje z naszymi specjalistami. Stacjonarnie i online.",
};

export default function ConsultationPage() {
  return (
    <PageLayout title="Konsultacje">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl mt-4 mb-6">
              Umow sie na konsultacje
            </h2>
            <p className="text-bigger text-body mb-8">
              Oferujemy konsultacje zarowno stacjonarnie w naszym biurze w Warszawie,
              jak i online za pomoca wideokonferencji. Wybierz najwygodniejsza forme kontaktu.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="card-shadow p-8">
                <div className="text-primary text-4xl mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Telefonicznie</h3>
                <p className="text-body mb-4">Zadzwon do nas bezposrednio</p>
                <a href="tel:+48222662550" className="btn-primary text-white px-6 py-2 text-sm">
                  +48 222 662 550
                </a>
              </div>

              <div className="card-shadow p-8">
                <div className="text-primary text-4xl mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">E-mail</h3>
                <p className="text-body mb-4">Napisz do nas wiadomosc</p>
                <a href="mailto:kontakt@firmadlakazdego.pl" className="btn-secondary px-6 py-2 text-sm">
                  Wyslij e-mail
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="font-medium text-lg mb-2">Spotkanie w biurze</h3>
              <p className="text-body mb-4">
                ul. Lwowska 17/4, 00-660 Warszawa<br />
                Poniedzialek - Piatek: 9:00 - 17:00
              </p>
              <p className="text-sm text-muted">
                Prosimy o wczesniejsze umowienie terminu spotkania.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
