const sharp = require("sharp");
const { sprinter, lifter } = require("./figures3.js");
const P = require("./brand.json").palette; const h = (k) => "#" + P[k];

// ---------- figure rendering ----------
async function mask(shapes, vb, W, H, blurUnits) {
  const [x, y, w, hh] = vb, S = 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W * S}" height="${H * S}" viewBox="${x} ${y} ${w} ${hh}"><rect x="${x - 50}" y="${y - 50}" width="${w + 100}" height="${hh + 100}" fill="#000"/><g fill="#fff">${shapes}</g></svg>`;
  let img = sharp(Buffer.from(svg)).greyscale();
  if (blurUnits) img = sharp(await img.blur(blurUnits * (W * S) / w).toBuffer()).threshold(128);
  return img.resize(W, H).extractChannel(0).raw().toBuffer();
}
const shift = (m, W, H, dx, dy) => (x, y) => { const xx = x + dx, yy = y + dy; return xx < 0 || yy < 0 || xx >= W || yy >= H ? 0 : m[yy * W + xx]; };
async function layer(colorSvg, alpha, W, H) {
  const rgb = await sharp(Buffer.from(colorSvg)).resize(W, H).removeAlpha().raw().toBuffer();
  return sharp(rgb, { raw: { width: W, height: H, channels: 3 } }).joinChannel(alpha, { raw: { width: W, height: H, channels: 1 } }).png().toBuffer();
}
const grad = (W, H, a, b, x1 = 1, y1 = 0, x2 = 0, y2 = 1) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`;
const solid = (W, H, c) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${c}"/></svg>`;
async function blurRaw(buf, W, H, s) { return sharp(buf, { raw: { width: W, height: H, channels: 1 } }).blur(s).extractChannel(0).raw().toBuffer(); }

async function renderFigure(fig, W) {
  const f = fig(); const [vx, vy, vw, vh] = f.vb; const H = Math.round(W * vh / vw);
  const near = await mask(f.near, f.vb, W, H, f.blur);
  const far = f.far ? await mask(f.far, f.vb, W, H, f.blur) : Buffer.alloc(W * H);
  const rigid = f.rigid ? await mask(f.rigid, f.vb, W, H, 0) : Buffer.alloc(W * H);
  const body = Buffer.alloc(W * H); for (let i = 0; i < W * H; i++) body[i] = Math.max(near[i], rigid[i]);
  // rim light from the upper right, shading on the lower left
  const d = Math.max(2, Math.round(W * 0.007)), d2 = Math.max(3, Math.round(W * 0.016));
  const sUR = shift(body, W, H, d, -d), sLL = shift(body, W, H, -d2, d2);
  const rim = Buffer.alloc(W * H), shade = Buffer.alloc(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x, m = body[i];
    rim[i] = Math.min(m, 255 - sUR(x, y)); shade[i] = Math.min(m, 255 - sLL(x, y)); }
  const rimB = await blurRaw(rim, W, H, Math.max(0.6, W * 0.0012)), shadeB = await blurRaw(shade, W, H, W * 0.006);
  for (let i = 0; i < W * H; i++) { rimB[i] = Math.min(rimB[i], body[i]); shadeB[i] = Math.round(Math.min(shadeB[i], body[i]) * 0.32); }
  const union = Buffer.alloc(W * H); for (let i = 0; i < W * H; i++) union[i] = Math.max(body[i], far[i]);
  // optional darker markings (ear, coat patches), clipped to the body outline
  let detailLayer = null;
  if (f.detail) { const dm = await mask(f.detail, f.vb, W, H, 0); for (let i = 0; i < W * H; i++) dm[i] = Math.round(Math.min(dm[i], body[i]) * (f.detailAlpha || 0.55));
    detailLayer = await layer(solid(W, H, f.detailColor || "#5F86D8"), dm, W, H); }
  const layers = [
    await layer(grad(W, H, "#5C83D4", "#3A5FAE"), far, W, H),
    await layer(grad(W, H, "#FFFFFF", "#86AAF0"), body, W, H),
    ...(detailLayer ? [detailLayer] : []),
    await layer(solid(W, H, "#1E3F8A"), shadeB, W, H),
    await layer(solid(W, H, "#FFFFFF"), rimB, W, H),
  ];
  const png = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(layers.map((input) => ({ input }))).png().toBuffer();
  return { png, union, W, H, f };
}

// ---------- background ----------
function track(W, H, horizon, vpx) {
  let out = ""; const lanes = 10, spread = W * 2.2;
  for (let i = 0; i <= lanes; i++) { const xb = vpx - spread / 2 + (spread / lanes) * i;
    out += `<line x1="${vpx + (xb - vpx) * 0.03}" y1="${horizon}" x2="${xb}" y2="${H}" stroke="#fff" stroke-opacity="0.15" stroke-width="2.5"/>`; }
  for (let k = 1; k < 8; k++) { const t = Math.pow(k / 8, 1.9), y = horizon + (H - horizon) * t;
    out += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#fff" stroke-opacity="${0.03 + 0.05 * t}" stroke-width="1.5"/>`; }
  return out;
}
function ecg(W, y, amp, stroke, op, width) {
  let d = `M0 ${y}`, x = 0; const b = W / 5.5;
  while (x < W) { d += ` L${x + b * 0.3} ${y} q${b * 0.05} ${-amp * 0.15} ${b * 0.1} 0 L${x + b * 0.48} ${y} L${x + b * 0.52} ${y + amp * 0.18} L${x + b * 0.56} ${y - amp} L${x + b * 0.61} ${y + amp * 0.35} L${x + b * 0.65} ${y} L${x + b * 0.78} ${y} q${b * 0.07} ${-amp * 0.25} ${b * 0.14} 0 L${x + b} ${y}`; x += b; }
  return `<path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="${op}" stroke-width="${width}" stroke-linejoin="round"/>`;
}
function streaks(W, H, n, seed, x0) { let s = seed, out = ""; const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < n; i++) { const y = H * 0.12 + r() * H * 0.62, x = x0 + r() * W * 0.28, L = 160 + r() * 420;
    out += `<rect x="${x}" y="${y}" width="${L}" height="${2 + r() * 4}" rx="2" fill="url(#streak)"/>`; } return out; }
