const { chromium } = require("/opt/node22/lib/node_modules/playwright");
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const p = await b.newPage();
  await p.goto("file://" + process.cwd() + "/vet_report.html"); await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: "/home/user/BlisteringBlockchain/dhruv-athlete-healthcheck/veterinary/Dhruv_Vet_Analyser_Calibration_Validation_Report.pdf", format: "A4", printBackground: true,
    displayHeaderFooter: true, headerTemplate: "<span></span>", footerTemplate: '<div style="font-size:7pt;color:#64748B;width:100%;padding:0 15mm;font-family:Arial;display:flex;justify-content:space-between"><span>Dhruv Diagnostics, Nagpur · Veterinary testing on existing analysers</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>' });
  await b.close(); console.log("ok");
})();
