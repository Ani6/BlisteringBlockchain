// Corporate wellness pitch deck for Dhruv Diagnostics, Face n Figure and Jeevan Jyoti Blood Bank.
// Usage: node build_corp.js general|it
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/0a5f1d2e-d33e-49e1-82c6-f2421cc231e9_b4dad5da-2654-4200-83b7-388a908b88c7/pptx/scripts/apply_theme.js");
const B = require("./brand.json");
const BR = B.contact, CP = B.corporate;
const ART = __dirname + "/art/";
const IT = process.argv[2] === "it";
const OUT = "/home/user/BlisteringBlockchain/dhruv-athlete-healthcheck/corporate/" + (IT ? "Dhruv_Group_Employee_Wellness_IT_Deck.pptx" : "Dhruv_Group_Employee_Wellness_Corporate_Deck.pptx");
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

const THEME = { name: "Dhruv Group", headFontFace: "Arial", bodyFontFace: "Arial", colors: {
  dk1: "0F172A", lt1: "FFFFFF", dk2: "1B2A4A", lt2: "EFF5FF", accent1: "2563EB", accent2: "BE185D", accent3: "B91C1C",
  accent4: "475569", accent5: "22C55E", accent6: "D6E0EE", hlink: "2563EB", folHlink: "475569" } };
const H = { navy: "0F1A2E", navyText: "1B2A4A", blue: "2563EB", tint: "EFF5FF", green: "22C55E", slate: "475569", soft: "C9D8F5", rule: "D6E0EE", white: "FFFFFF",
  rose: "BE185D", blush: "FCE7F3", red: "B91C1C", redTint: "FEE2E2", amber: "B45309" };

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.theme = { headFontFace: "Arial", bodyFontFace: "Arial" };
pres.title = IT ? "Employee health benefits for technology teams" : "Employee health and wellness programme";
pres.author = "Dhruv Diagnostics, Nagpur";
const C = pres.SchemeColor;

pres.defineSlideMaster({ title: "DARK", background: { color: H.navy }, objects: [] });
pres.defineSlideMaster({ title: "CONTENT", background: { color: C.background1 }, objects: [
  { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.65, fontSize: 27, bold: true, color: C.text2, fontFace: "Arial", align: "left", valign: "middle", margin: 0 }, text: "" } },
  { image: { x: 0.5, y: 5.15, w: 0.27, h: 0.335, path: ART + "logo_mark.png" } },
  { text: { text: "Dhruv Diagnostics  ·  Face n Figure  ·  Jeevan Jyoti Blood Bank  ·  Laxmi Nagar, Nagpur", options: { x: 0.86, y: 5.22, w: 7.6, h: 0.22, fontSize: 9, color: C.accent4, margin: 0 } } },
], slideNumber: { x: 9.0, y: 5.22, w: 0.5, h: 0.22, fontSize: 9, color: C.accent4, align: "right" } });

const T = (s, text, o) => s.addText(text, { margin: 0, isTextBox: true, valign: "top", ...o });
const panel = (s, x, y, w, h, color) => s.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { color }, line: { color, width: 0 } });
const bullets = (s, items, o) => T(s, items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })), { fontSize: 13, color: C.text1, paraSpaceAfter: 5, ...o });
const src = (s, t, o = {}) => T(s, t, { x: 0.5, y: 4.9, w: 9, h: 0.25, fontSize: 9, color: H.slate, ...o });
const wordmark = (s, x, y, big = 20) => { const mh = big * 0.037; s.addImage({ path: ART + "logo_mark.png", x, y: y - mh * 0.12, w: mh * 0.806, h: mh, altText: "Dhruv Diagnostics logo" }); x += mh * 0.806 + 0.13;
  return T(s, [{ text: "DHRUV", options: { bold: true, fontSize: big, color: H.white, breakLine: true, charSpacing: 1 } }, { text: "DIAGNOSTICS", options: { fontSize: big * 0.5, color: "93B4F5", charSpacing: 4 } }], { x, y, w: 3, h: 0.8 }); };
const fs = require("fs");
const MARK = { fnf: { file: "logo_fnf.png", name: "Face n Figure", sub: "LADIES GYM \u00B7 BEAUTY PARLOUR", c: H.rose },
  jj: { file: "logo_jj.png", name: "Jeevan Jyoti", sub: "BLOOD BANK & COMPONENTS", c: H.red } };
