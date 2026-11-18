/* =====================================================================
   Page content + interactions (everything except the sea and the
   scroll choreography, which live in sea.js and motion.js).
   ===================================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const P = DQ.PROFILE;

  DQ.iconFor = (name) => {
    const map = DQ.CHIP_ICONS;
    if (map[name]) return map[name];
    const key = Object.keys(map).find((k) => name.startsWith(k));
    return key ? map[key] : 'fa-solid fa-circle-nodes';
  };
  const chips = (list) => `<div class="chips">${list.map((t) => `<span class="chip"><i class="${DQ.iconFor(t)}"></i>${esc(t)}</span>`).join('')}</div>`;

  document.body.insertAdjacentHTML('afterbegin', DQ.ART.symbols);

  /* --------------------------------------------------------------- hero */
  $('#hero-stats').innerHTML = P.highlights.map(([n, l]) => `<li><b>${esc(n)}</b><span>${esc(l)}</span></li>`).join('');
  const ORBIT = ['fa-solid fa-dharmachakra', 'fa-brands fa-docker', 'fa-brands fa-aws', 'fa-brands fa-microsoft', 'fa-brands fa-google', 'fa-solid fa-cubes', 'fa-brands fa-jenkins', 'fa-brands fa-gitlab'];
  $('#orbit').insertAdjacentHTML('beforeend', `<div class="orbit-spin">${ORBIT.map((ic, i) => {
    const a = (i / ORBIT.length) * Math.PI * 2;
    return `<span class="orbit-chip" style="left:${(50 + Math.cos(a) * 50).toFixed(2)}%;top:${(50 + Math.sin(a) * 50).toFixed(2)}%"><i class="${ic}"></i></span>`;
  }).join('')}</div>`);
  $('#clouds-far').innerHTML = DQ.ART.cloudRow(7, 's-cloud', 1);
  $('#clouds-mid').innerHTML = DQ.ART.cloudRow(5, 's-cloud', 2);
  $('#clouds-near').innerHTML = DQ.ART.cloudRow(4, 's-cloud', 3);
  $('#exp-clouds').innerHTML = DQ.ART.cloudRow(8, 's-cloud', 4);
  $('#golden-bank').innerHTML = DQ.ART.cloudRow(9, 's-cloud-warm', 5);
  $('#cloud-floor').innerHTML = DQ.ART.cloudRow(9, 's-cloud-gold', 6);
  $('.dive-left').innerHTML = DQ.ART.cloudRow(6, 's-cloud', 7);
  $('.dive-right').innerHTML = DQ.ART.cloudRow(6, 's-cloud', 8);

  /* "download from the cloud": rain + a falling PDF, then the real download */
  const cvCloud = $('#cv-cloud');
  $('.cv-rain', cvCloud).innerHTML = Array.from({ length: 14 }, (_, i) => `<i style="left:${8 + i * 6.3}%;animation-delay:${(i % 5) * 0.12}s"></i>`).join('');
  cvCloud.addEventListener('click', () => {
    cvCloud.classList.remove('raining'); void cvCloud.offsetWidth; cvCloud.classList.add('raining');
    setTimeout(() => cvCloud.classList.remove('raining'), 2200);
  });

  /* --------------------------------------------------------- experience */
  $('#plane').innerHTML = DQ.ART.plane;
  $('#timeline').innerHTML = DQ.EXPERIENCE.slice().reverse().map((e, i) => `
    <li class="tl-item ${i % 2 ? 'right' : 'left'} ${e.now ? 'is-now' : ''}">
      <span class="tl-node"><i class="fa-solid ${e.icon}"></i></span>
      <article class="tl-card">
        <svg class="tl-puff" viewBox="0 0 220 120" aria-hidden="true"><use href="#s-cloud"/></svg>
        <header>
          <span class="tl-period">${e.now ? '<span class="pulse-dot"></span>' : ''}${esc(e.period)}</span>
          <h3>${esc(e.role)}</h3>
          <p class="tl-org">${esc(e.org)}${e.place ? ` · ${esc(e.place)}` : ''}</p>
        </header>
        <ul>${e.bullets.map((b) => `<li>${md(b)}</li>`).join('')}</ul>
        ${e.tags.length ? chips(e.tags) : ''}
      </article>
    </li>`).join('');

  /* ----------------------------------------------------------- projects */
  const HUES = { 'eks-ai': 220, gitlab: 18, 'ecs-tf': 265, 'eks-rca': 190, 'ci-grafana': 150, deluxe: 340, sra: 205, netnumber: 45 };
  $('#proj-track').innerHTML = DQ.PROJECTS.map((p) => `
    <article class="proj-card ${p.now ? 'is-now' : ''}" style="--h:${HUES[p.id] || 220}">
      <div class="proj-art">
        <svg class="pa-cloud c1" viewBox="0 0 220 120" aria-hidden="true"><use href="#s-cloud"/></svg>
        <svg class="pa-cloud c2" viewBox="0 0 220 120" aria-hidden="true"><use href="#s-cloud"/></svg>
        <span class="pa-icon"><i class="${p.icon}"></i></span>
        <span class="pa-badge">${p.now ? '<span class="pulse-dot"></span>Now · OpsTree' : esc(p.org)}</span>
      </div>
      <div class="proj-body">
        <h3>${esc(p.title)}</h3>
        <p class="proj-sub">${esc(p.sub)}</p>
        <ul>${p.bullets.map((b) => `<li>${md(b)}</li>`).join('')}</ul>
        ${chips(p.tags)}
      </div>
    </article>`).join('');

  /* ------------------------------------------------------------ inferno */
  const flames = (n) => Array.from({ length: n }, (_, i) => `<svg class="flame" style="left:${(4 + i * (92 / (n - 1))).toFixed(1)}%;--d:${((i * 0.37) % 1).toFixed(2)}s;--s:${(0.75 + ((i * 7) % 5) * 0.08).toFixed(2)}" viewBox="0 0 60 90"><use href="#s-flame"/></svg>`).join('');
  const fixed = new Set();
  $('#fires-total').textContent = DQ.PROBLEMS.length;
  $('#fire-grid').innerHTML = DQ.PROBLEMS.map((p) => `
    <article class="fire-card ${p.boss ? 'is-boss' : ''}" data-id="${p.id}">
      <div class="flames" aria-hidden="true">${flames(p.boss ? 9 : 6)}</div>
      <div class="smoke" aria-hidden="true"><i></i><i></i><i></i></div>
      <header class="fc-head">
        <span class="fc-icon"><i class="fa-solid ${p.icon}"></i></span>
        <div><span class="fc-where">${p.boss ? 'Boss · ' : ''}${esc(p.where)}</span><h3>${esc(p.name)}</h3></div>
        <span class="fc-status">On fire</span>
      </header>
      <p class="fc-threat">${esc(p.threat)}</p>
      <div class="fc-sec"><h4><i class="fa-solid fa-fire"></i> The problem</h4><p>${md(p.problem)}</p></div>
      <div class="fc-reveal"><div>
        <div class="fc-sec fix"><h4><i class="fa-solid fa-screwdriver-wrench"></i> The fix</h4><p>${md(p.fix)}</p></div>
        <div class="fc-sec res"><h4><i class="fa-solid fa-${p.ongoing ? 'hourglass-half' : 'circle-check'}"></i> ${p.ongoing ? 'Status' : 'The result'}</h4><p>${md(p.result)}</p></div>
      </div></div>
      <button class="btn fc-btn"><i class="fa-solid fa-fire-extinguisher"></i> Deploy the fix</button>
    </article>`).join('');
  $('#fire-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.fc-btn');
    if (!btn) return;
    const card = btn.closest('.fire-card');
    const p = DQ.PROBLEMS.find((x) => x.id === card.dataset.id);
    if (card.classList.contains('is-fixed')) {
      card.classList.remove('is-fixed', 'is-ongoing'); fixed.delete(p.id);
      btn.innerHTML = '<i class="fa-solid fa-fire-extinguisher"></i> Deploy the fix';
      $('.fc-status', card).textContent = 'On fire';
    } else {
      card.classList.add('is-fixed'); if (p.ongoing) card.classList.add('is-ongoing'); fixed.add(p.id);
      btn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Show the fire again';
      $('.fc-status', card).textContent = p.ongoing ? 'Contained' : 'Resolved';
    }
    $('#fires-out').textContent = fixed.size;
    $('#fire-bar').style.width = (fixed.size / DQ.PROBLEMS.length * 100) + '%';
    $('#problems').classList.toggle('cooled', fixed.size === DQ.PROBLEMS.length);
  });

  /* embers rising through the inferno (paused when off screen) */
  (() => {
    const cv = $('#embers');
    const ctx = cv.getContext('2d');
    let w = 0, h = 0, parts = [], running = false, raf = 0;
    const size = () => { w = cv.width = cv.offsetWidth; h = cv.height = cv.offsetHeight; };
    const spawn = (anyY) => ({ x: Math.random() * w, y: anyY ? Math.random() * h : h + 10, r: 1 + Math.random() * 2.6, vy: 0.4 + Math.random() * 1.2, vx: (Math.random() - 0.5) * 0.4, a: 0.4 + Math.random() * 0.6 });
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const cool = $('#problems').classList.contains('cooled');
      for (const p of parts) {
        p.y -= p.vy * (cool ? 0.35 : 1); p.x += p.vx + Math.sin(p.y / 40) * 0.3;
        if (p.y < -10) Object.assign(p, spawn(false));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = cool ? `rgba(147,197,253,${p.a})` : `rgba(255,${120 + Math.round(p.r * 30)},40,${p.a})`;
        ctx.shadowColor = cool ? '#93c5fd' : '#ff6a00'; ctx.shadowBlur = 8;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(frame);
    };
    size(); window.addEventListener('resize', size);
    parts = Array.from({ length: Math.min(90, Math.round(w / 14)) }, () => spawn(true));
    if (reduced) { frame(); return; }
    new IntersectionObserver(([en]) => {
      running = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) { size(); raf = requestAnimationFrame(frame); }
    }).observe(cv);
  })();
  $('.spires', $('#problems')).innerHTML = DQ.ART.spire(false) + DQ.ART.spire(true);

  /* ------------------------------------------------------------- heaven */
  $('#gates').innerHTML = DQ.ART.gates();
  $('#angel-grid').innerHTML = DQ.REVIEWS.map((r, i) => `
    <figure class="angel-card" style="--c:${r.color};--i:${i}">
      <div class="halo-avatar"><span class="halo"></span><span class="av">${esc(r.name[0])}</span></div>
      <blockquote>“${esc(r.text)}”</blockquote>
      <figcaption><b>${esc(r.name)}</b><span>${esc(r.title)}</span></figcaption>
    </figure>`).join('');
  $('.motes', $('#reviews')).innerHTML = Array.from({ length: 24 }, (_, i) => `<i style="left:${(i * 41) % 100}%;top:${(i * 23) % 100}%;--d:${(i % 7) * 0.8}s"></i>`).join('');

  /* ------------------------------------------------------------ contact */
  $('#contact-grid').innerHTML = `
    <a class="contact-card" href="mailto:${P.email}"><i class="fa-solid fa-envelope"></i><span><b>Email</b>${esc(P.email)}</span></a>
    <a class="contact-card" href="${P.linkedin}" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin"></i><span><b>LinkedIn</b>in/ipreetgs</span></a>
    <a class="contact-card" href="${P.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i><span><b>GitHub</b>ipreetgs</span></a>
    <a class="contact-card" href="${P.instagram}" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i><span><b>Instagram</b>@__gurpreet__23</span></a>
    <a class="contact-card cta" href="${P.cv}" download data-cv><i class="fa-solid fa-cloud-arrow-down"></i><span><b>Résumé</b>Download CV (PDF)</span></a>
    <button class="contact-card" id="copy-email"><i class="fa-regular fa-copy"></i><span><b>Copy email</b><em>one click</em></span></button>`;
  $('#copy-email').addEventListener('click', (e) => {
    const t = e.currentTarget;
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(P.email).then(() => { $('em', t).textContent = 'Copied ✓'; }, () => {});
  });

  /* ---------------------------------------------------------------- nav */
  const nav = $('#nav');
  const toggle = $('#nav-toggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}"></i>`;
  });
  $$('#nav-links a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));

  /* which world is on screen: nav highlight, nav colour, altitude meter */
  const DARK = new Set(['home', 'skills', 'problems']);
  const sections = $$('main > section');
  let active = '';
  const onScroll = () => {
    const mid = window.innerHeight * 0.4;
    let cur = sections[0];
    for (const s of sections) if (s.getBoundingClientRect().top <= mid) cur = s;
    nav.classList.toggle('scrolled', window.scrollY > 20);
    if (cur.id === active) return;
    active = cur.id;
    nav.classList.toggle('on-dark', DARK.has(active));
    document.body.dataset.world = active;
    $$('#nav-links a').forEach((a) => a.classList.toggle('active', a.dataset.sec === active));
    $$('#meter-list li').forEach((li) => li.classList.toggle('on', li.dataset.sec === active || (active === 'contact' && li.dataset.sec === 'reviews')));
    $('#meter-alt').textContent = cur.dataset.alt || '';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  DQ.Sea.init();
})();
