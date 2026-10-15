// Pitch deck: Dhruv Diagnostics veterinary reference laboratory.
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/0a5f1d2e-d33e-49e1-82c6-f2421cc231e9_b4dad5da-2654-4200-83b7-388a908b88c7/pptx/scripts/apply_theme.js");
const B = require("./brand.json");
const BR = B.contact, V = B.vet;
const ART = __dirname + "/art/";
const OUT = "/home/user/BlisteringBlockchain/dhruv-athlete-healthcheck/veterinary/Dhruv_Veterinary_Reference_Lab_Pitch_Deck.pptx";
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

const THEME = { name: "Dhruv Veterinary", headFontFace: "Arial", bodyFontFace: "Arial", colors: {
  dk1: "0F172A", lt1: "FFFFFF", dk2: "1B2A4A", lt2: "EFF5FF", accent1: "2563EB", accent2: "15803D", accent3: "B45309",
  accent4: "475569", accent5: "22C55E", accent6: "D6E0EE", hlink: "2563EB", folHlink: "475569" } };
const H = { navy: "0F1A2E", navyText: "1B2A4A", blue: "2563EB", tint: "EFF5FF", green: "22C55E", greenText: "15803D", slate: "475569", soft: "C9D8F5", rule: "D6E0EE", white: "FFFFFF", amber: "B45309", sand: "FEF3C7" };

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.theme = { headFontFace: "Arial", bodyFontFace: "Arial" };
pres.title = "Veterinary reference laboratory";
pres.author = "Dhruv Diagnostics, Nagpur";
const C = pres.SchemeColor;
pres.defineSlideMaster({ title: "DARK", background: { color: H.navy }, objects: [] });
pres.defineSlideMaster({ title: "CONTENT", background: { color: C.background1 }, objects: [
  { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.65, fontSize: 27, bold: true, color: C.text2, fontFace: "Arial", align: "left", valign: "middle", margin: 0 }, text: "" } },
  { image: { x: 0.5, y: 5.15, w: 0.27, h: 0.335, path: ART + "logo_mark.png" } },
  { text: { text: "Dhruv Diagnostics, Nagpur  ·  Veterinary reference laboratory", options: { x: 0.86, y: 5.22, w: 7.6, h: 0.22, fontSize: 9, color: C.accent4, margin: 0 } } },
], slideNumber: { x: 9.0, y: 5.22, w: 0.5, h: 0.22, fontSize: 9, color: C.accent4, align: "right" } });

const T = (s, text, o) => s.addText(text, { margin: 0, isTextBox: true, valign: "top", ...o });
const panel = (s, x, y, w, h, color) => s.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { color }, line: { color, width: 0 } });
const bullets = (s, items, o) => T(s, items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })), { fontSize: 13, color: C.text1, paraSpaceAfter: 5, ...o });
const src = (s, t, o = {}) => T(s, t, { x: 0.5, y: 4.88, w: 9, h: 0.28, fontSize: 9, color: H.slate, ...o });
const wordmark = (s, x, y, big = 20) => { const mh = big * 0.037; s.addImage({ path: ART + "logo_mark.png", x, y: y - mh * 0.12, w: mh * 0.806, h: mh, altText: "Dhruv Diagnostics logo" }); x += mh * 0.806 + 0.13;
  return T(s, [{ text: "DHRUV", options: { bold: true, fontSize: big, color: H.white, breakLine: true, charSpacing: 1 } }, { text: "DIAGNOSTICS  ·  VETERINARY", options: { fontSize: big * 0.5, color: "93B4F5", charSpacing: 4 } }], { x, y, w: 4, h: 0.8 }); };