// Uses the brand's own logo file when it is supplied in art/, otherwise a typographic wordmark.
function brandMark(s, key, x, y, w, h, onDark = false) {
  const m = MARK[key], f = ART + m.file;
  if (fs.existsSync(f)) { s.addImage({ path: f, x, y, w, h, sizing: { type: "contain", w, h }, altText: m.name + " logo" }); return; }
  T(s, [{ text: m.name, options: { bold: true, fontSize: h * 34, color: onDark ? H.white : m.c, breakLine: true } }, { text: m.sub, options: { fontSize: h * 13, color: onDark ? "FBCFE8" : H.slate, charSpacing: 2 } }], { x, y, w, h });
}
const chartBase = () => ({ showTitle: true, titleFontSize: 11, titleColor: H.navyText, titleFontFace: "+mn-lt", showValue: true, dataLabelColor: H.navyText, dataLabelFontSize: 11, dataLabelFontFace: "+mn-lt",
  catAxisLabelColor: H.slate, catAxisLabelFontSize: 11, catAxisLabelFontFace: "+mn-lt", valAxisLabelColor: H.slate, valAxisLabelFontSize: 10, valAxisLabelFontFace: "+mn-lt",
  valGridLine: { color: H.rule, size: 0.5 }, catGridLine: { style: "none" }, valAxisMinVal: 0, showLegend: false });
const PK = IT ? CP.packagesIT : CP.packages;

