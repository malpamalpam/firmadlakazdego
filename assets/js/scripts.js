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
            var zusJDG = 1600;
            var taxJDG = Math.round(revenue * 0.12);
            var bookJDG = 400;
            var totalJDG = zusJDG + taxJDG + bookJDG;
            var taxFDK = Math.round(revenue * 0.06);
            var aboFDK = revenue <= 10000 ? 400 : (revenue <= 30000 ? 700 : 1050);
            var totalFDK = taxFDK + aboFDK;
            var savings = Math.max(0, totalJDG - totalFDK);

            var el = function(id) { return document.getElementById(id); };
            if (el('calc-display')) el('calc-display').textContent = revenue.toLocaleString('pl-PL');
            if (el('jdg-zus')) el('jdg-zus').textContent = zusJDG.toLocaleString('pl-PL') + currSuffix;
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

    // ===== Language switcher — preserve current subpage =====
    var langLinks = document.querySelectorAll('.lang-switcher-btn + .dropdown-menu a.dropdown-item, .lang-switcher-btn ~ .dropdown-menu a.dropdown-item');
    if (langLinks.length > 0) {
        var path = window.location.pathname;
        // Extract current language prefix and subpage
        var langMatch = path.match(/^\/(uk|en|ru)(\/|$)/);
        var currentLang = langMatch ? langMatch[1] : 'pl';
        // Get the subpage part (without language prefix, without .html)
        var subpage = path.replace(/^\/(uk|en|ru)/, '').replace(/\.html$/, '').replace(/^\/+/, '');

        // Only update links if we're on a subpage (not homepage)
        if (subpage && subpage !== 'index' && subpage !== '') {
            langLinks.forEach(function(link) {
                var href = link.getAttribute('href');
                if (!href || href === '#') return;

                // Check if this link points to a language homepage
                var targetLang = null;
                if (href === '/' || href === '../' || href === '/index.html') targetLang = 'pl';
                if (href.match(/^\/?uk\/?$/) || href === '../uk/' || href === './') {
                    if (href === './' && currentLang === 'uk') targetLang = 'uk';
                    else if (href !== './') targetLang = 'uk';
                }
                if (href.match(/^\/?en\/?$/) || href === '../en/') targetLang = 'en';
                if (href.match(/^\/?ru\/?$/) || href === '../ru/') targetLang = 'ru';
                if (href === './' && currentLang === 'en') targetLang = 'en';
                if (href === './' && currentLang === 'ru') targetLang = 'ru';

                if (targetLang) {
                    var newHref = targetLang === 'pl' ? '/' + subpage : '/' + targetLang + '/' + subpage;
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
    var name = form.querySelector('#cf-name').value;
    var email = form.querySelector('#cf-email').value;
    var phone = form.querySelector('#cf-phone').value;
    var message = form.querySelector('#cf-message').value;

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
            btn.textContent = 'Wysłano! ✓';
            btn.style.backgroundColor = '#28a745';
            setTimeout(function() {
                btn.disabled = false;
                btn.textContent = 'Wyślij wiadomość';
                btn.style.backgroundColor = '';
            }, 4000);
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
        btn.textContent = 'Wyślij wiadomość';
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
