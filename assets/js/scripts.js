// Sticky header on scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky-top');
        } else {
            header.classList.remove('sticky-top');
        }
    });
});