(async () => {
  // 1. Cover
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "DARK", sectionTitle: "Opening" });
  s.background = { path: ART + "cover_corp.png" };
  wordmark(s, 0.6, 0.5);
  T(s, IT ? "Health benefits built for tech teams" : "Employee health and wellness, from one campus", { x: 0.6, y: 1.5, w: 3.9, h: 1.7, fontSize: 31, bold: true, color: H.white });
  T(s, IT ? "A proposal for IT companies in Nagpur, from MIHAN SEZ to IT Park Parsodi" : "A proposal for companies in Nagpur", { x: 0.6, y: 3.25, w: 3.9, h: 0.7, fontSize: 14, color: H.soft });
  T(s, [{ text: "Dhruv Diagnostics", options: { bold: true, color: "93B4F5", breakLine: true } }, { text: "Face n Figure", options: { bold: true, color: "F9A8D4", breakLine: true } }, { text: "Jeevan Jyoti Blood Bank", options: { bold: true, color: "FCA5A5" } }],
    { x: 0.6, y: 4.0, w: 4, h: 0.9, fontSize: 12, paraSpaceAfter: 2 });
  s.addNotes(IT ? "Open with the tech workforce: long hours at a desk, screens, shift work and a young average age that hides early metabolic risk. Three services from one Laxmi Nagar campus cover check-ups, women's fitness and blood donation." : "Open with the offer: one partner for employee check-ups, women's fitness and grooming, and blood donation camps, all from the same campus on West High Court Road, Laxmi Nagar.");

  // 2. Evidence
  pres.addSection({ title: "Why" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why" });
  if (!IT) {
    s.addText("Most adults carry a risk they cannot feel", { placeholder: "title" });
    s.addChart(pres.charts.BAR, [{ name: "% of adults", labels: ["Dyslipidaemia", "Hypertension", "Prediabetes", "Diabetes"], values: [81.2, 35.5, 15.3, 11.4] }],
      { ...chartBase(), x: 0.5, y: 1.1, w: 5.4, h: 3.6, barDir: "bar", chartColors: [H.blue], title: "Indian adults aged 20+, ICMR-INDIAB 2023 (%)", dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0", valAxisMaxVal: 100, valAxisMajorUnit: 20, valAxisHidden: true, valGridLine: { style: "none" } });
    panel(s, 6.3, 1.15, 3.2, 1.65, H.redTint);
    T(s, "54%", { x: 6.5, y: 1.28, w: 2.9, h: 0.6, fontSize: 36, bold: true, color: H.red });
    T(s, "of women in Maharashtra are anaemic (NFHS-5)", { x: 6.5, y: 1.95, w: 2.85, h: 0.7, fontSize: 12.5, color: H.navyText });
    panel(s, 6.3, 3.0, 3.2, 1.65, H.tint);
    T(s, "1 test", { x: 6.5, y: 3.13, w: 2.9, h: 0.6, fontSize: 36, bold: true, color: H.blue });
    T(s, "finds each of these early. None of them hurts until it is advanced.", { x: 6.5, y: 3.8, w: 2.85, h: 0.75, fontSize: 12.5, color: H.navyText });
    src(s, "Sources: Anjana RM et al., Lancet Diabetes Endocrinol 2023 (ICMR-INDIAB, 113,043 adults); NFHS-5 Maharashtra fact sheet, 2019-21 (54.2% of women aged 15-49).");
  } else {
    s.addText("Tech jobs carry their own health risks", { placeholder: "title" });
    const stats = [["2 in 3", "Indian IT professionals report work-related neck, back or other musculoskeletal pain", "Meta-analysis of 20 studies, 15,709 people, 2025", H.blue],
      ["40.6%", "of IT professionals in Delhi NCR had metabolic syndrome at a preventive check-up", "J Family Med Prim Care, 2025", H.rose],
      ["63.5%", "of 1,350 young Pune IT employees (average age 33) had two or more cardiometabolic risk factors", "Indian J Occup Environ Med, 2016", H.red],
      ["84%", "of 345 Hyderabad IT employees had fatty liver on FibroScan", "Scientific Reports, 2025", H.amber]];
    stats.forEach(([n, l, so, c], i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.15 + Math.floor(i / 2) * 1.85;
      panel(s, x, y, 4.4, 1.7, i % 3 === 0 ? H.tint : "F8FAFC");
      T(s, n, { x: x + 0.22, y: y + 0.15, w: 4, h: 0.6, fontSize: 32, bold: true, color: c });
      T(s, l, { x: x + 0.22, y: y + 0.78, w: 4, h: 0.55, fontSize: 12, color: H.navyText });
      T(s, so, { x: x + 0.22, y: y + 1.36, w: 4, h: 0.25, fontSize: 9, color: H.slate }); });
    s.addNotes("Studies are from different cities and use different criteria, so they are shown side by side, not combined. The common thread is sedentary, screen-heavy work and a young workforce whose risks are found late.");
  }

  // 3. Check-ups pay back
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why" });
  s.addText("Regular check-ups go with fewer hospital stays", { placeholder: "title" });
  s.addChart(pres.charts.BAR, [{ name: "Hospitalisation rate", labels: ["Three annual check-ups", "No check-ups"], values: [2.41, 7.27] }],
    { ...chartBase(), x: 0.5, y: 1.1, w: 4.8, h: 3.55, barDir: "col", chartColors: [H.blue, "94A3B8"], title: "Hospitalisation rate among 10,551 employees (%)", dataLabelPosition: "outEnd", valAxisMaxVal: 8, valAxisMajorUnit: 2, dataLabelFormatCode: "0.00" });
  T(s, "What the data shows", { x: 5.7, y: 1.15, w: 3.8, h: 0.35, fontSize: 16, bold: true, color: H.navyText });
  bullets(s, ["Employees who completed three annual check-ups were hospitalised about a third as often as those who skipped them", "Skippers were a quarter of employees but made up 46% of inpatient claims", "Fewer than 30% of employees take part in company wellbeing programmes; on-site camps and same-campus visits close that gap"], { x: 5.7, y: 1.6, w: 3.8, h: 2.9, fontSize: 13 });
  src(s, "Sources: CII-MediBuddy Workplace Health Report (3rd edition), an association, not proof of cause; Plum, Health Report of Corporate India 2023.");

  // 4. Rules
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why" });
  s.addText("What the new rules mean for employers", { placeholder: "title" });
  const rules = [["Labour codes", "In force since 21 November 2025. In May 2026 the government launched free annual check-ups for workers aged 40+. The binding central rule now covers dock and construction work; Maharashtra's rules are in draft.", "We can run 40+ check-ups for you now, ahead of any wider rule."],
    ["Data protection", "The DPDP Rules were notified on 13 November 2025; most duties apply from 13 May 2027. Health results need consent and may be used only for the stated purpose.", "Each employee gets their own report. HR gets anonymised group results only."],
    ["CSR", "Programmes that benefit only your own employees are not CSR. Blood donation and health camps open to the community can count as preventive health care.", "Run staff check-ups as a benefit, and blood camps as community CSR."]];
  rules.forEach(([h, t, w], i) => { const x = 0.5 + i * 3.05;
    panel(s, x, 1.15, 2.85, 3.65, i === 1 ? H.tint : "F8FAFC");
    T(s, h, { x: x + 0.2, y: 1.3, w: 2.45, h: 0.35, fontSize: 16, bold: true, color: H.navyText });
    T(s, t, { x: x + 0.2, y: 1.72, w: 2.45, h: 1.95, fontSize: 11.5, color: H.slate });
    T(s, w, { x: x + 0.2, y: 3.75, w: 2.45, h: 0.9, fontSize: 12, bold: true, color: H.blue }); });
  src(s, "Not legal advice. Sources: Gazette notifications of 21 Nov 2025; OSH (Central) Rules 2026, G.S.R. 345(E); DPDP Rules 2025; Companies (CSR Policy) Rules 2014, rule 2(1)(d).");

  // 5. Three brands
  pres.addSection({ title: "Who we are" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Who we are" });
  s.addText("Three services, one Laxmi Nagar campus", { placeholder: "title" });
  const brands = [["helix_portrait.png", "Dhruv Diagnostics", "NABL-accredited pathology and ultrasound. Health check-ups, on-site camps, reports and physician review.", H.blue, "J-11 and Ramdaspeth"],
    ["fnf_portrait.png", "Face n Figure", "Women-only gym and beauty parlour: gym, Zumba, Pilates, yoga, steam, sauna and grooming.", H.rose, "J-11, same building"],
    ["jj_portrait.png", "Jeevan Jyoti Blood Bank", "NABH-accredited blood bank and components centre. Voluntary donation camps at your premises.", H.red, "J-12, next door"]];
  brands.forEach(([img, h, t, c, a], i) => { const x = 0.5 + i * 3.05;
    s.addImage({ path: ART + img, x, y: 1.1, w: 2.85, h: 1.55, sizing: { type: "cover", w: 2.85, h: 1.55 }, altText: h + " illustration" });
    if (i === 0) T(s, h, { x, y: 2.8, w: 2.85, h: 0.35, fontSize: 16, bold: true, color: c }); else brandMark(s, ["", "fnf", "jj"][i], x, 2.74, 2.85, 0.44);
    T(s, t, { x, y: 3.2, w: 2.85, h: 1.05, fontSize: 12, color: H.navyText });
    T(s, a, { x, y: 4.3, w: 2.85, h: 0.25, fontSize: 10.5, bold: true, color: H.slate }); });
  src(s, "All three are on West High Court Road, Laxmi Nagar, Nagpur 440022. One meeting, one coordinator, one invoice.");

  // 6. Dhruv credentials
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Who we are" });
  s.addText("Dhruv Diagnostics, Nagpur", { placeholder: "title" });
  s.addImage({ path: ART + "helix_portrait2.png", x: 6.1, y: 0, w: 3.9, h: 4.68, sizing: { type: "cover", w: 3.9, h: 4.68 }, altText: "DNA double helix illustration" });
  [["30+", "years of diagnostics in Nagpur"], ["2011", "NABL accredited since"], ["2", "branches: Laxmi Nagar and Ramdaspeth"], ["7", "days a week, from 7 AM"]].forEach(([n, l], i) => {
    const x = 0.5 + (i % 2) * 2.75, y = 1.15 + Math.floor(i / 2) * 1.4;
    T(s, n, { x, y, w: 2.6, h: 0.7, fontSize: 40, bold: true, color: H.blue });
    T(s, l, { x, y: y + 0.72, w: 2.5, h: 0.55, fontSize: 12.5, color: H.slate }); });
  bullets(s, ["Pathology, biochemistry, hormones, molecular tests", "Ultrasound, including musculoskeletal scans by a trained MSK radiologist", "ECG and treadmill stress test"], { x: 0.5, y: 3.95, w: 5.4, h: 1.0, fontSize: 12.5 });

  // 7. Packages
  pres.addSection({ title: "Offer" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Offer" });
  s.addText("Health check-up packages, per employee", { placeholder: "title" });
  PK.forEach((p, i) => { const x = 0.5 + i * 3.05, bg = [H.tint, H.blue, H.navy][i], hc = i ? H.white : H.navyText, tc = i ? "E1EBFF" : H.slate;
    panel(s, x, 1.1, 2.85, 3.55, bg);
    T(s, p.name, { x: x + 0.2, y: 1.22, w: 2.45, h: 0.4, fontSize: 19, bold: true, color: hc });
    T(s, p.who, { x: x + 0.2, y: 1.62, w: 2.45, h: 0.3, fontSize: 10.5, italic: true, color: tc });
    T(s, p.items.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < p.items.length - 1 } })), { x: x + 0.2, y: 1.98, w: 2.5, h: 1.75, fontSize: 10.5, color: hc, paraSpaceAfter: 2 });
    T(s, inr(p.price), { x: x + 0.2, y: 3.78, w: 2.45, h: 0.5, fontSize: 26, bold: true, color: [H.blue, H.white, H.green][i] });
    T(s, [{ text: "Tests at walk-in prices " }, { text: inr(p.value), options: { strike: "sngStrike" } }], { x: x + 0.2, y: 4.3, w: 2.5, h: 0.25, fontSize: 9.5, color: tc }); });
  src(s, "Add-ons: " + CP.addons.map((a) => a.name + " " + inr(a.price)).join("   |   ") + ".   " + CP.volumeNote, { y: 4.78, h: 0.35, fontSize: 9.5 });
  s.addNotes("Prices are proposed per-employee rates for on-site camps or branch visits, set from 2026 Nagpur walk-in prices for the same tests and Nagpur hospital package benchmarks (Wockhardt Rs 3,999-7,199; KIMS-Kingsway Rs 3,000-8,500). Confirm with Dhruv management.");

  // 8. Executive morning with breakfast
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Offer" });
  s.addText("Executive check-up, breakfast included", { placeholder: "title" });
  s.addImage({ path: ART + "breakfast.png", x: 5.75, y: 1.15, w: 3.75, h: 2.81, altText: "Breakfast tray with poha, chai and fruit" });
  T(s, "A tasty, healthy breakfast after the fasting tests: poha, upma or idli, fresh fruit, eggs, and chai or coffee. Low-oil and diabetes-friendly.", { x: 5.75, y: 4.05, w: 3.75, h: 0.75, fontSize: 11.5, color: H.navyText });
  ["Fasting blood and urine samples", "Ultrasound of abdomen and pelvis", "Breakfast", "ECG and treadmill stress test", "Physician goes through the results"].forEach((t, i) => {
    const y = 1.2 + i * 0.72, hi = i === 2;
    s.addShape(pres.ShapeType.ellipse, { x: 0.5, y, w: 0.48, h: 0.48, fill: { color: hi ? H.green : H.blue }, line: { color: hi ? H.green : H.blue, width: 0 } });
    T(s, String(i + 1), { x: 0.5, y, w: 0.48, h: 0.48, fontSize: 15, bold: true, color: H.white, align: "center", valign: "middle" });
    T(s, t, { x: 1.15, y: y + 0.08, w: 4.3, h: 0.35, fontSize: 15, bold: hi, color: hi ? "15803D" : H.navyText }); });
  s.addNotes("Breakfast is part of the Executive package. Sequence: fasting tests and ultrasound first, then breakfast, then ECG and TMT. Dhruv to confirm the breakfast menu, caterer and seating at the Laxmi Nagar branch.");

  // 8b. IT only: built for tech teams
  if (IT) {
    s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Offer" });
    s.addText("Built around how tech teams work", { placeholder: "title" });
    const feats = [["On your campus", "Camps at MIHAN SEZ or IT Park Parsodi; we bring phlebotomists, ECG and the forms."],
      ["Around your shifts", "Early-morning and weekend slots; night-shift teams can book a branch visit at 7 AM."],
      ["No admin for HR", "QR booking with employee code; we upload results and send each employee a digital report."],
      ["Family and parents", "Spouses and parents at the same per-person price, booked through the same QR."],
      ["Co-pay friendly", "The company funds Essential; employees can top up to Comprehensive or Executive."],
      ["Desk-pain clinic", "Neck, shoulder and wrist ultrasound by our MSK radiologist, as an add-on."]];
    feats.forEach(([h, t], i) => { const x = 0.5 + (i % 3) * 3.05, y = 1.15 + Math.floor(i / 3) * 1.85;
      panel(s, x, y, 2.85, 1.7, i === 5 ? H.navy : H.tint);
      T(s, h, { x: x + 0.2, y: y + 0.18, w: 2.45, h: 0.35, fontSize: 15, bold: true, color: i === 5 ? H.white : H.navyText });
      T(s, t, { x: x + 0.2, y: y + 0.62, w: 2.45, h: 0.95, fontSize: 12, color: i === 5 ? H.soft : H.slate }); });
    s.addNotes("Infosys runs an annual health week with co-paid master health checks (HALE), and Persistent offers paid annual check-ups; this model slots into both. Only 25% of Indian employers extend health cover to parents (Plum 2023), so parents' check-ups are a valued add-on.");
  }

  // 9. Camps and reporting
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Offer" });
  s.addText("On-site camps with confidential reporting", { placeholder: "title" });
  T(s, "Camp day", { x: 0.5, y: 1.15, w: 4.3, h: 0.35, fontSize: 16, bold: true, color: H.navyText });
  bullets(s, ["Registration by QR the week before", "Fasting samples from 7:30 AM at your office", "Height, weight, BP and SpO2 on the spot", "Ultrasound, TMT and Executive tests at our Laxmi Nagar branch", "Reports in 24 to 48 hours on WhatsApp and email"], { x: 0.5, y: 1.6, w: 4.3, h: 2.9, fontSize: 13 });
  panel(s, 5.2, 1.15, 4.3, 3.55, H.navy);
  T(s, "Who sees what", { x: 5.45, y: 1.3, w: 3.9, h: 0.35, fontSize: 16, bold: true, color: H.white });
  T(s, [{ text: "Employee", options: { bold: true, color: H.green, breakLine: true } }, { text: "Their full report and a doctor's summary", options: { color: H.soft, breakLine: true } }, { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "HR", options: { bold: true, color: H.green, breakLine: true } }, { text: "Participation and anonymised group results, such as the share of staff with high blood sugar", options: { color: H.soft, breakLine: true } }, { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Nobody else", options: { bold: true, color: H.green, breakLine: true } }, { text: "Consent is taken at registration, in line with the DPDP Act", options: { color: H.soft } }], { x: 5.45, y: 1.8, w: 3.85, h: 2.8, fontSize: 12.5 });

  // 10. Face n Figure
  pres.addSection({ title: "Women's wellness and blood donation" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Women's wellness and blood donation" });
  s.addText(IT ? "Women in tech" : "Women's wellness", { placeholder: "title" });
  s.addImage({ path: ART + "fnf_portrait.png", x: 6.1, y: 0, w: 3.9, h: 4.68, sizing: { type: "cover", w: 3.9, h: 4.68 }, altText: "Woman in yoga tree pose" });
  s.addShape(pres.ShapeType.rect, { x: 6.1, y: 3.82, w: 3.9, h: 0.86, fill: { color: H.navy, transparency: 35 }, line: { color: H.navy, width: 0, transparency: 100 } });
  brandMark(s, "fnf", 6.35, 4.0, 3.4, 0.55, true);
  T(s, "A women-only gym and beauty parlour in Laxmi Nagar for over four decades.", { x: 0.5, y: 1.1, w: 5.3, h: 0.55, fontSize: 13.5, bold: true, color: H.rose });
  T(s, "Fitness", { x: 0.5, y: 1.75, w: 2.6, h: 0.3, fontSize: 14, bold: true, color: H.navyText });
  bullets(s, ["Gym and strength", "Zumba, aerobics, Pilates", "Yoga and meditation", "Steam and sauna"], { x: 0.5, y: 2.1, w: 2.6, h: 1.4, fontSize: 12 });
  T(s, "Beauty parlour", { x: 3.2, y: 1.75, w: 2.7, h: 0.3, fontSize: 14, bold: true, color: H.navyText });
  bullets(s, ["Skin and hair care", "Grooming for client-facing staff", "Bridal and event make-up"], { x: 3.2, y: 2.1, w: 2.7, h: 1.4, fontSize: 12 });
  panel(s, 0.5, 3.6, 5.3, 1.2, H.blush);
  T(s, [{ text: "For your company  ", options: { bold: true, color: H.rose } }, { text: "Corporate membership rates, Women's Day and wellness-week sessions on your premises, and a women's health add-on from Dhruv: " + inr(CP.addons.find((a) => a.key === "women").price) + " for an anaemia, thyroid and hormone check with a Pap smear.", options: { color: H.navyText } }], { x: 0.7, y: 3.72, w: 4.95, h: 1.0, fontSize: 11.5 });
  s.addNotes("Face n Figure corporate rates to be set by Face n Figure management. Founding year from directory listings (1978-79), so the slide says 'over four decades'.");

  // 11. Jeevan Jyoti
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Women's wellness and blood donation" });
  s.addText(IT ? "Blood donation day" : "Blood donation camps", { placeholder: "title" });
  s.addImage({ path: ART + "jj_portrait.png", x: 6.1, y: 0, w: 3.9, h: 4.68, sizing: { type: "cover", w: 3.9, h: 4.68 }, altText: "Blood drop with heartbeat line" });
  s.addShape(pres.ShapeType.rect, { x: 6.1, y: 3.82, w: 3.9, h: 0.86, fill: { color: H.navy, transparency: 35 }, line: { color: H.navy, width: 0, transparency: 100 } });
  brandMark(s, "jj", 6.35, 4.0, 3.4, 0.55, true);
  T(s, "NABH-accredited since 2011, open 24 hours, and the region's first blood bank to prepare all components (1997).", { x: 0.5, y: 1.1, w: 5.3, h: 0.6, fontSize: 13, bold: true, color: H.red });
  T(s, "We bring", { x: 0.5, y: 1.85, w: 2.6, h: 0.3, fontSize: 14, bold: true, color: H.navyText });
  bullets(s, ["Doctor, nurse, technicians and counsellor", "Donor screening and refreshments", "Certificates for every donor"], { x: 0.5, y: 2.2, w: 2.6, h: 1.4, fontSize: 12 });
  T(s, "You provide", { x: 3.2, y: 1.85, w: 2.7, h: 0.3, fontSize: 14, bold: true, color: H.navyText });
  bullets(s, ["A room about 20 x 30 ft", "Power point, water, 3-4 tables, 20-25 chairs", "Donor sign-ups through HR"], { x: 3.2, y: 2.2, w: 2.7, h: 1.4, fontSize: 12 });
  panel(s, 0.5, 3.6, 5.3, 1.2, H.redTint);
  T(s, [{ text: "Who can donate  ", options: { bold: true, color: H.red } }, { text: "Age 18-65 (first-time donors up to 60), weight 45 kg or more, haemoglobin 12.5 g/dL or more. Men every 3 months, women every 4 months.", options: { color: H.navyText } }], { x: 0.7, y: 3.72, w: 4.95, h: 1.0, fontSize: 11.5 });
  s.addNotes("Camps are free to the host company. Eligibility per Drugs and Cosmetics (Second Amendment) Rules 2020 and NBTC guidelines. A camp open to the wider community can be booked as CSR (preventive health care); confirm with the CSR committee. Firsts and dates are the blood bank's own claims; NABH certificate BB-2011-0033 is valid to 4 April 2027.");

  // 12. Calendar
  pres.addSection({ title: "Plan" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Plan" });
  s.addText("A year of wellness, planned with you", { placeholder: "title" });
  const cal = [["Mar 8", "Women's Day", "Face n Figure session and women's health add-on", H.rose],
    ["Apr 7", "World Health Day", "Annual check-up camp opens", H.blue],
    ["Jun 14", "World Blood Donor Day", "Blood donation camp", H.red],
    ["Jun 21", "International Yoga Day", "Yoga session on your premises", H.rose],
    ["Sep 29", "World Heart Day", "Executive heart checks for staff over 40", H.blue],
    ["Oct 1", "National Voluntary Blood Donation Day", "Second blood donation camp", H.red],
    ["Nov 14", "World Diabetes Day", "HbA1c follow-up for staff at risk", H.blue]];
  s.addShape(pres.ShapeType.line, { x: 0.6, y: 1.55, w: 8.8, h: 0, line: { color: H.rule, width: 2 } });
  cal.forEach(([d, n, t, c], i) => { const x = 0.5 + i * 1.29;
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.05, y: 1.43, w: 0.24, h: 0.24, fill: { color: c }, line: { color: H.white, width: 2 } });
    T(s, d, { x, y: 1.8, w: 1.22, h: 0.3, fontSize: 14, bold: true, color: c });
    T(s, n, { x, y: 2.15, w: 1.2, h: 0.85, fontSize: 11, bold: true, color: H.navyText });
    T(s, t, { x, y: 3.05, w: 1.2, h: 1.2, fontSize: 10.5, color: H.slate }); });
  src(s, "Dates are the official international and national observance days. The order and content can be changed to suit your year.", { y: 4.55 });

  // 13. Engagement and pricing summary
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Plan" });
  s.addText("How companies work with us", { placeholder: "title" });
  const th = (t, o = {}) => ({ text: t, options: { bold: true, color: H.white, fill: { color: H.navy }, fontSize: 12, ...o } });
  const td = (t, o = {}) => ({ text: t, options: { color: H.navyText, fontSize: 11.5, ...o } });
  const tdb = (t, o = {}) => td(t, { bold: true, ...o });
  s.addTable([
    [th("Service"), th("Model"), th("Price")],
    [tdb("Health check-ups (Dhruv)"), td("Per employee, on-site camp or branch visit; family at the same rate"), td(PK.map((p) => p.name + " " + inr(p.price)).join(", "))],
    [tdb("Volume"), td(CP.volumeTerms), td("Extra 5% off at 300+, 10% at 1,000+ employees")],
    [tdb("Women's wellness (Face n Figure)"), td("Corporate memberships, on-site sessions, grooming"), td("Corporate rates on request")],
    [tdb("Blood donation (Jeevan Jyoti)"), td("Camp at your premises, 1-2 a year"), td("Free to the company")],
    [tdb("Reporting"), td("Anonymised group report after each camp"), td("Included")],
  ], { x: 0.5, y: 1.15, w: 9, colW: [2.6, 3.6, 2.8], rowH: 0.52, fontFace: "Arial", valign: "middle", border: { type: "solid", pt: 0.5, color: H.rule }, fill: { color: H.white }, margin: [0.04, 0.08, 0.04, 0.08] });
  s.addNotes("Volume discounts and camp minimums are proposals for Dhruv management to confirm.");

  // 14. Next steps
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Plan" });
  s.addText("Getting started takes four steps", { placeholder: "title" });
  [["Meet", "We agree headcount, packages and who pays what"], ["Plan", "Camp dates, site visit and the QR booking link"], ["Run", "Camp day, branch visits and reports within 48 hours"], ["Review", "Group report to HR and follow-up for staff at risk"]].forEach(([h, t], i) => {
    const x = 0.5 + i * 2.3;
    T(s, String(i + 1), { x, y: 1.25, w: 2.1, h: 0.9, fontSize: 54, bold: true, color: i === 0 ? H.blue : "9DB8F3" });
    T(s, h, { x, y: 2.3, w: 2.1, h: 0.4, fontSize: 18, bold: true, color: H.navyText });
    T(s, t, { x, y: 2.75, w: 2.0, h: 1.2, fontSize: 13, color: H.slate }); });
  T(s, "First camp can run within three weeks of sign-off.", { x: 0.5, y: 4.3, w: 9, h: 0.4, fontSize: 14, bold: true, color: H.blue });

  // 15. Contact
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Plan" });
  s.background = { path: ART + "bg_hero.png" };
  wordmark(s, 0.6, 0.4, 18);
  T(s, "Call to set up a meeting", { x: 0.6, y: 1.1, w: 5.6, h: 0.5, fontSize: 24, bold: true, color: H.white });
  BR.branches.forEach((b, i) => { const y = 1.72 + i * 0.6;
    T(s, [{ text: "Dhruv Diagnostics, " + b.name + "   ", options: { bold: true, color: H.white } }, { text: b.phone, options: { bold: true, color: H.green } }], { x: 0.6, y, w: 6, h: 0.28, fontSize: 13 });
    T(s, b.address, { x: 0.6, y: y + 0.28, w: 6, h: 0.25, fontSize: 10, color: H.soft }); });
  T(s, [{ text: "Jeevan Jyoti Blood Bank (24 hours)   ", options: { bold: true, color: H.white } }, { text: CP.jj.phone, options: { bold: true, color: "FCA5A5" } }], { x: 0.6, y: 2.95, w: 6, h: 0.28, fontSize: 13 });
  T(s, CP.jj.address, { x: 0.6, y: 3.23, w: 6, h: 0.25, fontSize: 10, color: H.soft });
  T(s, [{ text: "Face n Figure (women only)   ", options: { bold: true, color: H.white } }, { text: CP.fnf.contact, options: { bold: true, color: "F9A8D4" } }], { x: 0.6, y: 3.52, w: 6, h: 0.28, fontSize: 13 });
  T(s, CP.fnf.address, { x: 0.6, y: 3.8, w: 6, h: 0.25, fontSize: 10, color: H.soft });
  [["qr_web.png", "Dhruv website"], ["qr_map_laxmi.png", "Laxmi Nagar campus map"], ["qr_jj.png", "Jeevan Jyoti Trust website"]].forEach(([img, lab], i) => { const x = 0.6 + i * 1.55;
    panel(s, x, 4.15, 0.95, 0.95, H.white);
    s.addImage({ path: ART + img, x: x + 0.04, y: 4.19, w: 0.87, h: 0.87, altText: lab + " QR code" });
    T(s, lab, { x, y: 5.13, w: 1.5, h: 0.22, fontSize: 8.5, color: H.soft }); });
  s.addNotes(BR.hours + ". " + BR.email + ". Laboratory tests in a NABL-accredited laboratory; check-ups are screening and do not replace a consultation with the employee's own doctor.");

  // 16. Sources
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Plan" });
  s.addText("Sources", { placeholder: "title" });
  const refs = IT ? CP.sourcesIT : CP.sources;
  T(s, refs.map((t, i) => ({ text: t, options: { bullet: { type: "number" }, breakLine: i < refs.length - 1 } })), { x: 0.5, y: 1.1, w: 9, h: 3.9, fontSize: 9.5, color: H.navyText, paraSpaceAfter: 3 });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written", OUT);
})();
