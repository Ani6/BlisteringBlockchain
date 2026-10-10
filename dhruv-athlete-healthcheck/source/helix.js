// Vector DNA double helix in the style of the Dhruv Diagnostics mark:
// lavender-purple ribbon backbones, two-tone silver rungs, glossy ball-and-stick chain.
const TAU = Math.PI * 2;

function helix(o) {
  const { L = 1400, R = 150, P = 720, w0 = 46, phase = 0.4, delta = Math.PI * 0.82, rungStep = 36, balls = [], id = "hx", ribbon = true } = o;
  const th = (u) => (TAU * u) / P + phase;
  const strands = [0, delta];
  const back = [], front = [], rungs = [];
  // ribbons
  if (ribbon) for (const off of strands) {
    const step = 3;
    for (let u = 0; u < L; u += step) {
      const u2 = Math.min(L, u + step);
      const t1 = th(u) + off, t2 = th(u2) + off;
      const y1 = R * Math.cos(t1), y2 = R * Math.cos(t2), z = R * Math.sin((t1 + t2) / 2);
      const tp = (x) => { const k = Math.max(0, Math.min(1, x / (P * 0.12), (L - x) / (P * 0.12))); return k * k * (3 - 2 * k); };
      const wa = w0 * tp(u) * (0.16 + 0.84 * Math.abs(Math.sin(t1))), wb = w0 * tp(u2) * (0.16 + 0.84 * Math.abs(Math.sin(t2)));
      const dx = u2 - u, dy = y2 - y1, n = Math.hypot(dx, dy), nx = -dy / n, ny = dx / n;
      const pts = [[u + nx * wa / 2, y1 + ny * wa / 2], [u2 + nx * wb / 2, y2 + ny * wb / 2], [u2 - nx * wb / 2, y2 - ny * wb / 2], [u - nx * wa / 2, y1 - ny * wa / 2]];
      const face = Math.sin((t1 + t2) / 2); // +1 facing the viewer
      const col = face > 0 ? mix("5B4BA3", "B3A6EA", Math.pow(face, 0.8)) : mix("3B2F72", "5A4C99", -face);
      const d = `<path d="M${pts.map((p) => p.map((v) => v.toFixed(1)).join(" ")).join(" L")} Z" fill="#${col}" stroke="#${col}" stroke-width="0.8"/>`;
      (z > 0 ? front : back).push([z, d]);
    }
  }
  // rungs (base pairs): light half and dark half
  for (let u = Math.max(rungStep, P * 0.1); u < L - P * 0.1; u += rungStep) {
    const ta = th(u), tb = th(u) + delta;
    const ya = R * Math.cos(ta), yb = R * Math.cos(tb), za = R * Math.sin(ta), zb = R * Math.sin(tb);
    const ym = (ya + yb) / 2, z = (za + zb) / 2;
    const sw = [R * 0.15, R * 0.09, R * 0.028];
    const seg = (y1, y2, dark) => `<line x1="${u}" y1="${y1.toFixed(1)}" x2="${u}" y2="${y2.toFixed(1)}" stroke="#${dark ? "4E5662" : "8E97A3"}" stroke-width="${sw[0]}" stroke-linecap="butt"/>` +
      `<line x1="${u - sw[0] * 0.1}" y1="${y1.toFixed(1)}" x2="${u - sw[0] * 0.1}" y2="${y2.toFixed(1)}" stroke="#${dark ? "77808C" : "C9CFD7"}" stroke-width="${sw[1]}"/>` +
      `<line x1="${u - sw[0] * 0.24}" y1="${y1.toFixed(1)}" x2="${u - sw[0] * 0.24}" y2="${y2.toFixed(1)}" stroke="#${dark ? "A3ABB5" : "F2F5F8"}" stroke-width="${sw[2]}"/>`;
    rungs.push([z, seg(ya, ym, false) + seg(ym, yb, true)]);
  }
  back.sort((a, b) => a[0] - b[0]); front.sort((a, b) => a[0] - b[0]); rungs.sort((a, b) => a[0] - b[0]);
  // ball-and-stick chain, drawn in front
  const BALL = { gold: ["FFE7A0", "F6B91C", "C97A00"], navy: ["A9B6F0", "34459E", "141E5A"], magenta: ["FFC2DD", "E2498F", "8E1450"], blue: ["CFE4FF", "3E8EEB", "1A4CA8"] };
  let defs = "", chain = "";
  balls.forEach((b, i) => { const [hi, mid, lo] = BALL[b.c];
    defs += `<radialGradient id="${id}b${i}" cx="0.5" cy="0.5" r="0.5" fx="0.36" fy="0.32"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.12" stop-color="#${hi}"/><stop offset="0.55" stop-color="#${mid}"/><stop offset="1" stop-color="#${lo}"/></radialGradient>`; });
  for (let i = 0; i < balls.length - 1; i++) { const a = balls[i], b = balls[i + 1];
    chain += `<line x1="${a.u}" y1="${a.y}" x2="${b.u}" y2="${b.y}" stroke="#5E6672" stroke-width="${R * 0.2}" stroke-linecap="round"/><line x1="${a.u}" y1="${a.y}" x2="${b.u}" y2="${b.y}" stroke="#AEB5BF" stroke-width="${R * 0.12}"/><line x1="${a.u - 2}" y1="${a.y - 2}" x2="${b.u - 2}" y2="${b.y - 2}" stroke="#EEF1F5" stroke-width="${R * 0.03}"/>`; }
  balls.forEach((b, i) => { chain += `<circle cx="${b.u}" cy="${b.y}" r="${b.r}" fill="url(#${id}b${i})"/>`; });
  return { defs, body: back.map((x) => x[1]).join("") + rungs.map((x) => x[1]).join("") + front.map((x) => x[1]).join("") + chain };
}
function mix(a, b, t) {
  const pa = [0, 2, 4].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [0, 2, 4].map((i) => parseInt(b.slice(i, i + 2), 16));
  return pa.map((v, i) => Math.round(v + (pb[i] - v) * Math.max(0, Math.min(1, t))).toString(16).padStart(2, "0")).join("");
}

// Large hero helix (for backgrounds)
function heroHelix(id = "hero") {
  const R = 150;
  return helix({ id, L: 1500, R, P: 760, w0: 58, phase: 0.9, rungStep: 58, balls: [
    { u: 300, y: -R * 1.0, r: R * 0.4, c: "gold" }, { u: 450, y: -R * 0.45, r: R * 0.44, c: "navy" },
    { u: 590, y: R * 0.2, r: R * 0.46, c: "magenta" }, { u: 760, y: -R * 0.05, r: R * 0.44, c: "blue" },
    { u: 890, y: R * 0.66, r: R * 0.48, c: "gold" },
  ] });
}
// Compact mark (for the logo)
function markHelix(id = "mark") {
  const R = 120;
  return helix({ id, L: 560, R, P: 520, w0: 46, phase: 1.1, rungStep: 50, balls: [
    { u: 140, y: -R * 0.6, r: R * 0.42, c: "navy" }, { u: 250, y: R * 0.15, r: R * 0.44, c: "magenta" },
    { u: 365, y: -R * 0.05, r: R * 0.42, c: "blue" }, { u: 460, y: R * 0.64, r: R * 0.46, c: "gold" },
  ] });
}
module.exports = { helix, heroHelix, markHelix };
