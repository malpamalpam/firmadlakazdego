const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');
const ukBlogDir = path.join(__dirname, 'uk', 'blog');

// Ensure uk/blog directory exists
fs.mkdirSync(ukBlogDir, { recursive: true });

// Common translations map for nav, footer, etc.
const commonReplacements = [
    // html lang
    ['<html lang="pl">', '<html lang="uk">'],

    // Asset paths (from ../assets/ to ../../assets/)
    [/href="\.\.\/assets\//g, 'href="../../assets/'],
    [/src="\.\.\/assets\//g, 'src="../../assets/'],

    // Script paths
    ['src="../assets/js/scripts.js"', 'src="../../assets/js/scripts.js"'],

    // Nav links (from ../ to ../../)
    [/href="\.\.\/index\.html/g, 'href="../../index.html'],
    [/href="\.\.\/o-nas\.html/g, 'href="../../o-nas.html'],
    [/href="\.\.\/dla-pracodawcow\.html/g, 'href="../../dla-pracodawcow.html'],
    [/href="\.\.\/cudzoziemcy\.html/g, 'href="../../cudzoziemcy.html'],
    [/href="\.\.\/blog\.html/g, 'href="../../blog.html'],
    [/href="\.\.\/faq\.html/g, 'href="../../faq.html'],
    [/href="\.\.\/programisci\.html/g, 'href="../../programisci.html'],
    [/href="\.\.\/ecommerce\.html/g, 'href="../../ecommerce.html'],
    [/href="\.\.\/architekci\.html/g, 'href="../../architekci.html'],
    [/href="\.\.\/tlumacze\.html/g, 'href="../../tlumacze.html'],
    [/href="\.\.\/muzycy\.html/g, 'href="../../muzycy.html'],
    [/href="\.\.\/inne-branze\.html/g, 'href="../../inne-branze.html'],

    // Nav text translations
    ['Dla kogo?', 'Для кого?'],
    ['Programiści / Graficy', 'Програмісти / Графіки'],
    ['Architekci', 'Архітектори'],
    ['Tłumacze / Lektorzy', 'Перекладачі / Лектори'],
    ['Muzycy', 'Музиканти'],
    ['Inne branże', 'Інші галузі'],
    ['O nas', 'Про нас'],
    ['Dla Pracodawców', 'Для роботодавців'],
    ['Cudzoziemcy', 'Іноземці'],
    ['Blog', 'Блог'],
    ['Kontakt', 'Контакт'],
    ['Umów konsultację', 'Записатися на консультацію'],

    // TOC header
    ['Spis treści', 'Зміст'],

    // CTA section
    ['Chcesz założyć firmę bez formalności?', 'Хочете відкрити фірму без формальностей?'],
    ['Skontaktuj się z nami — pomożemy Ci wybrać najlepszą formę prowadzenia działalności.', "Зв'яжіться з нами — допоможемо обрати найкращу форму ведення діяльності."],
    ['Skontaktuj się z nami', "Зв'яжіться з нами"],

    // Footer translations
    ['Adres', 'Адреса'],
    ['All right reserved.', 'Всі права захищені.'],

    // Author
    ['Zespół FDK', 'Команда FDK'],
    ['Grzegorz Stępień', 'Гжегож Стемпень'],

    // Badge translations
    ['>Cudzoziemcy<', '>Іноземці<'],
    ['>Podatki<', '>Податки<'],
    ['>Praca<', '>Робота<'],
    ['>Inkubator<', '>Інкубатор<'],
    ['>Poradnik<', '>Посібник<'],
];

// Per-file unique translations (title, meta description, headings, TOC items, paragraphs)
const fileTranslations = {
    'wnioski-pobytowe-online-mos.html': {
        title: 'Заяви на перебування тільки онлайн з 2026 — як працює MOS? — Firma Dla Każdego',
        metaDesc: 'Система MOS (Модуль обробки справ) змінює спосіб подання заяв на перебування в Польщі. Як зареєструватися та подати заяву онлайн?',
        headings: [
            ['Wnioski pobytowe tylko online od 2026 — jak działa MOS?', 'Заяви на перебування тільки онлайн з 2026 — як працює MOS?'],
            ['Czym jest system MOS?', 'Що таке система MOS?'],
            ['Jak założyć konto w MOS', 'Як створити обліковий запис у MOS'],
            ['Składanie wniosku krok po kroku', 'Подання заяви крок за кроком'],
            ['Wymagane dokumenty', 'Необхідні документи'],
            ['Terminy rozpatrywania wniosków', 'Терміни розгляду заяв'],
            ['Gdzie szukać pomocy', 'Де шукати допомогу'],
        ],
        toc: [
            ['Czym jest system MOS?', 'Що таке система MOS?'],
            ['Jak założyć konto w MOS', 'Як створити обліковий запис у MOS'],
            ['Składanie wniosku krok po kroku', 'Подання заяви крок за кроком'],
            ['Wymagane dokumenty', 'Необхідні документи'],
            ['Terminy rozpatrywania wniosków', 'Терміни розгляду заяв'],
            ['Gdzie szukać pomocy', 'Де шукати допомогу'],
        ],
    },
    'freelancer-inkubator-czy-firma.html': {
        title: 'Фрілансер на етаті у 2026 — інкубатор чи власна фірма? — Firma Dla Każdego',
        metaDesc: 'Порівняння шляхів кар\'єри фрілансера: незареєстрована діяльність, інкубатор підприємництва чи власна фірма JDG? Яку модель обрати у 2026?',
        headings: [
            ['Freelancer na etacie w 2026 — inkubator czy własna firma?', 'Фрілансер на етаті у 2026 — інкубатор чи власна фірма?'],
            ['Trzy modele pracy freelancera', 'Три моделі роботи фрілансера'],
            ['Działalność nierejestrowana', 'Незареєстрована діяльність'],
            ['Inkubator przedsiębiorczości', 'Інкубатор підприємництва'],
            ['Własna firma (JDG)', 'Власна фірма (JDG)'],
            ['Który model wybrać?', 'Яку модель обрати?'],
        ],
    },
    'niebieska-karta-ue.html': {
        title: 'Блакитна карта ЄС після 1 червня 2025 — нові правила мобільності — Firma Dla Każdego',
        metaDesc: 'Реформа Блакитної карти ЄС — нові правила мобільності для висококваліфікованих іноземців, умови отримання та переваги після 1 червня 2025.',
        headings: [
            ['Niebieska Karta UE po 1 czerwca 2025 — nowe zasady mobilności', 'Блакитна карта ЄС після 1 червня 2025 — нові правила мобільності'],
            ['Czym jest Niebieska Karta UE?', 'Що таке Блакитна карта ЄС?'],
            ['Kluczowe zmiany od 1 czerwca 2025', 'Ключові зміни з 1 червня 2025'],
            ['Kto może ubiegać się o Niebieską Kartę?', 'Хто може претендувати на Блакитну карту?'],
            ['Procedura aplikowania', 'Процедура подання заяви'],
            ['Nowe zasady mobilności w UE', 'Нові правила мобільності в ЄС'],
            ['Korzyści dla pracowników i pracodawców', 'Переваги для працівників та роботодавців'],
        ],
    },
    'firma-w-polsce-cudzoziemiec.html': {
        title: 'Як відкрити фірму в Польщі як іноземець з-за меж ЄС у 2026? — Firma Dla Każdego',
        metaDesc: 'Посібник з процедури реєстрації підприємницької діяльності в Польщі для іноземців з-за меж Європейського Союзу — документи, правові форми та альтернативи.',
        headings: [
            ['Jak założyć firmę w Polsce jako cudzoziemiec spoza UE w 2026?', 'Як відкрити фірму в Польщі як іноземець з-за меж ЄС у 2026?'],
            ['Kto może założyć firmę w Polsce?', 'Хто може відкрити фірму в Польщі?'],
            ['Dostępne formy prawne', 'Доступні правові форми'],
            ['Rejestracja JDG krok po kroku', 'Реєстрація JDG крок за кроком'],
            ['Założenie spółki z o.o.', 'Заснування ТОВ (sp. z o.o.)'],
            ['Inkubator jako alternatywa', 'Інкубатор як альтернатива'],
            ['Wymagane dokumenty', 'Необхідні документи'],
        ],
    },
    'nowy-wzor-wniosku-pobyt-czasowy.html': {
        title: 'Новий зразок заяви на тимчасове перебування з грудня 2025 — що змінилося? — Firma Dla Każdego',
        metaDesc: 'Зміни у формулярі заяви на дозвіл на тимчасове перебування з грудня 2025 — нові поля, вимоги та як правильно заповнити заяву.',
        headings: [
            ['Nowy wzór wniosku o pobyt czasowy od grudnia 2025 — co się zmieniło?', 'Новий зразок заяви на тимчасове перебування з грудня 2025 — що змінилося?'],
            ['Podstawa prawna zmian', 'Правова основа змін'],
            ['Co się zmieniło w formularzu?', 'Що змінилося у формулярі?'],
            ['Nowe pola i sekcje wniosku', 'Нові поля та розділи заяви'],
            ['Jak prawidłowo wypełnić nowy wniosek', 'Як правильно заповнити нову заяву'],
            ['Najczęstsze błędy przy wypełnianiu', 'Найчастіші помилки при заповненні'],
            ['Gdzie pobrać nowy formularz', 'Де завантажити новий формуляр'],
        ],
    },
    'maly-zus-plus-2026.html': {
        title: 'Як змінюються правила Малого ZUS Plus у 2026 році? — Firma Dla Każdego',
        metaDesc: 'Нові правила Малого ZUS Plus у 2026 — хто має право, як розрахувати внески, зміни в періодах та ліміти доходу.',
        headings: [
            ['Jak zmieniają się zasady Małego ZUS Plus w 2026 roku?', 'Як змінюються правила Малого ZUS Plus у 2026 році?'],
            ['Czym jest Mały ZUS Plus?', 'Що таке Малий ZUS Plus?'],
            ['Kto się kwalifikuje w 2026?', 'Хто має право у 2026?'],
            ['Zmiany w okresach uprawniających', 'Зміни в пільгових періодах'],
            ['Jak obliczyć składki?', 'Як розрахувати внески?'],
            ['Termin i sposób zgłoszenia', 'Термін та спосіб подання заяви'],
            ['Alternatywy dla Małego ZUS Plus', 'Альтернативи Малому ZUS Plus'],
        ],
    },
    'forma-opodatkowania-2026.html': {
        title: 'Чи варто змінювати форму оподаткування у 2026 році? — Firma Dla Każdego',
        metaDesc: 'Аналіз форм оподаткування у 2026 — рикшалт, шкала оподаткування чи лінійний податок? Коли варто змінити форму та які терміни.',
        headings: [
            ['Czy warto zmieniać formę opodatkowania w 2026 roku?', 'Чи варто змінювати форму оподаткування у 2026 році?'],
            ['Dostępne formy opodatkowania', 'Доступні форми оподаткування'],
            ['Skala podatkowa (PIT progresywny)', 'Податкова шкала (прогресивний PIT)'],
            ['Podatek liniowy 19%', 'Лінійний податок 19%'],
            ['Ryczałt od przychodów ewidencjonowanych', 'Рикшалт від обліковуваних доходів'],
            ['Porównanie — kiedy co się opłaca', 'Порівняння — коли що вигідніше'],
            ['Terminy zmiany formy opodatkowania', 'Терміни зміни форми оподаткування'],
        ],
    },
    'ksef-faktury-papierowe-2026.html': {
        title: 'KSeF та паперові рахунки-фактури — зміни з 2026 року — Firma Dla Każdego',
        metaDesc: 'Національна система е-рахунків (KSeF) та паперові рахунки-фактури — кого стосується обов\'язок, графік впровадження та як підготуватися до змін з 2026 року.',
        headings: [
            ['KSeF a faktury papierowe — zmiany od 2026 roku', 'KSeF та паперові рахунки-фактури — зміни з 2026 року'],
            ['Czym jest KSeF?', 'Що таке KSeF?'],
            ['Harmonogram wdrożenia', 'Графік впровадження'],
            ['Kogo dotyczy obowiązek?', 'Кого стосується обов\'язок?'],
            ['Co z fakturami papierowymi?', 'Що з паперовими рахунками-фактурами?'],
            ['Jak się przygotować', 'Як підготуватися'],
            ['Korzyści z KSeF', 'Переваги KSeF'],
        ],
    },
    'najnizsza-krajowa-2026.html': {
        title: 'Скільки становить мінімальна зарплата та загальна вартість працевлаштування працівника у 2026 році? — Firma Dla Każdego',
        metaDesc: 'Мінімальна зарплата у 2026 році становить 4806 зл брутто. Перевірте загальну вартість працевлаштування працівника, внески ZUS роботодавця та порівняння з попередніми роками.',
        headings: [
            ['Ile wynosi najniższa krajowa i koszt całkowity zatrudnienia pracownika w 2026 roku?', 'Скільки становить мінімальна зарплата та загальна вартість працевлаштування працівника у 2026 році?'],
            ['Minimalne wynagrodzenie brutto od stycznia 2026', 'Мінімальна зарплата брутто з січня 2026'],
            ['Składki ZUS po stronie pracodawcy', 'Внески ZUS з боку роботодавця'],
            ['Całkowity koszt zatrudnienia pracownika', 'Загальна вартість працевлаштування працівника'],
            ['Porównanie z latami poprzednimi', 'Порівняння з попередніми роками'],
            ['Konsekwencje podwyżki dla przedsiębiorców', 'Наслідки підвищення для підприємців'],
        ],
    },
    'zasilek-dla-bezrobotnych-2026.html': {
        title: 'Хто може отримати допомогу по безробіттю у 2026 році? — Firma Dla Każdego',
        metaDesc: 'Умови отримання допомоги по безробіттю у 2026 році. Перевірте, хто має право, які суми та як подати заяву в управлінні праці.',
        headings: [
            ['Kto może otrzymać zasiłek dla bezrobotnych w 2026 roku?', 'Хто може отримати допомогу по безробіттю у 2026 році?'],
            ['Warunki uzyskania statusu bezrobotnego', 'Умови отримання статусу безробітного'],
            ['Kto kwalifikuje się do zasiłku', 'Хто має право на допомогу'],
            ['Kwoty zasiłku w 2026 roku', 'Суми допомоги у 2026 році'],
            ['Jak złożyć wniosek w urzędzie pracy', 'Як подати заяву в управлінні праці'],
            ['Kiedy traci się prawo do zasiłku', 'Коли втрачається право на допомогу'],
        ],
    },
    'dzialalnosc-nierejestrowana-2026.html': {
        title: 'Які зміни набувають чинності для незареєстрованої діяльності у 2026 році? — Firma Dla Każdego',
        metaDesc: 'Нові ліміти та правила незареєстрованої діяльності у 2026 році. Перевірте зміни в порогах доходу, обов\'язки KSeF та як легально вести діяльність без реєстрації.',
        headings: [
            ['Jakie zmiany wchodzą w życie dla działalności nierejestrowanej w 2026 roku?', 'Які зміни набувають чинності для незареєстрованої діяльності у 2026 році?'],
            ['Czym jest działalność nierejestrowana', 'Що таке незареєстрована діяльність'],
            ['Nowe limity przychodów w 2026 roku', 'Нові ліміти доходів у 2026 році'],
            ['Obowiązki związane z KSeF', "Обов'язки, пов'язані з KSeF"],
            ['Rozliczenia podatkowe i ewidencja', 'Податкові розрахунки та облік'],
            ['Alternatywy — inkubator przedsiębiorczości', 'Альтернативи — інкубатор підприємництва'],
        ],
    },
    'optymalizacja-podatkowa-2026.html': {
        title: 'Як змінюється оптимізація оподаткування у 2026 році? — Firma Dla Każdego',
        metaDesc: 'Зміни в податковій системі у 2026 році. Нові правила оптимізації, хто виграє, хто програє та як легально знизити податки.',
        headings: [
            ['Jak zmienia się optymalizacja podatkowa w 2026 roku?', 'Як змінюється оптимізація оподаткування у 2026 році?'],
            ['Przegląd zmian podatkowych w 2026 roku', 'Огляд податкових змін у 2026 році'],
            ['Skala podatkowa i kwota wolna', 'Податкова шкала та неоподатковуваний мінімум'],
            ['Ryczałt i podatek liniowy — co się zmienia', 'Рикшалт та лінійний податок — що змінюється'],
            ['Kto zyskuje na nowych przepisach', 'Хто виграє від нових правил'],
            ['Legalne strategie optymalizacji podatkowej', 'Легальні стратегії оптимізації оподаткування'],
        ],
    },
    'najnizsza-krajowa-na-reke-2026.html': {
        title: 'Як зміниться мінімальна зарплата у 2026 році та скільки реально отримаєте на руки? — Firma Dla Każdego',
        metaDesc: 'Детальний аналіз мінімальної зарплати нетто у 2026 році. Скільки залишається на руки після відрахування внесків ZUS та податку на доходи.',
        headings: [
            ['Jak zmieni się najniższa krajowa w 2026 roku i ile naprawdę dostaniesz na rękę?', 'Як зміниться мінімальна зарплата у 2026 році та скільки реально отримаєте на руки?'],
            ['Od brutto do netto — krok po kroku', 'Від брутто до нетто — крок за кроком'],
            ['Składki ZUS potrącane z wynagrodzenia', 'Внески ZUS, що утримуються із зарплати'],
            ['Zaliczka na podatek dochodowy', 'Аванс на податок з доходів'],
            ['Ile zostaje na rękę w 2026 roku', 'Скільки залишається на руки у 2026 році'],
            ['Jak zwiększyć wynagrodzenie netto', 'Як збільшити зарплату нетто'],
        ],
    },
    'odwieszenie-dzialalnosci-2025.html': {
        title: 'Коли варто відновити діяльність і як це зробити? — Firma Dla Każdego',
        metaDesc: 'Практичний посібник з відновлення призупиненої підприємницької діяльності. Процедура крок за кроком, терміни та обов\'язки перед ZUS та податковою.',
        headings: [
            ['Kiedy warto odwiesić działalność i jak to zrobić?', 'Коли варто відновити діяльність і як це зробити?'],
            ['Kiedy warto odwiesić działalność', 'Коли варто відновити діяльність'],
            ['Procedura odwieszenia krok po kroku', 'Процедура відновлення крок за кроком'],
            ['Obowiązki wobec ZUS po odwieszeniu', "Обов'язки перед ZUS після відновлення"],
            ['Rozliczenia podatkowe po wznowieniu', 'Податкові розрахунки після відновлення'],
            ['Alternatywy — inkubator zamiast odwieszenia', 'Альтернативи — інкубатор замість відновлення'],
        ],
    },
    'l4-umowa-zlecenie-2025.html': {
        title: 'Коли на договорі доручення належить лікарняний L4? — Firma Dla Każdego',
        metaDesc: 'Право на лікарняне L4 за договором доручення. Коли виконавець може отримати допомогу по хворобі та як до цього підготуватися.',
        headings: [
            ['Kiedy na umowie zlecenie przysługuje L4?', 'Коли на договорі доручення належить лікарняний L4?'],
            ['Ubezpieczenie chorobowe na zleceniu', 'Страхування на випадок хвороби за дорученням'],
            ['Warunki uzyskania prawa do L4', 'Умови отримання права на L4'],
            ['Wysokość zasiłku chorobowego', 'Розмір допомоги по хворобі'],
            ['Jak zgłosić L4 na umowie zlecenie', 'Як повідомити про L4 за договором доручення'],
            ['Wyjątki i sytuacje szczególne', 'Винятки та особливі ситуації'],
        ],
    },
    'podpis-epuap-2025.html': {
        title: 'Як ефективно підписати документ на ePUAP? — Firma Dla Każdego',
        metaDesc: 'Інструкція з підписання документів на ePUAP крок за кроком. Довірений профіль, кваліфікований підпис та найчастіші проблеми з електронним підписом.',
        headings: [
            ['Jak skutecznie podpisać dokument na ePUAP?', 'Як ефективно підписати документ на ePUAP?'],
            ['Czym jest ePUAP i profil zaufany', 'Що таке ePUAP та довірений профіль'],
            ['Rodzaje podpisu elektronicznego', 'Види електронного підпису'],
            ['Podpisywanie dokumentu krok po kroku', 'Підписання документа крок за кроком'],
            ['Najczęstsze problemy i ich rozwiązania', 'Найчастіші проблеми та їх вирішення'],
            ['Gdzie wykorzystasz podpis ePUAP', 'Де використаєте підпис ePUAP'],
        ],
    },
    'wakacje-skladkowe-zus-2025.html': {
        title: 'Як працює пільга «канікули внесків ZUS»? — Firma Dla Każdego',
        metaDesc: 'Канікули внесків ZUS — нова пільга для мікропідприємців. Хто може скористатися, як подати заяву та скільки можна заощадити на внесках ZUS.',
        headings: [
            ['Jak działa ulga „wakacje składkowe ZUS"?', 'Як працює пільга «канікули внесків ZUS»?'],
            ['Czym są wakacje składkowe ZUS', 'Що таке канікули внесків ZUS'],
            ['Kto może skorzystać z ulgi', 'Хто може скористатися пільгою'],
            ['Ile zaoszczędzisz na składkach', 'Скільки заощадите на внесках'],
            ['Jak złożyć wniosek o wakacje składkowe', 'Як подати заяву на канікули внесків'],
            ['Wady i ograniczenia ulgi', 'Недоліки та обмеження пільги'],
        ],
    },
    'ubezpieczenie-zdrowotne-bez-pracy-2025.html': {
        title: 'Як отримати медичне страхування не працюючи? — Firma Dla Każdego',
        metaDesc: 'Способи отримання медичного страхування без працевлаштування. Реєстрація в управлінні праці, заява через члена сім\'ї, KRUS та інші варіанти.',
        headings: [
            ['Jak uzyskać ubezpieczenie zdrowotne nie pracując?', 'Як отримати медичне страхування не працюючи?'],
            ['Dlaczego ubezpieczenie zdrowotne jest ważne', 'Чому медичне страхування важливе'],
            ['Rejestracja w urzędzie pracy', 'Реєстрація в управлінні праці'],
            ['Zgłoszenie przez członka rodziny', 'Заява через члена сім\'ї'],
            ['Inne sposoby uzyskania ubezpieczenia', 'Інші способи отримання страхування'],
            ['Dobrowolne ubezpieczenie zdrowotne w NFZ', 'Добровільне медичне страхування в NFZ'],
        ],
    },
};

// Process each file in the blog directory
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

// Files already created manually
const alreadyCreated = ['ochrona-czasowa-ukraincow.html', 'jak-sprawdzic-zwrot-podatku.html'];

let created = 0;
let skipped = 0;

files.forEach(filename => {
    if (alreadyCreated.includes(filename)) {
        skipped++;
        return;
    }

    let content = fs.readFileSync(path.join(blogDir, filename), 'utf-8');

    // Apply common replacements
    commonReplacements.forEach(([search, replace]) => {
        if (search instanceof RegExp) {
            content = content.replace(search, replace);
        } else {
            // Replace all occurrences
            while (content.includes(search)) {
                content = content.replace(search, replace);
            }
        }
    });

    // Apply file-specific translations
    const fileTrans = fileTranslations[filename];
    if (fileTrans) {
        // Replace title
        if (fileTrans.title) {
            const titleMatch = content.match(/<title>.*?<\/title>/);
            if (titleMatch) {
                content = content.replace(titleMatch[0], `<title>${fileTrans.title}</title>`);
            }
        }
        // Replace meta description
        if (fileTrans.metaDesc) {
            const descMatch = content.match(/<meta name="description" content=".*?">/);
            if (descMatch) {
                content = content.replace(descMatch[0], `<meta name="description" content="${fileTrans.metaDesc}">`);
            }
        }
        // Replace headings
        if (fileTrans.headings) {
            fileTrans.headings.forEach(([pl, uk]) => {
                while (content.includes(pl)) {
                    content = content.replace(pl, uk);
                }
            });
        }
        // Replace TOC items (if separate from headings)
        if (fileTrans.toc) {
            fileTrans.toc.forEach(([pl, uk]) => {
                while (content.includes(pl)) {
                    content = content.replace(pl, uk);
                }
            });
        }
    }

    // Write the translated file
    const outputPath = path.join(ukBlogDir, filename);
    fs.writeFileSync(outputPath, content, 'utf-8');
    created++;
    console.log(`Created: ${filename}`);
});

console.log(`\nDone! Created: ${created}, Skipped (already exist): ${skipped}`);
console.log(`Total files in blog/: ${files.length}`);
