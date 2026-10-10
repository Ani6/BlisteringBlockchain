"""Compute Dhruv athlete plan prices from researched per-test market prices.

Typical price per test = verified typical from the first research pass, replaced by the
re-verified typical where the second, independent pass produced one. Package price applies
the discounts observed in the Nagpur/national market benchmark: about 70% off for blood
tests bundled in a package, about 35% off for ECG, TMT, ultrasound and consultation time.
"""
import json, math, sys

research = json.load(open("pricing_research.json"))
typ = {}
for g in research["groups"]:
    for t in g["verify"]["tests"]:
        typ[t["name"]] = t["typical_inr"]
reverify = json.load(open(sys.argv[1])) if len(sys.argv) > 1 else []
REMAP = {  # re-verify names -> first-pass names
    "NT-proBNP": "NT-proBNP",
    "High-sensitivity troponin I (hs-TnI) or T": "High-sensitivity troponin I or T",
    "IGF-1 (insulin-like growth factor 1)": "IGF-1",
    "SHBG (sex hormone binding globulin)": "SHBG",
    "Serum myoglobin": "Serum myoglobin",
    "Free testosterone (direct)": "Free testosterone",
    "Cystatin C": "Cystatin C",
    "Vitamin D 25-hydroxy (at established NABL labs, not coupon prices)": "Vitamin D (25-hydroxy)",
    "TMT / treadmill stress test in Nagpur": "TMT / treadmill stress test in Nagpur",
    "Musculoskeletal / high-resolution ultrasound of one joint (knee or shoulder) in Nagpur": "Musculoskeletal ultrasound of one joint (shoulder, knee or ankle) in Nagpur, including high-resolution / MSK sonography",
    "Urine drugs-of-abuse panel (about 10 drugs) in India": "Urine drugs of abuse panel (10-panel or similar) in India",
    "Physician or sports-medicine consultation fee in Nagpur": "Physician / consultant consultation fee in Nagpur (general physician or sports medicine)",
}
changes = []
for r in reverify:
    k = REMAP.get(r["name"]) or next((v for kk, v in REMAP.items() if kk[:14] == r["name"][:14]), None)
    if k and r["verdict"] != "unsupported":
        changes.append((k, typ[k], r["typical_inr"]))
        typ[k] = r["typical_inr"]

P = lambda k: typ[k]
PROC = {"Resting ECG in Nagpur", "TMT / treadmill stress test in Nagpur",
        "Physician / consultant consultation fee in Nagpur (general physician or sports medicine)",
        "Musculoskeletal ultrasound of one joint (shoulder, knee or ankle) in Nagpur, including high-resolution / MSK sonography"}
USG = "Musculoskeletal ultrasound of one joint (shoulder, knee or ankle) in Nagpur, including high-resolution / MSK sonography"
base = ["Resting ECG in Nagpur", "Complete blood count (CBC / haemogram)", "Reticulocyte count", "Serum ferritin",
        "Vitamin D (25-hydroxy)", "Vitamin B12", "Fasting blood glucose", "HbA1c", "Lipid profile",
        "Liver function test (LFT)", "Kidney function test (KFT / RFT)", "Cystatin C", "TSH",
        "CK / CPK total (creatine kinase)", "Physician / consultant consultation fee in Nagpur (general physician or sports medicine)"]
perf_add = ["CK-MB", "LDH (lactate dehydrogenase)", "Serum myoglobin", "Apolipoprotein B (Apo B)", "Lipoprotein(a) Lp(a)",
            "hs-CRP", "Homocysteine", "Fasting insulin", "NT-proBNP", "Testosterone total", "Free testosterone", "LH", "FSH",
            "SHBG", "Estradiol (E2)", "Prolactin", USG]
elite_add = ["High-sensitivity troponin I or T", "Cortisol (morning)", "IGF-1",
             "Urine microalbumin / albumin-creatinine ratio (ACR)", "TMT / treadmill stress test in Nagpur", USG, USG]

def split(items):
    blood = sum(P(k) for k in items if k not in PROC)
    proc = sum(P(k) for k in items if k in PROC)
    return blood, proc

tiers = {"Base": base, "Performance": base + perf_add, "Elite": base + perf_add + elite_add}
BLOOD_OFF, PROC_OFF = 0.70, 0.35
out = []
for name, items in tiers.items():
    blood, proc = split(items)
    value = blood + proc
    fair = blood * (1 - BLOOD_OFF) + proc * (1 - PROC_OFF)
    out.append(dict(name=name, value=value, blood=blood, proc=proc, fair=round(fair)))
print("Re-verified changes:", *[f"  {k[:50]}: {a} -> {b}" for k, a, b in changes], sep="\n")
for o in out:
    print(f"{o['name']:12} sum {o['value']:>7,}  (blood {o['blood']:,}, procedures {o['proc']:,})  formula price {o['fair']:,}  -> {o['fair']/o['value']:.0%} of sum")
print("Add-on references: urine DOA panel", P("Urine drugs of abuse panel (10-panel or similar) in India"), "| extra USG region", P(USG))
json.dump({"typ": typ, "tiers": out}, open("pricing_calc.json", "w"), indent=1)
