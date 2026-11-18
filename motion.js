/* =====================================================================
   Scroll choreography with GSAP + ScrollTrigger. Everything here is an
   enhancement: without GSAP (or with reduced motion) the page is static
   and fully readable.
   ===================================================================== */
(() => {
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  if (!gsap || !ST) { document.documentElement.classList.add('no-gsap'); return; }
  gsap.registerPlugin(ST);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const mm = gsap.matchMedia();

  mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' }, (ctx) => {
    const { motion, desktop } = ctx.conditions;
    if (!motion) return;

    /* ---------------- hero: intro + parallax clouds ---------------- */
    gsap.from('.hero-copy > *', { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.1 });
    gsap.from('.hero-visual', { scale: 0.85, opacity: 0, duration: 1.3, ease: 'power3.out', delay: 0.25 });
    $$('#home .cloud-layer').forEach((layer) => {
      const depth = Number(layer.dataset.depth);
      gsap.to(layer, { yPercent: -60 * depth, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } });
    });
    gsap.to('#home .sun', { y: 160, scale: 1.15, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero', { y: -80, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '#home', start: 'center center', end: 'bottom top', scrub: true } });

    /* pointer parallax on the hero clouds (desktop only) */
    if (desktop) {
      const layers = $$('#home .cloud-layer').map((l) => ({ l, d: Number(l.dataset.depth), x: gsap.quickTo(l, 'x', { duration: 1.2, ease: 'power3' }) }));
      const orbit = gsap.quickTo('#orbit', 'x', { duration: 1.4, ease: 'power3' });
      const onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        layers.forEach(({ d, x }) => x(-nx * 60 * d));
        orbit(nx * 14);
      };
      window.addEventListener('pointermove', onMove);
      ctx.add(() => () => window.removeEventListener('pointermove', onMove));
    }

    /* ---------------- section headings ---------------- */
    $$('.sec-head').forEach((h) => {
      gsap.from(h.children, { y: 36, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 82%' } });
    });

    /* ---------------- experience: paper plane follows the flight ---------------- */
    const flight = $('#flight');
    gsap.fromTo('#flight-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: flight, start: 'top 60%', end: 'bottom 60%', scrub: true } });
    gsap.fromTo('#plane', { y: 0 }, {
      y: () => flight.offsetHeight - 60, ease: 'none',
      scrollTrigger: { trigger: flight, start: 'top 60%', end: 'bottom 60%', scrub: 0.6, invalidateOnRefresh: true,
        onUpdate: (self) => gsap.set('#plane', { x: Math.sin(self.progress * Math.PI * 6) * (desktop ? 26 : 8), rotation: 70 + Math.cos(self.progress * Math.PI * 6) * 14 }) }
    });
    $$('.tl-item').forEach((item) => {
      const fromX = desktop ? (item.classList.contains('left') ? -80 : 80) : 40;
      gsap.from($('.tl-card', item), { x: fromX, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 78%' } });
      gsap.from($('.tl-node', item), { scale: 0, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: item, start: 'top 72%' } });
    });
    gsap.to('#exp-clouds', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '#experience', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* ---------------- projects: horizontal glide on desktop ---------------- */
    if (desktop) {
      const track = $('#proj-track');
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '#hscroll', start: 'center center', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      $$('.proj-card .pa-icon').forEach((ic) => gsap.to(ic, { y: -10, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: Math.random() }));
    } else {
      gsap.from('.proj-card', { y: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#hscroll', start: 'top 80%' } });
    }
    gsap.to('#golden-bank', { yPercent: -25, ease: 'none', scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* ---------------- cloud dive: the clouds part, the sea appears ---------------- */
    const dive = gsap.timeline({ scrollTrigger: { trigger: '#cloud-dive', start: 'top bottom', end: 'bottom top', scrub: true } });
    dive.fromTo('.dive-left', { xPercent: 0 }, { xPercent: -75, ease: 'power1.in' }, 0)
      .fromTo('.dive-right', { xPercent: 0 }, { xPercent: 75, ease: 'power1.in' }, 0)
      .fromTo('.dive-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 0.15)
      .to('.dive-text', { opacity: 0, y: -30, duration: 0.3 }, 0.6);

    /* ---------------- the sea ---------------- */
    gsap.from('#sea-scene', { y: 80, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '#sea-wrap', start: 'top 85%' } });
    gsap.from('#helm', { rotation: -120, scale: 0.6, opacity: 0, duration: 1.4, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.helm-zone', start: 'top 80%' } });
    gsap.from('#helm-panel', { x: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.helm-zone', start: 'top 80%' } });
    gsap.from('.pods-zone > *', { y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.pods-zone', start: 'top 85%' } });
    gsap.from('.cert', { y: 30, opacity: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '#certs', start: 'top 85%' } });

    /* ---------------- inferno ---------------- */
    gsap.from('.fire-card', { y: 60, opacity: 0, rotation: (i) => (i % 2 ? 2 : -2), stagger: 0.08, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '#fire-grid', start: 'top 85%' } });
    gsap.fromTo('#problems .spire-l', { xPercent: -40 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '#problems', start: 'top bottom', end: 'top top', scrub: true } });
    gsap.fromTo('#problems .spire-r', { xPercent: 40 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '#problems', start: 'top bottom', end: 'top top', scrub: true } });

    /* ---------------- ascension: light floods in ---------------- */
    const up = gsap.timeline({ scrollTrigger: { trigger: '#ascend', start: 'top bottom', end: 'bottom top', scrub: true } });
    up.fromTo('#ascend-beam', { scaleX: 0.05, opacity: 0.4 }, { scaleX: 1, opacity: 1, ease: 'power2.in' }, 0)
      .fromTo('.ascend-text', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 0.2)
      .to('.ascend-text', { opacity: 0, y: -40, duration: 0.3 }, 0.65);

    /* ---------------- heaven ---------------- */
    gsap.from('#gates', { y: 120, opacity: 0, scale: 0.9, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: '#reviews', start: 'top 70%' } });
    gsap.from('.angel-card', { y: 70, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '#angel-grid', start: 'top 85%' } });
    gsap.to('#cloud-floor', { yPercent: -20, ease: 'none', scrollTrigger: { trigger: '#reviews', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* ---------------- contact ---------------- */
    gsap.from('.contact > *', { y: 40, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '#contact', start: 'top 75%' } });
    gsap.from('.contact-card', { y: 30, opacity: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '#contact-grid', start: 'top 88%' } });
  });

  /* fonts and images change layout heights: re-measure once loaded */
  window.addEventListener('load', () => ST.refresh());
})();
