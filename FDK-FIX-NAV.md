# FDK Site — Naprawa nawigacji na podstronach

## Problem

Tylko 4 pliki (`index.html`, `en/index.html`, `uk/index.html`, `ru/index.html`) mają poprawne pełne menu nawigacyjne (ciemne, fixed-top, z telefonem, CTA Cal.com widget, dwoma logotypami).

**193 pozostałych plików** (wszystkie podstrony, blog, faq, kontakt, usługi — we wszystkich językach PL/EN/UK/RU) używa **uproszczonego białego menu**, które:
- jest `navbar-light` zamiast `navbar-dark`
- ma biały background inline `style="background:#fff;box-shadow:..."` zamiast `fixed-top` z ciemnym gradientem
- ma tylko jedno logo (dark) zamiast dwóch (white + dark z zamianą przy scrollu)
- **brakuje numeru telefonu** (zarówno desktop jak i mobile)
- **brakuje mobilnego bloku telefon + CTA** (`.d-block.d-lg-none`)
- CTA to zwykły link `<a href="https://cal.com/...">` zamiast widgetu Cal.com z `data-cal-link`
- **brakuje** `nav-phone-separator`
- inna kolejność linków i inne nazwy ("Cudzoziemcy" vs "Dla Cudzoziemców", "/#kontakt" vs "/kontakt/")
- inne klasy paddingu na linkach
- przełącznik języka ma `color:#333` inline zamiast klasy `lang-switcher-btn`

## Cel

Wszystkie podstrony muszą mieć **identyczne menu** jak odpowiedni `index.html` dla danego języka.

---

## Instrukcje

### Krok 1: Pobierz referencyjne menu z index.html każdego języka

Poprawne menu to cały blok `<nav>...</nav>` z:
- `index.html` (PL)
- `en/index.html` (EN)
- `uk/index.html` (UK)
- `ru/index.html` (RU)

### Krok 2: Zamień menu we WSZYSTKICH podstronach

W każdym pliku HTML (oprócz `dziekujemy.html` — to strona podziękowania z celowo minimalnym menu):

1. Znajdź cały blok `<nav ...>...</nav>`
2. Zamień go na odpowiedni referencyjny blok z index.html tego samego języka
3. Zachowaj klasę `active` na odpowiednim linku nawigacyjnym (np. na stronie `/blog/` link "Blog" powinien mieć `class="nav-link active"`)

### Krok 3: Upewnij się o wymaganych zależnościach

Podstrony muszą mieć załadowane:
- CSS obsługujący `.logo-white`, `.logo-dark`, `#main-nav`, `.nav-phone-separator`, `.lang-switcher-btn`
- JavaScript obsługujący scroll behavior (zamiana logo white↔dark, dodawanie klasy `.scrolled` do nav)
- Cal.com widget script (jeśli używa `data-cal-link`)

Sprawdź, czy podstrony linkują te same pliki CSS/JS co index.html. Jeśli nie — dodaj brakujące.

### Krok 4: Dopasuj ścieżki

Na podstronach w podkatalogach ścieżki do zasobów mogą wymagać korekty:
- Strony w root (`/blog.html`, `/faq.html`): `src="/assets/img/logo-white.png"` — OK (absolutne)
- Strony w `blog/`: `src="/assets/img/logo-white.png"` — OK (absolutne)
- Strony w `en/`: `src="/assets/img/logo-white.png"` — OK (absolutne)
- Strony w `en/blog/`: `src="/assets/img/logo-white.png"` — OK (absolutne)

Używaj **ścieżek absolutnych** (zaczynających się od `/`) dla wszystkich zasobów.

Linki nawigacyjne też muszą być absolutne:
- PL: `/programisci-graficy/`, `/e-commerce/`, `/cudzoziemcy/`, `/blog/`, `/faq/`, `/kontakt/`
- EN: `/en/programmers/`, `/en/ecommerce/`, `/en/foreigners/`, `/en/blog/`, `/en/faq/`, `/en/contact/`
- UK: `/uk/programisty/`, `/uk/ecommerce/`, `/uk/inozemtsi/`, `/uk/blog/`, `/uk/faq/`, `/uk/kontakt/`
- RU: `/ru/programmisty/`, `/ru/ecommerce/`, `/ru/inostrantsy/`, `/ru/blog/`, `/ru/faq/`, `/ru/kontakt/`

**Uwaga:** Zweryfikuj dokładne ścieżki z plików index.html każdego języka — nie zakładaj, użyj faktycznych href-ów.

---

## Lista plików do poprawy

### PL (root) — ~21 plików:
architekci.html, blog.html, cudzoziemcy.html, dla-pracodawcow.html, ecommerce.html, faq.html, inkubator.html, inkubator-przedsiebiorczosci.html, inne-branze.html, inne-uslugi.html, jak-dzialamy.html, kontakt.html, legalizacja-pobytu-i-pracy.html, muzycy.html, o-nas.html, pakiety-sportowe-i-medyczne.html, polisy-ubezpieczeniowe.html, polityka-prywatnosci.html, pomoc-prawna.html, programisci.html, regulamin.html, sprawy-urzedowe.html, tlumacze.html, tlumaczenia-przysiegle.html, uslugi.html, uslugi-dla-firm-cudzoziemcy.html

### PL blog/ — ~18-20 plików:
Wszystkie pliki w katalogu `blog/`

### EN en/ — ~30 plików:
Wszystkie pliki w katalogu `en/` (oprócz `en/index.html`)

### EN en/blog/ — ~18-20 plików:
Wszystkie pliki w katalogu `en/blog/`

### UK uk/ — ~30 plików:
Wszystkie pliki w katalogu `uk/` (oprócz `uk/index.html`)

### UK uk/blog/ — ~18-20 plików:
Wszystkie pliki w katalogu `uk/blog/`

### RU ru/ — ~28 plików:
Wszystkie pliki w katalogu `ru/` (oprócz `ru/index.html`)

### RU ru/blog/ — ~18-20 plików:
Wszystkie pliki w katalogu `ru/blog/`

**NIE ZMIENIAJ:** `dziekujemy.html` (celowo minimalny nav)

---

## Weryfikacja po wdrożeniu

- [ ] Otwórz dowolną podstronę PL — menu identyczne jak na stronie głównej
- [ ] Otwórz blog post — menu identyczne, link "Blog" ma klasę `active`
- [ ] Sprawdź na mobile (hamburger) — telefon widoczny, CTA widoczne, przełącznik języka widoczny
- [ ] Otwórz podstronę EN/UK/RU — menu w odpowiednim języku
- [ ] Scroll na podstronie — logo zmienia się z białego na ciemne
- [ ] Kliknij numer telefonu — dzwoni
- [ ] Kliknij "Umów konsultację" — otwiera Cal.com widget (nie nową kartę)
- [ ] Po każdej grupie języka zrób osobny commit
