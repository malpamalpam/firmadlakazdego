"use client";

import PageLayout from "@/components/PageLayout";
import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageLayout title="Kontakt" bgImage="/img/bg-headline-contact.png">
      {/* Contact cards */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <h2 className="text-center text-xl md:text-3xl mt-4 mb-8 md:mb-12">
            Skontaktuj sie z nami
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {/* Phone card */}
              <div className="card-shadow p-6 md:p-10">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-3">
                  <svg width="30" height="30" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M35.5833 25.839C34.6607 24.8583 33.5478 24.3339 32.3684 24.3339C31.1985 24.3339 30.0762 24.8485 29.1155 25.8293L26.1099 28.888C25.8626 28.7521 25.6153 28.6258 25.3775 28.4996C25.0351 28.3248 24.7117 28.1597 24.4359 27.985C21.6205 26.1594 19.062 23.7804 16.608 20.7023C15.4191 19.168 14.6201 17.8766 14.0399 16.5657C14.8199 15.8374 15.5427 15.08 16.2466 14.3518C16.5129 14.0799 16.7792 13.7983 17.0455 13.5264C19.0429 11.4872 19.0429 8.84604 17.0455 6.80689L14.4489 4.15599C14.1541 3.85497 13.8497 3.54424 13.5644 3.23352C12.9937 2.63148 12.3945 2.01002 11.7762 1.42741C10.8536 0.495223 9.75029 0 8.5899 0C7.42951 0 6.30716 0.495223 5.35602 1.42741L2.10311 4.77745C0.885654 6.02036 0.191321 7.53516 0.0391381 9.29272C-0.189136 12.1281 0.628846 14.7693 1.2566 16.4977C2.79745 20.7411 5.09921 24.6738 8.53283 28.888C12.6988 33.9665 17.7113 37.9768 23.4372 40.8025C25.6248 41.8609 28.5448 43.1135 31.8073 43.3272C32.007 43.3369 32.2162 43.3466 32.4065 43.3466C34.6036 43.3466 36.4488 42.5406 37.8946 40.9384C38.4272 40.2781 38.9979 39.7247 39.5971 39.1323C40.0061 38.7342 40.4246 38.3167 40.8336 37.8797C41.7752 36.8796 42.2698 35.7143 42.2698 34.52C42.2698 33.3159 41.7657 32.1604 40.805 31.1893L35.5833 25.839Z" fill="#00BBFF"/>
                  </svg>
                  Kontakt telefoniczny
                </h3>
                <h4 className="font-medium mb-2">Dla zainteresowanych</h4>
                <div className="text-bigger mb-4 space-y-1">
                  <p><span className="text-muted">PL</span> <a href="tel:+48222662550" className="text-body hover:text-primary">+48 222 662 550</a></p>
                  <p><span className="text-muted">UA</span> <a href="tel:+380443343661" className="text-body hover:text-primary">+380 44 334 36 61</a></p>
                </div>
                <h4 className="font-medium mb-2">E-mail</h4>
                <div className="text-bigger">
                  <a href="mailto:kontakt@firmadlakazdego.pl" className="text-body hover:text-primary">
                    kontakt@firmadlakazdego.pl
                  </a>
                </div>
              </div>

              {/* Address card */}
              <div className="card-shadow p-6 md:p-10">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-3">
                  <svg width="30" height="30" viewBox="0 0 76 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M74.4677 41.3475H53.8388C56.2963 37.6725 66.629 21.8099 66.629 14.956C66.629 11.1063 65.1149 7.41426 62.4198 4.69211C59.7248 1.96996 56.0695 0.440674 52.258 0.440674C48.4466 0.440674 44.7913 1.96996 42.0962 4.69211C39.4012 7.41426 37.8871 11.1063 37.8871 14.956C37.8871 21.8099 48.2198 37.6725 50.6772 41.3475H36.5806V25.5126C36.5806 25.1057 36.352 24.5798 36.058 24.4569L25.6064 16.5395C25.3803 16.3682 25.1052 16.2756 24.8226 16.2756C24.5399 16.2756 24.2648 16.3682 24.0387 16.5395L13.5871 24.4569C13.4248 24.5798 13.2931 24.7392 13.2024 24.9225C13.1117 25.1057 13.0645 25.3077 13.0645 25.5126V41.3475H1.30645C0.959959 41.3475 0.627658 41.4865 0.382651 41.734C0.137644 41.9814 0 42.3171 0 42.6671C0 43.017 0.137644 43.3527 0.382651 43.6001C0.627658 43.8476 0.959959 43.9866 1.30645 43.9866H74.4677C74.8142 43.9866 75.1465 43.8476 75.3915 43.6001C75.6365 43.3527 75.7742 43.017 75.7742 42.6671C75.7742 42.3171 75.6365 41.9814 75.3915 41.734C75.1465 41.4865 74.8142 41.3475 74.4677 41.3475Z" fill="#00BBFF"/>
                  </svg>
                  Adres
                </h3>
                <div className="text-bigger mb-4">
                  <p className="mb-1"><strong>Firma Dla Kazdego Sp. z o.o.</strong></p>
                  <p className="mb-1">ul. Lwowska 17/4</p>
                  <p className="mb-1">00-660 Warszawa</p>
                  <p>NIP: 7010634216</p>
                </div>
                <h4 className="font-medium mb-2">Konto bankowe</h4>
                <div className="text-bigger mb-4">
                  <p>mBank</p>
                </div>
                <div className="text-bigger flex flex-col gap-3">
                  <a href="https://www.facebook.com/firmadlakazdego" target="_blank" rel="nofollow noopener" className="text-blue-600 hover:underline inline-flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 14.5505C30 6.51001 23.2889 0 15 0C6.71111 0 0 6.51001 0 14.5505C0 21.815 5.48889 27.8292 12.6667 28.9286V18.754H8.84444V14.5505H12.6667V11.3386C12.6667 7.6956 14.8889 5.69087 18.3333 5.69087C19.9778 5.69087 21.6889 5.9711 21.6889 5.9711V9.54945H19.7778C17.9111 9.54945 17.3333 10.6704 17.3333 11.8129V14.5505H21.4889L20.8222 18.754H17.3333V28.9286C24.5111 27.8292 30 21.815 30 14.5505Z" fill="#4676ED"/>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="pb-8 lg:pb-16">
        <div className="container mx-auto px-5">
          <h2 className="text-center text-2xl md:text-3xl mb-8">
            Napisz do nas
          </h2>
          <div className="max-w-4xl mx-auto">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-primary text-5xl mb-4">&#10003;</div>
                <h3 className="text-xl font-medium mb-2">Dziekujemy za wiadomosc!</h3>
                <p className="text-body">Odpowiemy najszybciej jak to mozliwe.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Imie i nazwisko *</label>
                  <input
                    type="text"
                    required
                    className="w-full border-2 border-gray rounded px-4 py-2 focus:border-primary focus:outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    className="w-full border-2 border-gray rounded px-4 py-2 focus:border-primary focus:outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefon</label>
                  <input
                    type="tel"
                    className="w-full border-2 border-gray rounded px-4 py-2 focus:border-primary focus:outline-none transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Wiadomosc *</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full border-2 border-gray rounded px-4 py-2 focus:border-primary focus:outline-none transition-colors"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 text-center">
                  <button type="submit" className="btn-secondary text-lg px-12 py-3">
                    Wyslij wiadomosc
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