(async () => {
  // 1. Cover
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "DARK", sectionTitle: "Opening" });
  s.background = { path: ART + "vet_hero.png" };
  wordmark(s, 0.6, 0.5);
  T(s, "A reference lab for vets in Vidarbha", { x: 0.6, y: 1.5, w: 4.5, h: 1.6, fontSize: 34, bold: true, color: H.white });
  T(s, "CBC, biochemistry, hormones and PCR for pets and livestock, from Dhruv Diagnostics, Nagpur", { x: 0.6, y: 3.15, w: 4.2, h: 0.9, fontSize: 15, color: H.soft });
  T(s, [{ text: "30+ years in Nagpur", options: { bold: true, color: H.green } }, { text: "   |   Same analysers and quality system as our human lab", options: { color: H.soft } }], { x: 0.6, y: 4.75, w: 6, h: 0.3, fontSize: 11.5 });
  s.addNotes("Audience: small-animal clinics, veterinary hospitals, government polyclinics, dairy cooperatives and poultry farms in Nagpur and Vidarbha. Dhruv is launching a veterinary vertical on its existing analysers after species validation.");

  // 2. The gap
  pres.addSection({ title: "Why" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why" });
  s.addText("Vets in Central India send samples far away", { placeholder: "title" });
  const stats = [["$248M", "India's veterinary diagnostics market in 2025, projected to reach $443M by 2034", "IMARC, 2025", H.blue],
    ["33M", "livestock in Maharashtra, including 13.9M cattle and 5.6M buffalo (2019 census)", "20th Livestock Census", H.greenText],
    ["31M", "pet dogs in India at the end of 2023, and the number keeps rising", "Nexdigm", H.amber],
    ["4 lakh L", "of milk a day from about 35,000 Vidarbha farmers through one producer organisation", "Marathvarhad MPO, 2025", H.blue]];
  stats.forEach(([n, l, so, c], i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.15 + Math.floor(i / 2) * 1.75;
    panel(s, x, y, 4.4, 1.6, i % 3 === 0 ? H.tint : "F8FAFC");
    T(s, n, { x: x + 0.22, y: y + 0.14, w: 4, h: 0.6, fontSize: 32, bold: true, color: c });
    T(s, l, { x: x + 0.22, y: y + 0.76, w: 4, h: 0.55, fontSize: 12, color: H.navyText });
    T(s, so, { x: x + 0.22, y: y + 1.3, w: 4, h: 0.22, fontSize: 9, color: H.slate }); });
  src(s, "Full-menu private veterinary labs (Vetic, VetLab) are based in Delhi, Gurugram and Bengaluru; IDEXX India is in Bengaluru. Nagpur has a few small pet-clinic labs.");
  s.addNotes("Market figures are research-firm estimates; livestock figures from the 2019 census as reported in secondary sources (21st census results not yet published).");

  // 3. Clinical need
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Why" });
  s.addText("Tick fever and parvovirus need PCR", { placeholder: "title" });
  s.addChart(pres.charts.BAR, [{ name: "% of dogs", labels: ["Hepatozoon canis", "Ehrlichia canis", "Anaplasma platys"], values: [30, 20.6, 6.5] }],
    { x: 0.5, y: 1.1, w: 4.6, h: 3.5, barDir: "bar", chartColors: [H.blue], showTitle: true, title: "Tick-borne infection in 525 dogs, four Indian cities, PCR (%)", titleFontSize: 11, titleColor: H.navyText, titleFontFace: "+mn-lt",
      showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0", dataLabelColor: H.navyText, dataLabelFontSize: 11, dataLabelFontFace: "+mn-lt", catAxisLabelColor: H.slate, catAxisLabelFontSize: 11, catAxisLabelFontFace: "+mn-lt",
      valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, valAxisMinVal: 0, valAxisMaxVal: 40, showLegend: false });
  T(s, "What the studies show", { x: 5.5, y: 1.15, w: 4, h: 0.35, fontSize: 16, bold: true, color: H.navyText });
  bullets(s, ["In the four-city survey PCR found infection in 49.7% of dogs; blood smears found 2.3%", "In 719 Punjab dogs, PCR found more infections than blood-smear microscopy", "In Gujarat, quantitative PCR found parvovirus in 85 of 100 dogs tested", "About 30% of 578 healthy Indian cattle and buffalo carried a blood parasite on PCR"], { x: 5.5, y: 1.6, w: 4, h: 3.0, fontSize: 12.5 });
  src(s, "Sources: Indian multi-city survey of 525 dogs; Punjab multiplex PCR study (n=719); Veterinary World 2026 (Gujarat); Indian bovine haemoparasite PCR survey (n=578).");

  // 4. Companion animal menu
  pres.addSection({ title: "Offer" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Offer" });
  s.addText("Tests for dogs and cats", { placeholder: "title" });
  s.addImage({ path: ART + "vet_portrait.png", x: 6.1, y: 0, w: 3.9, h: 4.68, sizing: { type: "cover", w: 3.9, h: 4.68 }, altText: "Dog and cat illustration" });
  const menu = [["Haematology", "CBC with a blood-film review by a veterinary pathologist; blood parasites on the smear"],
    ["Biochemistry", "Liver, kidney, electrolytes, pancreatic (DGGR) lipase, fructosamine, bile acids, urine protein:creatinine"],
    ["Hormones", "Total T4, cortisol, ACTH stimulation and dexamethasone suppression, progesterone for breeding"],
    ["PCR", "Tick fever (Babesia, Ehrlichia, Anaplasma, Hepatozoon), parvovirus, distemper, leptospira, feline panleukopenia"],
    ["Also", "Urinalysis, culture and sensitivity, cytology and histopathology"]];
  menu.forEach(([h, t], i) => { const y = 1.12 + i * 0.75;
    T(s, h, { x: 0.5, y, w: 1.55, h: 0.6, fontSize: 13, bold: true, color: H.blue });
    T(s, t, { x: 2.05, y, w: 3.85, h: 0.7, fontSize: 11.5, color: H.navyText }); });
  s.addNotes("Every test runs only after species validation is complete (see the calibration and validation report). Canine TSH, free T4 by dialysis and SDMA are sent to partner laboratories.");

  // 5. Livestock menu
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Offer" });
  s.addText("Tests for dairy and livestock", { placeholder: "title" });
  s.addImage({ path: ART + "vet_portrait2.png", x: 6.1, y: 0, w: 3.9, h: 4.68, sizing: { type: "cover", w: 3.9, h: 4.68 }, altText: "Cow illustration" });
  const lmenu = [["Metabolic profile", "Calcium, phosphorus, magnesium, glucose, beta-hydroxybutyrate, protein and liver enzymes for transition cows"],
    ["Blood parasites", "PCR for Theileria annulata, Anaplasma marginale, Babesia bigemina and Trypanosoma evansi"],
    ["Mastitis", "Milk culture and sensitivity; multiplex qPCR for mastitis pathogens"],
    ["Herd screening", "Haematology and chemistry for dairy cooperatives and organised farms"]];
  lmenu.forEach(([h, t], i) => { const y = 1.12 + i * 0.86;
    T(s, h, { x: 0.5, y, w: 1.75, h: 0.6, fontSize: 13, bold: true, color: H.greenText });
    T(s, t, { x: 2.25, y, w: 3.65, h: 0.8, fontSize: 11.5, color: H.navyText }); });
  panel(s, 0.5, 4.5, 5.4, 0.55, H.sand);
  T(s, "Scheduled diseases such as avian influenza and lumpy skin disease are referred to government laboratories.", { x: 0.65, y: 4.56, w: 5.15, h: 0.45, fontSize: 10.5, color: H.navyText });
  s.addNotes("Avian influenza confirmation is reserved to ICAR-NIHSAD Bhopal; scheduled diseases under the PCICDA Act 2009 carry reporting duties. Brucella is not cultured at Dhruv.");

  // 6. Quality
  pres.addSection({ title: "Trust" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Trust" });
  s.addText("Human-lab quality, validated for animals", { placeholder: "title" });
  const q = [["Validated per species", "Every test is checked in dog and cat blood before launch: precision, accuracy against a reference lab, linearity and interference, following ASVCP guidelines."],
    ["Species reference ranges", "Results come with reference ranges for the species, set on our own analysers, not borrowed from human medicine."],
    ["Veterinary pathologist", "A registered veterinary pathologist reviews blood films and signs every report, and takes calls from vets."],
    ["Proven systems", "The same analysers, controls and quality system Dhruv has run for human patients for more than 30 years."]];
  q.forEach(([h, t], i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.15 + Math.floor(i / 2) * 1.85;
    panel(s, x, y, 4.4, 1.7, i === 3 ? H.navy : H.tint);
    T(s, h, { x: x + 0.22, y: y + 0.18, w: 4, h: 0.35, fontSize: 15, bold: true, color: i === 3 ? H.white : H.navyText });
    T(s, t, { x: x + 0.22, y: y + 0.6, w: 4, h: 1.0, fontSize: 12, color: i === 3 ? H.soft : H.slate }); });
  s.addNotes("Veterinary tests are outside Dhruv's NABL scope. Do not describe them as NABL-accredited and do not show the NABL symbol on veterinary material or reports.");

  // 7. How it works
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Trust" });
  s.addText("From your clinic to a report in hours", { placeholder: "title" });
  [["Collect", "We supply EDTA and plain tubes, slides and cool boxes"], ["Pick up", "Daily pickup in Nagpur; chilled courier from district towns"], ["Test", "CBC and chemistry the same day; hormones and PCR in 24-48 hours"], ["Report", "Online report with species ranges and the pathologist's comments"]].forEach(([h, t], i) => {
    const x = 0.5 + i * 2.3;
    T(s, String(i + 1), { x, y: 1.25, w: 2.1, h: 0.9, fontSize: 54, bold: true, color: i === 0 ? H.blue : "9DB8F3" });
    T(s, h, { x, y: 2.3, w: 2.1, h: 0.4, fontSize: 18, bold: true, color: H.navyText });
    T(s, t, { x, y: 2.75, w: 2.0, h: 1.2, fontSize: 13, color: H.slate }); });
  T(s, "Please send a fresh blood smear with every EDTA tube: platelet counts start to fall within 12 hours.", { x: 0.5, y: 4.3, w: 9, h: 0.45, fontSize: 13, bold: true, color: H.blue });

  // 8. Prices
  pres.addSection({ title: "Terms" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Terms" });
  s.addText("Launch price list", { placeholder: "title" });
  const th = (t, o = {}) => ({ text: t, options: { bold: true, color: H.white, fill: { color: H.navy }, fontSize: 11, ...o } });
  const td = (t, o = {}) => ({ text: t, options: { color: H.navyText, fontSize: 10.5, ...o } });
  const half = Math.ceil(V.prices.length / 2);
  [V.prices.slice(0, half), V.prices.slice(half)].forEach((rows, k) => {
    s.addTable([[th("Area"), th("Test"), th("Price", { align: "right" })], ...rows.map(([a, t, p]) => [td(a, { bold: true }), td(t), td(inr(p), { align: "right", bold: true, color: H.blue })])],
      { x: 0.5 + k * 4.6, y: 1.1, w: 4.4, colW: [1.05, 2.55, 0.8], rowH: 0.36, fontFace: "Arial", valign: "middle", border: { type: "solid", pt: 0.5, color: H.rule }, fill: { color: H.white }, margin: [0.03, 0.06, 0.03, 0.06] });
  });
  src(s, "Proposed launch prices. Clinic accounts get monthly billing; volume rates for government polyclinics and dairy cooperatives.", { y: 4.85 });
  s.addNotes(V.benchmarks + " Prices to be confirmed by Dhruv management after reagent costing.");

  // 9. Partners
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Terms" });
  s.addText("Ways to work with us", { placeholder: "title" });
  const pt = [["Pet clinics and hospitals", "Clinic account, free sample kits, daily pickup, monthly billing, phone line to the pathologist"],
    ["Government veterinary services", "Polyclinic and district tie-ups for tests not available locally, with volume pricing"],
    ["Dairy cooperatives and farms", "Herd metabolic and blood-parasite screening, mastitis testing, field sample collection"],
    ["Veterinary college", "Validation samples, reference ranges for local breeds, CME talks and student projects"]];
  pt.forEach(([h, t], i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.15 + Math.floor(i / 2) * 1.85;
    panel(s, x, y, 4.4, 1.7, i % 3 === 0 ? H.tint : "F8FAFC");
    T(s, h, { x: x + 0.22, y: y + 0.18, w: 4, h: 0.35, fontSize: 15, bold: true, color: H.navyText });
    T(s, t, { x: x + 0.22, y: y + 0.62, w: 4, h: 0.95, fontSize: 12, color: H.slate }); });
  s.addNotes("Nagpur Veterinary College (founded 1958, MAFSU) runs a teaching clinical complex and is a natural partner for validation samples and a source of veterinary pathologists.");

  // 10. Roadmap
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Terms" });
  s.addText("Launch plan", { placeholder: "title" });
  const steps = [["Weeks 0-2", "Veterinary pathologist on board; reagents, controls and PCR kits ordered"], ["Weeks 2-8", "CBC and chemistry validated for dogs and cats; soft launch with partner clinics"], ["Weeks 4-10", "T4, cortisol and progesterone validated on our immunoassay analysers"], ["Week 12", "Full launch with PCR panels and the livestock menu"]];
  s.addShape(pres.ShapeType.line, { x: 0.7, y: 1.72, w: 8.6, h: 0, line: { color: H.rule, width: 2 } });
  steps.forEach(([d, t], i) => { const x = 0.5 + i * 2.3;
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.1, y: 1.58, w: 0.28, h: 0.28, fill: { color: i === 3 ? H.green : H.blue }, line: { color: H.white, width: 2 } });
    T(s, d, { x, y: 2.0, w: 2.1, h: 0.35, fontSize: 15, bold: true, color: i === 3 ? H.greenText : H.blue });
    T(s, t, { x, y: 2.45, w: 2.05, h: 1.3, fontSize: 12.5, color: H.navyText }); });
  T(s, "Early partner clinics get introductory pricing for the first three months.", { x: 0.5, y: 4.3, w: 9, h: 0.4, fontSize: 14, bold: true, color: H.blue });

  // 11. Contact
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Terms" });
  s.background = { path: ART + "vet_hero.png" };
  wordmark(s, 0.6, 0.4, 18);
  T(s, "Open a clinic account", { x: 0.6, y: 1.15, w: 5.6, h: 0.5, fontSize: 24, bold: true, color: H.white });
  BR.branches.forEach((b, i) => { const y = 1.8 + i * 0.72;
    T(s, [{ text: b.name + "   ", options: { bold: true, color: H.white } }, { text: b.phone, options: { bold: true, color: H.green } }], { x: 0.6, y, w: 6, h: 0.3, fontSize: 14 });
    T(s, b.address, { x: 0.6, y: y + 0.3, w: 6, h: 0.28, fontSize: 10, color: H.soft }); });
  T(s, BR.hours + "   |   " + BR.email, { x: 0.6, y: 3.3, w: 6, h: 0.3, fontSize: 10.5, color: H.soft });
  [["qr_web.png", "Website"], ["qr_map_laxmi.png", "Laxmi Nagar map"], ["qr_map_ramdas.png", "Ramdaspeth map"]].forEach(([img, lab], i) => { const x = 0.6 + i * 1.55;
    panel(s, x, 3.8, 1.05, 1.05, H.white);
    s.addImage({ path: ART + img, x: x + 0.05, y: 3.85, w: 0.95, h: 0.95, altText: lab + " QR code" });
    T(s, lab, { x, y: 4.9, w: 1.45, h: 0.22, fontSize: 9, color: H.soft }); });

  // 12. Sources
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Terms" });
  s.addText("Sources", { placeholder: "title" });
  const refs = ["IMARC Group. India veterinary diagnostics market, 2025-2034.", "Department of Animal Husbandry and Dairying. 20th Livestock Census, 2019 (Maharashtra figures as reported in secondary sources).",
    "Nexdigm. India pet care market, 2023.", "Marathvarhad Milk Producer Organisation coverage, 2025; NDDB Vidarbha and Marathwada Dairy Development Project.",
    "Survey of tick-borne pathogens in 525 dogs from four Indian cities (PCR).", "Multiplex PCR versus microscopy for canine haemoparasites in Punjab (n=719).",
    "Duplex qPCR for canine parvovirus and feline panleukopenia virus, Gujarat. Veterinary World, 2026.", "PCR survey of haemoparasites in 578 apparently healthy cattle and buffaloes in India.",
    "ASVCP. Principles of Quality Assurance and Standards for Veterinary Clinical Pathology, v3.0, 2019; reference interval guidelines, 2012.",
    "Prevention and Control of Infectious and Contagious Diseases in Animals Act, 2009; DAHD avian influenza action plan, 2021.",
    "Veterinary price points: Pranidhi, Truemedix, Vetic, Easzopets websites; IVRI diagnostics rate card (October 2026)."];
  T(s, refs.map((t, i) => ({ text: t, options: { bullet: { type: "number" }, breakLine: i < refs.length - 1 } })), { x: 0.5, y: 1.1, w: 9, h: 3.9, fontSize: 10, color: H.navyText, paraSpaceAfter: 3 });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written");
})();
