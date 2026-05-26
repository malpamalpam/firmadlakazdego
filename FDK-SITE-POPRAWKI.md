# FDK Site — Poprawki (fdk-site.vercel.app)

## Kontekst

Strona **fdk-site.vercel.app** to nowa wersja witryny Fundacji Firma Dla Każdego (firmadlakazdego.pl) przed migracją. Poniżej znajduje się lista poprawek do wdrożenia. Strona jest hostowana na Vercel.

---

## 0. PRIORYTET: Blokada indeksacji

**Przed publikacją** strona staging nie powinna być indeksowana przez wyszukiwarki.

- Zmień meta tag `<meta name="robots" content="index, follow">` na `<meta name="robots" content="noindex, nofollow">`
- Dodaj plik `robots.txt` blokujący crawlery:
  ```
  User-agent: *
  Disallow: /
  ```
- Upewnij się, że nagłówek HTTP `X-Robots-Tag: noindex, nofollow` jest ustawiony (np. w `vercel.json` lub middleware)

---

## 1. Błąd 404 przy wersjach językowych

### Problem
Przełączanie wersji językowych (EN, UA, RU) generuje błąd `404: NOT_FOUND` zarówno na desktopie, jak i na mobile. Dotyczy to wszystkich podstron.

### Wymagane działania
- Sprawdź konfigurację routingu dla ścieżek z prefixem językowym (np. `/en/`, `/ua/`, `/ru/`)
- Upewnij się, że Vercel `rewrites` lub Next.js `i18n` config poprawnie obsługuje wszystkie warianty językowe
- Przetestuj przełączanie języka na stronie głównej oraz na każdej podstronie
- Jeśli tłumaczenia nie są jeszcze gotowe — przekieruj na wersję polską zamiast zwracać 404

---

## 2. Znikające menu główne na podstronach

### Problem
Na podstronach (np. blog, e-commerce, inne landing pages) znika główne menu nawigacyjne. Widoczne jest tylko logo i ewentualnie pojedynczy link "Blog". Brakuje pełnej nawigacji: "Dla kogo inkubator?", "Dla Cudzoziemców", "Dla Pracodawców", "O nas", "Blog", "FAQ", "Kontakt".

### Wymagane działania
- Upewnij się, że komponent nawigacji (header/navbar) jest współdzielony globalnie we wszystkich layoutach
- Sprawdź, czy podstrony nie używają innego layoutu, który pomija nawigację
- Menu na podstronach musi być identyczne jak na stronie głównej (pełna nawigacja + przełącznik języka)

---

## 3. Poprawki stopki (footer)

### Problem A — Błędy kodowania znaków (Unicode)
W sekcji "Kontakt" w stopce tekst ukraiński i rosyjski wyświetla się z uszkodzonymi znakami (diamenty z pytajnikami `��`):
- `UA: Міжнародна гаряча лін◆◆` → powinno być `UA: Міжнародна гаряча лінія`
- `RU: Международная горячая лин◆◆я` → powinno być `RU: Международная горячая линия`

### Wymagane działania (A)
- Sprawdź kodowanie pliku źródłowego — musi być UTF-8 (bez BOM)
- Upewnij się, że `<meta charset="utf-8">` jest obecne w `<head>`
- Zweryfikuj, że baza danych / CMS / pliki tłumaczeń przechowują teksty w UTF-8
- Popraw tekst w źródle

### Problem B — Błędny adres email
W stopce wyświetla się `administracja@firmadlakazdego.pl`, a powinien być `b2b@firmadlakazdego.pl`.

### Wymagane działania (B)
- Zamień adres email w stopce: `administracja@firmadlakazdego.pl` → `b2b@firmadlakazdego.pl`

### Problem C — Wersja mobilna stopki
Na wersji mobilnej stopka również wymaga tych samych poprawek (kodowanie + email). Zweryfikuj responsywność — tekst nie powinien być obcięty ani źle formatowany.

---

## 4. Aktualizacja oceny Google (wizytówka GMB)

### Problem
Na stronie wyświetla się ocena `4.8/5`, ale aktualna ocena w Google My Business to `4.7`.

### Wymagane działania
- **Opcja A (rekomendowana):** Dodaj moduł automatycznego pobierania oceny z Google Places API, odświeżany co X dni (np. raz dziennie lub raz na tydzień). Wyświetlaj dynamicznie aktualną wartość.
- **Opcja B (tymczasowa):** Zmień ręcznie wartość z `4.8` na `4.7`

---

## 5. Błąd 404 na mobile

### Problem
Na urządzeniach mobilnych występuje błąd `404: NOT_FOUND` na niektórych podstronach. Dodatkowo:
- Brak możliwości zmiany wersji językowej na mobile
- Menu językowe jest niewidoczne / ukryte i również generuje 404

### Wymagane działania
- Sprawdź, czy mobilny przełącznik języka (`PL ▼`) poprawnie routuje do wersji językowych
- Upewnij się, że responsywna wersja menu zawiera widoczny i działający przełącznik języka
- Przetestuj nawigację mobilną na wszystkich podstronach — żadna nie powinna zwracać 404
- Przełącznik języka powinien być dobrze widoczny w mobilnym hamburger menu

---

## 6. Zmiana struktury nagłówków (SEO)

### Problem
Nieprawidłowa hierarchia nagłówków w sekcji FAQ:
- Tylko "Najczęściej zadawane pytania" ma znacznik `<h2>`
- Pytania pod nim (np. "Co muszę zrobić, żeby założyć firmę w Fundacji?") nie mają znaczników nagłówkowych
- Jeden z modułów ma zbędny nagłówek, który należy usunąć

### Wymagane działania
- Usuń zbędny nagłówek z modułu wskazanego przez SEO (sprawdź kontekst z audytu — prawdopodobnie chodzi o nagłówek na podstronie typu landing, np. "Dokonaj opłaty")
- Sekcja FAQ:
  - `<h2>Najczęściej zadawane pytania</h2>` — pozostaw
  - Każde pytanie w FAQ powinno być opakowane w `<h3>`:
    - `<h3>Co muszę zrobić, żeby założyć firmę w Fundacji?</h3>`
    - `<h3>Czy muszę być studentem, żeby założyć firmę w Fundacji?</h3>`
    - `<h3>Czy muszę płacić składki ZUS?</h3>`
    - `<h3>Jakie podatki muszę płacić?</h3>`
    - `<h3>Co zawiera pakiet i ile kosztuje?</h3>`
    - (i pozostałe pytania w FAQ)
- Upewnij się, że hierarchia nagłówków na stronie jest poprawna: `H1` → `H2` → `H3` (bez przeskoków)

---

## Checklist do weryfikacji po wdrożeniu

- [ ] `robots.txt` blokuje indeksację
- [ ] Meta tag `noindex, nofollow` obecny w `<head>`
- [ ] Przełącznik języka działa na desktopie (bez 404)
- [ ] Przełącznik języka działa na mobile (widoczny + bez 404)
- [ ] Menu główne widoczne na WSZYSTKICH podstronach (desktop + mobile)
- [ ] Stopka — poprawne znaki Unicode (UA, RU)
- [ ] Stopka — email `b2b@firmadlakazdego.pl`
- [ ] Ocena Google — aktualna wartość (4.7 lub dynamiczna)
- [ ] Nagłówki FAQ — pytania jako `<h3>`
- [ ] Zbędny nagłówek usunięty
- [ ] Brak 404 na żadnej podstronie (desktop + mobile)
- [ ] Przetestuj na Chrome DevTools w widoku mobilnym (iPhone SE, iPhone 14, Samsung Galaxy)
