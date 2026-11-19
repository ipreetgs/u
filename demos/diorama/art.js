/* =====================================================================
   Paper-cut diorama: ART
   Procedural cut-paper edges (scallops, tears, waves, flames) and the
   hand-authored paper puppets. Everything returns SVG markup strings.
   ===================================================================== */
(function () {
  'use strict';

  /* Seeded random so every reload cuts the same paper. */
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f = (n) => Math.round(n * 10) / 10;

  /* Cloud-band: a row of bumps along y0, filled to the bottom. */
  function scallop(w, h, y0, r, jit, seed, sweepDown) {
    const R = rng(seed);
    let x = -r, y = y0 + (R() - 0.5) * jit;
    const B = h + 600;
    let d = `M${f(x)} ${B} L${f(x)} ${f(y)}`;
    while (x < w + r) {
      const rr = r * (0.65 + R() * 0.7);
      const nx = x + rr * (1.5 + R() * 0.4);
      const ny = y0 + (R() - 0.5) * jit;
      d += ` A${f(rr)} ${f(rr)} 0 0 ${sweepDown ? 0 : 1} ${f(nx)} ${f(ny)}`;
      x = nx; y = ny;
    }
    return d + ` L${f(x)} ${B} Z`;
  }

  /* Torn paper: a jagged edge with fibre-like irregular steps. */
  function torn(w, h, y0, jit, seed, step) {
    const R = rng(seed);
    step = step || 14;
    let d = `M0 ${h + 600} L0 ${f(y0)}`;
    let x = 0;
    while (x < w) {
      x += step * (0.4 + R() * 1.2);
      d += ` L${f(Math.min(x, w))} ${f(y0 + (R() - 0.5) * jit + (R() < 0.12 ? jit * 0.9 : 0))}`;
    }
    return d + ` L${w} ${h + 600} Z`;
  }

  /* Smooth wave band. */
  function wave(w, h, y0, amp, len, phase) {
    let d = `M0 ${h + 600} L0 ${f(y0 + Math.sin(phase) * amp)}`;
    for (let x = 0; x < w + len; x += len / 2) {
      const cx = x + len / 4, nx = x + len / 2;
      const up = ((x / (len / 2)) % 2 === 0) ? -1 : 1;
      d += ` Q${f(cx)} ${f(y0 + up * amp * 1.6)} ${f(nx)} ${f(y0)}`;
    }
    return d + ` L${f(w + len)} ${h + 600} Z`;
  }

  /* Foam: little white crests riding a wave's peaks. */
  function foam(w, y0, amp, len, seed) {
    const R = rng(seed);
    let out = '';
    for (let x = 0; x < w + len; x += len) {
      const cx = x + len / 4;
      const top = y0 - amp * 0.8;
      const ww = len * (0.16 + R() * 0.08);
      out += `<path d="M${f(cx - ww)} ${f(top + 6)} Q${f(cx)} ${f(top - 7)} ${f(cx + ww)} ${f(top + 6)} Q${f(cx + ww * 0.5)} ${f(top + 2)} ${f(cx + ww * 0.2)} ${f(top + 9)} Q${f(cx)} ${f(top + 3)} ${f(cx - ww * 0.4)} ${f(top + 9)} Z"/>`;
      if (R() > 0.5) out += `<circle cx="${f(cx + ww + 10)}" cy="${f(top + 2)}" r="${f(3 + R() * 3)}"/>`;
    }
    return out;
  }

  /* Flame tongues standing on baseline. */
  function flames(w, h, base, minH, maxH, seed, step) {
    const R = rng(seed);
    step = step || 60;
    let d = `M0 ${h} L0 ${base}`;
    let x = 0;
    while (x < w - 4) {
      let ww = step * (0.7 + R() * 0.7);
      if (w - x - ww < step * 0.5) ww = w - x;
      const hh = minH + R() * (maxH - minH);
      const lean = (R() - 0.5) * ww * 0.8;
      const tipX = x + ww / 2 + lean;
      d += ` C${f(x + ww * 0.1)} ${f(base - hh * 0.5)} ${f(tipX - ww * 0.15)} ${f(base - hh * 0.7)} ${f(tipX)} ${f(base - hh)}`;
      d += ` C${f(tipX + ww * 0.05)} ${f(base - hh * 0.55)} ${f(x + ww * 0.95)} ${f(base - hh * 0.4)} ${f(x + ww)} ${f(base)}`;
      x += ww;
    }
    return d + ` L${f(x)} ${h} Z`;
  }

  /* Jagged rock skyline. */
  function crags(w, h, y0, amp, seed, step) {
    const R = rng(seed);
    step = step || 80;
    let d = `M0 ${h + 600} L0 ${y0}`;
    let x = 0;
    while (x < w) {
      const nx = x + step * (0.5 + R());
      d += ` L${f((x + nx) / 2 + (R() - 0.5) * 20)} ${f(y0 - amp * (0.3 + R() * 0.9))} L${f(nx)} ${f(y0 + (R() - 0.5) * amp * 0.4)}`;
      x = nx;
    }
    return d + ` L${f(x)} ${h + 600} Z`;
  }

  /* A single paper cloud puff (flat bottom), drawn around origin box 200x100. */
  const CLOUD = 'M26 96C6 96 0 72 18 63 12 41 40 28 58 40 64 15 100 4 119 28c17-13 47-3 47 20 25 0 34 28 16 48z';
  const CLOUD2 = 'M18 98C2 98-2 76 14 68 6 50 26 34 46 42 50 20 78 10 96 26 108 6 142 6 152 30 172 22 196 38 190 60 206 66 204 98 186 98z';

  /* A layer: wrapper div with a slice-scaled svg. */
  function layer(opts) {
    const { w = 1600, h = 600, d = 0.5, cls = '', style = '', body = '', align = 'xMidYMax', shade = '' } = opts;
    const m = body.match(/fill="(#[0-9a-fA-F]{3,6})"/);
    return `<div class="layer ${cls}" style="--d:${d};--h:${h}px;--fill:${m ? m[1] : 'transparent'};${style}" data-depth="${d}"><svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="${align} slice" ${shade ? `style="--shade:${shade}"` : ''}>${body}</svg></div>`;
  }

  /* Edges between scenes. */
  function edge(kind, fill) {
    const W = 1600;
    if (kind === 'torn') {
      return `<svg viewBox="0 0 ${W} 90" preserveAspectRatio="none"><path fill="#fffaf2" d="${torn(W, 90, 34, 26, 11, 16)}"/><path fill="${fill}" d="${torn(W, 90, 46, 22, 12, 13)}"/></svg>`;
    }
    if (kind === 'fold') {
      // a page-turn: a curled sheet lifting at the right corner
      return `<svg viewBox="0 0 ${W} 120" preserveAspectRatio="none"><path fill="${fill}" d="M0 120 L0 70 C400 40 900 90 1250 52 L1600 0 L1600 120Z"/><path fill="#ffe6c4" d="M1250 52 L1600 0 C1520 60 1430 80 1330 92 Z"/><path fill="rgba(120,50,20,.18)" d="M1250 52 L1330 92 C1300 80 1275 66 1250 52Z"/></svg>`;
    }
    if (kind === 'rip') {
      return `<svg viewBox="0 0 ${W} 110" preserveAspectRatio="none"><path fill="#ff8a1c" d="${torn(W, 110, 30, 50, 41, 22)}"/><path fill="#c8102e" d="${torn(W, 110, 52, 40, 42, 18)}"/><path fill="${fill}" d="${torn(W, 110, 74, 30, 43, 14)}"/></svg>`;
    }
    if (kind === 'accordion') {
      let p = '', s = '';
      const n = 24, step = W / n;
      for (let i = 0; i < n; i++) {
        const x = i * step;
        p += `L${f(x + step / 2)} ${i % 2 ? 26 : 40} L${f(x + step)} 58 `;
        s += `<path fill="${i % 2 ? 'rgba(160,80,20,.16)' : 'rgba(255,255,255,.35)'}" d="M${f(x)} 58 L${f(x + step / 2)} ${i % 2 ? 26 : 40} L${f(x + step / 2)} 100 L${f(x)} 100Z"/>`;
      }
      return `<svg viewBox="0 0 ${W} 100" preserveAspectRatio="none"><path fill="${fill}" d="M0 100 L0 58 ${p} L${W} 100Z"/>${s}</svg>`;
    }
    if (kind === 'scallop') {
      return `<svg viewBox="0 0 ${W} 90" preserveAspectRatio="xMidYMax slice"><path fill="#fff" d="${scallop(W, 90, 44, 42, 14, 77)}"/><path fill="${fill}" d="${scallop(W, 90, 62, 34, 10, 78)}"/></svg>`;
    }
    return '';
  }

  /* ---------------- Illustrations ---------------- */

  const BALLOON = `
    <g class="ropes" stroke="#173a66" stroke-width="2.4" fill="none">
      <path d="M92 262 L104 318"/><path d="M168 262 L156 318"/><path d="M118 268 L122 318"/><path d="M142 268 L138 318"/>
    </g>
    <path fill="#ffb627" d="M130 6C212 6 254 66 254 136c0 70-58 108-84 140H90C64 244 6 206 6 136 6 66 48 6 130 6Z"/>
    <path fill="#ff6b4a" d="M130 6C92 34 80 92 84 146c3 56 16 100 28 130h36c12-30 25-74 28-130 4-54-8-112-46-140Z"/>
    <path fill="#2fb8b0" d="M130 6C176 16 214 58 222 112c-24-4-40-56-92-106Z"/>
    <path fill="#2fb8b0" d="M130 6C84 16 46 58 38 112c24-4 40-56 92-106Z"/>
    <path fill="#fff4d6" d="M130 6c-6 40-8 90-6 140 2 50 6 96 10 130h-8c-4-34-8-80-10-130-2-50 4-100 14-140Z" opacity=".9"/>
    <path fill="rgba(255,255,255,.35)" d="M60 70c12-28 34-46 58-54-26 20-40 42-48 70z"/>
    <rect x="84" y="266" width="92" height="16" rx="5" fill="#173a66"/>
    <path fill="#e85a3c" d="M88 270h84v8H88z" opacity=".6"/>`;

  const SUN = (r, rays) => {
    let s = `<g class="sun-rays">`;
    const n = rays || 16;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, a2 = a + Math.PI / n;
      const R1 = r * 1.18, R2 = r * 1.62;
      s += `<path d="M${f(Math.cos(a - .1) * R1)} ${f(Math.sin(a - .1) * R1)} L${f(Math.cos(a2 - Math.PI / n / 2) * R2)} ${f(Math.sin(a2 - Math.PI / n / 2) * R2)} L${f(Math.cos(a + .12) * R1)} ${f(Math.sin(a + .12) * R1)}Z"/>`;
    }
    return s + `</g>`;
  };

  const PLANE = `<svg viewBox="0 0 120 70" class="plane-art"><path fill="#fff" d="M2 30 L118 4 L44 44Z"/><path fill="#d6eef8" d="M44 44 L118 4 L58 66Z"/><path fill="#a9d6ec" d="M44 44 L58 66 L50 46Z"/></svg>`;

  const BIRD = (c) => `<svg viewBox="0 0 60 30" class="bird-art"><path fill="${c}" d="M2 18 Q16 2 30 16 Q44 2 58 18 Q44 10 30 22 Q16 10 2 18Z"/></svg>`;

  /* Ship (Kubernetes). */
  const SHIP = `
    <path fill="#4a2414" d="M176 26h8v196h-8z"/>
    <path fill="#fff" d="M188 34C276 66 300 146 188 206Z"/>
    <path fill="#eaf1ff" d="M172 54C102 88 92 158 172 196Z"/>
    <path fill="rgba(30,60,140,.10)" d="M188 34C240 60 262 110 250 150 236 100 214 66 188 34Z"/>
    <g transform="translate(226 122)">
      <path fill="#326ce5" d="M0-30 23.5-18.7 29.2 6.7 13 27-13 27-29.2 6.7-23.5-18.7Z"/>
      <circle r="10" fill="none" stroke="#fff" stroke-width="3.4"/>
      <g stroke="#fff" stroke-width="3" stroke-linecap="round">
        <path d="M0-10V-21"/><path d="M7.8-6.2 16.4-13.1"/><path d="M9.7 2.2 20.5 4.7"/><path d="M4.3 9 9.1 19"/><path d="M-4.3 9-9.1 19"/><path d="M-9.7 2.2-20.5 4.7"/><path d="M-7.8-6.2-16.4-13.1"/>
      </g>
    </g>
    <path fill="#ffb627" d="M184 26 L222 34 L184 44Z"/>
    <g class="deck" data-deck></g>
    <path fill="#8e3418" d="M22 206h316l-6 14H28z"/>
    <path fill="#c2562a" d="M28 218h304l-30 56c-80 16-164 16-244 0z"/>
    <path fill="#8e3418" d="M40 236h280l-6 12H46z"/>
    <g fill="#ffe3a3"><circle cx="96" cy="258" r="6"/><circle cx="142" cy="260" r="6"/><circle cx="188" cy="260" r="6"/><circle cx="234" cy="258" r="6"/></g>
    <path fill="rgba(60,20,8,.25)" d="M58 274c80 16 164 16 244 0l-6 10c-76 12-156 12-232 0z"/>`;

  const RADAR = `<svg viewBox="0 0 80 70"><path fill="#4a2414" d="M37 40h6v30h-6z"/><path fill="#cfe3ff" d="M8 10c4 26 26 38 56 30z"/><path fill="#9fbfee" d="M8 10c10 14 30 24 56 30-20 2-46-6-56-30z"/><circle cx="36" cy="28" r="4" fill="#ff6b4a"/><path stroke="#4a2414" stroke-width="3" d="M36 28 50 12" /></svg>`;

  const LIGHTHOUSE = `<svg viewBox="0 0 160 300">
    <path class="beam" fill="#fff3b0" d="M80 58 L-200 0 L-200 120Z" opacity=".55"/>
    <path fill="#22356e" d="M0 300 L14 248 L44 230 L70 240 L112 226 L148 246 L160 300Z"/>
    <path fill="#2f4a90" d="M20 300 L34 260 L66 252 L100 244 L130 262 L140 300Z"/>
    <path fill="#fff" d="M56 238 L64 86 H96 L104 238Z"/>
    <path fill="#e63946" d="M62 120 H98 L99.6 150 H60.4Z"/><path fill="#e63946" d="M59 180 H101 L102.6 210 H57.4Z"/>
    <path fill="#22356e" d="M58 80 H102 V88 H58Z"/>
    <path fill="#ffc233" d="M64 52 H96 V80 H64Z"/>
    <path fill="#22356e" d="M70 52h4v28h-4zM86 52h4v28h-4z"/>
    <path fill="#e63946" d="M56 54 L80 28 L104 54Z"/>
    <circle cx="80" cy="25" r="5" fill="#22356e"/>
    <path fill="#22356e" d="M72 238 v-26 a8 8 0 0 1 16 0 v26z"/></svg>`;

  const ISLAND = `<svg viewBox="0 0 220 200">
    <path fill="#f4c77d" d="M0 200 C30 150 80 140 110 142 C150 144 190 160 220 200Z"/>
    <path fill="#e5a95a" d="M30 200 C60 168 100 162 130 166 C160 170 190 182 205 200Z"/>
    <path fill="#8b5a2b" d="M104 150 C100 110 108 70 128 40 L134 44 C116 74 110 112 114 150Z"/>
    <path fill="#1e9a5f" d="M130 42 C100 20 70 26 52 46 C80 36 104 40 130 46Z"/>
    <path fill="#2bb673" d="M130 42 C150 14 184 12 204 30 C176 24 152 32 132 48Z"/>
    <path fill="#2bb673" d="M130 42 C120 10 92 0 70 6 C96 12 116 26 128 46Z"/>
    <path fill="#1e9a5f" d="M131 44 C160 40 186 56 194 82 C174 62 154 54 130 50Z"/>
    <path fill="#1e9a5f" d="M129 44 C104 52 88 74 90 100 C100 76 114 62 131 50Z"/>
    <path fill="#4a2414" d="M58 160h3v-46h-3z"/><path fill="#7b42bc" d="M61 114 L92 122 L61 132Z"/>
    <path fill="#fff" d="M68 118h6l4 6-4 6h-6zM68 124" opacity=".0"/></svg>`;

  const ICEBERG = `<svg viewBox="0 0 200 200">
    <path fill="#eaf6ff" d="M10 200 L40 120 L70 132 L96 70 L132 110 L160 96 L192 200Z"/>
    <path fill="#bfe1f6" d="M96 70 L132 110 L118 200 L84 200 Z"/>
    <path fill="#d6edfb" d="M40 120 L70 132 L58 200 L10 200Z"/>
    <g class="penguin" transform="translate(116 46)">
      <ellipse cx="18" cy="40" rx="18" ry="26" fill="#14213d"/>
      <ellipse cx="20" cy="44" rx="11" ry="19" fill="#fff"/>
      <circle cx="18" cy="16" r="13" fill="#14213d"/>
      <circle cx="22" cy="14" r="5" fill="#fff"/><circle cx="23" cy="14" r="2.4" fill="#14213d"/>
      <path fill="#ff9f1c" d="M28 18 L40 21 L28 24Z"/>
      <path fill="#ff9f1c" d="M6 64h10v5H4zM20 64h10v5H18z"/>
      <path fill="#0b1630" d="M2 34 C-6 46 -4 56 2 60 C4 50 6 42 6 36Z"/>
    </g></svg>`;

  const OCTOPUS = `<svg viewBox="0 0 220 200">
    <g class="arm a1"><path fill="#9b5de5" d="M30 200 C20 150 0 120 18 92 C30 74 52 84 44 100 C38 112 26 104 30 98 C22 112 38 150 52 200Z"/></g>
    <g class="arm a2"><path fill="#9b5de5" d="M168 200 C176 150 204 128 192 98 C184 80 160 84 166 102 C170 114 184 108 180 100 C190 118 174 150 150 200Z"/></g>
    <path fill="#8547d6" d="M58 200 C56 140 70 96 110 92 C150 96 164 140 162 200Z"/>
    <path fill="#9b5de5" d="M64 200 C64 132 80 70 110 66 C140 70 156 132 156 200Z"/>
    <path fill="rgba(255,255,255,.18)" d="M84 90 C92 76 104 72 112 72 C98 80 92 96 90 120Z"/>
    <circle cx="94" cy="128" r="12" fill="#fff"/><circle cx="128" cy="128" r="12" fill="#fff"/>
    <circle cx="96" cy="130" r="6" fill="#14213d"/><circle cx="126" cy="130" r="6" fill="#14213d"/>
    <path d="M100 152 Q111 160 122 152" stroke="#3b1660" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <g fill="#c9a6ff"><circle cx="80" cy="170" r="4"/><circle cx="140" cy="172" r="4"/><circle cx="110" cy="186" r="4"/></g></svg>`;

  const ANCHOR = `<svg viewBox="0 0 100 220">
    <path stroke="#6f7fa8" stroke-width="5" stroke-dasharray="8 5" d="M50 0 V92" fill="none"/>
    <circle cx="50" cy="104" r="12" fill="none" stroke="#2a3a66" stroke-width="7"/>
    <path fill="#2a3a66" d="M46 114h8v80h-8z"/><path fill="#2a3a66" d="M30 128h40v8H30z"/>
    <path fill="#2a3a66" d="M10 166 C14 196 34 210 50 212 C66 210 86 196 90 166 L100 172 L90 150 L78 168 L84 168 C80 186 66 198 50 200 C34 198 20 186 16 168 L22 168 L10 150 L0 172Z"/></svg>`;

  const SHARK = `<svg viewBox="0 0 300 150">
    <path fill="#1565c0" d="M6 70 L40 52 L30 84Z" class="tail"/>
    <path fill="#1d8cf0" d="M30 80 C70 40 170 30 240 54 C270 64 292 78 296 92 C260 106 180 118 100 108 C70 104 46 96 30 80Z"/>
    <path fill="#e6f3ff" d="M110 104 C170 114 240 108 286 96 C260 112 190 124 120 116Z"/>
    <path fill="#1565c0" d="M150 46 C160 16 176 4 186 2 C180 20 182 36 190 48Z"/>
    <path fill="#1565c0" d="M150 100 C142 126 126 136 112 138 C124 122 128 110 130 102Z"/>
    <circle cx="252" cy="74" r="6" fill="#0b1a40"/><circle cx="254" cy="72" r="2" fill="#fff"/>
    <path d="M214 74 l-6 18 M204 72 l-6 18 M194 70 l-6 18" stroke="#1565c0" stroke-width="3" stroke-linecap="round"/>
    <path d="M262 94 Q276 98 288 92" stroke="#0b1a40" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g class="cargo">
      <g transform="translate(70 22)"><rect width="34" height="26" rx="2" fill="#ffb627"/><path d="M8 3v20M17 3v20M26 3v20" stroke="#c9850f" stroke-width="2.4"/></g>
      <g transform="translate(106 18)"><rect width="34" height="26" rx="2" fill="#ff6b4a"/><path d="M8 3v20M17 3v20M26 3v20" stroke="#c3462b" stroke-width="2.4"/></g>
      <g transform="translate(88 -6)"><rect width="34" height="26" rx="2" fill="#2fb8b0"/><path d="M8 3v20M17 3v20M26 3v20" stroke="#1d857f" stroke-width="2.4"/></g>
    </g></svg>`;

  const CHEST = `
    <ellipse cx="110" cy="160" rx="100" ry="10" fill="rgba(5,10,40,.35)"/>
    <g class="chest-body">
      <path fill="#8a4b1c" d="M20 80h180v76H20z"/>
      <path fill="#a8601f" d="M20 80h180v20H20z"/>
      <path fill="#6d3810" d="M20 120h180v6H20z"/>
      <path fill="#ffb627" d="M40 80h14v76H40zM166 80h14v76h-14z"/>
      <path fill="#ffb627" d="M94 96h32v34H94z"/><circle cx="110" cy="110" r="5" fill="#5a2a08"/><path fill="#5a2a08" d="M108 112h4v10h-4z"/>
    </g>
    <g class="chest-glow"><path fill="#ffe27a" d="M30 80 C60 40 160 40 190 80Z" opacity=".9"/></g>
    <g class="chest-lid">
      <path fill="#9a5520" d="M20 80 C20 30 200 30 200 80Z"/>
      <path fill="#b8692a" d="M20 80 C22 48 60 36 110 36 C70 40 40 54 36 80Z" opacity=".7"/>
      <path fill="#ffb627" d="M40 80 C40 50 50 42 54 41 V80Z M166 80 V41 C170 42 180 50 180 80Z"/>
      <path fill="#6d3810" d="M20 74h180v6H20z"/>
    </g>`;

  /* ---------- Fire creatures (paper puppets on sticks) ---------- */
  function eyes(c, x1, x2, y, r) {
    return `<circle cx="${x1}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x2}" cy="${y}" r="${r}" fill="#fff"/>
      <circle cx="${x1 + 1}" cy="${y + 1}" r="${r * 0.55}" fill="${c.eye}"/><circle cx="${x2 + 1}" cy="${y + 1}" r="${r * 0.55}" fill="${c.eye}"/>
      <circle cx="${x1 + 1}" cy="${y + 1}" r="${r * 0.25}" fill="#120308"/><circle cx="${x2 + 1}" cy="${y + 1}" r="${r * 0.25}" fill="#120308"/>`;
  }
  const CREATURES = {
    imp: (c) => `
      <path fill="${c.dark}" d="M40 92 C10 70 8 46 22 36 C26 60 40 70 56 76Z"/><path fill="${c.dark}" d="M160 92 C190 70 192 46 178 36 C174 60 160 70 144 76Z"/>
      <path fill="${c.horn}" d="M66 54 L56 14 L84 46Z"/><path fill="${c.horn}" d="M134 54 L144 14 L116 46Z"/>
      <path fill="${c.body}" d="M100 40 C146 40 162 80 160 116 C158 156 132 176 100 176 C68 176 42 156 40 116 C38 80 54 40 100 40Z"/>
      <path fill="${c.light}" d="M100 120 C124 120 136 140 132 160 C122 172 78 172 68 160 C64 140 76 120 100 120Z" opacity=".55"/>
      <path fill="${c.dark}" d="M152 150 C176 160 188 150 190 136 L196 140 L192 124 L182 134 L186 136 C184 146 172 152 156 144Z"/>
      ${eyes(c, 80, 120, 92, 12)}
      <path fill="#120308" d="M78 126 Q100 146 122 126 Q100 134 78 126Z"/><path fill="#fff" d="M86 128l4 6 4-5zM106 129l4 5 4-6z"/>`,
    lich: (c) => `
      <path fill="${c.dark}" d="M100 30 C150 40 168 100 172 176 H28 C32 100 50 40 100 30Z"/>
      <path fill="${c.body}" d="M100 38 C138 48 152 100 156 176 H44 C48 100 62 48 100 38Z"/>
      <path fill="${c.light}" d="M100 54 C126 56 136 76 134 100 C132 122 118 134 100 134 C82 134 68 122 66 100 C64 76 74 56 100 54Z"/>
      <path fill="#efe7d6" d="M100 66 C120 66 126 82 124 98 C122 114 112 120 100 120 C88 120 78 114 76 98 C74 82 80 66 100 66Z"/>
      <path fill="${c.horn}" d="M70 50 L74 22 L86 40 L100 14 L114 40 L126 22 L130 50Z"/>
      <circle cx="100" cy="30" r="4" fill="${c.eye}"/>
      <path fill="#1e0336" d="M82 90a8 8 0 0 0 16 0zM102 90a8 8 0 0 0 16 0z"/>
      <circle cx="90" cy="92" r="3.4" fill="${c.eye}"/><circle cx="110" cy="92" r="3.4" fill="${c.eye}"/>
      <path fill="#1e0336" d="M88 108h24v4H88z"/><path fill="#1e0336" d="M92 106v8M100 106v8M108 106v8" stroke="#1e0336" stroke-width="2"/>
      <path fill="#5c3d1e" d="M176 40h6v136h-6z"/><circle cx="179" cy="36" r="10" fill="${c.eye}"/><circle cx="179" cy="36" r="5" fill="#d9ffe6"/>`,
    hydra: (c) => `
      <path fill="${c.body}" d="M60 176 C40 140 30 110 40 70 C46 50 62 48 66 66 C72 96 78 130 90 176Z"/>
      <path fill="${c.body}" d="M140 176 C160 140 170 110 160 70 C154 50 138 48 134 66 C128 96 122 130 110 176Z"/>
      <path fill="${c.dark}" d="M84 176 C82 120 88 80 100 40 C112 80 118 120 116 176Z"/>
      <path fill="${c.body}" d="M88 176 C86 120 92 84 100 50 C108 84 114 120 112 176Z"/>
      <g><path fill="${c.body}" d="M28 64 C30 44 50 38 62 48 C72 56 70 70 58 74 C46 78 30 76 28 64Z"/><path fill="${c.horn}" d="M40 46 L36 30 L48 42Z"/><circle cx="50" cy="56" r="5" fill="#fff"/><circle cx="51" cy="57" r="2.6" fill="${c.eye}"/></g>
      <g><path fill="${c.body}" d="M172 64 C170 44 150 38 138 48 C128 56 130 70 142 74 C154 78 170 76 172 64Z"/><path fill="${c.horn}" d="M160 46 L164 30 L152 42Z"/><circle cx="150" cy="56" r="5" fill="#fff"/><circle cx="149" cy="57" r="2.6" fill="${c.eye}"/></g>
      <g><path fill="${c.body}" d="M80 40 C80 18 120 18 120 40 C120 56 108 62 100 62 C92 62 80 56 80 40Z"/><path fill="${c.horn}" d="M86 24 L80 6 L96 20Z M114 24 L120 6 L104 20Z"/>${eyes(c, 92, 108, 38, 6)}<path d="M92 52 Q100 58 108 52" stroke="#0b2d17" stroke-width="3" fill="none"/></g>
      <path fill="${c.light}" d="M70 176 C76 150 124 150 130 176Z" opacity=".7"/>`,
    dragon: (c) => `
      <path fill="${c.dark}" d="M40 120 C10 100 4 60 20 40 C30 70 50 80 70 84Z"/>
      <path fill="${c.dark}" d="M30 70 L20 40 L44 62Z" opacity=".6"/>
      <path fill="${c.body}" d="M60 176 C50 130 70 96 100 92 C130 96 150 130 140 176Z"/>
      <path fill="${c.light}" d="M80 176 C78 146 88 122 100 120 C112 122 122 146 120 176Z"/>
      <path fill="${c.body}" d="M84 100 C80 70 90 40 120 34 C150 30 176 44 178 62 C180 76 166 84 150 82 C136 82 130 92 126 104Z"/>
      <path fill="${c.light}" d="M150 66 C160 64 172 66 176 62 C176 74 164 80 150 78Z"/>
      <path fill="${c.horn}" d="M112 38 L102 10 L124 32Z M132 34 L132 8 L144 32Z"/>
      <circle cx="134" cy="54" r="9" fill="#fff"/><circle cx="136" cy="55" r="5" fill="${c.eye}"/><circle cx="136" cy="55" r="2.2" fill="#120308"/>
      <circle cx="168" cy="58" r="2.4" fill="${c.dark}"/>
      <path fill="#ffc300" d="M178 66 C190 60 198 66 196 74 C192 72 188 74 186 70 C186 76 182 80 176 76Z"/>
      <path fill="${c.horn}" d="M96 100 L90 88 L104 96Z M90 120 L82 110 L98 116Z"/>`,
    golem: (c) => `
      <path fill="${c.dark}" d="M30 96 L58 86 L64 150 L36 156Z"/><path fill="${c.dark}" d="M170 96 L142 86 L136 150 L164 156Z"/>
      <path fill="${c.body}" d="M54 70 L146 66 L152 176 L48 176Z"/>
      <path fill="${c.light}" d="M60 76 L100 74 L96 110 L62 114Z" opacity=".5"/>
      <path fill="${c.dark}" d="M98 120 L140 118 L144 140 L100 146Z" opacity=".5"/>
      <path fill="${c.body}" d="M68 30 L132 28 L138 76 L62 78Z"/>
      <path fill="${c.light}" d="M72 34 L104 32 L100 46 L70 48Z" opacity=".5"/>
      <rect x="78" y="48" width="14" height="9" rx="2" fill="${c.eye}"/><rect x="108" y="48" width="14" height="9" rx="2" fill="${c.eye}"/>
      <path d="M84 66 H116" stroke="#1c1917" stroke-width="4"/>
      <g transform="translate(100 140)"><circle r="16" fill="${c.horn}"/><text y="7" text-anchor="middle" font-size="20" font-weight="800" fill="#44403c" font-family="Figtree, sans-serif">$</text></g>`,
    ghost: (c) => `
      <path fill="${c.dark}" d="M46 176 C40 120 42 50 100 40 C158 50 160 120 154 176 L140 162 L126 176 L112 162 L100 176 L88 162 L74 176 L60 162Z" transform="translate(4 4)" opacity=".5"/>
      <path fill="${c.body}" d="M46 176 C40 120 42 50 100 40 C158 50 160 120 154 176 L140 162 L126 176 L112 162 L100 176 L88 162 L74 176 L60 162Z"/>
      <path fill="${c.light}" d="M64 90 C66 64 82 52 100 50 C84 60 76 76 76 110Z" opacity=".8"/>
      <path fill="${c.body}" d="M46 110 C26 108 18 92 22 80 C34 92 40 96 50 96Z"/><path fill="${c.body}" d="M154 110 C174 108 182 92 178 80 C166 92 160 96 150 96Z"/>
      <ellipse cx="84" cy="96" rx="10" ry="13" fill="${c.dark}"/><ellipse cx="116" cy="96" rx="10" ry="13" fill="${c.dark}"/>
      <circle cx="86" cy="98" r="4.5" fill="${c.eye}"/><circle cx="118" cy="98" r="4.5" fill="${c.eye}"/>
      <ellipse cx="100" cy="128" rx="9" ry="12" fill="${c.dark}"/>`
  };

  function creature(kind, c) {
    const body = (CREATURES[kind] || CREATURES.imp)(c);
    return `<svg viewBox="0 0 200 230" class="creature-art">
      <path fill="#3a1a0a" d="M96 170h8v60h-8z"/><circle cx="100" cy="176" r="5" fill="#ffb627"/>
      <g class="creature-body">${body}</g></svg>`;
  }

  function flameSet(seed) {
    return `<svg viewBox="0 0 240 200" preserveAspectRatio="none" class="flame-art">
      <path class="fl fl1" fill="#c8102e" d="${flames(240, 200, 200, 120, 190, seed, 46)}"/>
      <path class="fl fl2" fill="#ff4a1c" d="${flames(240, 200, 200, 90, 150, seed + 1, 40)}"/>
      <path class="fl fl3" fill="#ff9f1c" d="${flames(240, 200, 200, 50, 110, seed + 2, 34)}"/>
      <path class="fl fl4" fill="#ffd23f" d="${flames(240, 200, 200, 20, 60, seed + 3, 30)}"/></svg>`;
  }

  window.ART = { rng, scallop, torn, wave, foam, flames, crags, layer, edge, CLOUD, CLOUD2, BALLOON, SUN, PLANE, BIRD, SHIP, RADAR, LIGHTHOUSE, ISLAND, ICEBERG, OCTOPUS, ANCHOR, SHARK, CHEST, creature, flameSet };
})();
