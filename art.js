/* =====================================================================
   Shared illustrations: SVG symbols (clouds, flames, pods), the paper
   plane, inferno spires and heaven's gates. Flat "explainer-video"
   style: soft gradients, a shadow tone and a highlight per shape.
   ===================================================================== */
window.DQ = window.DQ || {};
DQ.ART = (() => {
  const CLOUD = 'M34 112 C12 112 4 90 20 79 C10 56 32 38 56 47 C62 20 96 8 118 27 C134 6 172 12 178 42 C202 38 218 60 206 80 C220 92 208 112 188 112 Z';
  const CLOUD_SHADE = 'M26 104 C44 90 64 100 86 91 C108 101 136 87 158 98 C176 91 196 95 206 88 C212 104 200 112 188 112 L34 112 C26 112 22 108 26 104Z';

  const symbols = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="g-cloud" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e8eeff"/></linearGradient>
      <linearGradient id="g-cloud-warm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff7ef"/><stop offset="1" stop-color="#ffd9c7"/></linearGradient>
      <linearGradient id="g-cloud-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#fff1cf"/></linearGradient>
      <linearGradient id="g-flame-o" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff3d00"/><stop offset=".6" stop-color="#ff8a00"/><stop offset="1" stop-color="#ffc400"/></linearGradient>
      <linearGradient id="g-flame-i" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffb300"/><stop offset="1" stop-color="#fff59d"/></linearGradient>
      <linearGradient id="g-pod-shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
    </defs>
    <symbol id="s-cloud" viewBox="0 0 220 120">
      <path d="${CLOUD}" fill="url(#g-cloud)"/>
      <path d="${CLOUD_SHADE}" fill="#c9d4ff" opacity=".6"/>
      <ellipse cx="98" cy="42" rx="28" ry="11" fill="#fff" opacity=".8"/>
    </symbol>
    <symbol id="s-cloud-warm" viewBox="0 0 220 120">
      <path d="${CLOUD}" fill="url(#g-cloud-warm)"/>
      <path d="${CLOUD_SHADE}" fill="#f6a5a0" opacity=".45"/>
      <ellipse cx="98" cy="42" rx="28" ry="11" fill="#fff" opacity=".75"/>
    </symbol>
    <symbol id="s-cloud-gold" viewBox="0 0 220 120">
      <path d="${CLOUD}" fill="url(#g-cloud-gold)"/>
      <path d="${CLOUD_SHADE}" fill="#f6d58a" opacity=".45"/>
      <ellipse cx="98" cy="42" rx="28" ry="11" fill="#fff" opacity=".9"/>
    </symbol>
    <symbol id="s-flame" viewBox="0 0 60 90">
      <path d="M30 2 C38 24 58 34 56 58 C55 78 42 88 30 88 C16 88 4 78 4 60 C4 44 16 38 18 22 C24 32 26 40 30 42 C32 30 26 16 30 2Z" fill="url(#g-flame-o)"/>
      <path d="M30 34 C34 48 46 54 44 68 C43 80 36 86 30 86 C22 86 16 80 16 70 C16 60 24 56 26 46 C28 52 30 54 32 54 C33 46 30 40 30 34Z" fill="url(#g-flame-i)"/>
    </symbol>
    <symbol id="s-pod" viewBox="0 0 60 44">
      <rect x="1" y="1" width="58" height="42" rx="5" fill="currentColor"/>
      <rect x="1" y="1" width="58" height="42" rx="5" fill="url(#g-pod-shade)"/>
      <path d="M10 6V38M18 6V38M42 6V38M50 6V38" stroke="#000" stroke-opacity=".16" stroke-width="2"/>
      <rect x="14" y="13" width="32" height="18" rx="4" fill="#fff" opacity=".94"/>
      <text x="30" y="26" text-anchor="middle" font-family="JetBrains Mono,monospace" font-weight="700" font-size="11" fill="#0f172a">pod</text>
    </symbol>
  </defs></svg>`;

  /* paper plane, nose pointing down-right */
  const plane = `
  <svg viewBox="0 0 120 90" aria-hidden="true">
    <path d="M4 40 L116 6 L52 84 L44 52Z" fill="#ffffff"/>
    <path d="M44 52 L116 6 L56 60Z" fill="#c7d2fe"/>
    <path d="M44 52 L52 84 L56 60Z" fill="#a5b4fc"/>
  </svg>`;

  /* jagged rock spires framing the inferno, with glowing cracks */
  const spire = (flip) => `
  <svg class="spire ${flip ? 'spire-r' : 'spire-l'}" viewBox="0 0 300 900" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 0 H120 L150 120 L110 210 L190 330 L140 430 L230 560 L170 650 L260 780 L300 900 H0Z" fill="#1a0707"/>
    <path d="M0 0 H70 L96 140 L60 260 L120 380 L80 520 L150 640 L110 760 L170 900 H0Z" fill="#250a0a"/>
    <path d="M118 214 L150 300 L128 380 M176 570 L200 640 M150 660 L210 760" stroke="#ff6a1a" stroke-width="3" fill="none" opacity=".8"/>
  </svg>`;

  /* heaven's gates in gold line-art */
  const gates = () => {
    const pearls = Array.from({ length: 15 }, (_, i) => {
      const t = (i + 1) / 16;
      const x = (1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 300 + t * t * 560;
      const y = (1 - t) * (1 - t) * 260 + 2 * (1 - t) * t * -40 + t * t * 260;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6"/>`;
    }).join('');
    const bars = (x0, x1) => Array.from({ length: 8 }, (_, i) => {
      const x = x0 + (i + 0.5) * (x1 - x0) / 8;
      return `<path d="M${x.toFixed(1)} 300 V700"/>`;
    }).join('');
    return `
    <svg viewBox="0 0 600 700" aria-hidden="true">
      <defs><linearGradient id="g-gate" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset=".5" stop-color="#e0a526"/><stop offset="1" stop-color="#fbbf24"/></linearGradient></defs>
      <g fill="none" stroke="url(#g-gate)" stroke-linecap="round">
        <path d="M40 700 V260 Q300 -40 560 260 V700" stroke-width="16"/>
        <path d="M70 700 V290 Q300 30 530 290 V700" stroke-width="4"/>
        <path d="M86 300 Q190 236 296 262 V700 M514 300 Q410 236 304 262 V700" stroke-width="6"/>
        <g stroke-width="4">${bars(86, 296)}${bars(304, 514)}</g>
        <circle cx="191" cy="450" r="34" stroke-width="5"/><circle cx="409" cy="450" r="34" stroke-width="5"/>
        <path d="M191 416 V484 M157 450 H225 M409 416 V484 M375 450 H443" stroke-width="3"/>
      </g>
      <g fill="#fffdf5" stroke="#e8c36a" stroke-width="2">${pearls}</g>
    </svg>`;
  };

  /* a row of clouds as markup (used for layers and floors) */
  const cloudRow = (n, sym = 's-cloud', seed = 1) => Array.from({ length: n }, (_, i) => {
    const r = (k) => ((Math.sin((i + 1) * 12.9898 * seed + k * 78.233) * 43758.5453) % 1 + 1) % 1;
    const w = 14 + r(1) * 20;
    return `<svg class="c" viewBox="0 0 220 120" style="left:${((i + r(2) * 0.6) / n * 100).toFixed(1)}%;top:${(r(3) * 70).toFixed(1)}%;width:${w.toFixed(1)}vw;--d:${(r(4) * 8).toFixed(1)}s"><use href="#${sym}"/></svg>`;
  }).join('');

  return { symbols, plane, spire, gates, cloudRow };
})();
