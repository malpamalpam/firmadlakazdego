// ===== Sticky header on scroll (homepage only) =====
document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');
    var isHomepage = document.body.classList.contains('page-index');
    if (header && isHomepage) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky-top');
            } else {
                header.classList.remove('sticky-top');
            }
        });
    }

    // ===== [7] Counter animation (count-up with IntersectionObserver) =====
    var countersStarted = false;
    var counters = document.querySelectorAll('.counter-value');

    function animateCounters() {
        if (countersStarted) return;
        countersStarted = true;
        counters.forEach(function(counter) {
            var target = parseInt(counter.getAttribute('data-target')) || 0;
            var duration = 2000;
            var startTime = null;
            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(eased * target);
                counter.textContent = current.toLocaleString('pl-PL');
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target.toLocaleString('pl-PL');
                }
            }
            requestAnimationFrame(step);
        });
    }

    if (counters.length > 0) {
        var counterSection = document.querySelector('.hero-counters') || document.querySelector('.section-counters');
        if (counterSection && 'IntersectionObserver' in window) {
            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        animateCounters();
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            obs.observe(counterSection);
        } else {
            // Fallback: animate immediately
            animateCounters();
        }
    }

    // ===== Fade-in on scroll =====
    var fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        var fadeObs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        fadeElements.forEach(function(el) { fadeObs.observe(el); });
    } else {
        // Fallback: show all
        fadeElements.forEach(function(el) { el.classList.add('visible'); });
    }

    // ===== Lazy background images =====
    var lazyBgs = document.querySelectorAll('.lazy-bg[data-bg]');
    function loadBg(el) {
        var url = el.getAttribute('data-bg');
        if (!url) return;
        var cur = getComputedStyle(el).backgroundImage;
        if (cur && cur !== 'none') {
            el.style.backgroundImage = cur + ",url('" + url + "')";
        } else {
            el.style.backgroundImage = "url('" + url + "')";
        }
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        el.removeAttribute('data-bg');
    }
    if (lazyBgs.length > 0 && 'IntersectionObserver' in window) {
        var bgObs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) { loadBg(entry.target); bgObs.unobserve(entry.target); }
            });
        }, { rootMargin: '200px' });
        lazyBgs.forEach(function(el) { bgObs.observe(el); });
    } else {
        lazyBgs.forEach(loadBg);
    }

    // ===== Calculator JDG vs FDK (slider version) =====
    var calcSlider = document.getElementById('calc-slider');
    var calcRevInput = document.getElementById('calc-revenue');
    var calcSource = calcSlider || calcRevInput;
    if (calcSource) {
        // Detect currency suffix from page language (UA uses "зл", others use "zł")
        var pageLang = document.documentElement.lang || 'pl';
        var currSuffix = ' zł';

        function updateCalculator() {
            var revenue = parseFloat(calcSource.value) || 0;

            // === JDG (skala podatkowa) ===
            var zusJDG = 1825;  // Duży ZUS 2025: społeczne ~1600 + FP/FS ~225
            // Składka zdrowotna: 9% od dochodu (skala), minimum 314 zł
            var incomeJDG = Math.max(0, revenue - zusJDG);
            var healthJDG = Math.max(314, Math.round(incomeJDG * 0.09));
            // Podatek dochodowy: 12% do 120k rocznie (10k/mies.), 32% powyżej
            var annualIncome = incomeJDG * 12;
            var taxJDG;
            if (annualIncome <= 120000) {
                taxJDG = Math.round(incomeJDG * 0.12);
            } else {
                var threshold = 10000; // 120k/12
                taxJDG = Math.round(threshold * 0.12 + Math.max(0, incomeJDG - threshold) * 0.32);
            }
            var bookJDG = 400;
            var totalJDG = zusJDG + healthJDG + taxJDG + bookJDG;

            // === FDK (umowa o dzieło, max 20k/mies. = 240k rocznie) ===
            var taxFDK = Math.round(revenue * 0.06);
            var aboFDK = revenue <= 10000 ? 400 : (revenue <= 30000 ? 700 : 1050);
            var totalFDK = taxFDK + aboFDK;
            var savings = Math.max(0, totalJDG - totalFDK);

            var el = function(id) { return document.getElementById(id); };
            if (el('calc-display')) el('calc-display').textContent = revenue.toLocaleString('pl-PL');
            if (el('jdg-zus')) el('jdg-zus').textContent = zusJDG.toLocaleString('pl-PL') + currSuffix;
            if (el('jdg-health')) el('jdg-health').textContent = healthJDG.toLocaleString('pl-PL') + currSuffix;
            if (el('jdg-tax')) el('jdg-tax').textContent = taxJDG.toLocaleString('pl-PL') + currSuffix;
            if (el('jdg-total')) el('jdg-total').textContent = totalJDG.toLocaleString('pl-PL') + currSuffix;
            if (el('fdk-tax')) el('fdk-tax').textContent = taxFDK.toLocaleString('pl-PL') + currSuffix;
            if (el('fdk-abo')) el('fdk-abo').textContent = aboFDK.toLocaleString('pl-PL') + currSuffix;
            if (el('fdk-total')) el('fdk-total').textContent = totalFDK.toLocaleString('pl-PL') + currSuffix;
            if (el('calc-savings')) el('calc-savings').textContent = savings.toLocaleString('pl-PL') + currSuffix;
            if (el('calc-savings-year')) el('calc-savings-year').textContent = (savings * 12).toLocaleString('pl-PL') + currSuffix;
        }
        calcSource.addEventListener('input', updateCalculator);
        updateCalculator();
    }

    // ===== Cal.com external button — otwiera w nowym oknie =====
    document.querySelectorAll('.cal-link-external').forEach(function(el) {
        el.addEventListener('click', function(e) {
            var href = el.getAttribute('href') || '';
            // Jeśli placeholder — fallback do #kontakt
            if (href.indexOf('TWOJ-LINK') !== -1) {
                e.preventDefault();
                var kontakt = document.getElementById('kontakt');
                if (kontakt) kontakt.scrollIntoView({ behavior: 'smooth' });
            }
            // Jeśli prawdziwy link — otworzy się w nowym oknie (target=_blank)
        });
    });

    // Cal.com fallback dla wewnętrznych linków
    document.querySelectorAll('.cal-link').forEach(function(el) {
        el.addEventListener('click', function(e) {
            var calLink = el.getAttribute('data-cal-link');
            if (!calLink || calLink === 'TWOJ-LINK-CAL-COM') {
                e.preventDefault();
                var kontakt = document.getElementById('kontakt');
                if (kontakt) kontakt.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== Hero Rotator =====
    var rotatorItems = document.querySelectorAll('.hero-rotator-item');
    if (rotatorItems.length > 1) {
        var currentSlide = 0;
        setInterval(function() {
            rotatorItems[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % rotatorItems.length;
            rotatorItems[currentSlide].classList.add('active');
        }, 4000);
    }

    // ===== Cookie Banner =====
    var cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner && !localStorage.getItem('cookies-accepted')) {
        cookieBanner.style.display = 'block';
    }

    // ===== Language switcher — preserve current subpage with slug translation =====
    var slugMap = {
        'programisci-graficy': { en: 'programmers',      uk: 'programisty',    ru: 'programmisty' },
        'programmers':         { pl: 'programisci-graficy', uk: 'programisty', ru: 'programmisty' },
        'programisty':         { pl: 'programisci-graficy', en: 'programmers', ru: 'programmisty' },
        'programmisty':        { pl: 'programisci-graficy', en: 'programmers', uk: 'programisty' },
        'e-commerce':     { en: 'ecommerce',        uk: 'ecommerce',      ru: 'ecommerce' },
        'ecommerce':      { pl: 'e-commerce',       uk: 'ecommerce',      ru: 'ecommerce' },
        'architekci':     { en: 'architects',       uk: 'architekty',     ru: 'arhitektory' },
        'architects':     { pl: 'architekci',       uk: 'architekty',     ru: 'arhitektory' },
        'architekty':     { pl: 'architekci',       en: 'architects',     ru: 'arhitektory' },
        'arhitektory':    { pl: 'architekci',       en: 'architects',     uk: 'architekty' },
        'tlumacze-lektorzy': { en: 'translators',   uk: 'perekladachi',   ru: 'perevodchiki' },
        'translators':    { pl: 'tlumacze-lektorzy', uk: 'perekladachi',  ru: 'perevodchiki' },
        'perekladachi':   { pl: 'tlumacze-lektorzy', en: 'translators',   ru: 'perevodchiki' },
        'perevodchiki':   { pl: 'tlumacze-lektorzy', en: 'translators',   uk: 'perekladachi' },
        'muzycy':         { en: 'musicians',        uk: 'muzykanty',      ru: 'muzykanty' },
        'musicians':      { pl: 'muzycy',           uk: 'muzykanty',      ru: 'muzykanty' },
        'muzykanty':      { pl: 'muzycy',           en: 'musicians',     ru: 'muzykanty',  uk: 'muzykanty' },
        'inkubator-przedsiebiorczosci': { en: 'other-industries', uk: 'inshi-galuzi', ru: 'drugie-otrasli' },
        'other-industries':  { pl: 'inkubator-przedsiebiorczosci', uk: 'inshi-galuzi',   ru: 'drugie-otrasli' },
        'inshi-galuzi':      { pl: 'inkubator-przedsiebiorczosci', en: 'other-industries', ru: 'drugie-otrasli' },
        'drugie-otrasli':    { pl: 'inkubator-przedsiebiorczosci', en: 'other-industries', uk: 'inshi-galuzi' },
        'cudzoziemcy':    { en: 'foreigners',       uk: 'inozemtsi',      ru: 'inostrantsy' },
        'foreigners':     { pl: 'cudzoziemcy',      uk: 'inozemtsi',      ru: 'inostrantsy' },
        'inozemtsi':      { pl: 'cudzoziemcy',      en: 'foreigners',     ru: 'inostrantsy' },
        'inostrantsy':    { pl: 'cudzoziemcy',      en: 'foreigners',     uk: 'inozemtsi' },
        'dla-pracodawcow': { en: 'employers',       uk: 'robotodavtsi',   ru: 'rabotodateli' },
        'employers':       { pl: 'dla-pracodawcow', uk: 'robotodavtsi',   ru: 'rabotodateli' },
        'robotodavtsi':    { pl: 'dla-pracodawcow', en: 'employers',      ru: 'rabotodateli' },
        'rabotodateli':    { pl: 'dla-pracodawcow', en: 'employers',      uk: 'robotodavtsi' },
        'zespol-fundacji-firma-dla-kazdego': { en: 'about', uk: 'pro-nas', ru: 'o-nas' },
        'about':          { pl: 'zespol-fundacji-firma-dla-kazdego', uk: 'pro-nas', ru: 'o-nas' },
        'pro-nas':        { pl: 'zespol-fundacji-firma-dla-kazdego', en: 'about', ru: 'o-nas' },
        'o-nas':          { pl: 'zespol-fundacji-firma-dla-kazdego', en: 'about', uk: 'pro-nas' },
        'kontakt':        { en: 'contact',          uk: 'kontakt',        ru: 'kontakt' },
        'contact':        { pl: 'kontakt',          uk: 'kontakt',        ru: 'kontakt' },
        'faq':            { en: 'faq',              uk: 'faq',            ru: 'faq' },
        'blog':           { en: 'blog',             uk: 'blog',           ru: 'blog' },
        'regulamin':      { en: 'terms',            uk: 'reglament',      ru: 'reglament' },
        'terms':          { pl: 'regulamin',        uk: 'reglament',      ru: 'reglament' },
        'reglament':      { pl: 'regulamin',        en: 'terms',          uk: 'reglament',  ru: 'reglament' },
        'polityka-prywatnosci': { en: 'privacy-policy', uk: 'polityka-prywatnosci', ru: 'polityka-prywatnosci' },
        'privacy-policy':      { pl: 'polityka-prywatnosci', uk: 'polityka-prywatnosci', ru: 'polityka-prywatnosci' },
        'sygnalista':     { en: 'whistleblower',    uk: 'informator',     ru: 'informator' },
        'whistleblower':  { pl: 'sygnalista',       uk: 'informator',     ru: 'informator' },
        'informator':     { pl: 'sygnalista',       en: 'whistleblower',  uk: 'informator', ru: 'informator' },
        'jak-dzialamy':       { en: 'how-it-works',       uk: 'yak-my-pratsyuyemo', ru: 'kak-my-rabotaem' },
        'how-it-works':       { pl: 'jak-dzialamy',       uk: 'yak-my-pratsyuyemo', ru: 'kak-my-rabotaem' },
        'yak-my-pratsyuyemo': { pl: 'jak-dzialamy',       en: 'how-it-works',       ru: 'kak-my-rabotaem' },
        'kak-my-rabotaem':    { pl: 'jak-dzialamy',       en: 'how-it-works',       uk: 'yak-my-pratsyuyemo' },
        'incubator':      { pl: 'inkubator-przedsiebiorczosci', uk: 'inkubator', ru: 'inkubator' },
        'inkubator':      { pl: 'inkubator-przedsiebiorczosci', en: 'incubator', uk: 'inkubator', ru: 'inkubator' },
        'inne-uslugi':    { en: 'other-services',   uk: 'inshi-poslugy',  ru: 'drugie-uslugi' },
        'other-services': { pl: 'inne-uslugi',      uk: 'inshi-poslugy',  ru: 'drugie-uslugi' },
        'inshi-poslugy':  { pl: 'inne-uslugi',      en: 'other-services', ru: 'drugie-uslugi' },
        'drugie-uslugi':  { pl: 'inne-uslugi',      en: 'other-services', uk: 'inshi-poslugy' },

        'legalizacja-pobytu-i-pracy':        { en: 'residence-and-work-permits',           uk: 'legalizatsiya-perebuvannya',    ru: 'legalizatsiya-prebyvaniya' },
        'residence-and-work-permits':        { pl: 'legalizacja-pobytu-i-pracy',           uk: 'legalizatsiya-perebuvannya',    ru: 'legalizatsiya-prebyvaniya' },
        'legalizatsiya-perebuvannya':        { pl: 'legalizacja-pobytu-i-pracy',           en: 'residence-and-work-permits',    ru: 'legalizatsiya-prebyvaniya' },
        'legalizatsiya-prebyvaniya':         { pl: 'legalizacja-pobytu-i-pracy',           en: 'residence-and-work-permits',    uk: 'legalizatsiya-perebuvannya' },
        'legalizatsiya':                     { pl: 'legalizacja-pobytu-i-pracy',           en: 'residence-and-work-permits',    uk: 'legalizatsiya-perebuvannya', ru: 'legalizatsiya-prebyvaniya' },
        'legalization':                      { pl: 'legalizacja-pobytu-i-pracy',           en: 'residence-and-work-permits',    uk: 'legalizatsiya-perebuvannya', ru: 'legalizatsiya-prebyvaniya' },

        'pakiety-sportowe-i-medyczne':       { en: 'sports-and-medical-packages',          uk: 'sportyvni-ta-medychni-pakety',  ru: 'sportivnye-i-meditsinskie-pakety' },
        'sports-and-medical-packages':       { pl: 'pakiety-sportowe-i-medyczne',          uk: 'sportyvni-ta-medychni-pakety',  ru: 'sportivnye-i-meditsinskie-pakety' },
        'sportyvni-ta-medychni-pakety':      { pl: 'pakiety-sportowe-i-medyczne',          en: 'sports-and-medical-packages',   ru: 'sportivnye-i-meditsinskie-pakety' },
        'sportivnye-i-meditsinskie-pakety':  { pl: 'pakiety-sportowe-i-medyczne',          en: 'sports-and-medical-packages',   uk: 'sportyvni-ta-medychni-pakety' },
        'sports-medical-packages':           { pl: 'pakiety-sportowe-i-medyczne',          en: 'sports-and-medical-packages',   uk: 'sportyvni-ta-medychni-pakety', ru: 'sportivnye-i-meditsinskie-pakety' },
        'sportyvni-medychni-pakety':         { pl: 'pakiety-sportowe-i-medyczne',          en: 'sports-and-medical-packages',   ru: 'sportivnye-i-meditsinskie-pakety' },
        'sportivnye-meditsinskie-pakety':    { pl: 'pakiety-sportowe-i-medyczne',          en: 'sports-and-medical-packages',   uk: 'sportyvni-ta-medychni-pakety' },

        'polisy-ubezpieczeniowe':            { en: 'insurance-policies',                   uk: 'strakhovi-polisy',              ru: 'strakhovye-polisy' },
        'insurance-policies':                { pl: 'polisy-ubezpieczeniowe',               uk: 'strakhovi-polisy',              ru: 'strakhovye-polisy' },
        'strakhovi-polisy':                  { pl: 'polisy-ubezpieczeniowe',               en: 'insurance-policies',            ru: 'strakhovye-polisy' },
        'strakhovye-polisy':                 { pl: 'polisy-ubezpieczeniowe',               en: 'insurance-policies',            uk: 'strakhovi-polisy' },
        'insurance':                         { pl: 'polisy-ubezpieczeniowe',               en: 'insurance-policies',            uk: 'strakhovi-polisy', ru: 'strakhovye-polisy' },
        'strakhuvannya':                     { pl: 'polisy-ubezpieczeniowe',               en: 'insurance-policies',            ru: 'strakhovye-polisy' },
        'strakhovanie':                      { pl: 'polisy-ubezpieczeniowe',               en: 'insurance-policies',            uk: 'strakhovi-polisy' },

        'tlumaczenia-przysiegle':            { en: 'sworn-translations',                   uk: 'prysiazhnyi-pereklad',          ru: 'prisyazhnyy-perevod' },
        'sworn-translations':                { pl: 'tlumaczenia-przysiegle',               uk: 'prysiazhnyi-pereklad',          ru: 'prisyazhnyy-perevod' },
        'prysiazhnyi-pereklad':              { pl: 'tlumaczenia-przysiegle',               en: 'sworn-translations',            ru: 'prisyazhnyy-perevod' },
        'prisyazhnyy-perevod':               { pl: 'tlumaczenia-przysiegle',               en: 'sworn-translations',            uk: 'prysiazhnyi-pereklad' },
        'prisyazhnyj-perevod':               { pl: 'tlumaczenia-przysiegle',               en: 'sworn-translations',            uk: 'prysiazhnyi-pereklad' },

        'pomoc-prawna':                      { en: 'legal-assistance',                     uk: 'pravova-dopomoha',              ru: 'pravovaya-pomoshch' },
        'legal-assistance':                  { pl: 'pomoc-prawna',                         uk: 'pravova-dopomoha',              ru: 'pravovaya-pomoshch' },
        'legal-help':                        { pl: 'pomoc-prawna',                         en: 'legal-assistance',              uk: 'pravova-dopomoha', ru: 'pravovaya-pomoshch' },
        'pravova-dopomoha':                  { pl: 'pomoc-prawna',                         en: 'legal-assistance',              ru: 'pravovaya-pomoshch' },
        'pravovaya-pomoshch':                { pl: 'pomoc-prawna',                         en: 'legal-assistance',              uk: 'pravova-dopomoha' },

        'sprawy-urzedowe':                   { en: 'official-matters',                     uk: 'ofitsiyni-spravy',              ru: 'ofitsialnye-dela' },
        'official-matters':                  { pl: 'sprawy-urzedowe',                      uk: 'ofitsiyni-spravy',              ru: 'ofitsialnye-dela' },
        'government-procedures':             { pl: 'sprawy-urzedowe',                      en: 'official-matters',              uk: 'ofitsiyni-spravy', ru: 'ofitsialnye-dela' },
        'ofitsiyni-spravy':                  { pl: 'sprawy-urzedowe',                      en: 'official-matters',              ru: 'ofitsialnye-dela' },
        'ofitsialnye-dela':                  { pl: 'sprawy-urzedowe',                      en: 'official-matters',              uk: 'ofitsiyni-spravy' },
        'uriadovi-spravy':                   { pl: 'sprawy-urzedowe',                      en: 'official-matters',              ru: 'ofitsialnye-dela' },
        'gosudarstvennye-dela':              { pl: 'sprawy-urzedowe',                      en: 'official-matters',              uk: 'ofitsiyni-spravy' },

        'uslugi-dla-firm-cudzoziemcy':               { en: 'services-for-employers-of-foreigners', uk: 'poslugy-dlya-firm-inozemtsiv', ru: 'uslugi-dlya-firm-inostrantsev' },
        'services-for-employers-of-foreigners':      { pl: 'uslugi-dla-firm-cudzoziemcy',          uk: 'poslugy-dlya-firm-inozemtsiv', ru: 'uslugi-dlya-firm-inostrantsev' },
        'services-for-companies':                    { pl: 'uslugi-dla-firm-cudzoziemcy',          en: 'services-for-employers-of-foreigners', uk: 'poslugy-dlya-firm-inozemtsiv', ru: 'uslugi-dlya-firm-inostrantsev' },
        'poslugy-dlya-firm-inozemtsiv':              { pl: 'uslugi-dla-firm-cudzoziemcy',          en: 'services-for-employers-of-foreigners', ru: 'uslugi-dlya-firm-inostrantsev' },
        'poslugy-dlya-firm':                         { pl: 'uslugi-dla-firm-cudzoziemcy',          en: 'services-for-employers-of-foreigners', ru: 'uslugi-dlya-firm-inostrantsev' },
        'uslugi-dlya-firm-inostrantsev':             { pl: 'uslugi-dla-firm-cudzoziemcy',          en: 'services-for-employers-of-foreigners', uk: 'poslugy-dlya-firm-inozemtsiv' },
        'uslugi-dlya-firm':                          { pl: 'uslugi-dla-firm-cudzoziemcy',          en: 'services-for-employers-of-foreigners', uk: 'poslugy-dlya-firm-inozemtsiv' }
    };

    var langLinks = document.querySelectorAll('.lang-switcher-btn + .dropdown-menu a.dropdown-item, .lang-switcher-btn ~ .dropdown-menu a.dropdown-item');
    // Also rewrite no-JS fallback links
    var noJsLinks = document.querySelectorAll('.lang-inline-nojs a');
    var allLangLinks = [];
    langLinks.forEach(function(l) { allLangLinks.push(l); });
    noJsLinks.forEach(function(l) { allLangLinks.push(l); });

    if (allLangLinks.length > 0) {
        var path = window.location.pathname;
        var langMatch = path.match(/^\/(uk|en|ru)(\/|$)/);
        var currentLang = langMatch ? langMatch[1] : 'pl';
        var subpage = path.replace(/^\/(uk|en|ru)/, '').replace(/\.html$/, '').replace(/^\/+/, '').replace(/\/+$/, '');

        if (subpage && subpage !== 'index' && subpage !== '') {
            allLangLinks.forEach(function(link) {
                var href = link.getAttribute('href');
                if (!href || href === '#') return;

                var targetLang = null;
                if (href === '/' || href === '../' || href === '../../') targetLang = 'pl';
                else if (href.match(/^\/?en\/?$/) || href.match(/\.\.\/en\/?$/)) targetLang = 'en';
                else if (href.match(/^\/?uk\/?$/) || href.match(/\.\.\/uk\/?$/)) targetLang = 'uk';
                else if (href.match(/^\/?ru\/?$/) || href.match(/\.\.\/ru\/?$/)) targetLang = 'ru';
                else if (href === './' || href === '.') targetLang = currentLang;

                if (targetLang) {
                    // Blog slug translation map (EN uses English slugs via Vercel rewrites)
                    var blogSlugMap = {
                        'maly-zus-plus-2026': { en: 'small-zus-plus-2026' },
                        'small-zus-plus-2026': { pl: 'maly-zus-plus-2026', uk: 'maly-zus-plus-2026', ru: 'maly-zus-plus-2026' },
                        'firma-w-polsce-cudzoziemiec': { en: 'business-in-poland-foreigner' },
                        'business-in-poland-foreigner': { pl: 'firma-w-polsce-cudzoziemiec', uk: 'firma-w-polsce-cudzoziemiec', ru: 'firma-w-polsce-cudzoziemiec' },
                        'forma-opodatkowania-2026': { en: 'tax-form-2026' },
                        'tax-form-2026': { pl: 'forma-opodatkowania-2026', uk: 'forma-opodatkowania-2026', ru: 'forma-opodatkowania-2026' },
                        'freelancer-inkubator-czy-firma': { en: 'freelancer-incubator-or-company' },
                        'freelancer-incubator-or-company': { pl: 'freelancer-inkubator-czy-firma', uk: 'freelancer-inkubator-czy-firma', ru: 'freelancer-inkubator-czy-firma' },
                        'jak-sprawdzic-zwrot-podatku': { en: 'how-to-check-tax-refund' },
                        'how-to-check-tax-refund': { pl: 'jak-sprawdzic-zwrot-podatku', uk: 'jak-sprawdzic-zwrot-podatku', ru: 'jak-sprawdzic-zwrot-podatku' },
                        'ksef-faktury-papierowe-2026': { en: 'ksef-paper-invoices-2026' },
                        'ksef-paper-invoices-2026': { pl: 'ksef-faktury-papierowe-2026', uk: 'ksef-faktury-papierowe-2026', ru: 'ksef-faktury-papierowe-2026' },
                        'l4-umowa-zlecenie-2025': { en: 'sick-leave-civil-contract-2025' },
                        'sick-leave-civil-contract-2025': { pl: 'l4-umowa-zlecenie-2025', uk: 'l4-umowa-zlecenie-2025', ru: 'l4-umowa-zlecenie-2025' },
                        'najnizsza-krajowa-2026': { en: 'minimum-wage-2026' },
                        'minimum-wage-2026': { pl: 'najnizsza-krajowa-2026', uk: 'najnizsza-krajowa-2026', ru: 'najnizsza-krajowa-2026' },
                        'najnizsza-krajowa-na-reke-2026': { en: 'minimum-wage-take-home-2026' },
                        'minimum-wage-take-home-2026': { pl: 'najnizsza-krajowa-na-reke-2026', uk: 'najnizsza-krajowa-na-reke-2026', ru: 'najnizsza-krajowa-na-reke-2026' },
                        'niebieska-karta-ue': { en: 'eu-blue-card' },
                        'eu-blue-card': { pl: 'niebieska-karta-ue', uk: 'niebieska-karta-ue', ru: 'niebieska-karta-ue' },
                        'nowy-wzor-wniosku-pobyt-czasowy': { en: 'new-residence-application-form' },
                        'new-residence-application-form': { pl: 'nowy-wzor-wniosku-pobyt-czasowy', uk: 'nowy-wzor-wniosku-pobyt-czasowy', ru: 'nowy-wzor-wniosku-pobyt-czasowy' },
                        'ochrona-czasowa-ukraincow': { en: 'temporary-protection-ukrainians' },
                        'temporary-protection-ukrainians': { pl: 'ochrona-czasowa-ukraincow', uk: 'ochrona-czasowa-ukraincow', ru: 'ochrona-czasowa-ukraincow' },
                        'odwieszenie-dzialalnosci-2025': { en: 'resuming-business-2025' },
                        'resuming-business-2025': { pl: 'odwieszenie-dzialalnosci-2025', uk: 'odwieszenie-dzialalnosci-2025', ru: 'odwieszenie-dzialalnosci-2025' },
                        'optymalizacja-podatkowa-2026': { en: 'tax-optimization-2026' },
                        'tax-optimization-2026': { pl: 'optymalizacja-podatkowa-2026', uk: 'optymalizacja-podatkowa-2026', ru: 'optymalizacja-podatkowa-2026' },
                        'podpis-epuap-2025': { en: 'epuap-signature-2025' },
                        'epuap-signature-2025': { pl: 'podpis-epuap-2025', uk: 'podpis-epuap-2025', ru: 'podpis-epuap-2025' },
                        'ubezpieczenie-zdrowotne-bez-pracy-2025': { en: 'health-insurance-without-job-2025' },
                        'health-insurance-without-job-2025': { pl: 'ubezpieczenie-zdrowotne-bez-pracy-2025', uk: 'ubezpieczenie-zdrowotne-bez-pracy-2025', ru: 'ubezpieczenie-zdrowotne-bez-pracy-2025' },
                        'wakacje-skladkowe-zus-2025': { en: 'zus-contribution-holiday-2025' },
                        'zus-contribution-holiday-2025': { pl: 'wakacje-skladkowe-zus-2025', uk: 'wakacje-skladkowe-zus-2025', ru: 'wakacje-skladkowe-zus-2025' },
                        'wnioski-pobytowe-online-mos': { en: 'residence-applications-online-mos' },
                        'residence-applications-online-mos': { pl: 'wnioski-pobytowe-online-mos', uk: 'wnioski-pobytowe-online-mos', ru: 'wnioski-pobytowe-online-mos' },
                        'zasilek-dla-bezrobotnych-2026': { en: 'unemployment-benefits-2026' },
                        'unemployment-benefits-2026': { pl: 'zasilek-dla-bezrobotnych-2026', uk: 'zasilek-dla-bezrobotnych-2026', ru: 'zasilek-dla-bezrobotnych-2026' },
                        'dzialalnosc-nierejestrowana-2026': { en: 'unregistered-activity-2026' },
                        'unregistered-activity-2026': { pl: 'dzialalnosc-nierejestrowana-2026', uk: 'dzialalnosc-nierejestrowana-2026', ru: 'dzialalnosc-nierejestrowana-2026' }
                    };

                    // Handle blog paths: blog/slug-name
                    var isBlogPost = subpage.match(/^blog\/(.+)$/);
                    var newSlug;
                    if (isBlogPost) {
                        var blogSlug = isBlogPost[1];
                        var translatedSlug = blogSlugMap[blogSlug] && blogSlugMap[blogSlug][targetLang];
                        newSlug = 'blog/' + (translatedSlug || blogSlug);
                    } else if (targetLang !== currentLang && slugMap[subpage] && slugMap[subpage][targetLang]) {
                        newSlug = slugMap[subpage][targetLang];
                    } else {
                        newSlug = subpage;
                    }
                    var newHref = targetLang === 'pl' ? '/' + newSlug + '/' : '/' + targetLang + '/' + newSlug + '/';
                    link.setAttribute('href', newHref);
                }
            });
        }
    }
});

// ===== Formularz kontaktowy — wysyłka przez API =====
function submitContactForm(e) {
    e.preventDefault();
    var form = e.target;
    var btn = form.querySelector('button[type="submit"]');
    var btnOrigText = btn.textContent;
    var name = form.querySelector('#cf-name').value.trim();
    var email = form.querySelector('#cf-email').value.trim();
    var phone = form.querySelector('#cf-phone').value.trim();
    var msgEl = form.querySelector('#cf-message');
    var message = msgEl ? msgEl.value.trim() : '';

    // Detect current language
    var pageLang = document.documentElement.lang || 'pl';
    var lang = pageLang.substring(0, 2);

    var msgs = {
        pl: { name: 'Imię musi mieć minimum 2 znaki.', phone: 'Numer telefonu musi mieć minimum 9 cyfr.', email: 'Podaj poprawny adres e-mail.', msg: 'Wiadomość musi mieć minimum 10 znaków.', sending: 'Wysyłanie...' },
        en: { name: 'Name must be at least 2 characters.', phone: 'Phone number must have at least 9 digits.', email: 'Please enter a valid email address.', msg: 'Message must be at least 10 characters.', sending: 'Sending...' },
        uk: { name: 'Ім\'я має містити мінімум 2 символи.', phone: 'Номер телефону має містити мінімум 9 цифр.', email: 'Введіть дійсну адресу електронної пошти.', msg: 'Повідомлення має містити мінімум 10 символів.', sending: 'Відправлення...' },
        ru: { name: 'Имя должно содержать минимум 2 символа.', phone: 'Номер телефона должен содержать минимум 9 цифр.', email: 'Введите действительный адрес электронной почты.', msg: 'Сообщение должно содержать минимум 10 символов.', sending: 'Отправка...' }
    };
    var m = msgs[lang] || msgs.pl;

    // Walidacja client-side
    if (name.length < 2) { alert(m.name); return; }
    var phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) { alert(m.phone); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { alert(m.email); return; }
    if (message && message.length < 10) { alert(m.msg); return; }

    btn.disabled = true;
    btn.textContent = m.sending;

    // Locale-aware thank-you redirect
    var thankYou = { pl: '/dziekujemy/', en: '/en/dziekujemy/', uk: '/uk/dziekujemy/', ru: '/ru/dziekujemy/' };

    fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, phone: phone, message: message, lang: lang })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if (data.success) {
            form.reset();
            window.location.href = thankYou[lang] || '/dziekujemy/';
        } else {
            throw new Error(data.error);
        }
    })
    .catch(function() {
        // Fallback — mailto
        var subject = encodeURIComponent('Inquiry from FDK website - ' + name);
        var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\nMessage:\n' + message);
        window.location.href = 'mailto:kontakt@firmadlakazdego.pl?subject=' + subject + '&body=' + body;
        btn.disabled = false;
        btn.textContent = btnOrigText;
    });
}

