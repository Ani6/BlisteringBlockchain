const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/0a5f1d2e-d33e-49e1-82c6-f2421cc231e9_b4dad5da-2654-4200-83b7-388a908b88c7/pptx/scripts/apply_theme.js");
const BR = require("./brand.json").contact;
const ART = __dirname + "/art/";
const OUT = "/home/user/BlisteringBlockchain/dhruv-athlete-healthcheck/Dhruv_Athlete_Checkup_Gym_Partner_Deck.pptx";

const THEME = {
  name: "Dhruv Diagnostics",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "0F172A", lt1: "FFFFFF", dk2: "1B2A4A", lt2: "EFF5FF",
    accent1: "2563EB", accent2: "B45309", accent3: "22C55E",
    accent4: "475569", accent5: "DBEAFE", accent6: "D6E0EE",
    hlink: "2563EB", folHlink: "475569",
  },
};
const H = { navy: "0F1A2E", navyText: "1B2A4A", blue: "2563EB", blueLight: "DBEAFE", tint: "EFF5FF", green: "22C55E", greenText: "15803D", slate: "475569", soft: "C9D8F5", rule: "D6E0EE", white: "FFFFFF", warn: "B45309" };

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Athlete Health Check-Up: partner proposal for gyms";
pres.author = "Dhruv Diagnostics, Nagpur";
const C = pres.SchemeColor;

pres.defineSlideMaster({ title: "DARK", background: { color: H.navy }, objects: [] });
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.65, fontSize: 28, bold: true, color: C.text2, fontFace: "Arial", align: "left", valign: "middle", margin: 0 }, text: "" } },
    { image: { x: 0.5, y: 5.15, w: 0.27, h: 0.335, path: ART + "logo_mark.png" } },
    { text: { text: "Dhruv Diagnostics, Nagpur  ·  " + BR.websiteLabel, options: { x: 0.86, y: 5.22, w: 6.2, h: 0.22, fontSize: 9, color: C.accent4, margin: 0 } } },
  ],
  slideNumber: { x: 9.0, y: 5.22, w: 0.5, h: 0.22, fontSize: 9, color: C.accent4, align: "right" },
});

const T = (s, text, o) => s.addText(text, { margin: 0, isTextBox: true, valign: "top", ...o });
const wordmark = (s, x, y, big = 22) => { const mh = big * 0.037; s.addImage({ path: ART + "logo_mark.png", x, y: y - mh * 0.12, w: mh * 0.806, h: mh, altText: "Dhruv Diagnostics logo" }); x += mh * 0.806 + 0.13; return T(s, [{ text: "DHRUV", options: { bold: true, fontSize: big, color: H.white, breakLine: true, charSpacing: 1 } }, { text: "DIAGNOSTICS", options: { fontSize: big * 0.5, color: "93B4F5", charSpacing: 4 } }], { x, y, w: 3, h: 0.8 }); };
const panel = (s, x, y, w, h, color) => s.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { color }, line: { color, width: 0 } });
const bullets = (s, items, o) => T(s, items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })), { fontSize: 14, color: C.text1, paraSpaceAfter: 6, ...o });

