// ===== Sticky header on scroll =====
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky-top');
            } else {
                header.classList.remove('sticky-top');
            }
        });
    }

    // ===== Counter animation (count-up) =====
    const counters = document.querySelectorAll('.counter-value');
    let countersStarted = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                const current = Math.floor(eased * target);
                counter.textContent = current.toLocaleString('pl-PL');
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString('pl-PL');
                }
            }
            requestAnimationFrame(update);
        });
    }

    if (counters.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });

        const counterSection = document.querySelector('.section-counters');
        if (counterSection) observer.observe(counterSection);
    }

    // ===== Fade-in on scroll =====
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        fadeElements.forEach(function(el) {
            fadeObserver.observe(el);
        });
    }

    // ===== Calculator JDG vs FDK =====
    const calcInput = document.getElementById('calc-revenue');
    if (calcInput) {
        function updateCalculator() {
            const revenue = parseFloat(calcInput.value) || 0;
            // JDG costs
            const zusJDG = 1600; // approx. big ZUS
            const taxJDG = Math.round(revenue * 0.12); // 12% flat tax
            const bookkeepingJDG = 400;
            const totalJDG = zusJDG + taxJDG + bookkeepingJDG;
            // FDK costs
            const zusFDK = 0;
            const taxFDK = Math.round(revenue * 0.06); // 6% PIT
            const abonamentFDK = 400;
            const totalFDK = zusFDK + taxFDK + abonamentFDK;
            // Savings
            const savings = totalJDG - totalFDK;

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

    // ===== Cookie Banner =====
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner && !localStorage.getItem('cookies-accepted')) {
        cookieBanner.style.display = 'block';
    }
});

function acceptCookies() {
    localStorage.setItem('cookies-accepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}
