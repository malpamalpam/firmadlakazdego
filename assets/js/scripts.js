// ===== Sticky header on scroll =====
document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');
    if (header) {
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
        var currSuffix = (pageLang === 'uk') ? ' зл' : ' zł';

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
        'programisci':    { en: 'programmers',      uk: 'programisty',    ru: 'programmisty' },
        'programmers':    { pl: 'programisci',      uk: 'programisty',    ru: 'programmisty' },
        'programisty':    { pl: 'programisci',      en: 'programmers',    ru: 'programmisty' },
        'programmisty':   { pl: 'programisci',      en: 'programmers',    uk: 'programisty' },
        'architekci':     { en: 'architects',       uk: 'architekty',     ru: 'arhitektory' },
        'architects':     { pl: 'architekci',       uk: 'architekty',     ru: 'arhitektory' },
        'architekty':     { pl: 'architekci',       en: 'architects',     ru: 'arhitektory' },
        'arhitektory':    { pl: 'architekci',       en: 'architects',     uk: 'architekty' },
        'tlumacze':       { en: 'translators',      uk: 'perekladachi',   ru: 'perevodchiki' },
        'translators':    { pl: 'tlumacze',         uk: 'perekladachi',   ru: 'perevodchiki' },
        'perekladachi':   { pl: 'tlumacze',         en: 'translators',    ru: 'perevodchiki' },
        'perevodchiki':   { pl: 'tlumacze',         en: 'translators',    uk: 'perekladachi' },
        'muzycy':         { en: 'musicians',        uk: 'muzykanty',      ru: 'muzykanty' },
        'musicians':      { pl: 'muzycy',           uk: 'muzykanty',      ru: 'muzykanty' },
        'muzykanty':      { pl: 'muzycy',           en: 'musicians' },
        'inne-branze':       { en: 'other-industries',  uk: 'inshi-galuzi',   ru: 'drugie-otrasli' },
        'other-industries':  { pl: 'inne-branze',       uk: 'inshi-galuzi',   ru: 'drugie-otrasli' },
        'inshi-galuzi':      { pl: 'inne-branze',       en: 'other-industries', ru: 'drugie-otrasli' },
        'drugie-otrasli':    { pl: 'inne-branze',       en: 'other-industries', uk: 'inshi-galuzi' },
        'cudzoziemcy':    { en: 'foreigners',       uk: 'inozemtsi',      ru: 'inostrantsy' },
        'foreigners':     { pl: 'cudzoziemcy',      uk: 'inozemtsi',      ru: 'inostrantsy' },
        'inozemtsi':      { pl: 'cudzoziemcy',      en: 'foreigners',     ru: 'inostrantsy' },
        'inostrantsy':    { pl: 'cudzoziemcy',      en: 'foreigners',     uk: 'inozemtsi' },
        'dla-pracodawcow': { en: 'employers',       uk: 'robotodavtsi',   ru: 'rabotodateli' },
        'employers':       { pl: 'dla-pracodawcow', uk: 'robotodavtsi',   ru: 'rabotodateli' },
        'robotodavtsi':    { pl: 'dla-pracodawcow', en: 'employers',      ru: 'rabotodateli' },
        'rabotodateli':    { pl: 'dla-pracodawcow', en: 'employers',      uk: 'robotodavtsi' },
        'o-nas':          { en: 'about',            uk: 'pro-nas' },
        'about':          { pl: 'o-nas',            uk: 'pro-nas',        ru: 'o-nas' },
        'pro-nas':        { pl: 'o-nas',            en: 'about',          ru: 'o-nas' },
        'kontakt':        { en: 'contact' },
        'contact':        { pl: 'kontakt',          uk: 'kontakt',        ru: 'kontakt' },
        'regulamin':      { en: 'terms',            uk: 'reglament',      ru: 'reglament' },
        'terms':          { pl: 'regulamin',        uk: 'reglament',      ru: 'reglament' },
        'reglament':      { pl: 'regulamin',        en: 'terms' },
        'jak-dzialamy':       { en: 'how-it-works',       uk: 'yak-my-pratsyuyemo', ru: 'kak-my-rabotaem' },
        'how-it-works':       { pl: 'jak-dzialamy',       uk: 'yak-my-pratsyuyemo', ru: 'kak-my-rabotaem' },
        'yak-my-pratsyuyemo': { pl: 'jak-dzialamy',       en: 'how-it-works',       ru: 'kak-my-rabotaem' },
        'kak-my-rabotaem':    { pl: 'jak-dzialamy',       en: 'how-it-works',       uk: 'yak-my-pratsyuyemo' },
        'inkubator-przedsiebiorczosci': { en: 'incubator', uk: 'inkubator', ru: 'inkubator' },
        'incubator':      { pl: 'inkubator-przedsiebiorczosci', uk: 'inkubator', ru: 'inkubator' },
        'inkubator':      { pl: 'inkubator-przedsiebiorczosci', en: 'incubator' },
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
    if (langLinks.length > 0) {
        var path = window.location.pathname;
        var langMatch = path.match(/^\/(uk|en|ru)(\/|$)/);
        var currentLang = langMatch ? langMatch[1] : 'pl';
        var subpage = path.replace(/^\/(uk|en|ru)/, '').replace(/\.html$/, '').replace(/^\/+/, '');

        if (subpage && subpage !== 'index' && subpage !== '') {
            langLinks.forEach(function(link) {
                var href = link.getAttribute('href');
                if (!href || href === '#') return;

                var targetLang = null;
                if (href === '/' || href === '../') targetLang = 'pl';
                else if (href.match(/^\/?en\/?$/) || href === '../en/') targetLang = 'en';
                else if (href.match(/^\/?uk\/?$/) || href === '../uk/') targetLang = 'uk';
                else if (href.match(/^\/?ru\/?$/) || href === '../ru/') targetLang = 'ru';
                else if (href === './') targetLang = currentLang;

                if (targetLang) {
                    var newSlug = subpage;
                    if (targetLang !== currentLang && slugMap[subpage] && slugMap[subpage][targetLang]) {
                        newSlug = slugMap[subpage][targetLang];
                    }
                    var newHref = targetLang === 'pl' ? '/' + newSlug : '/' + targetLang + '/' + newSlug;
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
    var name = form.querySelector('#cf-name').value.trim();
    var email = form.querySelector('#cf-email').value.trim();
    var phone = form.querySelector('#cf-phone').value.trim();
    var message = form.querySelector('#cf-message').value.trim();

    // Walidacja client-side
    if (name.length < 2) { alert('Imię musi mieć minimum 2 znaki.'); return; }
    var phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) { alert('Numer telefonu musi mieć minimum 9 cyfr.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { alert('Podaj poprawny adres e-mail.'); return; }
    if (message && message.length < 10) { alert('Wiadomość musi mieć minimum 10 znaków.'); return; }

    btn.disabled = true;
    btn.textContent = 'Wysyłanie...';

    fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, phone: phone, message: message })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if (data.success) {
            form.reset();
            window.location.href = '/dziekujemy/';
        } else {
            throw new Error(data.error);
        }
    })
    .catch(function() {
        // Fallback — mailto
        var subject = encodeURIComponent('Zapytanie ze strony FDK - ' + name);
        var body = encodeURIComponent('Imię: ' + name + '\nEmail: ' + email + '\nTelefon: ' + phone + '\n\nWiadomość:\n' + message);
        window.location.href = 'mailto:kontakt@firmadlakazdego.pl?subject=' + subject + '&body=' + body;
        btn.disabled = false;
        btn.textContent = 'Umów bezpłatną konsultację';
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
