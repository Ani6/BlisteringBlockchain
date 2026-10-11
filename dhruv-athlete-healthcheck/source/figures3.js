// Athlete silhouettes as overlapping muscle shapes. Rendered with blur + threshold
// (metaball style) so the shapes fuse into one smooth anatomical outline.
function cap(a, b) {
  const [x1, y1, r1] = a, [x2, y2, r2] = b, dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy);
  const th = Math.atan2(dy, dx), al = Math.acos(Math.max(-1, Math.min(1, (r1 - r2) / d)));
  const P = (x, y, r, t) => [x + r * Math.cos(t), y + r * Math.sin(t)].map((v) => v.toFixed(1)).join(" ");
  return `<path d="M${P(x1, y1, r1, th + al)} L${P(x2, y2, r2, th + al)} L${P(x2, y2, r2, th - al)} L${P(x1, y1, r1, th - al)} Z"/><circle cx="${x1}" cy="${y1}" r="${r1}"/><circle cx="${x2}" cy="${y2}" r="${r2}"/>`;
}
const C = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}"/>`;
const E = (x, y, rx, ry, rot) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${x} ${y})"/>`;

// Muscle ellipse along bone a->b: centre at fraction t, pushed sideways by off (positive = left of travel).
function M(a, b, t, off, rx, ry) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  const cx = a[0] + dx * t - uy * off, cy = a[1] + dy * t + ux * off;
  return E(cx.toFixed(1), cy.toFixed(1), rx, ry, (Math.atan2(dy, dx) * 180 / Math.PI).toFixed(1));
}

// Sprinter driving out of the blocks, side view, facing right, body at about 45 degrees.
function sprinter() {
  const hip = [452, 505], knee = [330, 624], ank = [206, 736], sh = [606, 368], head = [676, 300];
  const near = [
    // rear leg, extended push-off
    cap([...hip, 40], [...knee, 24]), M(hip, knee, 0.42, 10, 92, 40), M(hip, knee, 0.4, -12, 80, 34),
    cap([...knee, 23], [...ank, 12]), M(knee, ank, 0.3, -10, 62, 26), M(knee, ank, 0.25, 6, 50, 18),
    cap([...ank, 12], [164, 768, 7]), C(216, 742, 12),
    // torso, glute and chest
    M(hip, sh, 0.5, 0, 118, 56), M(hip, sh, 0.05, -18, 56, 48), M(hip, sh, 0.72, 22, 62, 50), M(hip, sh, 0.62, -20, 72, 44),
    cap([...sh, 44], [632, 340, 20]),
    // neck and head
    cap([628, 344, 19], [652, 322, 18]), E(...head, 37, 45, 45), E(690, 318, 18, 14, 45),
    // near arm, forward
    M(sh, [688, 462], 0.15, 6, 38, 30), cap([614, 378, 22], [688, 462, 16]), M([614, 378], [688, 462], 0.45, -6, 50, 21),
    cap([688, 462, 16], [750, 390, 10]), M([688, 462], [750, 390], 0.3, 2, 40, 17), C(756, 382, 14),
  ].join("");
  const fhip = [466, 498], fknee = [632, 544], fank = [590, 704];
  const far = [
    // front leg, knee driven forward
    cap([...fhip, 38], [...fknee, 24]), M(fhip, fknee, 0.45, -12, 88, 38), M(fhip, fknee, 0.45, 10, 76, 30),
    cap([...fknee, 23], [...fank, 12]), M(fknee, fank, 0.3, -10, 58, 24),
    cap([...fank, 12], [644, 720, 7]), C(580, 712, 11),
    // far arm, back
    cap([598, 362, 22], [496, 312, 15]), M([598, 362], [496, 312], 0.45, 6, 50, 20),
    cap([496, 312, 15], [452, 402, 10]), M([496, 312], [452, 402], 0.3, 0, 38, 15), C(448, 410, 13),
  ].join("");
  return { near, far, rigid: "", vb: [120, 235, 700, 570], blur: 5, ground: [430, 786, 330, 16] };
}

