const fs = require("fs");
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const B = require("./brand.json");
let html = fs.readFileSync("flyer_tpl.html", "utf8");
for (const [k, v] of Object.entries(B.palette)) html = html.split("{{" + k + "}}").join(v);
const c = B.contact;
html = html.replace("{{branches}}", c.branches.map((b) => `<div class="br"><b>${b.name}</b><span class="ph">${b.phone}</span><div>${b.address}</div></div>`).join(""))
  .replace("{{hours}}", c.hours).replace("{{email}}", c.email).replace("{{websiteLabel}}", c.websiteLabel);
fs.writeFileSync("flyer.html", html);
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const p = await b.newPage();
  await p.goto("file://" + process.cwd() + "/flyer.html"); await p.evaluate(() => document.fonts.ready);
  const D = "/home/user/BlisteringBlockchain/dhruv-athlete-healthcheck/";
  await p.pdf({ path: D + "Dhruv_Athlete_Flyer_A4.pdf", width: "210mm", height: "297mm", printBackground: true });
  await p.setViewportSize({ width: 794, height: 1123 });
  await p.screenshot({ path: D + "Dhruv_Athlete_Flyer_A4.png" });
  const over = await p.evaluate(() => { const m = document.querySelector("main").getBoundingClientRect(), f = document.querySelector("footer").getBoundingClientRect(); return { mainBottom: m.bottom, footerTop: f.top }; });
  console.log(over);
  await b.close();
})();