const bgSvg = (o) => `<svg xmlns="http://www.w3.org/2000/svg" width="${o.W}" height="${o.H}">
 <defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${h("navy")}"/><stop offset="0.55" stop-color="#132A5E"/><stop offset="1" stop-color="${h("blueDark")}"/></linearGradient>
  <radialGradient id="glow" cx="${o.glowx}" cy="${o.glowy}" r="0.42"><stop offset="0" stop-color="${h("blue")}" stop-opacity="0.85"/><stop offset="1" stop-color="${h("blue")}" stop-opacity="0"/></radialGradient>
  <linearGradient id="streak" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#CFE0FF" stop-opacity="0.45"/></linearGradient>
  <filter id="blur" x="-5%" y="-50%" width="110%" height="200%"><feGaussianBlur stdDeviation="7"/></filter>
 </defs>
 <rect width="${o.W}" height="${o.H}" fill="url(#g)"/><rect width="${o.W}" height="${o.H}" fill="url(#glow)"/>
 ${track(o.W, o.H, o.horizon, o.vpx)}${o.streaks ? streaks(o.W, o.H, 16, o.seed, o.fx - o.W * 0.22) : ""}
 <g filter="url(#blur)">${ecg(o.W, o.ecgY, o.H * 0.12, h("green"), 0.5, 8)}</g>${ecg(o.W, o.ecgY, o.H * 0.12, h("green"), 0.95, 3)}
</svg>`;
const shadeSvg = (W, H) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="s" x1="0" x2="1"><stop offset="0" stop-color="${h("navy")}" stop-opacity="0.94"/><stop offset="0.42" stop-color="${h("navy")}" stop-opacity="0.6"/><stop offset="0.66" stop-color="${h("navy")}" stop-opacity="0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#s)"/></svg>`;

async function compose(fn, o) {
  const fig = await renderFigure(o.fig, o.fw);
  const { W: fw, H: fh, f } = fig; const sc = fw / f.vb[2];
  const comps = [];
  // ground shadow
  const [gx, gy, grx, gry] = f.ground;
  const sh = `<svg xmlns="http://www.w3.org/2000/svg" width="${o.W}" height="${o.H}"><defs><filter id="b"><feGaussianBlur stdDeviation="${14 * sc}"/></filter></defs><ellipse cx="${o.fx + (gx - f.vb[0]) * sc}" cy="${o.fy + (gy - f.vb[1]) * sc}" rx="${grx * sc}" ry="${gry * sc}" fill="#050B18" fill-opacity="0.55" filter="url(#b)"/></svg>`;
  comps.push({ input: Buffer.from(sh), left: 0, top: 0 });
  // motion trail for runners
  if (o.trail) {
    const tint = await sharp(Buffer.from(solid(fw, fh, "#BFD5FF"))).removeAlpha().raw().toBuffer();
    for (const [off, op, bl] of [[0.16, 0.07, 0.02], [0.1, 0.12, 0.014], [0.05, 0.18, 0.008]]) {
      const a = await blurRaw(fig.union, fw, fh, fw * bl); for (let i = 0; i < a.length; i++) a[i] = Math.round(a[i] * op);
      const t = await sharp(tint, { raw: { width: fw, height: fh, channels: 3 } }).joinChannel(a, { raw: { width: fw, height: fh, channels: 1 } }).png().toBuffer();
      const left = Math.round(o.fx - fw * off);
      comps.push({ input: left < 0 ? await sharp(t).extract({ left: -left, top: 0, width: fw + left, height: fh }).toBuffer() : t, left: Math.max(0, left), top: o.fy });
    }
  }
  comps.push({ input: fig.png, left: o.fx, top: o.fy });
  comps.push({ input: Buffer.from(shadeSvg(o.W, o.H)), left: 0, top: 0 });
  await sharp(Buffer.from(bgSvg(o))).composite(comps).png().toFile("art/" + fn);
}

async function main() {
  await compose("bg_run.png", { W: 1920, H: 1080, fig: sprinter, fx: 1000, fy: 210, fw: 860, vpx: 1450, horizon: 760, glowx: 0.74, glowy: 0.48, ecgY: 760, seed: 3, trail: true, streaks: true });
  await compose("bg_lift.png", { W: 1920, H: 1080, fig: lifter, fx: 1130, fy: 50, fw: 720, vpx: 1500, horizon: 870, glowx: 0.76, glowy: 0.42, ecgY: 900, seed: 11, trail: false, streaks: true });
  await compose("flyer_head.png", { W: 2480, H: 1180, fig: sprinter, fx: 1380, fy: 200, fw: 1050, vpx: 1950, horizon: 880, glowx: 0.78, glowy: 0.48, ecgY: 880, seed: 5, trail: true, streaks: true });
  await sharp("art/bg_lift.png").extract({ left: 1060, top: 0, width: 860, height: 1080 }).toFile("art/lift_portrait.png");
  await sharp("art/bg_run.png").extract({ left: 1000, top: 0, width: 900, height: 1080 }).toFile("art/run_portrait.png");
  console.log("ok");
}
module.exports = { renderFigure, compose, bgSvg, shadeSvg, ecg, track, streaks };
if (require.main === module) main();
