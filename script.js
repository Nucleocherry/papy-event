/* ═══════════════════════════════════════════════════════
   PAPY EVENT — script.js
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. ANIMATION D'ENTRÉE DU HERO ─────────────────── */
    const revealEls = document.querySelectorAll('.reveal');

    revealEls.forEach((el, i) => {
        // Délais échelonnés définis dans le CSS via animation-delay,
        // ici on déclenche juste l'animation en ajoutant la classe active
        el.style.animation = el.style.animation; // force reflow
    });

    /* ── 2. SCROLL REVEAL ───────────────────────────────── */
    const srObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Décalage léger entre chaque enfant d'un groupe
                    const siblings = entry.target.parentElement.querySelectorAll('.sr');
                    siblings.forEach((sib, i) => {
                        if (!sib.classList.contains('visible')) {
                            setTimeout(() => {
                                sib.classList.add('visible');
                            }, i * 80);
                        }
                    });
                    srObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.sr').forEach(el => srObserver.observe(el));

    /* ── 3. PARALLAX LÉGER SUR LES BLOBS ────────────────── */
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    const blob3 = document.querySelector('.blob-3');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                if (blob1) blob1.style.transform = `translate(0, ${y * .08}px)`;
                if (blob2) blob2.style.transform = `translate(0, ${-y * .05}px)`;
                if (blob3) blob3.style.transform = `translate(0, ${y * .04}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });

});
