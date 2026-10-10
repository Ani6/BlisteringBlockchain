// Brand-helix hero backgrounds and the logo mark.
const sharp = require("sharp");
const { heroHelix, markHelix } = require("./helix.js");
const { bgSvg, shadeSvg, compose } = require("./art3.js");
const { lifter } = require("./figures3.js");

function helixSvg(W, H, transform, id, glow = true) {
  const hx = heroHelix(id);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>${hx.defs}<filter id="${id}g" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter></defs>
  ${glow ? `<g transform="${transform}" filter="url(#${id}g)" opacity="0.6">${hx.body}</g>` : ""}<g transform="${transform}">${hx.body}</g></svg>`;
}
function bokeh(W, H, seed, x0) {
  let s = seed, out = ""; const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = 0; i < 18; i++) { const x = x0 + r() * (W - x0), y = r() * H, rad = 6 + r() * 26;
    out += `<circle cx="${x}" cy="${y}" r="${rad}" fill="#9CC0FF" fill-opacity="${0.04 + r() * 0.1}"/>`; }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><filter id="b"><feGaussianBlur stdDeviation="3"/></filter></defs><g filter="url(#b)">${out}</g></svg>`;
}
async function hero(fn, o) {
  const layers = [
    { input: Buffer.from(bokeh(o.W, o.H, o.seed, o.W * 0.45)), left: 0, top: 0 },
    { input: Buffer.from(helixSvg(o.W, o.H, o.t, "h" + o.seed)), left: 0, top: 0 },
  ];
  if (o.shade) layers.push({ input: Buffer.from(shadeSvg(o.W, o.H)), left: 0, top: 0 });
  await sharp(Buffer.from(bgSvg({ ...o, streaks: false }))).composite(layers).png().toFile("art/" + fn);
}
(async () => {
  await hero("bg_hero.png", { W: 1920, H: 1080, t: "translate(1190,-70) rotate(57) scale(0.95)", vpx: 1450, horizon: 800, glowx: 0.72, glowy: 0.45, ecgY: 800, seed: 3, shade: true });
  await hero("flyer_head.png", { W: 2480, H: 1180, t: "translate(1540,-40) rotate(52) scale(1.08)", vpx: 1950, horizon: 900, glowx: 0.76, glowy: 0.45, ecgY: 900, seed: 5, shade: true });
  await hero("helix_portrait.png", { W: 900, H: 1080, t: "translate(250,-120) rotate(68) scale(0.95)", vpx: 450, horizon: 820, glowx: 0.5, glowy: 0.45, ecgY: 820, seed: 7, shade: false });
  await hero("helix_portrait2.png", { W: 900, H: 1080, t: "translate(760,-60) rotate(115) scale(0.95)", vpx: 450, horizon: 860, glowx: 0.5, glowy: 0.5, ecgY: 860, seed: 9, shade: false });
  // logo mark, transparent background
  const m = markHelix("mk");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900"><defs>${m.defs}</defs><g transform="translate(250,40) rotate(58) scale(1.3)">${m.body}</g></svg>`;
  await sharp(Buffer.from(svg)).trim({ threshold: 1 }).png().toFile("art/logo_mark.png");
  // weightlifter backgrounds stay as they were
  await compose("bg_lift.png", { W: 1920, H: 1080, fig: lifter, fx: 1130, fy: 50, fw: 720, vpx: 1500, horizon: 870, glowx: 0.76, glowy: 0.42, ecgY: 900, seed: 11, trail: false, streaks: true });
  await sharp("art/bg_lift.png").extract({ left: 1060, top: 0, width: 860, height: 1080 }).toFile("art/lift_portrait.png");
  console.log("ok");
})();
