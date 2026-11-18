/* =====================================================================
   The DevOps Sea — skills scene.
   · HMS Kubernetes, steered by a draggable helm wheel (8 skill areas)
   · a shark that tows container pods from the registry to the ship
   · clickable landmarks: clouds, Terraform isle, lighthouse, radar,
     anchor, octopus, penguin, treasure chest
   ===================================================================== */
window.DQ = window.DQ || {};
DQ.Sea = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const f1 = (n) => n.toFixed(1);
  const spokes = (n, r1, r2) => Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return `<line x1="${f1(Math.cos(a) * r1)}" y1="${f1(Math.sin(a) * r1)}" x2="${f1(Math.cos(a) * r2)}" y2="${f1(Math.sin(a) * r2)}"/>`;
  }).join('');
  const wave = (y, amp, period, bottom) => {
    let d = `M0 ${y}`;
    for (let x = 0; x < 1600 + period * 2; x += period) d += ` q${period / 4} ${-amp} ${period / 2} 0 t${period / 2} 0`;
    return d + ` V${bottom} H0Z`;
  };
  const cube = (cx, cy, s) => `
    <path d="M${cx} ${cy - s} L${cx + s} ${cy - s / 2} L${cx} ${cy} L${cx - s} ${cy - s / 2}Z" fill="#b69cff"/>
    <path d="M${cx - s} ${cy - s / 2} L${cx} ${cy} L${cx} ${cy + s} L${cx - s} ${cy + s / 2}Z" fill="#7b42bc"/>
    <path d="M${cx} ${cy} L${cx + s} ${cy - s / 2} L${cx + s} ${cy + s / 2} L${cx} ${cy + s}Z" fill="#5c33a6"/>`;

  const SKILLS = DQ.SKILLS;
  const WHEEL = SKILLS.filter((s) => !s.bonus);
  const SPOT_LABEL = { clouds: 'Cloud', ship: 'Kubernetes', radar: 'Observability', shark: 'Containers', octopus: 'CI/CD',
    island: 'IaC', lighthouse: 'DevSecOps', anchor: 'Reliability', penguin: 'Linux & Code', chest: 'Certifications' };
  /* tag anchor per landmark, in that landmark's own coordinate space */
  const SPOT_ANCHOR = { clouds: [392, 214], island: [1172, 352], lighthouse: [1468, 92], penguin: [150, 300], ship: [300, 126],
    radar: [0, -46], anchor: [970, 812], octopus: [0, -104], shark: [140, -36], chest: [722, 772] };

  /* ------------------------------------------------------------ scene */
  function sceneSVG() {
    const ship = `
      <g class="ship-bob"><g transform="translate(400 130)">
        <ellipse cx="290" cy="514" rx="300" ry="16" fill="#03466b" opacity=".35"/>
        <g class="spot" data-spot="ship">
          <rect x="293" y="30" width="14" height="372" rx="4" fill="#5b3216"/>
          <rect x="435" y="104" width="10" height="298" rx="4" fill="#5b3216"/>
          <path class="pennant" d="M307 32 Q340 26 374 38 Q340 46 307 46Z" fill="#ef4444"/>
          <path d="M300 30 L36 324 M300 30 L566 392 M440 104 L600 372" stroke="#3b2412" stroke-opacity=".45" stroke-width="2"/>
          <path d="M449 128 L596 372 L449 372Z" fill="#f6eedd" stroke="#e5d6b8" stroke-width="2"/>
          <path d="M222 54 Q300 42 378 54 Q386 76 378 92 Q300 84 222 92 Q214 72 222 54Z" fill="url(#sea-sail)" stroke="#e2d2b2" stroke-width="2"/>
          <path d="M188 104 Q300 84 412 104 Q430 205 412 304 Q300 286 188 304 Q170 205 188 104Z" fill="url(#sea-sail)" stroke="#e2d2b2" stroke-width="2"/>
          <g transform="translate(300 204)"><circle r="56" fill="#326ce5"/><circle r="50" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="4"/>
            <g stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none"><circle r="16"/>${spokes(7, 16, 40)}</g></g>
          <rect x="176" y="98" width="248" height="9" rx="4.5" fill="#6b3a18"/>
          <rect x="176" y="300" width="248" height="9" rx="4.5" fill="#6b3a18"/>
          <rect x="212" y="48" width="176" height="7" rx="3.5" fill="#6b3a18"/>
          <g id="deck-pods"></g>
          <path d="M18 402 V328 Q18 318 28 318 H172 V402Z" fill="#8a4a20"/>
          <path d="M18 318 H172" stroke="#f2c14e" stroke-width="5" stroke-linecap="round"/>
          <path d="M26 318 V302 M50 318 V302 M74 318 V302 M126 318 V302 M150 318 V302 M166 318 V302 M22 302 H170" stroke="#6b3a18" stroke-width="4" stroke-linecap="round"/>
          <rect x="34" y="340" width="22" height="18" rx="3" fill="#ffe08a"/><rect x="64" y="340" width="22" height="18" rx="3" fill="#ffe08a"/>
          <rect x="96" y="294" width="8" height="26" fill="#5b3216"/>
          <g transform="translate(100 284)"><g id="ship-helm" class="ship-helm" stroke-linecap="round">
            <circle r="23" fill="none" stroke="#7a4520" stroke-width="6"/>
            <g stroke="#7a4520" stroke-width="4">${spokes(8, 4, 33)}</g>
            <circle r="6" fill="#326ce5" stroke="#f2c14e" stroke-width="2"/></g></g>
          <path d="M14 402 H566 C556 452 524 492 470 512 H112 C64 494 30 456 14 402Z" fill="url(#sea-hull)"/>
          <path d="M40 412 H540" stroke="#fff" stroke-opacity=".14" stroke-width="6" stroke-linecap="round"/>
          <path d="M14 402 H566" stroke="#f2c14e" stroke-width="7" stroke-linecap="round"/>
          <g fill="#ffe9a8" stroke="#3b2412" stroke-width="4">${[150, 222, 390, 462].map((x) => `<circle cx="${x}" cy="474" r="9"/>`).join('')}</g>
          <text x="306" y="482" text-anchor="middle" font-family="Sora,sans-serif" font-weight="700" font-size="19" letter-spacing="3" fill="#ffe7a8">HMS KUBERNETES</text>
          <path d="M560 404 L624 368" stroke="#5b3216" stroke-width="9" stroke-linecap="round"/>
        </g>
        <g class="spot" data-spot="radar" transform="translate(440 98)">
          <circle class="radar-wave" r="22" fill="none" stroke="#4ade80" stroke-width="3"/>
          <circle class="radar-wave w2" r="22" fill="none" stroke="#4ade80" stroke-width="3"/>
          <rect x="-3" y="0" width="6" height="12" fill="#5b3216"/>
          <path d="M-26 -8 Q0 22 26 -8Z" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
          <path d="M0 2 V-20" stroke="#64748b" stroke-width="3"/><circle cy="-22" r="4.5" fill="#ef4444"/>
        </g>
      </g></g>`;

    const shark = `
      <g id="shark-rig" transform="translate(1700 590)">
        <g class="spot" data-spot="shark">
          <g class="shark-swim">
            <path class="shark-tail" d="M268 62 L312 16 Q300 62 312 110Z" fill="#3f6694"/>
            <path d="M8 66 C26 26 120 12 204 28 C244 36 266 50 274 62 C266 74 240 88 200 94 C120 106 30 100 8 66Z" fill="url(#sea-shark)"/>
            <path d="M14 72 C40 94 120 100 200 92 C232 88 256 76 270 64 C248 82 204 86 152 86 C92 86 42 82 14 72Z" fill="#f1f5f9"/>
            <path d="M124 26 L152 -18 L178 32Z" fill="#3f6694"/>
            <path d="M112 86 L92 126 L148 94Z" fill="#3f6694"/>
            <path d="M196 30 Q207 62 198 94" stroke="#2496ed" stroke-width="8" fill="none"/>
            <g stroke="#2c4f78" stroke-width="3" fill="none" stroke-linecap="round"><path d="M80 52 Q74 66 80 80"/><path d="M92 50 Q86 66 92 82"/><path d="M104 50 Q98 66 104 82"/></g>
            <path d="M22 74 Q42 85 64 76" stroke="#1e293b" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path d="M31 79 l3 5 l3 -4 M41 81 l3 5 l3 -5 M51 81 l3 5 l3 -5" stroke="#fff" stroke-width="2" fill="none"/>
            <circle cx="44" cy="52" r="7.5" fill="#0f172a"/><circle cx="46.5" cy="49.5" r="2.6" fill="#fff"/>
            <path d="M34 41 Q44 35 54 41" stroke="#2c4f78" stroke-width="3" fill="none" stroke-linecap="round"/>
          </g>
          <path class="tow-rope" d="M204 60 C250 44 292 82 332 70" stroke="#d4b483" stroke-width="3.5" fill="none"/>
          <g class="raft" transform="translate(330 40)">
            <rect x="0" y="40" width="186" height="16" rx="6" fill="#a0632d"/>
            <path d="M31 40 V56 M62 40 V56 M93 40 V56 M124 40 V56 M155 40 V56" stroke="#7a4520" stroke-width="2"/>
            <use href="#s-pod" class="raft-pod" x="6" y="0" width="56" height="41" style="color:#2496ed"/>
            <use href="#s-pod" class="raft-pod" x="64" y="0" width="56" height="41" style="color:#8b5cf6"/>
            <use href="#s-pod" class="raft-pod" x="122" y="0" width="56" height="41" style="color:#10b981"/>
          </g>
        </g>
      </g>`;

    return `
    <svg class="sea-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustrated sea: a Kubernetes ship, a shark towing container pods, a lighthouse, an island and an octopus">
      <defs>
        <linearGradient id="sea-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b9cf0"/><stop offset=".75" stop-color="#a5dcff"/><stop offset="1" stop-color="#e6f7ff"/></linearGradient>
        <radialGradient id="sea-sunglow"><stop offset="0" stop-color="#fffbe6"/><stop offset=".35" stop-color="#fff3b0" stop-opacity=".9"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></radialGradient>
        <linearGradient id="sea-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4cc3f5"/><stop offset=".5" stop-color="#0d9ad6"/><stop offset="1" stop-color="#0576b0"/></linearGradient>
        <linearGradient id="sea-deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#086a9c"/><stop offset="1" stop-color="#062b45"/></linearGradient>
        <linearGradient id="sea-hull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a45a2a"/><stop offset="1" stop-color="#572810"/></linearGradient>
        <linearGradient id="sea-sail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#efe2c6"/><stop offset=".5" stop-color="#fffaf0"/><stop offset="1" stop-color="#e6d3ae"/></linearGradient>
        <linearGradient id="sea-shark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a74a6"/><stop offset="1" stop-color="#86acd6"/></linearGradient>
        <linearGradient id="sea-ice" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#9edbf7"/></linearGradient>
        <linearGradient id="sea-beam" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff6c4" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c4" stop-opacity="0"/></linearGradient>
        <linearGradient id="sea-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0f2fe" stop-opacity=".28"/><stop offset="1" stop-color="#e0f2fe" stop-opacity="0"/></linearGradient>
      </defs>

      <rect width="1600" height="480" fill="url(#sea-sky)"/>
      <circle cx="1250" cy="250" r="190" fill="url(#sea-sunglow)"/><circle cx="1250" cy="250" r="54" fill="#fff8d6"/>
      <g opacity=".75"><use href="#s-cloud" x="760" y="40" width="220" height="120"/><use href="#s-cloud" x="1000" y="120" width="150" height="82"/></g>
      <g class="gulls" fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round"><path d="M700 210 q9 -10 18 0 q9 -10 18 0"/><path d="M748 186 q7 -8 14 0 q7 -8 14 0"/></g>

      <g class="spot" data-spot="clouds">
        <use href="#s-cloud" x="96" y="80" width="230" height="126"/>
        <use href="#s-cloud" x="280" y="30" width="250" height="136"/>
        <use href="#s-cloud" x="470" y="96" width="210" height="114"/>
        <g font-family="Sora,sans-serif" font-weight="800" text-anchor="middle">
          <text x="210" y="160" font-size="30" fill="#ff9900">AWS</text>
          <text x="404" y="116" font-size="30" fill="#0078d4">Azure</text>
          <text x="574" y="170" font-size="30" fill="#34a853">GCP</text>
        </g>
      </g>

      <path d="M0 470 L120 452 L220 462 L330 446 L420 470Z M820 470 L900 456 L960 464 L1010 470Z" fill="#7fb7d8" opacity=".6"/>

      <g class="spot" data-spot="island">
        <ellipse cx="1170" cy="470" rx="152" ry="12" fill="#bfe9ff" opacity=".7"/>
        <path d="M1030 470 Q1170 440 1310 470Z" fill="#fcd9a0"/>
        <path d="M1062 466 Q1112 380 1170 394 Q1232 374 1282 466Z" fill="#34d399"/>
        <path d="M1084 464 Q1132 410 1172 412 Q1204 424 1214 466Z" fill="#10b981" opacity=".55"/>
        <path d="M1090 466 Q1084 420 1098 392" stroke="#92400e" stroke-width="5" fill="none"/>
        <g fill="#16a34a"><path d="M1098 392 q-26 -4 -36 12 q20 -18 36 -12z"/><path d="M1098 392 q24 -8 36 8 q-20 -14 -36 -8z"/><path d="M1098 392 q-6 -22 8 -32 q-4 20 -8 32z"/></g>
        ${cube(1170, 446, 16)}${cube(1202, 446, 16)}${cube(1186, 418, 16)}
        <path d="M1250 466 V360 H1300" stroke="#f59e0b" stroke-width="6" fill="none" stroke-linejoin="round"/><path d="M1250 380 L1270 360" stroke="#f59e0b" stroke-width="4"/>
        <g class="crane-load"><path d="M1290 360 V392" stroke="#334155" stroke-width="2"/>${cube(1290, 404, 11)}</g>
      </g>

      <g class="spot" data-spot="lighthouse">
        <path class="beam" d="M1468 150 L1000 70 L1000 250Z" fill="url(#sea-beam)"/>
        <path d="M1380 562 Q1392 506 1430 496 Q1470 478 1512 498 Q1556 508 1570 562Z" fill="#4b5d73"/>
        <path d="M1404 540 Q1430 520 1460 528" stroke="#334155" stroke-width="4" fill="none"/>
        <path d="M1440 504 L1452 182 L1484 182 L1496 504Z" fill="#f8fafc"/>
        <path d="M1449.6 240 L1486.4 240 L1488.4 290 L1447.6 290Z M1445.7 340 L1490.3 340 L1492.3 390 L1443.7 390Z M1441.7 440 L1494.3 440 L1496 490 L1440 490Z" fill="#e2453b"/>
        <path d="M1484 182 L1496 504 L1476 504 L1468 182Z" fill="#000" opacity=".07"/>
        <rect x="1440" y="170" width="56" height="12" rx="3" fill="#1f2937"/>
        <rect x="1450" y="134" width="36" height="36" fill="#fff3a6" class="lamp"/>
        <path d="M1450 134 V170 M1468 134 V170 M1486 134 V170" stroke="#1f2937" stroke-width="3"/>
        <path d="M1444 136 L1468 104 L1492 136Z" fill="#c2342c"/>
        <rect x="1460" y="458" width="16" height="32" rx="8" fill="#334155"/>
      </g>

      <rect y="470" width="1600" height="240" fill="url(#sea-water)"/>
      <g stroke="#e0f7ff" stroke-width="3" stroke-linecap="round" opacity=".45"><path d="M80 500 h40 M380 520 h56 M1080 504 h46 M1360 530 h60 M640 540 h36"/></g>
      <g class="wave w-back"><path d="${wave(590, 7, 160, 712)}" fill="#22a9e3" opacity=".55"/></g>

      <g class="spot" data-spot="penguin">
        <path d="M30 612 L64 476 L118 446 L150 384 L212 394 L244 468 L296 612Z" fill="url(#sea-ice)"/>
        <path d="M212 394 L244 468 L296 612 L212 612 L230 478Z" fill="#7cc5ea" opacity=".55"/>
        <path d="M150 384 L212 394 L198 420 L164 412Z" fill="#fff"/>
        <g transform="translate(176 392)">
          <path d="M-20 -42 Q-36 -24 -24 -8" stroke="#1f2937" stroke-width="9" fill="none" stroke-linecap="round"/>
          <ellipse cx="0" cy="-34" rx="22" ry="34" fill="#1f2937"/><ellipse cx="3" cy="-28" rx="15" ry="25" fill="#f8fafc"/>
          <circle cx="0" cy="-72" r="17" fill="#1f2937"/><ellipse cx="6" cy="-73" rx="9" ry="8" fill="#f8fafc"/>
          <circle cx="9" cy="-74" r="2.8" fill="#111"/><path d="M14 -69 L27 -66 L14 -62Z" fill="#f59e0b"/>
          <ellipse cx="-8" cy="0" rx="9" ry="4" fill="#f59e0b"/><ellipse cx="10" cy="0" rx="9" ry="4" fill="#f59e0b"/>
          <g transform="translate(12 -42)"><path d="M0 0 L32 -6 L36 18 L4 24Z" fill="#334155"/><path d="M4 3 L29 -2 L32 15 L7 20Z" fill="#0f172a"/>
            <text x="11" y="14" font-size="10" fill="#4ade80" font-family="JetBrains Mono,monospace" font-weight="700" transform="rotate(-10 11 14)">$_</text></g>
        </g>
      </g>

      ${ship}

      <g class="wave w-mid"><path d="${wave(628, 9, 200, 712)}" fill="#0b8fcb"/></g>

      <rect y="696" width="1600" height="204" fill="url(#sea-deep)"/>
      <g fill="url(#sea-ray)"><path d="M200 700 L260 700 L180 900 L80 900Z"/><path d="M620 700 L700 700 L640 900 L520 900Z"/><path d="M1060 700 L1120 700 L1100 900 L990 900Z"/><path d="M1420 700 L1470 700 L1500 900 L1400 900Z"/></g>
      <path d="M0 880 Q200 862 420 878 T860 872 T1300 880 T1600 870 V900 H0Z" fill="#0b3a55"/>
      <g class="weed" fill="none" stroke-linecap="round"><path d="M70 900 Q58 860 74 830 Q88 800 72 770" stroke="#15803d" stroke-width="9"/><path d="M98 900 Q110 866 96 840 Q84 816 100 792" stroke="#22c55e" stroke-width="7"/>
        <path d="M1530 900 Q1518 860 1534 828 Q1548 800 1532 772" stroke="#15803d" stroke-width="9"/><path d="M560 900 Q550 872 562 850" stroke="#22c55e" stroke-width="7"/></g>

      <g class="spot" data-spot="anchor">
        <path d="M946 520 V770" stroke="#94a3b8" stroke-width="5" stroke-dasharray="12 6"/>
        <circle cx="946" cy="784" r="12" fill="none" stroke="#64748b" stroke-width="7"/>
        <rect x="941" y="794" width="10" height="70" rx="3" fill="#64748b"/><rect x="922" y="806" width="48" height="9" rx="4" fill="#64748b"/>
        <path d="M908 840 Q912 874 946 874 Q980 874 984 840" fill="none" stroke="#64748b" stroke-width="10" stroke-linecap="round"/>
        <path d="M900 848 L908 826 L920 846Z M992 848 L984 826 L972 846Z" fill="#64748b"/>
      </g>

      <g class="spot" data-spot="chest">
        <ellipse cx="722" cy="884" rx="96" ry="10" fill="#041f33" opacity=".5"/>
        <path d="M652 822 Q722 768 792 822 L786 832 Q722 788 658 832Z" fill="#92400e" stroke="#78350f" stroke-width="3"/>
        <ellipse class="chest-glow" cx="722" cy="832" rx="66" ry="20" fill="#fde68a"/>
        <g fill="#facc15" stroke="#b45309" stroke-width="1.5">${[[684, 830], [700, 822], [716, 828], [736, 822], [752, 830], [722, 816]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="4.5"/>`).join('')}</g>
        <rect x="650" y="832" width="144" height="52" rx="7" fill="#b45309" stroke="#78350f" stroke-width="3"/>
        <rect x="650" y="832" width="144" height="9" fill="#facc15"/><rect x="672" y="832" width="10" height="52" fill="#facc15"/><rect x="762" y="832" width="10" height="52" fill="#facc15"/>
        <rect x="712" y="846" width="20" height="22" rx="3" fill="#facc15" stroke="#a16207" stroke-width="2"/>
      </g>

      <g class="spot" data-spot="octopus" transform="translate(1240 796)">
        <g class="bubbles" fill="none" stroke="#e0f2fe" stroke-width="2.5"><circle cx="40" cy="-110" r="7"/><circle cx="56" cy="-136" r="4.5"/><circle cx="30" cy="-150" r="3"/></g>
        <g class="tentacles" fill="none" stroke="#7c3aed" stroke-width="15" stroke-linecap="round">
          <path d="M-44 8 Q-80 34 -100 18 Q-118 2 -104 -18"/><path d="M-30 22 Q-54 70 -86 78 Q-106 82 -102 62"/>
          <path d="M-12 28 Q-18 74 -30 96"/><path d="M12 28 Q18 74 30 96"/>
          <path d="M30 22 Q54 70 86 78 Q106 82 102 62"/><path d="M44 8 Q80 34 100 18 Q118 2 104 -18"/>
        </g>
        <path d="M-58 10 Q-68 -76 0 -84 Q68 -76 58 10 Q30 36 0 36 Q-30 36 -58 10Z" fill="#8b5cf6"/>
        <ellipse cx="-22" cy="-58" rx="16" ry="9" fill="#a78bfa" opacity=".8"/>
        <circle cx="-20" cy="-22" r="13" fill="#fff"/><circle cx="20" cy="-22" r="13" fill="#fff"/>
        <circle cx="-17" cy="-20" r="6" fill="#1e1b4b"/><circle cx="23" cy="-20" r="6" fill="#1e1b4b"/>
        <ellipse cx="-34" cy="0" rx="8" ry="4.5" fill="#f472b6" opacity=".7"/><ellipse cx="34" cy="0" rx="8" ry="4.5" fill="#f472b6" opacity=".7"/>
        <path d="M-10 4 Q0 12 10 4" stroke="#3b0764" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <g transform="translate(-106 -24)" stroke="#fde68a" stroke-width="3" fill="none"><circle cx="0" cy="-10" r="4"/><circle cx="0" cy="10" r="4"/><circle cx="12" cy="-3" r="4"/><path d="M0 -6 V6 M0 2 Q10 2 12 1"/></g>
        <g transform="translate(106 -24)"><circle r="11" fill="none" stroke="#fde68a" stroke-width="5" stroke-dasharray="5 3.6"/><circle r="4" fill="#fde68a"/></g>
      </g>

      <g class="fish-swim"><g transform="translate(420 760)"><path d="M44 15 L60 4 L58 15 L60 26Z" fill="#fbbf24"/><ellipse cx="26" cy="15" rx="22" ry="11" fill="#fbbf24"/><circle cx="12" cy="12" r="2.6" fill="#0f172a"/></g></g>
      <g class="fish-swim f2"><g transform="translate(1000 820)"><path d="M44 12 L56 4 L54 12 L56 20Z" fill="#f472b6"/><ellipse cx="24" cy="12" rx="18" ry="9" fill="#f472b6"/><circle cx="12" cy="10" r="2.2" fill="#0f172a"/></g></g>

      ${shark}

      <g class="wave w-front"><path d="${wave(690, 8, 180, 716)}" fill="#7dd3fc" opacity=".38"/></g>
      <g id="flying-pods"></g>
    </svg>`;
  }

  /* --------------------------------------------------------- landmarks */
  function addTags(svg) {
    $$('.spot', svg).forEach((g) => {
      const id = g.dataset.spot;
      const label = SPOT_LABEL[id];
      const [x, y] = SPOT_ANCHOR[id];
      const w = Math.round(label.length * 8.2 + 26);
      g.insertAdjacentHTML('beforeend', `
        <g class="spot-tag" transform="translate(${x} ${y})">
          <circle class="pulse" r="10"/><circle class="dot" r="5.5"/>
          <g transform="translate(14 -14)"><rect width="${w}" height="28" rx="14"/><text x="13" y="19">${esc(label)}</text></g>
        </g>`);
      const skill = SKILLS.find((s) => s.spot === id);
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', skill ? `${skill.name} — ${skill.where}` : 'Certifications and awards');
    });
  }

  function activateSpot(id) {
    if (id === 'chest') {
      const certs = $('#certs');
      certs.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      certs.classList.remove('flash'); void certs.offsetWidth; certs.classList.add('flash');
      return;
    }
    if (id === 'shark') deliver();
    const skill = SKILLS.find((s) => s.spot === id);
    if (skill) select(skill.id, true);
  }

  /* -------------------------------------------------------- helm wheel */
  let rot = 0;          /* wheel rotation in degrees (unbounded) */
  let current = WHEEL[0].id;
  const STEP = 360 / WHEEL.length;

  function wheelSVG() {
    let spokesHtml = '';
    for (let i = 0; i < WHEEL.length; i++) {
      const a = (i * STEP) * Math.PI / 180;
      const sx = Math.sin(a), sy = -Math.cos(a);
      spokesHtml += `<line x1="${f1(sx * 30)}" y1="${f1(sy * 30)}" x2="${f1(sx * 128)}" y2="${f1(sy * 128)}" stroke="#8b5226" stroke-width="12"/>
        <line x1="${f1(sx * 122)}" y1="${f1(sy * 122)}" x2="${f1(sx * 150)}" y2="${f1(sy * 150)}" stroke="url(#hw-ring)" stroke-width="20"/>`;
    }
    const studs = Array.from({ length: WHEEL.length }, (_, i) => {
      const a = (i * STEP) * Math.PI / 180;
      return `<circle cx="${f1(Math.sin(a) * 104)}" cy="${f1(-Math.cos(a) * 104)}" r="6" fill="#f2c14e"/>`;
    }).join('');
    return `
      <svg viewBox="-160 -160 320 320" aria-hidden="true">
        <defs><linearGradient id="hw-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d4945a"/><stop offset="1" stop-color="#6b3a18"/></linearGradient></defs>
        <g stroke-linecap="round">${spokesHtml}</g>
        <circle r="104" fill="none" stroke="url(#hw-ring)" stroke-width="24"/>
        <circle r="112" fill="none" stroke="#f0bf86" stroke-width="2" opacity=".5"/>
        ${studs}
        <circle r="38" fill="#326ce5" stroke="#f2c14e" stroke-width="6"/>
        <g stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none"><circle r="11"/>${spokes(7, 11, 27)}</g>
      </svg>`;
  }

  function buildWheel() {
    const el = $('#helm-wheel');
    el.innerHTML = `<div class="wheel-rot" id="wheel-rot">${wheelSVG()}${WHEEL.map((s, i) => {
      const a = (i * STEP) * Math.PI / 180;
      return `<button class="handle" data-skill="${s.id}" style="left:${f1(50 + Math.sin(a) * 47)}%;top:${f1(50 - Math.cos(a) * 47)}%" aria-label="${esc(s.name)}" tabindex="-1"><i class="${s.icon}"></i></button>`;
    }).join('')}</div>`;

    let dragging = false, moved = 0, startA = 0, startRot = 0, downHandle = null;
    const angleAt = (e) => {
      const r = el.getBoundingClientRect();
      return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
    };
    el.addEventListener('pointerdown', (e) => {
      dragging = true; moved = 0; startA = angleAt(e); startRot = rot;
      /* pointer capture retargets pointerup to the wheel, so note the handle now */
      downHandle = e.target.closest('.handle');
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* synthetic events */ }
      el.classList.add('dragging');
    });
    el.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      let d = angleAt(e) - startA;
      if (d > 180) d -= 360; if (d < -180) d += 360;
      moved = Math.max(moved, Math.abs(d));
      setRot(startRot + d, false);
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('dragging');
      if (moved < 4 && downHandle) select(downHandle.dataset.skill, false);
      else snap();
      downHandle = null;
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
    });
  }

  function setRot(r, animate) {
    rot = r;
    const wr = $('#wheel-rot');
    wr.classList.toggle('snapping', !!animate);
    wr.style.setProperty('--rot', rot + 'deg');
    const helm = $('#ship-helm');
    if (helm) { helm.classList.toggle('snapping', !!animate); helm.style.transform = `rotate(${rot}deg)`; }
  }
  const indexAtTop = () => ((Math.round(-rot / STEP) % WHEEL.length) + WHEEL.length) % WHEEL.length;
  function snap() {
    const i = indexAtTop();
    setRot(-i * STEP + Math.round((rot + i * STEP) / 360) * 360, true);
    show(WHEEL[i].id);
  }
  function step(dir) {
    setRot(Math.round(rot / STEP) * STEP - dir * STEP, true);
    show(WHEEL[indexAtTop()].id);
  }

  /* select a skill area: turn the wheel the short way so it points up */
  function select(id, fromScene) {
    const i = WHEEL.findIndex((s) => s.id === id);
    if (i >= 0) {
      const base = -i * STEP;
      const k = Math.round((rot - base) / 360);
      setRot(base + k * 360, true);
    }
    show(id);
    if (fromScene && window.innerWidth < 900) $('#helm-panel').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
  }

  function show(id) {
    current = id;
    const s = SKILLS.find((k) => k.id === id);
    const n = WHEEL.findIndex((k) => k.id === id);
    $('#helm-wheel').setAttribute('aria-valuenow', String(n + 1));
    $('#helm-wheel').setAttribute('aria-valuetext', s.name);
    $$('.handle').forEach((h) => h.classList.toggle('on', h.dataset.skill === id));
    $$('#sea-scene .spot').forEach((g) => g.classList.toggle('is-active', g.dataset.spot === s.spot));
    $('#helm-panel').innerHTML = `<div class="hp-inner swap">
      <div class="hp-top"><span class="hp-icon"><i class="${s.icon}"></i></span>
        <div><span class="hp-where"><i class="fa-solid fa-location-dot"></i> ${esc(s.where)}</span><h3>${esc(s.name)}</h3></div></div>
      <p class="hp-flavor">${esc(s.flavor)}</p>
      <div class="chips">${s.items.map((t) => `<span class="chip"><i class="${DQ.iconFor(t)}"></i>${esc(t)}</span>`).join('')}</div>
      <div class="hp-nav">
        <button class="btn btn-sm btn-glass" data-step="-1"><i class="fa-solid fa-rotate-left"></i> Port</button>
        <span>${n >= 0 ? `${n + 1} / ${WHEEL.length}` : 'Bonus find'}</span>
        <button class="btn btn-sm btn-glass" data-step="1">Starboard <i class="fa-solid fa-rotate-right"></i></button>
      </div></div>`;
  }

  /* ------------------------------------------------------ pod delivery */
  const PODS = ['ai-inference', 'spring-api', 'grafana-agent'];
  let delivering = false, deliveredOnce = false;
  const rand = () => Math.random().toString(36).slice(2, 7);
  const logLine = (name, ready, status, age) => {
    const log = $('#kubectl-log');
    const row = document.createElement('div');
    row.className = 'k-' + status.toLowerCase().replace(/[^a-z]/g, '');
    row.textContent = `${name.padEnd(24)}${ready.padEnd(8)}${status.padEnd(20)}${age}`;
    log.appendChild(row);
    while (log.children.length > 9) log.removeChild(log.children[1]);
  };

  async function deliver() {
    if (delivering) return;
    delivering = true;
    const btn = $('#deploy-pods');
    btn.disabled = true;
    const svg = $('#sea-scene svg');
    const rig = $('#shark-rig', svg);
    const deck = $('#deck-pods', svg);
    const flying = $('#flying-pods', svg);
    const raftPods = $$('.raft-pod', rig);
    const SLOTS = [[186, 362], [238, 362], [318, 362]];
    const names = PODS.map((p) => `${p}-${rand()}`);
    const gsap = window.gsap;

    /* retire the previous rollout */
    const old = $$('use', deck);
    old.forEach((u) => logLine(u.dataset.name, '1/1', 'Terminating', '1m'));
    old.forEach((u) => u.remove());
    names.forEach((n) => logLine(n, '0/1', 'Pending', '0s'));

    if (!gsap || reduced) {
      names.forEach((n, i) => {
        deck.insertAdjacentHTML('beforeend', `<use href="#s-pod" data-name="${n}" x="${SLOTS[i][0]}" y="${SLOTS[i][1]}" width="50" height="37" style="color:${raftPods[i].style.color}"/>`);
        logLine(n, '1/1', 'Running', '2s');
      });
      delivering = false; btn.disabled = false; deliveredOnce = true;
      return;
    }

    raftPods.forEach((p) => { p.style.opacity = 1; });
    gsap.set(rig, { x: 1700, y: 590 });
    await gsap.to(rig, { x: 237, duration: 2.6, ease: 'power2.out' });
    names.forEach((n) => logLine(n, '0/1', 'ContainerCreating', '2s'));

    for (let i = 0; i < 3; i++) {
      const p = raftPods[i];
      const sx = 237 + 330 + Number(p.getAttribute('x'));
      const sy = 590 + 40;
      const tx = 400 + SLOTS[i][0], ty = 130 + SLOTS[i][1];
      const fly = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      fly.setAttribute('href', '#s-pod');
      fly.setAttribute('width', '56'); fly.setAttribute('height', '41');
      fly.style.color = p.style.color;
      flying.appendChild(fly);
      p.style.opacity = 0;
      gsap.set(fly, { x: sx, y: sy });
      const peak = Math.min(sy, ty) - 120;
      gsap.to(fly, { x: tx, duration: 0.8, ease: 'power1.inOut' });
      gsap.to(fly, { keyframes: [{ y: peak, duration: 0.4, ease: 'power2.out' }, { y: ty, duration: 0.4, ease: 'power2.in' }] });
      gsap.to(fly, { rotation: 360, svgOrigin: '28 20', duration: 0.8, ease: 'power1.inOut' });
      setTimeout(() => {
        fly.remove();
        deck.insertAdjacentHTML('beforeend', `<use href="#s-pod" class="landed" data-name="${names[i]}" x="${SLOTS[i][0]}" y="${SLOTS[i][1]}" width="50" height="37" style="color:${p.style.color}"/>`);
        logLine(names[i], '1/1', 'Running', '3s');
      }, 800);
      await new Promise((r) => setTimeout(r, 380));
    }
    await new Promise((r) => setTimeout(r, 900));
    await gsap.to(rig, { x: -700, duration: 2.4, ease: 'power2.in' });
    gsap.set(rig, { x: 1700 });
    raftPods.forEach((p) => { p.style.opacity = 1; });
    delivering = false; btn.disabled = false; deliveredOnce = true;
  }

  /* ------------------------------------------------------------ certs */
  function buildCerts() {
    $('#cert-grid').innerHTML = DQ.CERTS.map((c) => `
      <div class="cert"><span class="cert-ico"><i class="${c.icon}"></i></span><div><b>${esc(c.name)}</b><small>${esc(c.by)}</small></div></div>`).join('');
  }

  /* ------------------------------------------------------------- init */
  function init() {
    const scene = $('#sea-scene');
    scene.innerHTML = sceneSVG();
    const svg = $('svg', scene);
    addTags(svg);
    svg.addEventListener('click', (e) => { const g = e.target.closest('.spot'); if (g) activateSpot(g.dataset.spot); });
    svg.addEventListener('keydown', (e) => {
      const g = e.target.closest && e.target.closest('.spot');
      if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); activateSpot(g.dataset.spot); }
    });
    buildWheel();
    $('#helm-panel').addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (b) step(Number(b.dataset.step)); });
    show(current);
    buildCerts();
    $('#kubectl-log').textContent = '';
    logLine('NAME', 'READY', 'STATUS', 'AGE');
    $('#deploy-pods').addEventListener('click', deliver);

    /* centre the ship on narrow screens, where the scene scrolls sideways */
    const wrap = $('#sea-wrap');
    const centre = () => { wrap.scrollLeft = (wrap.scrollWidth - wrap.clientWidth) * 0.42; };
    centre(); window.addEventListener('resize', centre);

    /* the first delivery happens when the sea scrolls into view */
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting) && !deliveredOnce) { io.disconnect(); setTimeout(deliver, 400); }
    }, { threshold: 0.45 });
    io.observe(scene);
  }

  return { init, select, deliver };
})();
