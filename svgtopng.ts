import sharp from "sharp";
import fs from "fs";

const svgCode = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <title>ClarifAI Icon — Filled Lens, Blue Background</title>
  <rect width="200" height="200" rx="44" fill="#155DFC"/>
  <circle cx="88" cy="88" r="60" fill="white" opacity="0.18"/>
  <circle cx="88" cy="88" r="60" fill="none" stroke="white" stroke-width="11"/>
  <polyline points="54,88 74,108 122,58" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="136" y1="136" x2="170" y2="170" stroke="white" stroke-width="11" stroke-linecap="round"/>
</svg>
   `;

// Convert the string buffer into a sharp instance, resize it, and output as PNG
sharp(Buffer.from(svgCode))
  .resize(32, 32)
  .png()
  .toFile("public/icon32.png")
  .then(() => console.log("SVG successfully converted to PNG!"))
  .catch(err => console.error("Conversion error:", err));