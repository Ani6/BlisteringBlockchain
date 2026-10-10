// Procedural athlete silhouettes built from tapered capsules.
function cap(a, b) { // a,b = [x,y,r]
  const [x1, y1, r1] = a, [x2, y2, r2] = b, dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy);
  const th = Math.atan2(dy, dx), al = Math.acos(Math.max(-1, Math.min(1, (r1 - r2) / d)));
  const P = (x, y, r, t) => [x + r * Math.cos(t), y + r * Math.sin(t)].map((v) => v.toFixed(1)).join(" ");
  return `<path d="M${P(x1, y1, r1, th + al)} L${P(x2, y2, r2, th + al)} L${P(x2, y2, r2, th - al)} L${P(x1, y1, r1, th - al)} Z"/><circle cx="${x1}" cy="${y1}" r="${r1}"/><circle cx="${x2}" cy="${y2}" r="${r2}"/>`;
}
const chain = (...pts) => pts.slice(1).map((p, i) => cap(pts[i], p)).join("");
const poly = (pts) => `<path d="M${pts.map((p) => p.join(" ")).join(" L")} Z"/>`;

// Sprinter, side view, running right. Box 1000 x 1000.
function sprinter() {
  const far = [
    chain([622, 276, 26], [708, 352, 21], [778, 282, 14]), `<circle cx="786" cy="274" r="16"/>`, // far arm forward
    chain([470, 520, 47], [392, 690, 31], [292, 842, 17], [246, 884, 11]), `<circle cx="352" cy="745" r="29"/>`, // push-off leg
  ].join("");
  const near = [
    poly([[592, 236], [662, 268], [646, 336], [532, 512], [436, 548], [440, 462]]), // torso, leaning forward
    chain([630, 282, 58], [484, 508, 50]), `<circle cx="452" cy="520" r="53"/>`,
    cap([617, 220, 22], [628, 258, 28]), `<ellipse cx="652" cy="170" rx="44" ry="52" transform="rotate(18 652 170)"/>`,
    chain([476, 522, 50], [690, 566, 33], [606, 742, 17], [662, 768, 10]), `<circle cx="660" cy="628" r="29"/>`, // drive leg
    chain([606, 284, 29], [470, 318, 22], [404, 392, 14]), `<circle cx="398" cy="400" r="16"/>`, // near arm back
  ].join("");
  return { far, near, vb: "190 100 640 800" };
}

// Weightlifter, front view, barbell locked overhead. Box 1000 x 1100.
function lifter() {
  const body = [
    poly([[402, 372], [598, 372], [566, 600], [548, 668], [452, 668], [434, 600]]),
    `<circle cx="412" cy="392" r="50"/><circle cx="588" cy="392" r="50"/>`, // deltoids
    cap([500, 330, 34], [500, 372, 44]), `<ellipse cx="500" cy="282" rx="46" ry="54"/>`,
    chain([412, 392, 40], [360, 268, 31], [318, 156, 22]), chain([588, 392, 40], [640, 268, 31], [682, 156, 22]),
    chain([462, 660, 58], [410, 840, 38], [392, 1000, 24], [350, 1030, 18]),
    chain([538, 660, 58], [590, 840, 38], [608, 1000, 24], [650, 1030, 18]),
    `<rect x="70" y="141" width="860" height="22" rx="8"/>`,
    `<rect x="118" y="38" width="44" height="228" rx="10"/><rect x="168" y="62" width="30" height="180" rx="8"/>`,
    `<rect x="838" y="38" width="44" height="228" rx="10"/><rect x="802" y="62" width="30" height="180" rx="8"/>`,
  ].join("");
  return { far: "", near: body, vb: "40 10 920 1060" };
}
module.exports = { sprinter, lifter };
