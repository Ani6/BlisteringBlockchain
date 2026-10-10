const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/0a5f1d2e-d33e-49e1-82c6-f2421cc231e9_b4dad5da-2654-4200-83b7-388a908b88c7/pptx/scripts/apply_theme.js");

const OUT = "/home/user/BlisteringBlockchain/dhruv-athlete-healthcheck/Dhruv_Athlete_Physique_HealthCheck_Deck.pptx";

const THEME = {
  name: "Dhruv Clinical",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "0F172A", lt1: "FFFFFF", dk2: "1B2A4A", lt2: "EFF5FF",
    accent1: "2563EB", accent2: "B45309", accent3: "22C55E",
    accent4: "475569", accent5: "DBEAFE", accent6: "D6E0EE",
    hlink: "2563EB", folHlink: "475569",
  },
};
const H = { ink: "0F172A", deep: "0F1A2E", pale: "EFF5FF", teal: "2563EB", rust: "B45309", slate: "475569", mist: "A9BFE8", rule: "D6E0EE", white: "FFFFFF", green: "22C55E" };
const ART = __dirname + "/art/";
const BR = require("./brand.json").contact;

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Athlete and Physique Health Check-Up";
pres.author = "Dhruv Diagnostics, Nagpur";
pres.subject = "Health check-up plan for athletes and bodybuilders";
const C = pres.SchemeColor;

const FOOT = "Dhruv Diagnostics, Nagpur  \u00B7  Athlete and Physique Health Check-Up";

pres.defineSlideMaster({ title: "DARK", background: { color: H.deep }, objects: [] });
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.65, fontSize: 28, bold: true, color: C.text2, fontFace: "Arial", align: "left", valign: "middle", margin: 0 }, text: "" } },
    { text: { text: FOOT, options: { x: 0.5, y: 5.22, w: 6.5, h: 0.22, fontSize: 9, color: C.accent4, margin: 0 } } },
  ],
  slideNumber: { x: 9.0, y: 5.22, w: 0.5, h: 0.22, fontSize: 9, color: C.accent4, align: "right" },
});

// ---------- helpers ----------
const TB = { type: "solid", pt: 0.5, color: H.rule };
const th = (t, o = {}) => ({ text: t, options: { bold: true, color: H.white, fill: { color: H.deep }, fontSize: 12, ...o } });
const tdB = (t, o = {}) => ({ text: t, options: { bold: true, color: H.ink, fontSize: 11, ...o } });
const td = (t, o = {}) => ({ text: t, options: { color: H.ink, fontSize: 11, ...o } });
const table = (s, rows, opt) => s.addTable(rows, { x: 0.5, fontFace: "Arial", valign: "middle", border: TB, fill: { color: H.white }, margin: [0.03, 0.08, 0.03, 0.08], ...opt });
const note = (s, t, y, o = {}) => s.addText(t, { x: 0.5, y, w: 9, h: 0.3, fontSize: 11, color: C.accent4, margin: 0, isTextBox: true, ...o });
const bullets = (s, items, o) => s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })), { fontSize: 13, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 4, isTextBox: true, ...o });
const head = (s, t, x, y, w, o = {}) => s.addText(t, { x, y, w, h: 0.32, fontFace: "Arial", fontSize: 15, bold: true, color: C.text2, margin: 0, isTextBox: true, ...o });
const chartBase = () => ({
  barDir: "col", showTitle: true, titleFontSize: 11, titleColor: H.ink, titleFontFace: "+mn-lt",
  showValue: true, dataLabelPosition: "outEnd", dataLabelColor: H.ink, dataLabelFontSize: 11, dataLabelFontFace: "+mn-lt",
  catAxisLabelColor: H.slate, catAxisLabelFontSize: 11, catAxisLabelFontFace: "+mn-lt",
  valAxisLabelColor: H.slate, valAxisLabelFontSize: 10, valAxisLabelFontFace: "+mn-lt",
  valGridLine: { color: H.rule, size: 0.5 }, catGridLine: { style: "none" }, valAxisMinVal: 0,
});

