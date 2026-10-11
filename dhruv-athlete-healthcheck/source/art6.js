// Top-down breakfast tray: poha, chai, fruit bowl. Used on the executive check-up slide.
const sharp = require("sharp");
function rng(seed) { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
function tray(W = 1200, H = 900) {
  const r = rng(5);
  let poha = "";
  for (let i = 0; i < 520; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 165, x = 430 + Math.cos(a) * d, y = 470 + Math.sin(a) * d * 0.92;
    const c = ["#F6C445", "#F2B728", "#F8D36A", "#EFAE1C"][Math.floor(r() * 4)];
    poha += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(7 + r() * 5).toFixed(1)}" ry="${(3 + r() * 2).toFixed(1)}" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${c}"/>`; }
  for (let i = 0; i < 26; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 140; poha += `<circle cx="${(430 + Math.cos(a) * d).toFixed(1)}" cy="${(470 + Math.sin(a) * d).toFixed(1)}" r="7" fill="#4CAF50"/><circle cx="${(428 + Math.cos(a) * d).toFixed(1)}" cy="${(468 + Math.sin(a) * d).toFixed(1)}" r="2.4" fill="#A5D6A7"/>`; }
  for (let i = 0; i < 9; i++) { const a = r() * Math.PI * 2, d = 40 + r() * 100, x = 430 + Math.cos(a) * d, y = 470 + Math.sin(a) * d;
    poha += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="16" ry="6" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="#2E7D32"/>`; }
  for (let i = 0; i < 40; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 150; poha += `<circle cx="${(430 + Math.cos(a) * d).toFixed(1)}" cy="${(470 + Math.sin(a) * d).toFixed(1)}" r="${(2 + r() * 2.5).toFixed(1)}" fill="#FFF3C4"/>`; }
  let fruit = "";
  const pieces = [["#F97316", "#FDBA74"], ["#E11D48", "#FDA4AF"], ["#84CC16", "#D9F99D"], ["#FACC15", "#FEF08A"]];
  for (let i = 0; i < 22; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 95, x = 900 + Math.cos(a) * d, y = 640 + Math.sin(a) * d; const [c1, c2] = pieces[i % 4];
    fruit += `<rect x="${(x - 22).toFixed(1)}" y="${(y - 16).toFixed(1)}" width="44" height="32" rx="9" transform="rotate(${(r() * 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${c1}"/><rect x="${(x - 14).toFixed(1)}" y="${(y - 9).toFixed(1)}" width="20" height="10" rx="5" transform="rotate(${(r() * 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${c2}" opacity="0.8"/>`; }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
   <radialGradient id="plate" cx="0.45" cy="0.4" r="0.6"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.8" stop-color="#EEF2F7"/><stop offset="1" stop-color="#D5DCE6"/></radialGradient>
   <radialGradient id="tea" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stop-color="#D9A066"/><stop offset="1" stop-color="#8B5A2B"/></radialGradient>
   <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <rect x="40" y="60" width="${W - 80}" height="${H - 120}" rx="60" fill="#EFF5FF"/>
  <rect x="40" y="60" width="${W - 80}" height="${H - 120}" rx="60" fill="none" stroke="#D6E0EE" stroke-width="4"/>
  <circle cx="440" cy="490" r="250" fill="#0F1A2E" opacity="0.18" filter="url(#sh)"/>
  <circle cx="430" cy="470" r="250" fill="url(#plate)"/><circle cx="430" cy="470" r="200" fill="none" stroke="#DCE3EC" stroke-width="3"/>
  ${poha}
  <path d="M560 360 l70 -18 l-24 58 z" fill="#FDE047"/><path d="M570 362 l52 -13 l-18 43 z" fill="#FEF9C3"/>
  <circle cx="912" cy="300" r="118" fill="#0F1A2E" opacity="0.18" filter="url(#sh)"/>
  <circle cx="900" cy="285" r="118" fill="#FFFFFF"/><circle cx="900" cy="285" r="96" fill="url(#tea)"/>
  <ellipse cx="872" cy="258" rx="34" ry="14" fill="#F3D3A8" opacity="0.45"/>
  <path d="M1012 260 q60 10 50 52 q-8 34 -56 30" fill="none" stroke="#FFFFFF" stroke-width="22" stroke-linecap="round"/>
  <circle cx="912" cy="655" r="135" fill="#0F1A2E" opacity="0.18" filter="url(#sh)"/>
  <circle cx="900" cy="640" r="135" fill="#2563EB"/><circle cx="900" cy="640" r="118" fill="#FFFFFF"/>
  ${fruit}
 </svg>`;
}
(async () => { await sharp(Buffer.from(tray())).png().toFile("art/breakfast.png"); console.log("ok"); })();
