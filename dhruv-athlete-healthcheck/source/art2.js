const sharp = require("sharp");
const { sprinter, lifter } = require("./figures.js");
const P = require("./brand.json").palette; const h = (k) => "#" + P[k];
function track(W, H, horizon, vpx) {
  let out = ""; const lanes = 10, spread = W * 2.2;
  for (let i = 0; i <= lanes; i++) { const xb = vpx - spread / 2 + (spread / lanes) * i;
    out += `<line x1="${vpx + (xb - vpx) * 0.03}" y1="${horizon}" x2="${xb}" y2="${H}" stroke="#fff" stroke-opacity="0.16" stroke-width="2.5"/>`; }
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
  for (let i = 0; i < n; i++) { const y = H * 0.12 + r() * H * 0.62, x = x0 + r() * W * 0.3, L = 160 + r() * 420;
    out += `<rect x="${x}" y="${y}" width="${L}" height="${2 + r() * 4}" rx="2" fill="url(#streak)"/>`; } return out; }
let gid = 0;
function figureSvg(fig, x, y, w, hh, trail) {
  const { far, near, vb } = fig(); const [vx, vy, vw, vh] = vb.split(" ").map(Number); const id = "fg" + gid++;
  const grad = `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${vx}" y1="${vy}" x2="${vx + vw}" y2="${vy + vh}"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#9DBDFB"/></linearGradient></defs>`;
  let out = "";
  if (trail) [0.08, 0.13, 0.2].forEach((o, i) => { out += `<svg x="${x - (3 - i) * w * 0.12}" y="${y}" width="${w}" height="${hh}" viewBox="${vb}"><g opacity="${o}" fill="#C9DBFF">${far}${near}</g></svg>`; });
  out += `<svg x="${x}" y="${y}" width="${w}" height="${hh}" viewBox="${vb}">${grad}<g fill="#6F95E0">${far}</g><g fill="url(#${id})">${near}</g></svg>`;
  return out;
}
function bg(o) {
  const { W, H, fig, fx, fy, fw, fh, vpx, horizon, glowx, glowy, ecgY, seed, trail = true, shade = true } = o;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
   <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${h("navy")}"/><stop offset="0.55" stop-color="#132A5E"/><stop offset="1" stop-color="${h("blueDark")}"/></linearGradient>
   <radialGradient id="glow" cx="${glowx}" cy="${glowy}" r="0.42"><stop offset="0" stop-color="${h("blue")}" stop-opacity="0.85"/><stop offset="1" stop-color="${h("blue")}" stop-opacity="0"/></radialGradient>
   <linearGradient id="fig" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#A9C6FF"/></linearGradient>
   <linearGradient id="streak" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#CFE0FF" stop-opacity="0.5"/></linearGradient>
   <linearGradient id="shade" x1="0" x2="1"><stop offset="0" stop-color="${h("navy")}" stop-opacity="0.94"/><stop offset="0.42" stop-color="${h("navy")}" stop-opacity="0.6"/><stop offset="0.66" stop-color="${h("navy")}" stop-opacity="0"/></linearGradient>
   <filter id="blur" x="-5%" y="-50%" width="110%" height="200%"><feGaussianBlur stdDeviation="7"/></filter>
   <filter id="rim"><feGaussianBlur stdDeviation="1"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/><rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${track(W, H, horizon, vpx)}${streaks(W, H, 16, seed, fx - W * 0.25)}
  <g filter="url(#blur)">${ecg(W, ecgY, H * 0.12, h("green"), 0.5, 8)}</g>${ecg(W, ecgY, H * 0.12, h("green"), 0.95, 3)}
  ${figureSvg(fig, fx, fy, fw, fh, trail)}
  ${shade ? `<rect width="${W}" height="${H}" fill="url(#shade)"/>` : ""}
 </svg>`;
}
(async () => {
  const jobs = [
    ["bg_run.png", { W: 1920, H: 1080, fig: sprinter, fx: 1150, fy: 130, fw: 680, fh: 850, vpx: 1450, horizon: 760, glowx: 0.74, glowy: 0.45, ecgY: 760, seed: 3 }],
    ["bg_lift.png", { W: 1920, H: 1080, fig: lifter, fx: 1150, fy: 60, fw: 700, fh: 806, vpx: 1500, horizon: 870, glowx: 0.76, glowy: 0.42, ecgY: 900, seed: 11, trail: false }],
    ["flyer_head.png", { W: 2480, H: 1180, fig: sprinter, fx: 1600, fy: 110, fw: 760, fh: 950, vpx: 1950, horizon: 880, glowx: 0.78, glowy: 0.45, ecgY: 880, seed: 5 }],
  ];
  for (const [fn, o] of jobs) await sharp(Buffer.from(bg(o))).png().toFile("art/" + fn);
  console.log("ok");
})();