// ===== Opinie toggle =====
var opinieExpanded = false;
function toggleOpinie() {
    var container = document.getElementById('opinie-container');
    var fade = document.getElementById('opinie-fade');
    var btn = document.querySelector('#opinie-toggle button');
    if (!opinieExpanded) {
        container.style.maxHeight = 'none';
        fade.style.display = 'none';
        btn.textContent = 'Zwiń opinię';
        btn.style.background = '#32373c';
        opinieExpanded = true;
    } else {
        container.style.maxHeight = '400px';
        fade.style.display = 'block';
        btn.textContent = 'Czytaj więcej opinii';
        btn.style.background = '#00BBFF';
        opinieExpanded = false;
    }
}

// ===== Cookie accept =====
function acceptCookies() {
    localStorage.setItem('cookies-accepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}

// ===== Payment functions =====
function payWithStripe() {
    var form = document.getElementById('payment-form');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var name = document.getElementById('pay-name').value + ' ' + document.getElementById('pay-surname').value;
    var email = document.getElementById('pay-email').value;
    var title = document.getElementById('pay-title').value;
    var amount = document.getElementById('pay-amount').value;

    var stripeUrl = 'https://buy.stripe.com/8x2bJ0cJ1fBfbO84bo5gc00'
        + '?prefilled_email=' + encodeURIComponent(email)
        + '&client_reference_id=' + encodeURIComponent(title + ' | ' + name);
    window.open(stripeUrl, '_blank');
}

function payWithPayPal() {
    var form = document.getElementById('payment-form');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var name = document.getElementById('pay-name').value + ' ' + document.getElementById('pay-surname').value;
    var email = document.getElementById('pay-email').value;
    var title = document.getElementById('pay-title').value;
    var amount = document.getElementById('pay-amount').value;
    // PayPal.me lub PayPal payment link
    var paypalUrl = 'https://www.paypal.com/cgi-bin/webscr'
        + '?business=kontakt@firmadlakazdego.pl'
        + '&cmd=_xclick'
        + '&currency_code=PLN'
        + '&amount=' + encodeURIComponent(amount)
        + '&item_name=' + encodeURIComponent(title + ' - ' + name)
        + '&email=' + encodeURIComponent(email);
    window.open(paypalUrl, '_blank');
}

// ===== [pt6] Dynamic payment modal injection for subpages =====
document.addEventListener('DOMContentLoaded', function() {
    // If modal trigger exists but modal HTML is missing, inject it
    if (document.querySelector('[data-bs-target="#oplatyModal"]') && !document.getElementById('oplatyModal')) {
        var lang = (document.documentElement.lang || 'pl').substring(0, 2);
        var t = {
            pl: { comment: 'MODAL: Opłaty z formularzem płatności', title: 'Dokonaj opłaty', close: 'Zamknij', desc: 'Wypełnij formularz i wybierz metodę płatności.', fname: 'Imię', lname: 'Nazwisko', email: 'E-mail', ptitle: 'Tytuł płatności', ptitlePh: 'np. Abonament miesięczny, Konsultacja', amount: 'Kwota (PLN)', stripe: 'Zapłać przez Stripe', paypal: 'Zapłać przez PayPal' },
            en: { comment: 'MODAL: Fees with payment form', title: 'Make a payment', close: 'Close', desc: 'Fill in the form and choose a payment method.', fname: 'First name', lname: 'Last name', email: 'E-mail', ptitle: 'Payment title', ptitlePh: 'e.g. Monthly subscription, Consultation', amount: 'Amount (PLN)', stripe: 'Pay with Stripe', paypal: 'Pay with PayPal' },
            uk: { comment: 'MODAL: Оплати з формою платежу', title: 'Здійснити оплату', close: 'Закрити', desc: 'Заповніть форму та оберіть спосіб оплати.', fname: "Ім'я", lname: 'Прізвище', email: 'E-mail', ptitle: 'Призначення платежу', ptitlePh: 'напр. Місячний абонемент, Консультація', amount: 'Сума (PLN)', stripe: 'Сплатити через Stripe', paypal: 'Сплатити через PayPal' },
            ru: { comment: 'MODAL: Оплата с формой платежа', title: 'Произвести оплату', close: 'Закрыть', desc: 'Заполните форму и выберите способ оплаты.', fname: 'Имя', lname: 'Фамилия', email: 'E-mail', ptitle: 'Назначение платежа', ptitlePh: 'напр. Ежемесячный абонемент, Консультация', amount: 'Сумма (PLN)', stripe: 'Оплатить через Stripe', paypal: 'Оплатить через PayPal' }
        };
        var m = t[lang] || t.pl;
        var stripeSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" class="me-2" style="vertical-align:-3px"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19l-.892 5.494C5.259 22.897 8.109 24 11.662 24c2.586 0 4.735-.681 6.25-1.842 1.638-1.247 2.462-3.127 2.462-5.564 0-4.123-2.51-5.836-6.398-7.444z"/></svg>';
        var paypalSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="white" class="me-2" style="vertical-align:-3px"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.27 5.04-1.89 8.334-7.498 8.334h-2.19c-.524 0-.968.382-1.05.9l-1.466 9.297a.641.641 0 0 0 .633.74h3.237c.459 0 .85-.334.922-.788l.038-.195.73-4.627.047-.254a.929.929 0 0 1 .922-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.863-4.132z"/></svg>';

        var html = '<!-- ' + m.comment + ' -->'
            + '<div class="modal fade" id="oplatyModal" tabindex="-1" aria-labelledby="oplatyModalLabel">'
            + '<div class="modal-dialog modal-dialog-centered"><div class="modal-content">'
            + '<div class="modal-header border-0 pb-0">'
            + '<span class="modal-title fw-bold fs-4" id="oplatyModalLabel">' + m.title + '</span>'
            + '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + m.close + '"></button></div>'
            + '<div class="modal-body px-4 pb-4">'
            + '<p class="text-muted mb-4">' + m.desc + '</p>'
            + '<form id="payment-form">'
            + '<div class="row g-3 mb-3">'
            + '<div class="col-6"><label for="pay-name" class="form-label">' + m.fname + ' <span class="text-danger">*</span></label>'
            + '<input type="text" class="form-control" id="pay-name" name="name" required></div>'
            + '<div class="col-6"><label for="pay-surname" class="form-label">' + m.lname + ' <span class="text-danger">*</span></label>'
            + '<input type="text" class="form-control" id="pay-surname" name="surname" required></div></div>'
            + '<div class="mb-3"><label for="pay-email" class="form-label">' + m.email + ' <span class="text-danger">*</span></label>'
            + '<input type="email" class="form-control" id="pay-email" name="email" required></div>'
            + '<div class="mb-3"><label for="pay-title" class="form-label">' + m.ptitle + ' <span class="text-danger">*</span></label>'
            + '<input type="text" class="form-control" id="pay-title" name="title" placeholder="' + m.ptitlePh + '" required></div>'
            + '<div class="mb-4"><label for="pay-amount" class="form-label">' + m.amount + ' <span class="text-danger">*</span></label>'
            + '<div class="input-group"><input type="number" class="form-control form-control-lg" id="pay-amount" name="amount" min="1" step="0.01" placeholder="400.00" required>'
            + '<span class="input-group-text fw-bold">PLN</span></div></div>'
            + '<div class="d-grid gap-2">'
            + '<button type="button" class="btn btn-lg text-white fw-bold" style="background:#635bff" onclick="payWithStripe()">' + stripeSvg + ' ' + m.stripe + '</button>'
            + '<button type="button" class="btn btn-lg text-white fw-bold" style="background:#0070ba" onclick="payWithPayPal()">' + paypalSvg + ' ' + m.paypal + '</button>'
            + '</div></form></div></div></div></div>';

        document.body.insertAdjacentHTML('beforeend', html);
    }

    // ===== [pt7] Enhance contact form validation attributes =====
    var cf = document.getElementById('contact-form');
    if (cf) {
        var nameInput = cf.querySelector('#cf-name');
        var emailInput = cf.querySelector('#cf-email');
        var phoneInput = cf.querySelector('#cf-phone');
        var messageInput = cf.querySelector('#cf-message');

        if (nameInput && !nameInput.hasAttribute('minlength')) {
            nameInput.setAttribute('minlength', '2');
        }
        if (emailInput && !emailInput.hasAttribute('pattern')) {
            emailInput.setAttribute('pattern', '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$');
        }
        if (phoneInput && phoneInput.hasAttribute('required') && !phoneInput.hasAttribute('pattern')) {
            phoneInput.setAttribute('pattern', '[\\d\\s\\+\\-]{9,}');
        }
        if (messageInput && messageInput.hasAttribute('required') && !messageInput.hasAttribute('minlength')) {
            messageInput.setAttribute('minlength', '10');
        }
    }
});
