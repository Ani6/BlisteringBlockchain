// Artwork for the corporate wellness deck: Face n Figure (tree pose), Jeevan Jyoti (blood drop), cover.
const sharp = require("sharp");
const { treePose } = require("./figures3.js");
const { renderFigure, ecg } = require("./art3.js");
const { heroHelix } = require("./helix.js");

function bokeh(W, H, seed, color, n = 22) {
  let s = seed, out = ""; const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < n; i++) out += `<circle cx="${r() * W}" cy="${r() * H}" r="${6 + r() * 30}" fill="${color}" fill-opacity="${0.04 + r() * 0.12}"/>`;
  return out;
}
const grad = (W, H, a, b, c, glow, gx, gy) => `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="0.55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>
 <radialGradient id="gl" cx="${gx}" cy="${gy}" r="0.5"><stop offset="0" stop-color="${glow}" stop-opacity="0.8"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient>
 <filter id="bb"><feGaussianBlur stdDeviation="3"/></filter><filter id="eb" x="-5%" y="-50%" width="110%" height="200%"><feGaussianBlur stdDeviation="6"/></filter></defs>
 <rect width="${W}" height="${H}" fill="url(#g)"/><rect width="${W}" height="${H}" fill="url(#gl)"/>`;

async function fnfPortrait(W = 900, H = 1080) {
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${grad(W, H, "#1E0F2A", "#5B1A44", "#BE185D", "#F472B6", 0.5, 0.42)}
   <g filter="url(#bb)">${bokeh(W, H, 21, "#FBCFE8")}</g>
   <ellipse cx="${W / 2}" cy="${H * 0.93}" rx="${W * 0.45}" ry="${H * 0.04}" fill="#FBCFE8" fill-opacity="0.08"/></svg>`;
  const fig = await renderFigure(treePose, Math.round(W * 0.46));
  // recolour the figure to a blush tone
  const { data, info } = await sharp(fig.png).raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) { const l = (data[i] + data[i + 1] + data[i + 2]) / 3 / 255;
    data[i] = Math.round(255 * (0.86 + 0.14 * l)); data[i + 1] = Math.round(255 * (0.62 + 0.36 * l)); data[i + 2] = Math.round(255 * (0.74 + 0.25 * l)); }
  const figPng = await sharp(data, { raw: info }).png().toBuffer();
  const top = Math.round(H * 0.05), left = Math.round((W - fig.W) / 2);
  return sharp(Buffer.from(bg)).composite([{ input: figPng, left, top }]).png().toBuffer();
}

function dropPath(cx, cy, s) { // teardrop, point at top
  return `M${cx} ${cy - 1.55 * s} C${cx + 0.25 * s} ${cy - 1.05 * s} ${cx + s} ${cy - 0.35 * s} ${cx + s} ${cy + 0.3 * s} A${s} ${s} 0 1 1 ${cx - s} ${cy + 0.3 * s} C${cx - s} ${cy - 0.35 * s} ${cx - 0.25 * s} ${cy - 1.05 * s} ${cx} ${cy - 1.55 * s} Z`;
}
function jjPortraitSvg(W = 900, H = 1080) {
  const cx = W / 2, cy = H * 0.5, s = W * 0.28;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${grad(W, H, "#160B12", "#5A0F1A", "#B91C1C", "#F87171", 0.5, 0.48)}
   <g filter="url(#bb)">${bokeh(W, H, 31, "#FECACA")}</g>
   <defs><radialGradient id="dr" cx="0.5" cy="0.6" r="0.6" fx="0.36" fy="0.42"><stop offset="0" stop-color="#FF8A8A"/><stop offset="0.45" stop-color="#E11D2E"/><stop offset="1" stop-color="#7F0D16"/></radialGradient>
   <filter id="dg" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="28"/></filter>
   <clipPath id="dc"><path d="${dropPath(cx, cy, s)}"/></clipPath></defs>
   <path d="${dropPath(cx, cy, s)}" fill="#FF4D5E" opacity="0.55" filter="url(#dg)"/>
   <path d="${dropPath(cx, cy, s)}" fill="url(#dr)"/>
   <ellipse cx="${cx - s * 0.42}" cy="${cy - s * 0.05}" rx="${s * 0.16}" ry="${s * 0.42}" transform="rotate(18 ${cx - s * 0.42} ${cy - s * 0.05})" fill="#fff" opacity="0.35"/>
   <circle cx="${cx - s * 0.5}" cy="${cy + s * 0.55}" r="${s * 0.07}" fill="#fff" opacity="0.4"/>
   <g filter="url(#eb)">${ecg(W, cy + s * 0.35, s * 0.55, "#ffffff", 0.45, 10)}</g>${ecg(W, cy + s * 0.35, s * 0.55, "#ffffff", 0.95, 5)}
  </svg>`;
}

async function cover(W = 1920, H = 1080, cards) {
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${grad(W, H, "#0B1426", "#0F1A2E", "#13285A", "#2563EB", 0.75, 0.5)}
    <g filter="url(#bb)">${bokeh(W, H, 7, "#9CC0FF", 26)}</g></svg>`;
  const cw = 300, ch = 520, gap = 28, x0 = W - (cw * 3 + gap * 2) - 80, y0 = 290;
  const comps = [];
  for (let i = 0; i < 3; i++) {
    const y = y0 + (i === 1 ? -60 : 0);
    const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}"><rect width="${cw}" height="${ch}" rx="28" fill="#fff"/></svg>`);
    const img = await sharp(cards[i]).resize(cw, ch, { fit: "cover" }).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    const shadow = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cw + 120}" height="${ch + 120}"><defs><filter id="s"><feGaussianBlur stdDeviation="22"/></filter></defs><rect x="60" y="80" width="${cw}" height="${ch}" rx="28" fill="#000" opacity="0.55" filter="url(#s)"/></svg>`);
    comps.push({ input: shadow, left: x0 + i * (cw + gap) - 60, top: y - 60 }, { input: img, left: x0 + i * (cw + gap), top: y });
  }
  return sharp(Buffer.from(bg)).composite(comps).png().toBuffer();
}

(async () => {
  const fnf = await fnfPortrait(); await sharp(fnf).toFile("art/fnf_portrait.png");
  const jj = await sharp(Buffer.from(jjPortraitSvg())).png().toBuffer(); await sharp(jj).toFile("art/jj_portrait.png");
  const hx = await sharp("art/helix_portrait.png").toBuffer();
  await sharp(await cover(1920, 1080, [hx, fnf, jj])).toFile("art/cover_corp.png");
  console.log("ok");
})();