(async () => {
  // ============ 1. Title ============
  pres.addSection({ title: "Introduction" });
  let s = pres.addSlide({ masterName: "DARK", sectionTitle: "Introduction" });
  s.background = { path: ART + "bg_run.png" };
  s.addText([{ text: "DHRUV", options: { bold: true, fontSize: 22, color: H.white, breakLine: true, charSpacing: 1 } }, { text: "DIAGNOSTICS", options: { fontSize: 11, color: "93B4F5", charSpacing: 4 } }], { x: 0.6, y: 0.5, w: 3, h: 0.7, margin: 0, valign: "top", isTextBox: true });
  s.addText("Athlete and Physique Health Check-Up", { x: 0.6, y: 1.55, w: 5.2, h: 1.6, fontSize: 36, bold: true, color: H.white, margin: 0, valign: "top", isTextBox: true });
  s.addText("Cardiac, muscle, hormone, longevity and tendon assessment for athletes and bodybuilders.", { x: 0.6, y: 3.2, w: 4.6, h: 0.8, fontSize: 15, color: "C9D8F5", margin: 0, valign: "top", isTextBox: true });
  s.addText([{ text: "NABL accredited since 2011", options: { bold: true, color: H.green } }, { text: "   |   Technical overview for clinicians and coaches", options: { color: "C9D8F5" } }], { x: 0.6, y: 4.75, w: 6, h: 0.3, fontSize: 11, margin: 0, isTextBox: true });
  s.addNotes("This deck sets out the clinical content of the Dhruv Diagnostics health check-up for athletes and bodybuilders: what is tested, why, how it is interpreted in people who train hard, and how the visit runs.");

  // ============ 2. CK reference ============
  pres.addSection({ title: "Rationale and plans" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Rationale and plans" });
  s.addText("Athletes run higher CK than non-athletes", { placeholder: "title" });
  s.addText([
    { text: "Mougios (2007) measured serum creatine kinase in 483 male and 245 female athletes. The upper reference limit in athletes was about twice that of non-athletes, and footballers ran higher still.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "A CK of 900 U/L, flagged as high on a standard report, can be ordinary for a male athlete in season.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "The same problem affects haemoglobin, creatinine, AST, ALT and ECG voltage. Reports in this plan are read against the athlete's sport and training phase.", options: {} },
  ], { x: 0.5, y: 1.2, w: 4.2, h: 3.7, fontSize: 14, color: H.ink, margin: 0, valign: "top", isTextBox: true });
  s.addChart(pres.charts.BAR, [
    { name: "Athletes", labels: ["Men", "Women"], values: [1083, 513] },
    { name: "Non-athletes", labels: ["Men", "Women"], values: [491, 252] },
  ], { ...chartBase(), x: 5.0, y: 1.15, w: 4.5, h: 3.7, chartColors: [H.teal, H.mist], title: "Upper reference limit, serum CK (U/L)", showLegend: true, legendPos: "b", legendFontSize: 11, legendFontFace: "+mn-lt", legendColor: H.slate, valAxisMaxVal: 1200, valAxisMajorUnit: 200 });
  note(s, "Source: Mougios V. Br J Sports Med 2007;41:674-678. 97.5th percentile, 37 °C.", 4.88, { x: 5.0, w: 4.5, fontSize: 10 });
  s.addNotes("Mougios found athlete upper limits roughly double those of moderately active non-athletes. Male footballers reached 1492 U/L against 523 U/L for swimmers, so sport matters as well as sex.");

  // ============ 3. Plans ============
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Rationale and plans" });
  s.addText("What each plan includes", { placeholder: "title" });
  const Y = { text: "●", options: { color: H.teal, align: "center", fontSize: 11 } };
  const N = { text: "", options: {} };
  const tx = (t) => ({ text: t, options: { align: "center", color: H.teal, bold: true, fontSize: 10.5 } });
  table(s, [
    [th("Investigation"), th("Base", { align: "center" }), th("Performance", { align: "center" }), th("Elite", { align: "center" })],
    [tdB("Resting ECG, blood pressure, anthropometry"), Y, Y, Y],
    [tdB("Haemogram with reticulocytes, ferritin, vitamin D, B12"), Y, Y, Y],
    [tdB("Glucose, HbA1c, lipid profile, liver, kidney with cystatin C, TSH"), Y, Y, Y],
    [tdB("Muscle panel: CK, CK-MB, LDH, myoglobin"), tx("CK only"), Y, Y],
    [tdB("Apo B, Lp(a), hs-CRP, homocysteine, fasting insulin"), N, Y, Y],
    [tdB("NT-proBNP"), N, Y, Y],
    [tdB("Hormone panel: testosterone, LH, FSH, SHBG, oestradiol, prolactin"), N, Y, Y],
    [tdB("hs-troponin, cortisol, IGF-1, urine albumin:creatinine"), N, N, Y],
    [tdB("Treadmill stress test (TMT)"), N, N, Y],
    [tdB("Tendon and ligament ultrasound by an MSK radiologist"), N, tx("1 region"), tx("Up to 3 regions")],
    [tdB("Urine drugs-of-abuse screen"), tx("Add-on"), tx("Add-on"), tx("Add-on")],
    [tdB("Physician review of the full report"), Y, Y, Y],
  ], { y: 1.15, w: 9, colW: [5.1, 1.1, 1.3, 1.5], rowH: 0.29 });
  s.addNotes("Proposed structure. Final inclusions, ultrasound region counts and prices to be confirmed by the Dhruv clinical team.");

  // ============ 4. TMT ============
  pres.addSection({ title: "Heart and lipids" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Heart and lipids" });
  s.addText("Treadmill stress test, Bruce protocol", { placeholder: "title" });
  const bruce = [[1, "2.7", "10", "5"], [2, "4.0", "12", "7"], [3, "5.5", "14", "10"], [4, "6.8", "16", "13"], [5, "8.0", "18", "15"], [6, "8.8", "20", "17"], [7, "9.7", "22", "19"]];
  table(s, [
    [th("Stage", { align: "center" }), th("Speed (km/h)", { align: "center" }), th("Grade (%)", { align: "center" }), th("METs at end, approx.", { align: "center" })],
    ...bruce.map((r) => r.map((v, i) => (i === 0 ? tdB(String(v), { align: "center" }) : td(v, { align: "center" })))),
  ], { y: 1.15, w: 4.5, colW: [0.8, 1.15, 1.0, 1.55], rowH: 0.36 });
  note(s, "Each stage lasts 3 minutes. METs are estimates and vary by equation.", 4.35, { w: 4.5, h: 0.45, fontSize: 10 });
  head(s, "Reported", 5.3, 1.15, 4.2);
  bullets(s, [
    "Exercise time, stage reached and estimated METs",
    "Peak heart rate as % of age-predicted maximum",
    "Blood-pressure response at each stage",
    "ST-segment change and arrhythmia",
    "Heart-rate recovery at 1 minute (12 bpm or less is abnormal)",
  ], { x: 5.3, y: 1.55, w: 4.2, h: 2.3 });
  s.addText("Advised for athletes over 35, with a family history of early heart disease, or with symptoms on exertion. An equivocal test is referred for echocardiography or cardiology review.", { x: 5.3, y: 3.95, w: 4.2, h: 0.9, fontSize: 11, color: C.accent4, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("TMT METs also feed the longevity section: cardiorespiratory fitness measured this way was the strongest modifiable predictor of survival in the Cleveland Clinic cohort (Mandsager 2018). Heart-rate recovery cut-off from Cole et al., NEJM 1999.");

  // ============ 5. NT-proBNP ============
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Heart and lipids" });
  s.addText("NT-proBNP as a personal cardiac baseline", { placeholder: "title" });
  s.addText([
    { text: "What it measures", options: { bold: true, color: H.deep, breakLine: true, fontSize: 15, fontFace: "Arial" } },
    { text: "A fragment released when heart muscle is stretched by pressure or volume load.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Use in athletes", options: { bold: true, color: H.deep, breakLine: true, fontSize: 15, fontFace: "Arial" } },
    { text: "Marathons and long rides raise it for a day or more. We sample at rest, at least 24 hours after hard training, record the value as a baseline and compare it at each repeat visit.", options: {} },
  ], { x: 0.5, y: 1.2, w: 4.2, h: 3.6, fontSize: 14, color: H.ink, margin: 0, valign: "top", isTextBox: true });
  s.addChart(pres.charts.BAR, [{ name: "pg/mL", labels: ["Rule-out\n(all ages)", "Under 50 y", "50-75 y", "Over 75 y"], values: [300, 450, 900, 1800] }],
    { ...chartBase(), x: 5.0, y: 1.15, w: 4.5, h: 3.7, chartColors: [H.teal], title: "Acute heart-failure cut-offs (pg/mL)", showLegend: false, valAxisMaxVal: 2000, valAxisMajorUnit: 500 });
  note(s, "Cut-offs from ESC Heart Failure Association guidance, derived in breathless patients. For reference only.", 4.88, { x: 5.0, w: 4.5, fontSize: 10 });
  s.addNotes("These thresholds were built to diagnose acute heart failure. In a fit athlete the value is a baseline; a sustained rise on repeat testing is what prompts echo or cardiology review.");

  // ============ 6. Apo B ============
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Heart and lipids" });
  s.addText("Apo B counts atherogenic particles", { placeholder: "title" });
  s.addText([
    { text: "Each LDL, VLDL, IDL and Lp(a) particle carries one Apo B molecule, so Apo B is a direct particle count.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "LDL cholesterol can look normal while Apo B is high. We see this with high triglycerides, insulin resistance, very low-carbohydrate diets and anabolic steroid use.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Lp(a) is largely inherited. It is measured once in adult life and is included with the first Apo B test.", options: {} },
  ], { x: 0.5, y: 1.2, w: 4.2, h: 3.6, fontSize: 14, color: H.ink, margin: 0, valign: "top", isTextBox: true });
  s.addChart(pres.charts.BAR, [{ name: "mg/dL", labels: ["Moderate risk", "High risk", "Very high risk"], values: [100, 80, 65] }],
    { ...chartBase(), x: 5.0, y: 1.15, w: 4.5, h: 3.7, chartColors: [H.teal], title: "Apo B goal by risk category, below (mg/dL)", showLegend: false, valAxisMaxVal: 120, valAxisMajorUnit: 20 });
  note(s, "Goals from ESC/EAS 2019 dyslipidaemia guidelines. The physician assigns the risk category.", 4.88, { x: 5.0, w: 4.5, fontSize: 10 });
  s.addNotes("Lp(a) once-in-a-lifetime measurement follows the EAS 2022 consensus statement.");

  // ============ 7. Muscle markers ============
  pres.addSection({ title: "Muscle, hormones and longevity" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Muscle, hormones and longevity" });
  s.addText("Muscle damage and recovery markers", { placeholder: "title" });
  table(s, [
    [th("Marker"), th("What it reflects"), th("How we read it in athletes")],
    [tdB("CK (CPK), total"), td("Leak from damaged muscle fibres; peaks 24 to 72 h after eccentric or unfamiliar work"), td("Judged against athlete ranges. Above 5 times the upper limit with weakness or dark urine needs same-day review")],
    [tdB("CK-MB"), td("Cardiac isoform, also present in regenerating skeletal muscle"), td("A raised CK-MB with very high total CK is usually skeletal; troponin settles the question")],
    [tdB("hs-troponin I or T"), td("Specific to heart muscle"), td("Can rise briefly after endurance events. A rise at rest goes to cardiology")],
    [tdB("Myoglobin, serum and urine"), td("Early marker, rises within hours of muscle injury"), td("Myoglobin in urine with high CK signals risk to the kidneys")],
    [tdB("LDH"), td("Muscle, red cells, liver"), td("Supports CK. Foot-strike haemolysis in runners also raises it")],
    [tdB("AST, ALT"), td("Found in muscle as well as liver"), td("CK is checked before a raised AST or ALT is called liver injury")],
    [tdB("Creatinine with cystatin C"), td("Creatinine tracks muscle mass and creatine intake"), td("Cystatin C gives a truer kidney function in muscular people")],
    [tdB("Potassium, phosphate, uric acid"), td("Released when muscle breaks down"), td("Checked when CK is markedly raised")],
  ], { y: 1.15, w: 9, colW: [2.1, 3.15, 3.75], rowH: 0.42 });
  s.addNotes("Draw muscle markers at least 48 to 72 hours after the last hard or eccentric session, otherwise the result reflects the session and not the athlete. Rhabdomyolysis is conventionally defined as CK at least 5 times the upper limit of normal.");

  // ============ 8. Hormones and blood ============
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Muscle, hormones and longevity" });
  s.addText("Hormones and blood in strength athletes", { placeholder: "title" });
  table(s, [
    [th("Marker"), th("Why it is measured")],
    [tdB("Haemoglobin, haematocrit, reticulocytes"), td("Androgens can push haematocrit up and thicken the blood. Endurance athletes may run low iron stores")],
    [tdB("Testosterone (total, free), LH, FSH"), td("Shows suppression of the body's own production and its recovery after a cycle stops")],
    [tdB("SHBG, oestradiol, prolactin"), td("Needed to interpret testosterone; oestradiol and prolactin explain many side effects")],
    [tdB("Cortisol (8 am), testosterone:cortisol"), td("Read with training load as a guide to under-recovery")],
    [tdB("IGF-1"), td("Growth-hormone axis; also raised by high protein intake")],
    [tdB("TSH, free T4"), td("Thyroid function affects weight, energy and heart rate")],
    [tdB("GGT, bilirubin, ALT"), td("Oral steroids and some supplements stress the liver")],
    [tdB("Oestradiol, LH, FSH, ferritin in women"), td("Low energy availability (RED-S) disturbs menstrual hormones and bone health")],
  ], { y: 1.15, w: 9, colW: [3.3, 5.7], rowH: 0.38 });
  note(s, "Results are confidential. Telling us about supplements or enhancers helps the physician interpret them correctly.", 4.75, { fontSize: 12, color: C.accent1 });
  s.addNotes("Draw testosterone and cortisol between 8 and 10 am. This panel is for health monitoring; it is not a doping test.");

  // ============ 9. Longevity ============
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Muscle, hormones and longevity" });
  s.addText("Markers linked to long-term health", { placeholder: "title" });
  table(s, [
    [th("Marker"), th("What it adds")],
    [tdB("Fitness in METs, from the TMT"), td("Lower fitness carried about 5 times the mortality of elite fitness in 122,007 treadmill patients")],
    [tdB("Apo B and Lp(a)"), td("Lifetime artery risk; Lp(a) is genetic and measured once")],
    [tdB("hs-CRP"), td("Low-grade inflammation. Repeated if raised by recent hard training or infection")],
    [tdB("HbA1c, fasting glucose, fasting insulin"), td("HOMA-IR shows insulin resistance years before diabetes")],
    [tdB("Homocysteine"), td("Linked to vascular risk; often reflects low B12 or folate")],
    [tdB("Uric acid"), td("Associated with high blood pressure, gout and metabolic syndrome")],
    [tdB("Cystatin C eGFR, urine albumin:creatinine"), td("Early kidney and small-vessel damage")],
    [tdB("Vitamin D, B12, ferritin"), td("Deficiencies are common in India and affect bone, nerves and energy")],
  ], { y: 1.15, w: 9, colW: [3.3, 5.7], rowH: 0.4 });
  note(s, "Fitness data: Mandsager K et al. JAMA Netw Open 2018;1(6):e183605. Hazard ratio 5.04, low vs elite fitness.", 4.85, { fontSize: 10 });
  s.addNotes("Mandsager et al. found no upper limit to the survival benefit of fitness. The study is observational, so the association does not prove causation.");

  // ============ 10. MSK ultrasound ============
  pres.addSection({ title: "Tendons and ligaments" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Tendons and ligaments" });
  s.addText("Ultrasound of tendons and ligaments", { placeholder: "title" });
  table(s, [
    [th("Region"), th("Structures examined")],
    [tdB("Shoulder"), td("Rotator cuff, long head of biceps, subacromial bursa")],
    [tdB("Elbow"), td("Common extensor and flexor origins, distal biceps")],
    [tdB("Hip and groin"), td("Gluteal tendons, adductor origin, iliopsoas")],
    [tdB("Knee"), td("Patellar and quadriceps tendons, MCL, LCL")],
    [tdB("Ankle and foot"), td("Achilles, ATFL, peroneal tendons, plantar fascia")],
  ], { y: 1.15, w: 5.0, colW: [1.4, 3.6], rowH: 0.5 });
  head(s, "Findings reported", 5.9, 1.15, 3.6);
  bullets(s, [
    "Tendon thickness compared with the other side",
    "Hypoechoic areas and loss of fibre pattern",
    "New vessels on Doppler (neovascularity)",
    "Partial tears and calcific deposits",
    "Bursal fluid",
    "Ligament gapping on stress views",
  ], { x: 5.9, y: 1.55, w: 3.6, h: 2.6 });
  s.addText("Performed and reported by a radiologist trained in musculoskeletal ultrasound. High-frequency linear probe, no radiation. The first scan is the baseline for return-to-play decisions.", { x: 5.9, y: 4.0, w: 3.6, h: 0.9, fontSize: 11, color: C.accent4, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("Region choice is guided by sport and symptoms: Achilles and patellar tendons for runners and jumpers, rotator cuff and distal biceps for lifters.");

  // ============ 11. Doping control ============
  pres.addSection({ title: "Doping and drug screening" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Doping and drug screening" });
  s.addText("How official doping control works", { placeholder: "title" });
  const lc = (t) => ({ text: t, options: { bold: true, color: H.deep, fontSize: 11, fill: { color: H.pale }, valign: "middle" } });
  table(s, [
    [th("When banned"), th("WADA Prohibited List class, 2026")],
    [lc("At all times"), td("S0 non-approved substances, S1 anabolic agents, S2 peptide hormones and growth factors (EPO, hGH), S3 beta-2 agonists, S4 hormone and metabolic modulators, S5 diuretics and masking agents, M1 blood manipulation, M2 chemical and physical manipulation, M3 gene and cell doping")],
    [lc("In competition"), td("S6 stimulants, S7 narcotics (tramadol since 2024), S8 cannabinoids (CBD excepted), S9 glucocorticoids")],
    [lc("In some sports"), td("P1 beta-blockers, for example archery, shooting and golf")],
  ], { y: 1.15, w: 5.4, colW: [1.25, 4.15], rowH: [0.3, 1.45, 0.65, 0.45] });
  head(s, "Who tests and how", 6.2, 1.15, 3.3);
  bullets(s, [
    "NADA India tests Indian athletes; the International Testing Agency runs testing at the Olympic Games",
    "Urine (at least 90 mL) and blood, split into A and B samples",
    "Analysed only at WADA-accredited laboratories; in India, NDTL New Delhi",
    "Athlete Biological Passport tracks blood, steroid and growth-hormone markers over time",
    "Olympic samples may be stored and re-tested for up to 10 years",
  ], { x: 6.2, y: 1.55, w: 3.3, h: 3.3, fontSize: 11.5 });
  note(s, "Dhruv Diagnostics does not carry out doping control and cannot certify an athlete as clean.", 4.75, { w: 5.4, fontSize: 12, bold: true, color: C.accent2 });
  s.addNotes("Athletes should check every medicine against the current Prohibited List and apply for a Therapeutic Use Exemption where needed. Semaglutide and tirzepatide are on WADA's 2026 monitoring programme, not banned.");

  // ============ 12. Drug screen ============
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Doping and drug screening" });
  s.addText("Urine drug screen and WADA status", { placeholder: "title" });
  const ic = (t) => td(t, { align: "center" });
  table(s, [
    [th("Drug group screened"), th("WADA class"), th("Banned", { align: "center" }), th("Note")],
    [tdB("Amphetamine, methamphetamine"), td("S6 stimulants"), ic("In competition"), td("")],
    [tdB("MDMA (ecstasy)"), td("S6; substance of abuse"), ic("In competition"), td("")],
    [tdB("Cocaine"), td("S6; substance of abuse"), ic("In competition"), td("Screen detects benzoylecgonine")],
    [tdB("Cannabinoids (THC)"), td("S8; THC is a substance of abuse"), ic("In competition"), td("CBD alone is allowed; CBD products can contain THC")],
    [tdB("Opiates (morphine)"), td("S7 narcotics"), ic("In competition"), td("Screen also reacts to codeine, which is not banned")],
    [tdB("Tramadol"), td("S7 narcotics"), ic("In competition"), td("Banned since 1 January 2024")],
    [tdB("Methadone, buprenorphine"), td("S7 narcotics"), ic("In competition"), td("")],
    [tdB("Benzodiazepines, barbiturates"), td("Not on the List"), ic("No"), td("Relevant to health and safety only")],
  ], { y: 1.15, w: 9, colW: [2.5, 2.3, 1.3, 2.9], rowH: 0.36 });
  note(s, "Immunoassay is a screen. A positive result needs confirmation by GC-MS or LC-MS/MS. This screen is for clinical and personal use and is not a doping test.", 4.55, { h: 0.5, fontSize: 11 });
  s.addNotes("Panel composition to be confirmed against the kit Dhruv uses. Under the 2021 Code, cocaine, heroin, MDMA and THC are Substances of Abuse, with reduced sanctions for out-of-competition use unrelated to sport.");

  // ============ 13. Recovery Club ============
  pres.addSection({ title: "Recovery and visit" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Recovery and visit" });
  s.addText("Recovery Club for women members", { placeholder: "title" });
  note(s, "Open to women members only at present. Men's access has not opened yet.", 1.05, { fontSize: 13, bold: true, color: C.accent2 });
  [["Sauna", "Dry heat after training. Opened to a member once her blood pressure and ECG or TMT have been reviewed."], ["Spa", "Massage and hydrotherapy between sessions to ease muscle soreness and stiffness."], ["Health club", "Supervised strength, conditioning and mobility work planned around the check-up findings."]].forEach(([h, t], i) => {
    const x = 0.5 + i * 3.05;
    s.addShape(pres.ShapeType.rect, { x, y: 1.55, w: 2.85, h: 1.75, fill: { color: C.background2 }, line: { color: C.background2, width: 0 } });
    head(s, h, x + 0.2, 1.7, 2.45);
    s.addText(t, { x: x + 0.2, y: 2.1, w: 2.45, h: 1.1, fontSize: 13, color: C.text1, margin: 0, valign: "top", isTextBox: true });
  });
  table(s, [
    [th("Sauna not advised with"), th("Precautions for every member")],
    [td("Pregnancy, uncontrolled high blood pressure, recent heart event, fever or acute illness"), td("Water and electrolytes before and after; no alcohol; leave at any dizziness")],
  ], { y: 3.55, w: 9, colW: [4.5, 4.5], rowH: [0.3, 0.6] });
  s.addNotes("The club is women-only for now. Sauna access follows medical clearance from the check-up; it is positioned as recovery support, not treatment.");

  // ============ 14. Preparation ============
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Recovery and visit" });
  s.addText("Preparing for the visit", { placeholder: "title" });
  table(s, [
    [th("Instruction"), th("Timing"), th("Protects the result of")],
    [tdB("Overnight fast, water allowed"), td("10 to 12 h"), td("Glucose, insulin, lipids")],
    [tdB("No hard, eccentric or very long training"), td("48 to 72 h before"), td("CK, myoglobin, AST, ALT, troponin, NT-proBNP")],
    [tdB("Blood drawn early"), td("8 to 10 am"), td("Testosterone, cortisol")],
    [tdB("Stop high-dose biotin (hair and skin supplements)"), td("72 h before"), td("Thyroid, hormone and troponin immunoassays")],
    [tdB("Tell us about creatine use"), td("At booking"), td("Creatinine (cystatin C is added)")],
    [tdB("Bring a list of medicines, supplements and any TUE"), td("On the day"), td("Hormone panel, drug screen, physician review")],
    [tdB("Light breakfast after the blood draw; wear running shoes"), td("TMT at least 2 h after eating"), td("Treadmill stress test")],
  ], { y: 1.15, w: 9, colW: [4.0, 2.0, 3.0], rowH: 0.42 });
  note(s, "Repeat every 6 to 12 months so results can be compared with the athlete's own baseline.", 4.75, { fontSize: 12, color: C.accent1 });
  s.addNotes("Biotin interferes with streptavidin-based immunoassays. Order on the day: fasting bloods and urine, breakfast, ultrasound, then TMT, then physician review.");

  // ============ 15. Sources ============
  pres.addSection({ title: "Sources" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "Sources" });
  s.addText("Sources", { placeholder: "title" });
  const refs = [
    "World Anti-Doping Agency. 2026 Prohibited List, in force 1 January 2026.",
    "World Anti-Doping Agency. Athlete Biological Passport Operating Guidelines.",
    "Mougios V. Reference intervals for serum creatine kinase in athletes. Br J Sports Med 2007;41:674-678.",
    "Mandsager K et al. Cardiorespiratory fitness and long-term mortality among adults undergoing exercise treadmill testing. JAMA Netw Open 2018;1(6):e183605.",
    "Mach F et al. 2019 ESC/EAS Guidelines for the management of dyslipidaemias. Eur Heart J 2020;41:111-188.",
    "Mueller C et al. Heart Failure Association of the ESC practical guidance on the use of natriuretic peptide concentrations. Eur J Heart Fail 2019;21:715-731.",
    "Kronenberg F et al. Lipoprotein(a) in atherosclerotic cardiovascular disease: EAS consensus statement. Eur Heart J 2022;43:3925-3946.",
    "Cole CR et al. Heart-rate recovery immediately after exercise as a predictor of mortality. N Engl J Med 1999;341:1351-1357.",
    "Press Information Bureau, Government of India. NDTL regains WADA accreditation, December 2021.",
  ];
  s.addText(refs.map((t, i) => ({ text: t, options: { bullet: { type: "number" }, breakLine: i < refs.length - 1 } })), { x: 0.5, y: 1.15, w: 9, h: 3.3, fontSize: 11, color: C.text1, margin: 0, valign: "top", paraSpaceAfter: 4, isTextBox: true });
  note(s, "Laboratory tests are performed in a NABL-accredited laboratory. The check-up is a screening programme and does not replace a consultation with your own doctor. Dhruv Diagnostics does not perform doping control; official testing is carried out by NADA India at WADA-accredited laboratories.", 4.5, { h: 0.6, fontSize: 10 });

  // ============ 16. Close ============
  s = pres.addSlide({ masterName: "DARK", sectionTitle: "Sources" });
  s.background = { path: ART + "bg_lift.png" };
  s.addText([{ text: "DHRUV", options: { bold: true, fontSize: 18, color: H.white, breakLine: true } }, { text: "DIAGNOSTICS", options: { fontSize: 9, color: "93B4F5", charSpacing: 4 } }], { x: 0.6, y: 0.45, w: 3, h: 0.55, margin: 0, valign: "top", isTextBox: true });
  s.addText("Call to confirm your appointment", { x: 0.6, y: 1.2, w: 5.4, h: 0.5, fontSize: 24, bold: true, color: H.white, margin: 0, isTextBox: true });
  BR.branches.forEach((b, i) => {
    const y = 1.85 + i * 0.85;
    s.addText([{ text: b.name + "   ", options: { bold: true, color: H.white } }, { text: b.phone, options: { bold: true, color: H.green } }], { x: 0.6, y, w: 5.2, h: 0.3, fontSize: 15, margin: 0, isTextBox: true });
    s.addText(b.address, { x: 0.6, y: y + 0.32, w: 5.2, h: 0.3, fontSize: 11, color: "C9D8F5", margin: 0, isTextBox: true });
  });
  s.addText(BR.hours + "   |   " + BR.email, { x: 0.6, y: 3.6, w: 5.6, h: 0.3, fontSize: 11, color: "C9D8F5", margin: 0, isTextBox: true });
  [["qr_web.png", "Website"], ["qr_map_laxmi.png", "Map: Laxmi Nagar"], ["qr_map_ramdas.png", "Map: Ramdaspeth"]].forEach(([img, lab], i) => {
    const x = 0.6 + i * 1.55;
    s.addShape(pres.ShapeType.rect, { x, y: 4.0, w: 1.05, h: 1.05, fill: { color: H.white }, line: { color: H.white, width: 0 } });
    s.addImage({ path: ART + img, x: x + 0.05, y: 4.05, w: 0.95, h: 0.95, altText: lab + " QR code" });
  });
  [["Website"], ["Laxmi Nagar map"], ["Ramdaspeth map"]].forEach(([lab], i) => s.addText(lab, { x: 0.6 + i * 1.55, y: 5.08, w: 1.45, h: 0.22, fontSize: 9, color: "C9D8F5", margin: 0, isTextBox: true }));
  s.addNotes("Laboratory tests are performed in a NABL-accredited laboratory. The check-up is a screening programme and does not replace a consultation with your own doctor. Dhruv Diagnostics does not perform doping control; official testing is carried out by NADA India at WADA-accredited laboratories.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written");
})();