// Weightlifter, front view, barbell locked overhead.
function lifter() {
  const near = [
    // torso with V taper
    `<path d="M392 372 L608 372 L572 590 L552 668 L448 668 L428 590 Z"/>`,
    C(410, 392, 50), C(590, 392, 50), C(452, 430, 50), C(548, 430, 50), C(500, 520, 58), C(500, 600, 52),
    // traps, neck, head
    `<path d="M440 360 L560 360 L530 318 L470 318 Z"/>`, cap([500, 330, 30], [500, 372, 40]), E(500, 280, 44, 52, 0),
    // arms
    cap([410, 392, 38], [360, 268, 27]), C(384, 330, 33), cap([360, 268, 27], [320, 158, 19]), C(346, 236, 25),
    cap([590, 392, 38], [640, 268, 27]), C(616, 330, 33), cap([640, 268, 27], [680, 158, 19]), C(654, 236, 25),
    // legs
    cap([460, 660, 50], [410, 842, 30]), M([460, 660], [410, 842], 0.42, 8, 96, 50), M([460, 660], [410, 842], 0.5, -10, 80, 40),
    cap([410, 842, 29], [394, 1000, 17]), M([410, 842], [394, 1000], 0.3, 6, 62, 30), cap([394, 1000, 16], [352, 1030, 11]),
    cap([540, 660, 50], [590, 842, 30]), M([540, 660], [590, 842], 0.42, -8, 96, 50), M([540, 660], [590, 842], 0.5, 10, 80, 40),
    cap([590, 842, 29], [606, 1000, 17]), M([590, 842], [606, 1000], 0.3, -6, 62, 30), cap([606, 1000, 16], [648, 1030, 11]),
  ].join("");
  const rigid = [
    `<rect x="70" y="141" width="860" height="22" rx="8"/>`,
    `<rect x="116" y="36" width="46" height="232" rx="10"/><rect x="168" y="62" width="30" height="180" rx="8"/>`,
    `<rect x="838" y="36" width="46" height="232" rx="10"/><rect x="802" y="62" width="30" height="180" rx="8"/>`,
  ].join("");
  return { near, far: "", rigid, vb: [40, 20, 920, 1040], blur: 6, ground: [500, 1040, 230, 14] };
}
module.exports = { sprinter, lifter };

// Woman in tree pose (vrksasana), front view, palms joined overhead.
function treePose() {
  const near = [
    // head with top-knot bun, neck
    E(500, 205, 38, 48, 0), C(500, 146, 22), cap([500, 250, 18], [500, 292, 22]),
    // torso: shoulders, waist, hips
    `<path d="M438 298 L562 298 L548 410 L538 468 L566 556 L434 556 L462 468 L452 410 Z"/>`,
    E(500, 345, 62, 50, 0), E(500, 548, 74, 46, 0), C(442, 306, 24), C(558, 306, 24),
    // arms overhead, palms together
    cap([442, 306, 17], [402, 198, 13]), M([442, 306], [402, 198], 0.4, 4, 44, 17),
    cap([402, 198, 13], [492, 96, 9]),
    cap([558, 306, 17], [598, 198, 13]), M([558, 306], [598, 198], 0.4, -4, 44, 17),
    cap([598, 198, 13], [508, 96, 9]), E(500, 86, 14, 22, 0),
    // standing leg
    cap([472, 566, 38], [474, 782, 24]), M([472, 566], [474, 782], 0.35, -4, 80, 36),
    cap([474, 782, 23], [474, 985, 13]), M([474, 782], [474, 985], 0.28, 3, 58, 25),
    cap([474, 990, 12], [436, 1004, 9]), cap([474, 990, 12], [500, 1004, 9]),
    // bent leg, sole against the standing thigh
    cap([530, 566, 36], [684, 690, 23]), M([530, 566], [684, 690], 0.42, 6, 74, 32),
    cap([684, 690, 22], [512, 724, 12]), M([684, 690], [512, 724], 0.3, 5, 52, 21),
    E(504, 704, 13, 30, -8),
  ].join("");
  return { near, far: "", rigid: "", vb: [330, 50, 420, 980], blur: 5, ground: [474, 1010, 120, 10] };
}
module.exports.treePose = treePose;
