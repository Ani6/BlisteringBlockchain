// Animal silhouettes for the veterinary deck, same metaball method as figures3.js.
const C = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}"/>`;
const E = (x, y, rx, ry, rot = 0) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${x} ${y})"/>`;
const P = (pts) => `<path d="M${pts.map((p) => p.join(" ")).join(" L")} Z"/>`;
function cap(a, b) {
  const [x1, y1, r1] = a, [x2, y2, r2] = b, dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy);
  const th = Math.atan2(dy, dx), al = Math.acos(Math.max(-1, Math.min(1, (r1 - r2) / d)));
  const Q = (x, y, r, t) => [x + r * Math.cos(t), y + r * Math.sin(t)].map((v) => v.toFixed(1)).join(" ");
  return `<path d="M${Q(x1, y1, r1, th + al)} L${Q(x2, y2, r2, th + al)} L${Q(x2, y2, r2, th - al)} L${Q(x1, y1, r1, th - al)} Z"/>${C(x1, y1, r1)}${C(x2, y2, r2)}`;
}
// Dog sitting, side view, facing right.
function dog() {
  const near = [
    E(636, 228, 58, 52), cap([652, 236, 40], [760, 260, 27]), C(770, 251, 14), cap([676, 270, 27], [744, 278, 17]),
    E(612, 266, 24, 50, 14),
    cap([620, 268, 50], [592, 398, 64]), E(600, 470, 72, 100, -5),
    cap([578, 350, 54], [470, 540, 84]), E(452, 598, 112, 124),
    cap([622, 520, 30], [628, 800, 20]), E(650, 806, 32, 14),
    cap([396, 700, 28], [470, 800, 16]), E(500, 808, 58, 15),
    cap([346, 706, 14], [272, 770, 9]),
  ].join("");
  const far = [cap([586, 530, 27], [590, 800, 18]), E(612, 806, 30, 13)].join("");
  return { near, far, rigid: "", vb: [230, 150, 590, 680], blur: 4, ground: [520, 818, 280, 12] };
}
// Cat sitting, side view, facing left, tail wrapped round the paws.
function cat() {
  const near = [
    C(382, 262, 58), E(340, 280, 25, 19), P([[334, 224], [346, 152], [386, 208]]), P([[394, 208], [426, 148], [440, 224]]),
    E(374, 362, 58, 76, 6), E(366, 446, 68, 90, 8), E(404, 548, 114, 170, 4), E(440, 642, 126, 116),
    cap([356, 560, 23], [350, 782, 16]), E(338, 792, 30, 13),
    cap([550, 700, 21], [566, 780, 19]), cap([566, 780, 19], [492, 818, 16]), cap([492, 818, 16], [384, 812, 12]),
  ].join("");
  const far = [cap([392, 566, 21], [398, 782, 15]), E(392, 792, 28, 12)].join("");
  return { near, far, rigid: "", vb: [255, 125, 375, 715], blur: 4, ground: [440, 830, 210, 11] };
}
// Cow standing, side view, facing right, head lowered.
function cow() {
  const near = [
    cap([300, 410, 88], [660, 404, 86]), E(470, 476, 200, 64), C(296, 352, 54), C(640, 360, 54),
    cap([660, 420, 74], [742, 436, 44]), E(716, 492, 30, 40),
    cap([752, 420, 40], [826, 520, 26]), E(836, 528, 30, 24, 30), E(742, 412, 34, 11, -25),
    cap([760, 400, 6], [748, 366, 3]),
    E(380, 524, 40, 26),
    cap([644, 470, 30], [650, 640, 20]), cap([650, 640, 20], [654, 790, 15]), E(658, 796, 21, 10),
    cap([316, 470, 46], [334, 640, 22]), cap([334, 640, 22], [324, 790, 15]), E(326, 796, 21, 10),
    cap([226, 372, 8], [210, 626, 5]), E(208, 644, 11, 22),
  ].join("");
  const far = [cap([606, 470, 26], [612, 790, 14]), E(616, 796, 20, 10), cap([372, 480, 36], [384, 790, 14]), E(388, 796, 20, 10), cap([772, 396, 6], [790, 364, 3])].join("");
  return { near, far, rigid: "", vb: [180, 280, 700, 535], blur: 4, ground: [520, 808, 320, 12] };
}
module.exports = { dog, cat, cow };
