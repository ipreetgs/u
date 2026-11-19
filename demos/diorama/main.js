/* =====================================================================
   Paper-cut diorama: SCENES, CONTENT & CHOREOGRAPHY
   Content comes from ../../data.js (window.DQ). Art from art.js.
   ===================================================================== */
(function () {
  'use strict';
  const DQ = window.DQ, A = window.ART;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CV = '../../' + DQ.PROFILE.cv;

  function chipIcon(t) {
    const m = DQ.CHIP_ICONS;
    if (m[t]) return m[t];
    const k = Object.keys(m).find((key) => t.indexOf(key) === 0);
    return k ? m[k] : '';
  }
  const chips = (tags) => tags.length ? `<ul class="chips">${tags.map((t) => {
    const ic = chipIcon(t);
    return `<li>${ic ? `<i class="${ic}" aria-hidden="true"></i>` : ''}${esc(t)}</li>`;
  }).join('')}</ul>` : '';
  const bullets = (b) => `<ul class="bullets">${b.map((x) => `<li>${md(x)}</li>`).join('')}</ul>`;

  /* ------------------------------------------------------------------
     SCENERY
     ------------------------------------------------------------------ */
  const L = A.layer;
  const puff = (fill, cls, style) => `<div class="puff ${cls || ''}" style="${style || ''}"><svg viewBox="0 0 200 100"><path fill="${fill}" d="${A.CLOUD}"/></svg></div>`;
  const puff2 = (fill, cls, style) => `<div class="puff ${cls || ''}" style="${style || ''}"><svg viewBox="0 0 210 100"><path fill="${fill}" d="${A.CLOUD2}"/></svg></div>`;

  const ART = {
    sky: () => `
      <div class="sun" style="--d:.15"><svg viewBox="-160 -160 320 320"><g fill="#ffd86b">${A.SUN(92, 18)}</g><circle r="92" fill="#ffb627"/><circle r="70" fill="#ffc94a"/></svg></div>
      ${puff('#e6f5fd', 'drift d-slow', 'left:3%;top:22%;width:clamp(120px,13vw,200px);--d:.25')}
      ${puff2('#bfe4f7', 'drift d-mid', 'left:56%;top:13%;width:clamp(90px,9vw,140px);--d:.3')}
      ${L({ h: 460, d: 0.3, cls: 'band hinge', shade: 'rgba(14,60,120,.35)', body: `<path fill="#4fa6e2" d="${A.scallop(1600, 460, 80, 74, 40, 3)}"/>` })}
      ${puff('#ffffff', 'drift d-fast', 'left:40%;bottom:300px;width:clamp(100px,10vw,150px);--d:.5')}
      ${L({ h: 340, d: 0.55, cls: 'band hinge', shade: 'rgba(10,70,110,.35)', body: `<path fill="#33b6c4" d="${A.scallop(1600, 340, 70, 58, 46, 5)}"/>` })}
      <div class="plane-fly" style="--d:.7">${A.PLANE}</div>
      ${L({ h: 220, d: 0.8, cls: 'band hinge', shade: 'rgba(10,90,90,.35)', body: `<path fill="#8fe3c8" d="${A.scallop(1600, 220, 60, 50, 36, 7)}"/>` })}
      ${L({ h: 110, d: 1.3, cls: 'band lens', shade: 'rgba(20,90,110,.3)', body: `<path fill="#a8def0" d="${A.scallop(1600, 110, 50, 44, 30, 9)}"/>` })}`,

    clouds: () => `
      ${puff2('#ffffff', 'drift d-mid', 'right:12%;top:5%;width:170px;--d:.3')}
      ${puff('#ffffff', 'drift d-slow', 'left:-3%;top:24%;width:220px;--d:.4')}
      ${puff2('#e9f8fc', 'drift d-mid', 'right:-2%;top:46%;width:260px;--d:.6')}
      ${puff('#d3f1f8', 'drift d-fast', 'left:4%;top:70%;width:180px;--d:.5')}
      <div class="plane-fly plane-2" style="--d:.6">${A.PLANE}</div>
      ${L({ h: 200, d: 0.5, cls: 'band hinge', shade: 'rgba(20,90,120,.3)', body: `<path fill="#6cc9d6" d="${A.scallop(1600, 200, 60, 56, 40, 23)}"/>` })}
      ${L({ h: 110, d: 1.0, cls: 'band hinge', shade: 'rgba(20,90,120,.3)', body: `<path fill="#f3fbfd" d="${A.scallop(1600, 110, 50, 46, 30, 25)}"/>` })}`,

    goldtop: () => `
      ${puff('#ffd2a1', 'drift d-slow', 'right:5%;top:9%;width:200px;--d:.3')}
      ${puff2('#ffc58a', 'drift d-mid', 'left:52%;top:5%;width:150px;--d:.4')}
      <div class="bird b1" style="--d:.6">${A.BIRD('#7a2e14')}</div><div class="bird b2" style="--d:.8">${A.BIRD('#7a2e14')}</div>`,

    golden: () => `
      <div class="gsun" style="--d:.1"><svg viewBox="-160 -160 320 320"><g fill="#ffe08a">${A.SUN(96, 22)}</g><circle r="96" fill="#ffd23f"/><circle r="74" fill="#ffe27a"/></svg></div>
      ${L({ h: 420, d: 0.25, cls: 'band', shade: 'rgba(150,50,10,.3)', body: `<path fill="#ffa24c" d="${A.scallop(1600, 420, 80, 80, 50, 31)}"/>` })}
      ${L({ h: 300, d: 0.45, cls: 'band', shade: 'rgba(150,40,10,.32)', body: `<path fill="#ff8552" d="${A.scallop(1600, 300, 70, 64, 50, 33)}"/>` })}
      ${L({ h: 170, d: 0.7, cls: 'band', shade: 'rgba(140,30,10,.34)', body: `<path fill="#f0654a" d="${A.scallop(1600, 170, 60, 54, 40, 35)}"/>` })}`,

    sea: () => `
      <div class="ssun"><svg viewBox="-120 -120 240 240"><circle r="110" fill="#ffa86b"/><circle r="92" fill="#ff7a3d"/></svg></div>
      <div class="lm lm-clouds" data-spot="clouds" style="--d:.2">
        ${puff('#ffffff', '', 'left:0;top:14px;width:46%')}${puff2('#ffe8d6', '', 'left:38%;top:0;width:40%')}${puff('#fff4ea', '', 'left:70%;top:30px;width:30%')}
        <span class="lm-flag">Cloud platforms</span></div>
      <div class="lm lm-island" data-spot="island" style="--d:.3">${A.ISLAND}<span class="lm-flag">Terraform Isle</span></div>
      <div class="lm lm-ice" data-spot="penguin" style="--d:.35">${A.ICEBERG}<span class="lm-flag">Linux penguin</span></div>
      <div class="lm lm-light" data-spot="lighthouse" style="--d:.3">${A.LIGHTHOUSE}<span class="lm-flag">Security lighthouse</span></div>
      ${L({ h: 330, d: 0.35, cls: 'wave w1', shade: 'rgba(10,20,90,.35)', body: `<path fill="#4659ea" d="${A.wave(1700, 330, 40, 10, 170, 0)}"/><g fill="#fff">${A.foam(1700, 40, 10, 170, 51)}</g>` })}
      ${L({ h: 250, d: 0.5, cls: 'wave w2', shade: 'rgba(10,20,90,.38)', body: `<path fill="#2c48cf" d="${A.wave(1700, 250, 40, 12, 220, 0)}"/><g fill="#e8f0ff">${A.foam(1700, 40, 12, 220, 53)}</g>` })}
      <div class="lm lm-ship" data-spot="ship" style="--d:.55">
        <div class="ship-bob"><svg viewBox="0 0 360 290" class="ship-art">${A.SHIP}</svg>
          <div class="lm lm-radar" data-spot="radar">${A.RADAR}<span class="lm-flag">Observability radar</span></div>
        </div>
        <span class="lm-flag">HMS Kubernetes</span></div>
      <div class="lm lm-octo" data-spot="octopus" style="--d:.65">${A.OCTOPUS}<span class="lm-flag">GitOps octopus</span></div>
      ${L({ h: 160, d: 0.7, cls: 'wave w3', shade: 'rgba(5,15,70,.4)', body: `<path fill="#1d3497" d="${A.wave(1700, 160, 40, 14, 260, 0)}"/><g fill="#cfe0ff">${A.foam(1700, 40, 14, 260, 55)}</g>` })}
      ${L({ h: 80, d: 0.95, cls: 'wave w4', shade: 'rgba(5,10,50,.45)', body: `<path fill="#0c1f5c" d="${A.wave(1700, 80, 30, 10, 300, 0)}"/><g fill="#9fb8ff">${A.foam(1700, 30, 10, 300, 57)}</g>` })}
      <div class="lm lm-anchor" data-spot="anchor" style="--d:.8">${A.ANCHOR}<span class="lm-flag">Reliability anchor</span></div>
      <div class="lm lm-shark" data-spot="shark" id="shark" style="--d:1">${A.SHARK}<span class="lm-flag">Docker shark</span></div>`,

    floor: () => `
      ${L({ h: 260, d: 0.3, cls: 'band', shade: 'rgba(0,0,20,.4)', body: `<path fill="#132b78" d="${A.scallop(1600, 260, 60, 90, 40, 61)}"/>` })}
      <div class="weed w-a"><svg viewBox="0 0 60 200"><path fill="#16a37f" d="M30 200 C10 160 46 130 24 96 C6 66 40 40 28 0 C50 36 22 64 40 94 C58 126 24 160 40 200Z"/></svg></div>
      <div class="weed w-b"><svg viewBox="0 0 60 200"><path fill="#0e7c66" d="M30 200 C10 160 46 130 24 96 C6 66 40 40 28 0 C50 36 22 64 40 94 C58 126 24 160 40 200Z"/></svg></div>
      <div class="weed w-c"><svg viewBox="0 0 60 200"><path fill="#16a37f" d="M30 200 C10 160 46 130 24 96 C6 66 40 40 28 0 C50 36 22 64 40 94 C58 126 24 160 40 200Z"/></svg></div>
      <div class="bubbles"><i></i><i></i><i></i><i></i><i></i></div>
      ${L({ h: 150, d: 0.5, cls: 'band', shade: 'rgba(0,0,20,.4)', body: `<path fill="#c99a5a" d="${A.wave(1700, 150, 50, 10, 400, 0)}"/>` })}
      ${L({ h: 80, d: 0.7, cls: 'band', shade: 'rgba(40,20,0,.35)', body: `<path fill="#e3b574" d="${A.wave(1700, 80, 30, 8, 300, 0)}"/>` })}`,

    inferno: () => `
      ${L({ h: 200, d: 0.2, cls: 'band top', align: 'xMidYMin', shade: 'rgba(0,0,0,.45)', body: `<path fill="#3a0710" transform="scale(1 -1) translate(0 -200)" d="${A.crags(1600, 200, 120, 100, 71, 70)}"/>` })}
      <div class="embers"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      ${L({ h: 330, d: 0.3, cls: 'band hinge', shade: 'rgba(0,0,0,.4)', body: `<path fill="#9e1328" d="${A.crags(1600, 330, 200, 170, 73, 90)}"/>` })}
      <div class="lava"><svg viewBox="0 0 1600 200" preserveAspectRatio="xMidYMax slice"><path class="fl fl2" fill="#ff4a1c" d="${A.flames(1600, 200, 200, 70, 160, 81, 70)}"/><path class="fl fl3" fill="#ff9f1c" d="${A.flames(1600, 200, 200, 40, 110, 82, 60)}"/><path class="fl fl4" fill="#ffd23f" d="${A.flames(1600, 200, 200, 20, 60, 83, 50)}"/></svg></div>
      ${L({ h: 120, d: 0.9, cls: 'band lens', shade: 'rgba(0,0,0,.5)', body: `<path fill="#1a0508" d="${A.crags(1600, 120, 90, 70, 75, 60)}"/>` })}`,

    heaven: () => `
      <div class="rays"><svg viewBox="-500 -500 1000 1000">${(() => { let s = ''; for (let i = 0; i < 18; i++) { const a = (i / 18) * 360; s += `<path transform="rotate(${a})" fill="${i % 2 ? '#fff1c2' : '#ffe08f'}" d="M0 0 L-60 -520 L60 -520Z"/>`; } return s; })()}<circle r="120" fill="#fff6d6"/><circle r="84" fill="#fffbea"/></svg></div>
      ${puff('#ffffff', 'drift d-slow', 'left:-2%;top:30%;width:240px;--d:.4')}
      ${puff2('#fff0f4', 'drift d-mid', 'right:-3%;top:16%;width:280px;--d:.5')}
      ${puff('#f3ecff', 'drift d-fast', 'right:6%;top:64%;width:200px;--d:.6')}
      ${L({ h: 300, d: 0.3, cls: 'band hinge', shade: 'rgba(170,60,90,.3)', body: `<path fill="#f9b4c4" d="${A.scallop(1600, 300, 70, 80, 50, 91)}"/>` })}
      ${L({ h: 200, d: 0.55, cls: 'band hinge', shade: 'rgba(110,70,170,.3)', body: `<path fill="#c7b3f5" d="${A.scallop(1600, 200, 60, 64, 40, 93)}"/>` })}
      ${L({ h: 100, d: 0.9, cls: 'band lens', shade: 'rgba(110,70,170,.3)', body: `<path fill="#fff" d="${A.scallop(1600, 100, 50, 50, 30, 95)}"/>` })}`,

    cvsky: () => `
      <div class="sun cv-sun" style="--d:.15"><svg viewBox="-160 -160 320 320"><g fill="#ffe08a">${A.SUN(80, 16)}</g><circle r="80" fill="#ffc233"/></svg></div>
      ${puff('#ffffff', 'drift d-slow', 'left:4%;top:30%;width:200px;--d:.3')}
      ${puff2('#e6f5fd', 'drift d-mid', 'right:8%;top:24%;width:220px;--d:.5')}
      ${L({ h: 300, d: 0.3, cls: 'band hinge', shade: 'rgba(14,60,120,.35)', body: `<path fill="#3c9bd8" d="${A.scallop(1600, 300, 70, 70, 40, 101)}"/>` })}
      ${L({ h: 200, d: 0.55, cls: 'band hinge', shade: 'rgba(10,70,110,.35)', body: `<path fill="#2aa5b5" d="${A.scallop(1600, 200, 60, 56, 40, 103)}"/>` })}
      ${L({ h: 120, d: 0.9, cls: 'band', shade: 'rgba(10,70,90,.35)', body: `<path fill="#16707e" d="${A.scallop(1600, 120, 50, 46, 30, 105)}"/>` })}`
  };

  $$('.dio[data-art]').forEach((el) => { const fn = ART[el.dataset.art]; if (fn) el.innerHTML = fn(); });
  $$('.edge[data-edge]').forEach((el) => { el.innerHTML = A.edge(el.dataset.edge, el.dataset.fill); });
  const balloon = $('[data-art="balloon"]'); if (balloon) balloon.innerHTML = A.BALLOON;
  const chestArt = $('[data-art="chest"]'); if (chestArt) chestArt.innerHTML = A.CHEST;
  const big = $('[data-art="bigcloud"]');
  if (big) big.innerHTML = `<path fill="#9ccbee" transform="translate(16 26) scale(2.36 2.6)" d="${A.CLOUD2}"/><path fill="#ffffff" transform="translate(6 8) scale(2.36 2.6)" d="${A.CLOUD2}"/><path fill="#eef7fd" transform="translate(6 8) scale(2.36 2.6)" d="M18 98 C40 92 120 90 186 98Z"/>`;

  /* ------------------------------------------------------------------
     CONTENT
     ------------------------------------------------------------------ */

  /* Experience: newest first, OpsTree as the big postcard. */
  (function renderExperience() {
    const list = DQ.EXPERIENCE.slice().reverse();
    const board = $('#exp-board');
    const rows = [list.slice(0, 2), list.slice(2)];
    board.innerHTML = rows.map((row, ri) => `
      <div class="line line-${ri}">
        <svg class="string" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 8 Q500 ${ri ? 56 : 48} 1000 8" fill="none" stroke="#5a3a1e" stroke-width="2.5"/></svg>
        ${row.map((e, i) => e.now ? postcard(e) : ticket(e, ri * 2 + i)).join('')}
      </div>`).join('');

    function postcard(e) {
      return `<article class="postcard hang" style="--tilt:-1.2deg">
        <span class="peg" aria-hidden="true"></span><span class="peg peg-r" aria-hidden="true"></span>
        <div class="pc-body">
          <p class="pc-now"><span class="ink">Current role</span></p>
          <h3>${esc(e.role)}</h3>
          <p class="meta"><b>${esc(e.org)}</b>${e.place ? ` · ${esc(e.place)}` : ''} · ${esc(e.period)}</p>
          ${bullets(e.bullets)}
          ${chips(e.tags)}
        </div>
        <div class="pc-side" aria-hidden="true">
          <div class="pc-stamp"><i class="fa-solid ${esc(e.icon)}"></i><span>${esc(e.org)}</span></div>
          <svg class="pc-mark" viewBox="0 0 140 140"><circle cx="70" cy="70" r="52" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="70" cy="70" r="40" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="70" y="64" text-anchor="middle" font-size="13" font-weight="800" fill="currentColor">${esc(e.period.split('–')[0].trim().toUpperCase())}</text><text x="70" y="84" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">${esc((e.place || '').toUpperCase())}</text><path d="M120 50 q12 -8 24 0 t24 0 M120 70 q12 -8 24 0 t24 0 M120 90 q12 -8 24 0 t24 0" fill="none" stroke="currentColor" stroke-width="2.5" transform="translate(-40 0)"/></svg>
          <div class="pc-lines"><span></span><span></span><span></span></div>
        </div>
      </article>`;
    }
    function ticket(e, k) {
      const tilts = ['1.6deg', '-1.4deg', '2deg', '-2.2deg'];
      const tones = ['t-saffron', 't-mint', 't-coral', 't-sky'];
      return `<article class="ticket hang ${tones[k % 4]}" style="--tilt:${tilts[k % 4]}">
        <span class="peg" aria-hidden="true"></span>
        <div class="tk-stub"><span class="tk-period">${esc(e.period)}</span><i class="fa-solid ${esc(e.icon)}" aria-hidden="true"></i></div>
        <div class="tk-body">
          <h3>${esc(e.role)}</h3>
          <p class="meta"><b>${esc(e.org)}</b>${e.place ? ` · ${esc(e.place)}` : ''}</p>
          ${bullets(e.bullets)}
          ${chips(e.tags)}
        </div>
      </article>`;
    }
  })();

  /* Highlights as bunting. */
  (function renderBunting() {
    const tones = ['#ffc233', '#8fe0cf', '#fffaf2', '#ffb3a1'];
    $('#bunting').innerHTML = DQ.PROFILE.highlights.map((h, i) => `
      <li class="pennant" style="--c:${tones[i % 4]};--i:${i}"><span class="pn-num">${esc(h[0])}</span><span class="pn-txt">${esc(h[1])}</span></li>`).join('');
  })();

  /* Projects as floating paper islands. */
  (function renderProjects() {
    const list = DQ.PROJECTS.filter((p) => p.now).concat(DQ.PROJECTS.filter((p) => !p.now));
    const tilts = [-1.5, 1.2, -0.8, 1.8, -1.6, 1, -1.2, 1.4];
    const bases = ['#ffd6a8', '#ffc58a', '#ffe0bd', '#ffcf9c'];
    $('#proj-track').innerHTML = list.map((p, i) => `
      <article class="isle ${p.now ? 'is-now' : ''}" style="--tilt:${tilts[i % 8]}deg;--lift:${i % 2 ? 34 : -10}px;--i:${i}">
        <div class="isle-card">
          <span class="tape" aria-hidden="true"></span>
          <div class="isle-top">
            <span class="seal" aria-hidden="true"><i class="${esc(p.icon)}"></i></span>
            <span class="isle-org">${p.now ? `<span class="now-dot" aria-hidden="true"></span>Current · ` : ''}${esc(p.org)}</span>
          </div>
          <h3>${esc(p.title)}</h3>
          <p class="isle-sub">${esc(p.sub)}</p>
          ${bullets(p.bullets)}
          ${chips(p.tags)}
        </div>
        <svg class="isle-base" viewBox="0 0 210 100" aria-hidden="true"><path fill="${bases[i % 4]}" d="${A.CLOUD2}"/></svg>
      </article>`).join('') + `<div class="isle-end" aria-hidden="true"></div>`;
  })();

  /* Skills: helm wheel + bottle panel + landmarks. */
  const helm = (function buildHelm() {
    const S = DQ.SKILLS, n = S.length, step = 360 / n;
    const wheel = $('#helm-wheel');
    let spokes = '';
    for (let i = 0; i < n; i++) spokes += `<path transform="rotate(${i * step})" d="M-5 -24 L-5 -132 L5 -132 L5 -24Z" fill="#a0522d"/>`;
    wheel.innerHTML = `
      <svg viewBox="-160 -160 320 320" class="wheel-art" aria-hidden="true">
        ${spokes}
        <circle r="104" fill="none" stroke="#7a3b16" stroke-width="26"/>
        <circle r="104" fill="none" stroke="#b5652e" stroke-width="18"/>
        <circle r="104" fill="none" stroke="#d98a4a" stroke-width="3" stroke-dasharray="6 14"/>
        <circle r="30" fill="#7a3b16"/><circle r="22" fill="#ffb627"/><circle r="9" fill="#7a3b16"/>
      </svg>
      ${S.map((s, i) => `<button type="button" class="handle" data-i="${i}" style="--a:${i * step}deg" aria-pressed="false" aria-label="${esc(s.name)}"><span><i class="${esc(s.icon)}" aria-hidden="true"></i></span></button>`).join('')}`;

    const panel = $('#skill-panel');
    let rot = 0, idx = 1;

    function render(i) {
      const s = S[i];
      panel.innerHTML = `
        <div class="bottle-note">
          <span class="bottle-cork" aria-hidden="true"></span>
          <h3><i class="${esc(s.icon)}" aria-hidden="true"></i>${esc(s.name)}</h3>
          <p class="bt-where">${esc(s.where)}</p>
          <p class="bt-flavor">${esc(s.flavor)}</p>
          ${chips(s.items)}
        </div>`;
      $$('.handle', wheel).forEach((b, k) => { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); b.classList.toggle('on', k === i); });
      $$('.lm[data-spot]').forEach((el) => el.classList.toggle('lit', el.dataset.spot === s.spot));
    }
    function setRot(r, animate) {
      rot = r;
      wheel.classList.toggle('snap', !!animate);
      wheel.style.setProperty('--wheel', rot + 'deg');
    }
    function select(i, focus) {
      i = ((i % n) + n) % n;
      const target = -i * step;
      // nearest equivalent rotation to current
      let t = target; while (t - rot > 180) t -= 360; while (rot - t > 180) t += 360;
      setRot(t, true);
      idx = i; render(i);
      if (focus) $$('.handle', wheel)[i].focus({ preventScroll: true });
    }

    // drag to turn
    let drag = null;
    const angleAt = (e) => {
      const r = wheel.getBoundingClientRect();
      return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI;
    };
    wheel.addEventListener('pointerdown', (e) => {
      drag = { a0: angleAt(e), r0: rot, moved: 0, id: e.pointerId, target: e.target.closest('.handle') };
      wheel.setPointerCapture(e.pointerId);
      wheel.classList.add('grab');
    });
    wheel.addEventListener('pointermove', (e) => {
      if (!drag) return;
      let d = angleAt(e) - drag.a0; if (d > 180) d -= 360; if (d < -180) d += 360;
      drag.moved = Math.max(drag.moved, Math.abs(d));
      if (drag.moved > 4) setRot(drag.r0 + d, false);
    });
    const end = () => {
      if (!drag) return;
      wheel.classList.remove('grab');
      if (drag.moved > 4) {
        const i = Math.round(-rot / step);
        select(i);
      } else if (drag.target) {
        select(+drag.target.dataset.i);
      }
      drag = null;
    };
    wheel.addEventListener('pointerup', end);
    wheel.addEventListener('pointercancel', end);
    wheel.addEventListener('click', (e) => {
      // keyboard activation of a handle (Enter/Space) fires click with detail 0
      const b = e.target.closest('.handle');
      if (b && e.detail === 0) select(+b.dataset.i);
    });
    $('#helm').addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); select(idx + 1, true); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); select(idx - 1, true); }
      else if (k === 'Home') { e.preventDefault(); select(0, true); }
      else if (k === 'End') { e.preventDefault(); select(n - 1, true); }
    });
    // landmarks are also clickable shortcuts
    $$('.lm[data-spot]').forEach((el) => el.addEventListener('click', (e) => {
      e.stopPropagation();
      const i = S.findIndex((s) => s.spot === el.dataset.spot); if (i >= 0) select(i);
    }));
    select(idx);
    return { select };
  })();

  /* Docker shark: deliver pods, watch them come up. */
  (function shark() {
    const btn = $('#deploy-btn'), log = $('#receipt-log'), sh = $('#shark');
    const deck = $('[data-deck]');
    const names = ['api', 'web', 'worker'];
    const hash = () => Math.random().toString(36).slice(2, 7);
    let busy = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? Math.min(ms, 120) : ms));
    btn.addEventListener('click', async () => {
      if (busy) return; busy = true; btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Delivering…';
      const pods = names.map((n) => ({ name: `${n}-${hash()}`, st: 'Pending', rd: '0/1' }));
      const draw = () => { log.innerHTML = pods.map((p) => `<div class="receipt-row st-${p.st.toLowerCase()}"><span>${p.name}</span><span>${p.rd}</span><span>${p.st}</span></div>`).join(''); };
      draw();
      deck.innerHTML = '';
      sh.classList.add('loaded');
      // swim to the ship
      const ship = $('.lm-ship .ship-art').getBoundingClientRect();
      const s = sh.getBoundingClientRect();
      const dx = ship.left + ship.width * 0.2 - s.left;
      const dy = Math.min(0, (ship.bottom - ship.height * 0.12) - (s.top + s.height * 0.4));
      let anim;
      if (!reduced) {
        anim = sh.animate([
          { transform: 'translate(0,0) rotate(0deg)' },
          { transform: `translate(${dx * 0.5}px, ${dy * 0.3 + 12}px) rotate(-3deg)`, offset: 0.45 },
          { transform: `translate(${dx}px, ${dy}px) rotate(-8deg)` }
        ], { duration: 1500, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' });
      }
      await wait(1500);
      pods.forEach((p) => { p.st = 'ContainerCreating'; }); draw();
      sh.classList.remove('loaded');
      [0, 1, 2].forEach((k) => {
        const colors = ['#ffb627', '#ff6b4a', '#2fb8b0'], strokes = ['#c9850f', '#c3462b', '#1d857f'];
        deck.insertAdjacentHTML('beforeend', `<g class="box-drop" style="animation-delay:${k * 160}ms"><g transform="translate(${40 + k * 36} 182)"><rect width="32" height="24" rx="2" fill="${colors[k]}"/><path d="M8 3v18M16 3v18M24 3v18" stroke="${strokes[k]}" stroke-width="2.2"/></g></g>`);
      });
      for (let k = 0; k < pods.length; k++) {
        await wait(700);
        pods[k].st = 'Running'; pods[k].rd = '1/1'; draw();
      }
      if (anim) {
        anim.cancel();
        sh.animate([
          { transform: `translate(${dx}px, ${dy}px) rotate(-8deg)` },
          { transform: 'translate(0,0) rotate(0deg)' }
        ], { duration: 1400, easing: 'cubic-bezier(.16,1,.3,1)' });
      }
      btn.disabled = false; busy = false;
      btn.innerHTML = '<i class="fa-brands fa-docker" aria-hidden="true"></i> Deploy again';
    });
  })();

  /* Treasure chest of certifications. */
  (function chest() {
    const btn = $('#chest'), list = $('#certs'), hint = $('#chest-hint');
    list.innerHTML = DQ.CERTS.map((c, i) => `<li style="--i:${i}"><span class="cert-seal"><i class="${esc(c.icon)}" aria-hidden="true"></i></span><span><b>${esc(c.name)}</b><small>${esc(c.by)}</small></span></li>`).join('');
    list.hidden = true;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      btn.classList.toggle('open', open);
      list.hidden = !open;
      requestAnimationFrame(() => list.classList.toggle('show', open));
      hint.textContent = open ? 'Two certifications and one award, straight from the CV.' : 'Locked in the chest on the sea floor. Click it to open.';
    });
  })();

  /* Inferno: fire creatures with fixes. */
  (function inferno() {
    const P = DQ.PROBLEMS;
    const total = P.length;
    const out = $('#fires-out'), count = $('#fire-count');
    let done = 0;
    $('#pits').innerHTML = P.map((p, i) => `
      <article class="pit ${p.boss ? 'boss' : ''}" id="pit-${esc(p.id)}" style="--body:${p.colors.body};--light:${p.colors.light};--i:${i}">
        <div class="pit-stage" aria-hidden="true">
          <div class="pit-flames">${A.flameSet(200 + i * 7)}</div>
          <div class="creature">${A.creature(p.kind, p.colors)}</div>
          ${p.ongoing ? '<div class="cage"><i></i><i></i><i></i><i></i><i></i><i></i><b></b></div>' : ''}
          <div class="splash"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="smoke"><i></i><i></i><i></i></div>
          <svg class="ledge" viewBox="0 0 300 60" preserveAspectRatio="none"><path fill="#2a070c" d="${A.crags(300, 60, 26, 18, 300 + i, 40)}"/></svg>
        </div>
        <div class="pit-info">
          <h3>${esc(p.name)}</h3>
          <p class="pit-meta"><span class="where"><i class="fa-solid ${esc(p.icon)}" aria-hidden="true"></i>${esc(p.where)}</span>${p.ongoing ? '<span class="status">In progress</span>' : ''}</p>
          <p class="threat">${esc(p.threat)}</p>
          <button type="button" class="fix-btn" aria-expanded="false" aria-controls="note-${esc(p.id)}"><i class="fa-solid fa-bucket" aria-hidden="true"></i> Deploy the fix</button>
          <div class="note" id="note-${esc(p.id)}" tabindex="-1" hidden>
            <dl>
              <div><dt>Problem</dt><dd>${md(p.problem)}</dd></div>
              <div><dt>Fix</dt><dd>${md(p.fix)}</dd></div>
              <div><dt>Result</dt><dd>${md(p.result)}</dd></div>
            </dl>
          </div>
        </div>
      </article>`).join('');

    $$('.pit').forEach((pit, i) => {
      const p = P[i], btn = $('.fix-btn', pit), note = $('.note', pit);
      btn.addEventListener('click', () => {
        if (pit.classList.contains('doused') || pit.classList.contains('caged')) {
          const open = note.hidden; note.hidden = !open; btn.setAttribute('aria-expanded', String(open));
          btn.innerHTML = open ? '<i class="fa-solid fa-eye-slash" aria-hidden="true"></i> Hide the details' : '<i class="fa-solid fa-eye" aria-hidden="true"></i> Show the details';
          return;
        }
        pit.classList.add(p.ongoing ? 'caged' : 'doused');
        note.hidden = false; btn.setAttribute('aria-expanded', 'true');
        btn.innerHTML = '<i class="fa-solid fa-eye-slash" aria-hidden="true"></i> Hide the details';
        if (!p.ongoing) done++;
        out.textContent = done;
        count.classList.remove('bump'); void count.offsetWidth; count.classList.add('bump');
        const remaining = P.filter((x) => !x.ongoing).length;
        if (done === remaining) count.querySelector('span').innerHTML = `<b id="fires-out">${done}</b> / ${total} fires out · the CVE Lich upgrade is still in progress`;
      });
    });
  })();

  /* Heaven: reviews on paper clouds. */
  (function heaven() {
    $('#reviews').innerHTML = DQ.REVIEWS.map((r, i) => {
      const initials = r.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
      return `<figure class="halo h${i}" style="--c:${r.color};--i:${i}">
        <svg class="halo-top" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true"><path fill="#fffdf8" d="${A.scallop(400, 60, 34, 26, 16, 400 + i)}"/></svg>
        <blockquote><p>${esc(r.text)}</p></blockquote>
        <figcaption><span class="badge" aria-hidden="true">${esc(initials)}</span><span><b>${esc(r.name)}</b><small>${esc(r.title)}</small></span></figcaption>
      </figure>`;
    }).join('');
  })();

  /* Contact. */
  (function contact() {
    const P = DQ.PROFILE;
    $('#open-to').innerHTML = `${esc(P.objective)} <span class="open-place"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>Open to ${esc(P.openTo)}</span>`;
    const items = [
      ['fa-solid fa-envelope', 'Email', P.email, 'mailto:' + P.email],
      ['fa-brands fa-linkedin', 'LinkedIn', 'in/ipreetgs', P.linkedin],
      ['fa-brands fa-github', 'GitHub', 'ipreetgs', P.github],
      ['fa-brands fa-instagram', 'Instagram', '@__gurpreet__23', P.instagram]
    ];
    $('#contacts').innerHTML = items.map((it, i) => `<li style="--i:${i}"><a href="${esc(it[3])}" ${it[3].startsWith('http') ? 'target="_blank" rel="noopener"' : ''}><i class="${it[0]}" aria-hidden="true"></i><span><b>${it[1]}</b><small>${esc(it[2])}</small></span></a></li>`).join('');
  })();

  /* CV cloud: paper rain, then the download. */
  (function cvRain() {
    const cloud = $('#cv-cloud'), rain = $('#rain');
    cloud.addEventListener('click', (e) => {
      if (reduced || cloud.dataset.raining) return;
      e.preventDefault();
      cloud.dataset.raining = '1';
      cloud.classList.add('squeeze');
      const colors = ['#2b86d0', '#33b6c4', '#8fe3c8', '#ffffff', '#4fa6e2'];
      let html = '';
      for (let i = 0; i < 26; i++) {
        const x = 8 + Math.random() * 84, d = 700 + Math.random() * 700, dl = Math.random() * 400;
        html += `<i style="left:${x}%;--c:${colors[i % 5]};animation-duration:${d}ms;animation-delay:${dl}ms;--r:${Math.round(Math.random() * 40 - 20)}deg"></i>`;
      }
      html += `<b class="sheet"><i class="fa-solid fa-file-lines" aria-hidden="true"></i></b>`;
      rain.innerHTML = html;
      rain.classList.add('go');
      setTimeout(() => {
        const a = document.createElement('a'); a.href = cloud.href; a.download = 'GurpreetCV.pdf';
        document.body.appendChild(a); a.click(); a.remove();
      }, 1000);
      setTimeout(() => { rain.classList.remove('go'); rain.innerHTML = ''; cloud.classList.remove('squeeze'); delete cloud.dataset.raining; }, 2400);
    });
  })();

  /* ------------------------------------------------------------------
     NAV, VISIBILITY, POINTER PARALLAX
     ------------------------------------------------------------------ */
  const nav = $('#nav'), toggle = $('#nav-toggle'), links = $('#nav-links');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
  });
  $$('a', links).forEach((a) => a.addEventListener('click', () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }));

  const scenes = $$('.scene');
  let active = scenes[0];
  const io = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      en.target.classList.toggle('off', !en.isIntersecting);
    });
  }, { rootMargin: '10% 0px' });
  scenes.forEach((s) => io.observe(s));
  const zoneIO = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      if (!en.isIntersecting) return;
      active = en.target;
      const id = en.target.id === 'sky' ? '' : en.target.id;
      $$('a[data-zone]', links).forEach((a) => a.classList.toggle('on', a.dataset.zone === id));
      document.body.dataset.zone = en.target.id;
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  scenes.forEach((s) => zoneIO.observe(s));

  if (!reduced) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      if (active) { active.style.setProperty('--px', cx.toFixed(3)); active.style.setProperty('--py', cy.toFixed(3)); }
      raf = (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      tx = (e.clientX / innerWidth) * 2 - 1; ty = (e.clientY / innerHeight) * 2 - 1; kick();
    }, { passive: true });
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma == null) return;
      tx = Math.max(-1, Math.min(1, e.gamma / 30)); ty = Math.max(-1, Math.min(1, (e.beta - 40) / 30)); kick();
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     CHOREOGRAPHY (GSAP + ScrollTrigger; page is complete without it)
     ------------------------------------------------------------------ */
  const G = window.gsap, ST = window.ScrollTrigger;
  if (G && ST && !reduced) {
    G.registerPlugin(ST);
    document.documentElement.classList.add('has-gsap');
    const ease = 'expo.out';

    // Hero: the pop-up book opens on load.
    const heroLayers = $$('#sky .layer');
    G.from(heroLayers, { rotateX: -82, transformOrigin: '50% 100%', duration: 1.6, ease, stagger: 0.09, delay: 0.1 });
    G.from('#sky .sun', { scale: 0.4, rotate: -40, duration: 1.8, ease });
    G.from('.balloon', { y: 120, duration: 1.8, ease, delay: 0.2 });

    // Each diorama: layers hinge up from flat as the section arrives,
    // then separate in depth as the camera moves through.
    $$('.scene').forEach((scene) => {
      if (scene.id === 'sky') return;
      const hinges = $$('.layer.hinge', scene).filter((l) => !l.closest('.proj-pin'));
      if (hinges.length) {
        G.fromTo(hinges, { rotateX: -80 }, {
          rotateX: 0, transformOrigin: '50% 100%', ease: 'none', stagger: 0.05,
          scrollTrigger: { trigger: scene, start: 'top 95%', end: 'top 25%', scrub: 0.8 }
        });
      }
      const heads = $$('.scene-head', scene);
      heads.forEach((h) => G.from(h, { y: 40, duration: 1.1, ease, scrollTrigger: { trigger: h, start: 'top 88%' } }));
    });
    $$('.scene .layer, .scene .puff, .scene .sun, .scene .gsun, .scene .lm, .scene .bird').forEach((el) => {
      if (el.closest('.proj-pin') || el.closest('.sea-stage') || el.closest('.seafloor')) return;
      const d = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0.3;
      const scene = el.closest('.scene');
      G.fromTo(el, { y: d * 70 }, {
        y: -d * 110, ease: 'none',
        scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // Postcards and tickets swing onto the line.
    $$('.hang').forEach((c, i) => G.from(c, { rotate: (i % 2 ? 14 : -14), y: -30, duration: 1.4, ease: 'elastic.out(1,0.55)', scrollTrigger: { trigger: c, start: 'top 90%' } }));
    G.from('.pennant', { rotate: -30, y: -20, duration: 1.2, ease: 'elastic.out(1,0.5)', stagger: 0.08, scrollTrigger: { trigger: '#bunting', start: 'top 90%' } });
    G.from('.halo', { y: 60, duration: 1.4, ease, stagger: 0.1, scrollTrigger: { trigger: '#reviews', start: 'top 85%' } });
    G.from('.pit', { y: 50, duration: 1.2, ease, stagger: 0.06, scrollTrigger: { trigger: '#pits', start: 'top 85%' } });

    // Projects: a horizontally scrubbed golden panorama on wide screens.
    const mm = G.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const pin = $('#proj-pin'), track = $('#proj-track');
      pin.classList.add('pinned');
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      const tl = G.timeline({
        scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      tl.to(track, { x: () => -dist(), ease: 'none' }, 0);
      $$('.dio .layer, .dio .gsun', pin).forEach((l) => {
        const d = parseFloat(getComputedStyle(l).getPropertyValue('--d')) || 0.3;
        tl.to(l, { x: () => -dist() * d * 0.25, ease: 'none' }, 0);
      });
      $$('.isle', track).forEach((isle) => {
        G.from($('.isle-card', isle), {
          rotateX: -70, transformOrigin: '50% 100%', ease: 'none',
          scrollTrigger: { trigger: isle, containerAnimation: tl, start: 'left 105%', end: 'left 60%', scrub: true }
        });
      });
      return () => { pin.classList.remove('pinned'); };
    });

    // CV cloud floats up into place.
    G.from('#cv-cloud', { y: 80, scale: 0.9, duration: 1.6, ease, scrollTrigger: { trigger: '#cv-cloud', start: 'top 90%' } });
  }

  /* Hash jump on load (works for #sea, #inferno, #heaven, …). */
  function jump() {
    const h = location.hash && document.getElementById(location.hash.slice(1));
    if (!h) return;
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    const y = h.getBoundingClientRect().top + window.scrollY - (h.id === 'sky' ? 0 : 0);
    window.scrollTo({ top: y, behavior: 'instant' });
  }
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('load', () => { jump(); setTimeout(jump, 300); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });
})();
