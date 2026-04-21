import PageLayout from "@/components/PageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin - Firma Dla Kazdego",
  description: "Regulamin Fundacji Firma Dla Kazdego — zasady wspolpracy, oplaty, prawa i obowiazki beneficjentow.",
};

export default function RegulaminPage() {
  return (
    <PageLayout title="Regulamin">
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-5">
          <div className="max-w-3xl mx-auto prose prose-lg">

            <h2>§1. POSTANOWIENIA OGOLNE</h2>
            <p>Niniejszy regulamin, zwany dalej Regulaminem, okresla zasady i warunki swiadczenia przez Fundacje Firma Dla Kazdego, zwana dalej Fundacja, pomocy na rzecz osob fizycznych planujacych rozpoczecie wlasnej dzialalnosci gospodarczej.</p>
            <p>Pomoc swiadczona jest na podstawie niniejszego Regulaminu oraz Umowy Wspolpracy zawartej z Beneficjentem.</p>

            <h2>§2. DEFINICJE</h2>
            <p>Uzyte w Regulaminie pojecia oznaczaja:</p>
            <ul>
              <li><strong>Program Wsparcia</strong> — techniczne i organizacyjne formy pomocy swiadczone przez Fundacje</li>
              <li><strong>Zarzad Fundacji</strong> — organ zarzadzajacy Fundacja</li>
              <li><strong>Beneficjent</strong> — osoba fizyczna zakwalifikowana do Programu, ktora podpisala Umowe Wspolpracy</li>
              <li><strong>Umowa Wspolpracy</strong> — umowa regulujaca prawa i obowiazki stron</li>
              <li><strong>Zespol Wspolpracownikow</strong> — cialo doradcze Fundacji</li>
              <li><strong>KSeF</strong> — Krajowy System e-Faktur</li>
              <li><strong>Faktura ustrukturyzowana</strong> — faktura wystawiona za posrednictwem KSeF</li>
            </ul>

            <h2>§3. POMOC SWIADCZONA PRZEZ FUNDACJE</h2>
            <p>Fundacja swiadczy wsparcie obejmujace:</p>
            <ul>
              <li>Biezaca opieke i profesjonalne doradztwo biznesowe</li>
              <li>Bezplatna opieke prawna w postaci udzielania porad prawnych za posrednictwem poczty elektronicznej (do 5 godzin w ciagu 12 miesiecy)</li>
              <li>Uslugi ksiegowe i kadrowe</li>
              <li>Prawo do uzywania znaku towarowego Fundacji</li>
              <li>Dostep do powierzchni biurowej (maks. 5 godzin miesiecznie)</li>
              <li>Indywidualne subkonto bankowe</li>
            </ul>
            <p><strong>Uslugi dodatkowe (odplatne):</strong></p>
            <ul>
              <li>Doradztwo ksiegowe</li>
              <li>Doradztwo prawne</li>
              <li>Doradztwo informatyczne</li>
              <li>Pomoc w pozyskiwaniu dotacji</li>
              <li>Usluga wirtualnego biura (300 PLN netto/miesiac)</li>
            </ul>
            <p><strong>Uslugi podmiotow trzecich:</strong> UTM Group Grzegorz Stepien obsluguje sprawy legalizacji cudzoziemcow niezaleznie, z osobnym cennikiem.</p>

            <h2>§4. KRYTERIA UCZESTNICTWA</h2>
            <p><strong>Uprawnieni uczestnicy:</strong> Osoby fizyczne (w tym byli przedsiebiorcy).</p>
            <p><strong>Wykluczone projekty:</strong></p>
            <ul>
              <li>Przedsiewziecia szkodliwe dla srodowiska</li>
              <li>Uciazliwe dla pozostalych Beneficjentow i ich projektow realizowanych w ramach Fundacji</li>
              <li>Naruszajace normy etyczne</li>
              <li>Odrzucone przez Zarzad z przyczyn regulacyjnych/organizacyjnych (gastronomia, budownictwo, transport, branze regulowane)</li>
            </ul>
            <p><strong>Osoby nieuprawnione:</strong></p>
            <ul>
              <li>Osoby z zakazem prowadzenia dzialalnosci gospodarczej</li>
              <li>Osoby naruszajace przepisy o zwalczaniu nieuczciwej konkurencji</li>
            </ul>

            <h2>§5. PROCEDURA PRZYZNAWANIA DOSTEPU</h2>
            <ul>
              <li>O zakwalifikowaniu do Programu decyduje Zarzad Fundacji</li>
              <li>Umowa Wspolpracy jest podpisywana po zatwierdzeniu</li>
              <li>Beneficjent moze zostac powolany do Zespolu Wspolpracownikow przez Prezesa Zarzadu</li>
              <li>Projekty wieloosobowe wymagaja podpisania oddzielnej umowy przez kazda osobe</li>
              <li>Beneficjent ponosi pelna i wylaczna odpowiedzialnosc za dzialania, jakie podejmuje w ramach projektu</li>
            </ul>

            <h2>§6. ZASADY DZIALANIA BENEFICJENTOW</h2>
            <p><strong>Kluczowe obowiazki:</strong></p>
            <ul>
              <li>Beneficjent jest zobowiazany sumiennie i terminowo wypelniac obowiazki wzgledem Fundacji</li>
              <li>Dokumentacja finansowa musi byc dostarczona do 10. dnia kazdego miesiaca</li>
              <li>Oplaty administracyjne nalezne od pierwszego miesiaca wspolpracy</li>
              <li>Przychody Fundacji naleza do Fundacji</li>
              <li>Obowiazkowe poszanowanie pracownikow Fundacji</li>
              <li>Dyskryminacja/molestowanie zakazane; naruszenia uruchamiaja procedury dyscyplinarne</li>
            </ul>

            <h2>§6A. KRAJOWY SYSTEM E-FAKTUR (KSeF)</h2>
            <p><strong>Wymagania:</strong></p>
            <ul>
              <li>Wszelkie faktury sprzedazowe wystawiane w ramach projektow Beneficjentow w transakcjach B2B sa wystawiane wylacznie jako faktury ustrukturyzowane w KSeF</li>
              <li>Faktury B2C moga byc wystawiane poza KSeF</li>
              <li>Fundacja zarzadza uprawnieniami dostepu do KSeF</li>
              <li>Beneficjenci musza podawac kompletne i prawidlowe dane do fakturowania</li>
              <li>Faktury papierowe zakazane w transakcjach B2B</li>
              <li>Beneficjent odpowiada za prawidlowosc danych; Fundacja nie ponosi odpowiedzialnosci za bledy</li>
              <li>W przypadku awarii KSeF beneficjent musi niezwlocznie powiadomic Fundacje</li>
            </ul>

            <h2>§7. OSWIADCZENIA BENEFICJENTA</h2>
            <p>Beneficjent przyjmuje odpowiedzialnosc za:</p>
            <ul>
              <li>VAT (stawki polskie)</li>
              <li>PIT (podatek dochodowy od osob fizycznych)</li>
              <li>Skladki ZUS (ubezpieczenie spoleczne) gdy maja zastosowanie</li>
              <li>Beneficjent ponosi pelna odpowiedzialnosc za pokrycie podatku VAT, PIT i ZUS</li>
              <li>Nie moze powolywac sie na nieznajomosci prawa polskiego</li>
              <li>Musi wystawiac faktury wylacznie przez KSeF w transakcjach B2B</li>
            </ul>

            <h2>§8. ZWROT KOSZTOW ADMINISTRACYJNYCH</h2>
            <p><strong>Podstawowa oplata:</strong></p>
            <ul>
              <li>400 PLN netto miesiecznie (+ VAT)</li>
              <li>Platna do 4. dnia kazdego miesiaca</li>
              <li>Jesli Fundacja zarobi minimum 400 PLN netto z dzialalnosci beneficjenta, oplata jest pokryta</li>
            </ul>
            <p><strong>Oplaty dodatkowe:</strong></p>
            <ul>
              <li>Dodatkowy projekt: +150 PLN netto miesiecznie</li>
              <li>Projekt wieloosobowy: +100 PLN za dodatkowa osobe</li>
              <li>Wyplaty wynagrodzen o duzej wartosci:
                <ul>
                  <li>10 000–30 000 PLN brutto: 700 PLN netto</li>
                  <li>Powyzej 30 000 PLN brutto: 1 050 PLN netto</li>
                </ul>
              </li>
            </ul>
            <p><strong>Doplaty za zlozonosc:</strong></p>
            <ul>
              <li>25+ dokumentow ksiegowych: 450 PLN netto</li>
              <li>50+ dokumentow: 500 PLN netto</li>
              <li>100+ dokumentow: ustalane indywidualnie</li>
              <li>50+ faktur sprzedazowych: 450 PLN netto; +50 PLN za kazde kolejne 50 faktur</li>
              <li>Dodatkowe wyplaty wynagrodzen: +25–50 PLN za wyplate w zaleznosci od rodzaju umowy</li>
            </ul>
            <p><strong>Kary za spozniona dokumentacje (§6 ust. 5):</strong></p>
            <ul>
              <li>Do 5 dni spoznienia: +50 PLN netto</li>
              <li>6–10 dni: +100 PLN netto</li>
              <li>Powyzej 10 dni: +150 PLN netto</li>
            </ul>
            <p><strong>Przekroczenie uslug prawnych:</strong> 100 PLN netto za kazde rozpoczete 30 minut powyzej wliczonych 5 godzin</p>
            <p><strong>Wymog salda na koniec roku:</strong> Maksymalnie 5 000 PLN salda; przekroczenie skutkuje 19% oplata manipulacyjna od nadwyzki</p>
            <p><strong>Oplata za zarzadzanie przesylkami:</strong> 50 PLN netto za wystawione wezwanie do odbioru</p>
            <p><strong>Termin odbioru przesylki (7 dni):</strong> Kary 100–300 PLN za opoznienia; utylizacja po 28 dniach na koszt beneficjenta</p>
            <p><strong>Kary za opoznienia w platnosciach (§10):</strong> 50–150 PLN netto w zaleznosci od czasu opoznienia</p>
            <p><strong>Ostatni miesiac wspolpracy (§11):</strong></p>
            <ul>
              <li>Przed 10. dniem nastepnego miesiaca: 200 PLN netto</li>
              <li>Po 10. dniu: 400 PLN netto</li>
            </ul>

            <h2>§9. ZAWIESZENIE KORZYSTANIA Z PROGRAMU</h2>
            <ul>
              <li>Zawieszenie mozliwe do 3 miesiecy rocznie</li>
              <li>Przez okres zawieszenia Beneficjent ma obowiazek zwrotu na rzecz Fundacji 100 zlotych netto za kazdy miesiac zawieszenia</li>
              <li>Zawieszenie definiowane jako miesiace bez aktywnosci; musi byc zadeklarowane przed koncem poprzedniego miesiaca</li>
              <li>Jakakolwiek aktywnosc w trakcie zawieszenia anuluje je</li>
              <li>Ostatni miesiac (okres wypowiedzenia) nie moze obejmowac zawieszenia</li>
            </ul>

            <h2>§10. PROCEDURY DYSCYPLINARNE</h2>
            <p>Pierwsze naruszenie: 50 PLN netto kary</p>
            <p>Kolejne naruszenia: 150 PLN netto kary</p>
            <p>Brak zaplaty w ciagu 7 dni: 1 000 PLN kary umownej za tydzien, za naruszenie</p>

            <h2>§11. ZAKONCZENIE UCZESTNICTWA</h2>
            <p><strong>Wypowiedzenie przez Beneficjenta:</strong> 1 miesiac wypowiedzenia, skuteczne na koniec nastepnego miesiaca.</p>
            <p><strong>Wypowiedzenie przez Fundacje:</strong></p>
            <ul>
              <li>Standardowe: 1 miesiac wypowiedzenia</li>
              <li>Natychmiastowe: Za naruszenie regulaminu, oszustwo lub przywlaszczenie</li>
            </ul>
            <p><strong>Obowiazki po zakonczeniu:</strong></p>
            <ul>
              <li>Beneficjent zobowiazany jest do uregulowania wszystkich zobowiazan, ktore zaciagnal w imieniu Fundacji</li>
              <li>Brak roszczenia o zwrot aktywow niematerialnych lub wkladow materialnych</li>
              <li>Odsetki ustawowe naliczane dziennie od niezaplaconych zobowiazan</li>
              <li>Pelna zaplata w ciagu 3 dni od ostatecznego wezwania</li>
              <li>Odpowiedzialnosc za roszczenia osob trzecich spowodowane dzialaniami beneficjenta</li>
              <li>Fundacja nie ponosi odpowiedzialnosci za wlasna niewyplacalnosc</li>
              <li>Oryginalna dokumentacja musi byc dostarczona przed zamknieciem</li>
              <li>Subkonto bankowe zamykane po wyjsciu z Programu</li>
            </ul>

            <h2>§12. KOMUNIKACJA</h2>
            <ul>
              <li>Dokumenty uznaje sie za doreczone: mailem na adres wskazany w umowie lub listem poleconym na adres Fundacji</li>
              <li>Beneficjent musi podawac aktualne dane kontaktowe; osoby trzecie nie moga miec dostepu do e-maila</li>
              <li>Odpowiedzi na zgloszenia Beneficjenta do dzialow wewnetrznych Fundacji sa realizowane w godzinach pracy biura</li>
              <li>Zeskanowane dokumenty upowazniaja do platnosci; oryginaly wymagane w ciagu 14 dni kalendarzowych</li>
              <li>Wyjatek: Faktury z KSeF sa oryginalami i nie wymagaja kopii papierowych</li>
              <li>Beneficjent zrzeka sie roszczen zwiazanych z elektronicznym przetwarzaniem dokumentow</li>
              <li>Zmiana adresu musi byc zgloszona w ciagu 3 dni</li>
            </ul>

            <h2>§13. OCHRONA DANYCH OSOBOWYCH</h2>
            <p><strong>Administrator danych:</strong> Fundacja Firma dla Kazdego, ul. Lwowska 17/4, 00-660 Warszawa</p>
            <p><strong>Kontakt:</strong> kontakt@firmadlakazdego.pl lub wniosek pisemny</p>
            <p><strong>Podstawy przetwarzania:</strong></p>
            <ul>
              <li>Realizacja umowy wspolpracy (art. 6 ust. 1 lit. b RODO)</li>
              <li>Dokumentacja ksiegowa/podatkowa (art. 6 ust. 1 lit. c RODO)</li>
              <li>Roszczenia prawne/obrona (art. 6 ust. 1 lit. f RODO)</li>
            </ul>
            <p><strong>Okresy przechowywania:</strong></p>
            <ul>
              <li>W trakcie umowy plus 5 lat po zakonczeniu</li>
              <li>Dane ksiegowe zgodnie z wymogami prawa podatkowego</li>
              <li>Dane dotyczace sporow zgodnie z terminami przedawnienia z kodeksu cywilnego</li>
            </ul>
            <p><strong>Prawa:</strong> Dostep, sprostowanie, usuniecie, ograniczenie, przenoszenie, sprzeciw oraz skarga do Prezesa UODO</p>
            <p><strong>Odbiorcy:</strong> Wylacznie osoby upowaznione, dostawcy uslug i uczestnicy umowy</p>
            <p>Brak zautomatyzowanego podejmowania decyzji ani profilowania</p>
            <p><strong>Transfery miedzynarodowe:</strong> Wylacznie z zabezpieczeniami na mocy art. 46 RODO</p>

            <h2>§14. AKCEPTOWALNE FORMY PODPISU</h2>
            <p><strong>Podpis odreczny:</strong></p>
            <ul>
              <li>Pelne imie i nazwisko czytelnie napisane niebieskim tuszem</li>
              <li>Zakaz uzywania olowka lub nietrwalych narzedzi pisemniczych</li>
              <li>Parafy wymagane w dolnym rogu dokumentow wielostronicowych</li>
              <li>Pelny podpis w wyznaczonym miejscu</li>
              <li>Brak paraf moze skutkowac niekompletnoscia/niewaznoscia dokumentu</li>
            </ul>
            <p><strong>Podpis elektroniczny (akceptowane typy):</strong></p>
            <ul>
              <li>Podpis kwalifikowany (zgodny z rozporzadzeniem eIDAS 910/2014)</li>
              <li>Podpis zaufany (przez Profil Zaufany ePUAP)</li>
              <li>Musi byc zlozony w oryginalnym formacie (.xades, PDF z PAdES, .asice)</li>
              <li>Podpisujacy musi byc upowazniony zgodnie z aktualnymi rejestrami (KRS, CEIDG, notarialne pelnomocnictwo)</li>
            </ul>
            <p><strong>Weryfikacja:</strong> Fundacja zastrzega sobie prawo zadania dodatkowego potwierdzenia tozsamosci w przypadku watpliwosci co do autentycznosci podpisu</p>

            <h2>§15. POSTANOWIENIA KONCOWE</h2>
            <ul>
              <li>Zmiany regulaminu wymagaja 14 dni wczesniejszego powiadomienia</li>
              <li>Jesli zmiany istotnie ograniczaja pomoc lub zwiekszaja oplaty, beneficjent moze wypowiedziec umowe natychmiast w ciagu 14 dni</li>
              <li>Wypowiedzenie nie zwalnia z nieuregulowanych zobowiazan platniczych</li>
              <li>Beneficjent musi przestrzegac Regulaminu</li>
              <li>Kwestie nieuregulowane reguluje obowiazujace prawo</li>
              <li>Niewazne postanowienia zastepowane sa automatycznie trescia zblizona, odzwierciedlajaca pierwotne intencje</li>
            </ul>
            <p><strong>Data wejscia w zycie: 1 kwietnia 2026 r.</strong></p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
