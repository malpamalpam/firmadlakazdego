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

    // ===== Calculator JDG vs FDK =====
    var calcInput = document.getElementById('calc-revenue');
    if (calcInput) {
        function updateCalculator() {
            var revenue = parseFloat(calcInput.value) || 0;
            var zusJDG = 1600;
            var taxJDG = Math.round(revenue * 0.12);
            var bookJDG = 400;
            var totalJDG = zusJDG + taxJDG + bookJDG;
            var taxFDK = Math.round(revenue * 0.06);
            var aboFDK = 400;
            var totalFDK = taxFDK + aboFDK;
            var savings = totalJDG - totalFDK;

            document.getElementById('jdg-zus').textContent = zusJDG.toLocaleString('pl-PL') + ' zł';
            document.getElementById('jdg-tax').textContent = taxJDG.toLocaleString('pl-PL') + ' zł';
            document.getElementById('jdg-total').textContent = totalJDG.toLocaleString('pl-PL') + ' zł';
            document.getElementById('fdk-tax').textContent = taxFDK.toLocaleString('pl-PL') + ' zł';
            document.getElementById('fdk-total').textContent = totalFDK.toLocaleString('pl-PL') + ' zł';
            document.getElementById('calc-savings').textContent = Math.max(0, savings).toLocaleString('pl-PL') + ' zł';
        }
        calcInput.addEventListener('input', updateCalculator);
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

    // ===== Cookie Banner =====
    var cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner && !localStorage.getItem('cookies-accepted')) {
        cookieBanner.style.display = 'block';
    }
});

// ===== [2] Formularz kontaktowy — mailto: fallback =====
// WŁAŚCICIEL: Możesz podłączyć Formspree (action="https://formspree.io/f/TWOJ-ID")
// lub EmailJS (emailjs.init('KEY'), emailjs.sendForm(...))
function sendEmail(e) {
    e.preventDefault();
    var form = e.target;
    var name = form.querySelector('#cf-name').value;
    var email = form.querySelector('#cf-email').value;
    var phone = form.querySelector('#cf-phone').value;
    var message = form.querySelector('#cf-message').value;

    var subject = encodeURIComponent('Zapytanie ze strony FDK - ' + name);
    var body = encodeURIComponent(
        'Imię: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Telefon: ' + phone + '\n\n' +
        'Wiadomość:\n' + message
    );

    window.location.href = 'mailto:kontakt@firmadlakazdego.pl?subject=' + subject + '&body=' + body;
}

// ===== Cookie accept =====
function acceptCookies() {
    localStorage.setItem('cookies-accepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}
