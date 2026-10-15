// Veterinary hero and portrait artwork.
const sharp = require("sharp");
const { dog, cat, cow } = require("./figures_vet2.js");
const { renderFigure, ecg } = require("./art3.js");
function rng(seed) { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
function paw(x, y, s, rot, op) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" fill="#BFD5FF" fill-opacity="${op}"><ellipse cx="0" cy="18" rx="22" ry="18"/><ellipse cx="-22" cy="-8" rx="8" ry="11"/><ellipse cx="-8" cy="-20" rx="8" ry="11"/><ellipse cx="8" cy="-20" rx="8" ry="11"/><ellipse cx="22" cy="-8" rx="8" ry="11"/></g>`;
}
function bg(W, H, o) {
  const r = rng(o.seed); let bok = "", paws = "";
  for (let i = 0; i < 20; i++) bok += `<circle cx="${r() * W}" cy="${r() * H * 0.7}" r="${6 + r() * 26}" fill="#9CC0FF" fill-opacity="${0.04 + r() * 0.1}"/>`;
  for (let i = 0; i < o.paws; i++) { const t = i / o.paws; paws += paw(o.px + t * o.pdx, o.py - t * o.pdy + (i % 2) * 34, 1.1, 75, 0.1 + 0.18 * t); }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>
   <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1426"/><stop offset="0.55" stop-color="#132A5E"/><stop offset="1" stop-color="#1D4ED8"/></linearGradient>
   <radialGradient id="gl" cx="${o.gx}" cy="${o.gy}" r="0.45"><stop offset="0" stop-color="#2563EB" stop-opacity="0.85"/><stop offset="1" stop-color="#2563EB" stop-opacity="0"/></radialGradient>
   <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9CC0FF" stop-opacity="0.18"/><stop offset="1" stop-color="#9CC0FF" stop-opacity="0"/></linearGradient>
   <filter id="b"><feGaussianBlur stdDeviation="3"/></filter><filter id="eb" x="-5%" y="-50%" width="110%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
   <linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#0F1A2E" stop-opacity="0.94"/><stop offset="0.42" stop-color="#0F1A2E" stop-opacity="0.6"/><stop offset="0.66" stop-color="#0F1A2E" stop-opacity="0"/></linearGradient></defs>
   <rect width="${W}" height="${H}" fill="url(#g)"/><rect width="${W}" height="${H}" fill="url(#gl)"/>
   <g filter="url(#b)">${bok}</g>
   <rect x="0" y="${o.ground}" width="${W}" height="${H - o.ground}" fill="url(#fl)"/>
   <line x1="0" y1="${o.ground}" x2="${W}" y2="${o.ground}" stroke="#9CC0FF" stroke-opacity="0.25" stroke-width="2"/>
   ${paws}
   <g filter="url(#eb)">${ecg(W, o.ecgY, H * 0.07, "#22C55E", 0.45, 7)}</g>${ecg(W, o.ecgY, H * 0.07, "#22C55E", 0.9, 3)}
   ${o.shade ? `<rect width="${W}" height="${H}" fill="url(#sh)"/>` : ""}</svg>`;
}
async function place(figFn, width) { const f = await renderFigure(figFn, width); return f; }
async function compose(fn, W, H, o, items) {
  const layers = [];
  for (const it of items) {
    const f = await place(it.fig, it.w);
    const groundPx = (f.f.ground[1] - f.f.vb[1]) * (f.W / f.f.vb[2]);
    layers.push({ input: f.png, left: Math.round(it.x), top: Math.round(o.ground - groundPx) });
  }
  let img = sharp(Buffer.from(bg(W, H, { ...o, shade: false }))).composite(layers);
  if (o.shade) img = sharp(await img.png().toBuffer()).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#0F1A2E" stop-opacity="0.94"/><stop offset="0.42" stop-color="#0F1A2E" stop-opacity="0.6"/><stop offset="0.62" stop-color="#0F1A2E" stop-opacity="0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#sh)"/></svg>`), left: 0, top: 0 }]);
  await img.png().toFile("art/" + fn);
}
(async () => {
  await compose("vet_hero.png", 1920, 1080, { seed: 4, gx: 0.74, gy: 0.5, ground: 900, ecgY: 960, paws: 9, px: 700, py: 1000, pdx: 500, pdy: 90, shade: true },
    [{ fig: dog, w: 520, x: 1010 }, { fig: cat, w: 360, x: 1480 }]);
  await compose("vet_portrait.png", 900, 1080, { seed: 8, gx: 0.5, gy: 0.5, ground: 880, ecgY: 960, paws: 6, px: 60, py: 1020, pdx: 300, pdy: 60, shade: false },
    [{ fig: dog, w: 500, x: 10 }, { fig: cat, w: 340, x: 520 }]);
  await compose("vet_portrait2.png", 900, 1080, { seed: 12, gx: 0.5, gy: 0.5, ground: 860, ecgY: 950, paws: 0, px: 0, py: 0, pdx: 0, pdy: 0, shade: false },
    [{ fig: cow, w: 840, x: 30 }]);
  console.log("ok");
})();