(async () => {
  // 1. Cover
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "DARK", sectionTitle: "Opening" });
  s.background = { path: ART + "bg_hero.png" };
  wordmark(s, 0.6, 0.5);
  T(s, "Health check-ups for people who train", { x: 0.6, y: 1.55, w: 5.3, h: 1.6, fontSize: 38, bold: true, color: H.white });
  T(s, "A proposal for gyms, coaches and fitness communities in Nagpur", { x: 0.6, y: 2.95, w: 4.8, h: 0.8, fontSize: 16, color: H.soft });
  T(s, [{ text: "NABL accredited since 2011", options: { bold: true, color: H.green } }, { text: "   |   Laxmi Nagar and Ramdaspeth", options: { color: H.soft } }], { x: 0.6, y: 4.75, w: 6, h: 0.3, fontSize: 12 });
  s.addNotes("Open with the gym's own members in mind: people who lift, run and cut weight, and who get generic health check-ups that were not designed for them.");

  // 2. Member questions
  pres.addSection({ title: "Why" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why" });
  s.addText("Questions your members already ask", { placeholder: "title" });
  const qs = [
    ["“Is my heart ready for high-intensity training?”", "Treadmill stress test, ECG and NT-proBNP"],
    ["“My creatinine came back high. Is it my kidneys or my protein and creatine?”", "Kidney function by cystatin C, which muscle mass does not distort"],
    ["“My shoulder hurts on bench press. Is it a tear?”", "Ultrasound by a musculoskeletal (MSK) radiologist"],
    ["“I am cutting hard. Are my hormones and iron holding up?”", "Hormone panel, ferritin, vitamin D and B12"],
  ];
  qs.forEach(([q, a], i) => {
    const x = 0.5 + (i % 2) * 4.6, y = 1.2 + Math.floor(i / 2) * 1.95;
    panel(s, x, y, 4.4, 1.75, H.tint);
    T(s, q, { x: x + 0.25, y: y + 0.2, w: 3.9, h: 0.85, fontSize: 16, bold: true, color: H.navyText });
    T(s, a, { x: x + 0.25, y: y + 1.1, w: 3.9, h: 0.5, fontSize: 13, color: H.blue, bold: true });
  });
  s.addNotes("Each of these questions has a specific test that answers it. A standard full-body package answers none of them well.");

  // 3. About Dhruv
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why" });
  s.addText("Dhruv Diagnostics, Nagpur", { placeholder: "title" });
  s.addImage({ path: ART + "helix_portrait.png", x: 6.1, y: 0, w: 3.9, h: 4.68, sizing: { type: "cover", w: 3.9, h: 4.68 }, altText: "DNA double helix illustration" });
  const stats = [["30+", "years of diagnostics in Nagpur"], ["2011", "NABL accredited since"], ["2", "branches: Laxmi Nagar and Ramdaspeth"], ["7", "days a week, from 7 AM"]];
  stats.forEach(([n, l], i) => {
    const x = 0.5 + (i % 2) * 2.75, y = 1.2 + Math.floor(i / 2) * 1.55;
    T(s, n, { x, y, w: 2.6, h: 0.75, fontSize: 44, bold: true, color: H.blue });
    T(s, l, { x, y: y + 0.78, w: 2.5, h: 0.6, fontSize: 13, color: H.slate });
  });
  T(s, "Pathology, molecular diagnostics, immunology and radiology under one roof.", { x: 0.5, y: 4.35, w: 5.3, h: 0.6, fontSize: 14, color: H.navyText, bold: true });
  s.addNotes("Figures from dhruvlabs.com: NABL accredited since 2011; Mon-Sat 7 AM-9 PM, Sun 7 AM-5 PM. Confirm the years-in-service figure before external use.");

  // 4. What it covers
  pres.addSection({ title: "Offer" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Offer" });
  s.addText("What the check-up covers", { placeholder: "title" });
  const blocks = [
    ["Heart", "Treadmill stress test, resting ECG, NT-proBNP, hs-troponin"],
    ["Cholesterol risk", "Apo B, Lp(a), full lipid profile"],
    ["Muscle and recovery", "CK, CK-MB, myoglobin, LDH, liver enzymes"],
    ["Hormones", "Testosterone, LH, FSH, oestradiol, cortisol, IGF-1, thyroid"],
    ["Long-term health", "hs-CRP, HbA1c, fasting insulin, homocysteine, cystatin C"],
    ["Tendon scans", "Ultrasound of tendons and ligaments by an MSK radiologist"],
  ];
  blocks.forEach(([h, t], i) => {
    const x = 0.5 + (i % 3) * 3.05, y = 1.2 + Math.floor(i / 3) * 1.9;
    panel(s, x, y, 2.85, 1.7, i === 5 ? H.navy : H.tint);
    T(s, h, { x: x + 0.22, y: y + 0.2, w: 2.45, h: 0.4, fontSize: 17, bold: true, color: i === 5 ? H.white : H.navyText });
    T(s, t, { x: x + 0.22, y: y + 0.68, w: 2.45, h: 0.9, fontSize: 13, color: i === 5 ? H.soft : H.slate });
  });
  s.addNotes("Every result is read against athletic norms. For example, the CK upper limit in athletes is about twice that of non-athletes (Mougios, Br J Sports Med 2007).");

  // 5. MSK ultrasound
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Offer" });
  s.addText("Injury scans by an MSK radiologist", { placeholder: "title" });
  s.addImage({ path: ART + "lift_portrait.png", x: 0, y: 1.1, w: 3.6, h: 4.0, sizing: { type: "cover", w: 3.6, h: 4.0 }, altText: "Illustration of a weightlifter" });
  T(s, "Common gym injuries we scan", { x: 4.0, y: 1.2, w: 5.5, h: 0.35, fontSize: 16, bold: true, color: H.navyText });
  bullets(s, ["Rotator cuff and biceps tendon (pressing, pull-ups)", "Tennis and golfer's elbow", "Patellar tendon (squats, jumping)", "Achilles tendon and plantar fascia (running)"], { x: 4.0, y: 1.6, w: 5.5, h: 1.6 });
  T(s, "Why ultrasound", { x: 4.0, y: 3.25, w: 5.5, h: 0.35, fontSize: 16, bold: true, color: H.navyText });
  bullets(s, ["Done and reported by a radiologist trained in musculoskeletal ultrasound", "The joint is scanned while it moves; no radiation", "Compared with the healthy side, and kept as a baseline for return to training"], { x: 4.0, y: 3.65, w: 5.5, h: 1.5 });
  s.addNotes("A specialist MSK radiologist is the selling point here: general ultrasound often misses partial tendon tears and early tendinopathy.");

  // 6. Plans
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Offer" });
  s.addText("Three plans", { placeholder: "title" });
  const PR = require("./brand.json").pricing;
  const inr = (n) => "\u20B9" + Number(n).toLocaleString("en-IN");
  const plans = [
    ["Base", "Members starting out or under 35", ["Full blood panel and ECG", "CK muscle marker", "Physician review"], H.tint, H.navyText, H.slate, H.blue],
    ["Performance", "Regular lifters, runners, members on a cut or bulk", ["All of Base", "Apo B, Lp(a), NT-proBNP", "Hormone and muscle panel", "1 ultrasound region"], H.blue, H.white, "E1EBFF", H.white],
    ["Elite", "Competitors, bodybuilders, over-35s starting high-intensity work", ["All of Performance", "Treadmill stress test", "hs-troponin, IGF-1, cortisol", "Up to 3 ultrasound regions"], H.navy, H.white, H.soft, H.green],
  ];
  plans.forEach(([name, who, items, bg, hc, tc, pc], i) => {
    const x = 0.5 + i * 3.05, pr = PR.plans[i];
    panel(s, x, 1.15, 2.85, 3.62, bg);
    T(s, name, { x: x + 0.22, y: 1.3, w: 2.45, h: 0.42, fontSize: 21, bold: true, color: hc });
    T(s, who, { x: x + 0.22, y: 1.74, w: 2.45, h: 0.62, fontSize: 11, italic: true, color: tc });
    T(s, items.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < items.length - 1 } })), { x: x + 0.22, y: 2.4, w: 2.45, h: 1.35, fontSize: 12, color: hc, paraSpaceAfter: 3 });
    T(s, inr(pr.price), { x: x + 0.22, y: 3.6, w: 2.45, h: 0.5, fontSize: 28, bold: true, color: pc });
    T(s, "Gym-partner members " + inr(pr.partner), { x: x + 0.22, y: 4.12, w: 2.45, h: 0.25, fontSize: 11, bold: true, color: hc });
    T(s, [{ text: "Tests bought separately " }, { text: inr(pr.value), options: { strike: "sngStrike" } }], { x: x + 0.22, y: 4.4, w: 2.45, h: 0.25, fontSize: 10, color: tc });
  });
  T(s, "Add-ons: " + PR.addons.map((a) => a.name + " " + inr(a.price)).join("   |   "), { x: 0.5, y: 4.88, w: 9, h: 0.22, fontSize: 10, color: H.slate });
  s.addNotes("Prices are proposed launch prices set from 2026 market rates for each test in Nagpur and national chains; the struck-through figure is the sum of the same tests bought one by one. Confirm with Dhruv management before external use.");

  // 7. Partnership
  pres.addSection({ title: "Partnership" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Partnership" });
  s.addText("How a gym partnership works", { placeholder: "title" });
  T(s, "What we offer", { x: 0.5, y: 1.15, w: 4.3, h: 0.4, fontSize: 18, bold: true, color: H.blue });
  const offer = [["Member pricing", "on all three plans for your members"], ["Check-up days at your gym", "sample collection on site, by appointment"], ["Talks by our doctors", "heart screening, supplements, doping risk"], ["A front-desk QR standee", "members book in under a minute"]];
  offer.forEach(([h, t], i) => {
    const y = 1.65 + i * 0.82;
    T(s, String(i + 1), { x: 0.5, y, w: 0.45, h: 0.6, fontSize: 26, bold: true, color: H.blue });
    T(s, h, { x: 1.0, y: y + 0.02, w: 3.8, h: 0.3, fontSize: 15, bold: true, color: H.navyText });
    T(s, t, { x: 1.0, y: y + 0.33, w: 3.8, h: 0.3, fontSize: 13, color: H.slate });
  });
  panel(s, 5.3, 1.15, 4.2, 3.85, H.navy);
  T(s, "What your gym gets", { x: 5.55, y: 1.35, w: 3.7, h: 0.4, fontSize: 18, bold: true, color: H.white });
  bullets(s, ["A medical service no other gym nearby offers", "Members over 35 screened before high-intensity classes", "Trainers who plan with real numbers: fitness in METs, recovery markers, scan results", "Injury questions answered by imaging, not guesswork"], { x: 5.55, y: 1.9, w: 3.75, h: 3.0, fontSize: 14, color: H.white });
  s.addNotes("All partnership terms are proposals to be agreed with each gym. Do not offer referral payments; the value to the gym is the service to its members.");

  // 8. Enthusiasts
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Partnership" });
  s.addText("For members who feel fine", { placeholder: "title" });
  s.addImage({ path: ART + "helix_portrait2.png", x: 6.1, y: 0, w: 3.9, h: 4.68, sizing: { type: "cover", w: 3.9, h: 4.68 }, altText: "DNA double helix illustration" });
  const why = [["Know your baseline", "Your own normal, so future changes stand out"], ["Find silent problems early", "High Apo B, low iron or a heart-rhythm issue rarely causes symptoms at first"], ["Train with numbers", "Fitness in METs and recovery markers guide how hard to push"], ["Stay safe on supplements", "Liver, kidney, blood count and hormones checked in confidence"]];
  why.forEach(([h, t], i) => {
    const y = 1.2 + i * 0.92;
    T(s, h, { x: 0.5, y, w: 5.3, h: 0.32, fontSize: 16, bold: true, color: H.navyText });
    T(s, t, { x: 0.5, y: y + 0.36, w: 5.3, h: 0.45, fontSize: 13, color: H.slate });
  });
  s.addNotes("Results stay between the member and our physician. This is health monitoring, not a doping test.");

  // 9. Recovery Club
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Partnership" });
  s.addText("Recovery Club for women", { placeholder: "title" });
  T(s, "Sauna, spa and health club, open to women members only at present.", { x: 0.5, y: 1.05, w: 9, h: 0.35, fontSize: 15, bold: true, color: H.warn });
  [["Sauna", "Dry heat after training, opened to each member after her blood pressure and heart check are reviewed."], ["Spa", "Massage and hydrotherapy to ease soreness between sessions."], ["Health club", "Supervised strength, conditioning and mobility work."]].forEach(([h, t], i) => {
    const x = 0.5 + i * 3.05;
    panel(s, x, 1.6, 2.85, 2.4, i === 0 ? H.navy : H.tint);
    T(s, h, { x: x + 0.22, y: 1.8, w: 2.45, h: 0.4, fontSize: 18, bold: true, color: i === 0 ? H.white : H.navyText });
    T(s, t, { x: x + 0.22, y: 2.3, w: 2.45, h: 1.5, fontSize: 14, color: i === 0 ? H.soft : H.slate });
  });
  T(s, "Men's access has not opened yet.", { x: 0.5, y: 4.25, w: 9, h: 0.35, fontSize: 13, color: H.slate });

  // 10. Booking
  pres.addSection({ title: "Booking" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Booking" });
  s.addText("How booking works", { placeholder: "title" });
  const steps = [["Scan or call", "Scan the QR code or call the branch nearest you"], ["Confirm", "We confirm the plan, the branch and your slot"], ["Visit", "Come fasting, between 8 and 10 am, with your supplement list"], ["Review", "A physician goes through the report with you"]];
  steps.forEach(([h, t], i) => {
    const x = 0.5 + i * 2.3;
    T(s, String(i + 1), { x, y: 1.25, w: 2.1, h: 0.9, fontSize: 54, bold: true, color: i === 0 ? H.blue : "9DB8F3" });
    T(s, h, { x, y: 2.3, w: 2.1, h: 0.4, fontSize: 18, bold: true, color: H.navyText });
    T(s, t, { x, y: 2.75, w: 2.0, h: 1.2, fontSize: 13, color: H.slate });
  });
  T(s, "No hard training for 48 to 72 hours before the visit, so muscle and heart markers reflect you, not your last session.", { x: 0.5, y: 4.3, w: 9, h: 0.6, fontSize: 13, color: H.blue, bold: true });

  // 11. Contact
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Booking" });
  s.background = { path: ART + "bg_lift.png" };
  wordmark(s, 0.6, 0.45, 18);
  T(s, "Call to confirm your appointment", { x: 0.6, y: 1.2, w: 5.6, h: 0.5, fontSize: 24, bold: true, color: H.white });
  BR.branches.forEach((b, i) => {
    const y = 1.85 + i * 0.85;
    T(s, [{ text: b.name + "   ", options: { bold: true, color: H.white } }, { text: b.phone, options: { bold: true, color: H.green } }], { x: 0.6, y, w: 5.4, h: 0.3, fontSize: 15 });
    T(s, b.address, { x: 0.6, y: y + 0.32, w: 5.4, h: 0.45, fontSize: 11, color: H.soft });
  });
  T(s, BR.hours + "   |   " + BR.email, { x: 0.6, y: 3.6, w: 5.8, h: 0.3, fontSize: 11, color: H.soft });
  [["qr_web.png", "Website"], ["qr_map_laxmi.png", "Laxmi Nagar map"], ["qr_map_ramdas.png", "Ramdaspeth map"]].forEach(([img, lab], i) => {
    const x = 0.6 + i * 1.55;
    panel(s, x, 4.0, 1.05, 1.05, H.white);
    s.addImage({ path: ART + img, x: x + 0.05, y: 4.05, w: 0.95, h: 0.95, altText: lab + " QR code" });
    T(s, lab, { x, y: 5.1, w: 1.45, h: 0.22, fontSize: 9, color: H.soft });
  });
  s.addNotes("Laboratory tests are performed in a NABL-accredited laboratory. The check-up is a screening programme and does not replace a consultation with your own doctor.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written");
})();
