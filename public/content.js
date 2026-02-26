const STYLE_ID = "clarifai-theme";

// Save originals ONCE when the content script first loads
const originalStyles = {
  backgroundColor: document.body.style.backgroundColor,
  color: document.body.style.color,
  fontFamily: document.body.style.fontFamily,
  fontSize: document.body.style.fontSize,
};

function getOrCreateStyle() {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  return style;
}

const THEMES = {
  light: { bg: "#ffffff", color: "#000000" },
  dark: { bg: "#1a1a1a", color: "#f0f0f0" },
  warm: { bg: "#fdf6e3", color: "#4a3728" },
};

// Target body text but exclude headings and anything inside them
const TEXT_SELECTOR = `
  p, li, td, blockquote, figcaption, caption,
  p span, li span, td span, blockquote span,
  p a, li a
`;

// Fonts that need to be fetched (not available as system fonts)
const FONT_URLS = {
  "Atkinson Hyperlegible":
    "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible&display=swap",
  Lexend: "https://fonts.googleapis.com/css2?family=Lexend&display=swap",
  OpenDyslexic: "https://fonts.cdnfonts.com/css/opendyslexic",
};

function loadFont(fontName) {
  const url = FONT_URLS[fontName];
  if (!url) return; // system font like Inter or Georgia, no loading needed

  const id = "clarifai-font-" + fontName.replace(/\s+/g, "-");
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  const style = getOrCreateStyle();

  if (msg.type === "SET_THEME") {
    const theme = THEMES[msg.value] || THEMES.light;
    style.textContent = `
    html, body { background-color: ${theme.bg} !important; color: ${theme.color} !important; }
    header, nav, footer, [class*="nav"], [class*="header"], [class*="toolbar"], [class*="bar"] {
      background-color: ${theme.bg} !important;
    }
    h1, h2, h3, h4, h5, h6 { color: ${theme.color} !important; }
    ${TEXT_SELECTOR} { color: ${theme.color} !important; }
  `;
  }

  if (msg.type === "SET_FONT_COLOR") {
    style.textContent += `${TEXT_SELECTOR} { color: ${msg.value} !important; }`;
  }

  if (msg.type === "SET_BG_COLOR") {
    style.textContent += `html, body { background-color: ${msg.value} !important; }`;
  }

  if (msg.type === "SET_FONT_FAMILY") {
    loadFont(msg.value); // fetch from CDN if needed
    style.textContent += `${TEXT_SELECTOR} { font-family: "${msg.value}", sans-serif !important; }`;
  }

  if (msg.type === "SET_FONT_SIZE") {
    style.textContent += `${TEXT_SELECTOR} { font-size: ${msg.value} !important; }`;
  }

  if (msg.type === "RESET") {
    const existing = document.getElementById(STYLE_ID);
    if (existing) existing.remove();

    // Remove any loaded font links
    Object.keys(FONT_URLS).forEach((fontName) => {
      const id = "clarifai-font-" + fontName.replace(/\s+/g, "-");
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    // Restore original inline styles
    document.body.style.backgroundColor = originalStyles.backgroundColor;
    document.body.style.color = originalStyles.color;
    document.body.style.fontFamily = originalStyles.fontFamily;
    document.body.style.fontSize = originalStyles.fontSize;
  }
});

chrome.storage.local.get(
  ["colorTheme", "fontColor", "bgColor", "fontFamily", "fontSize"],
  (saved) => {
    if (saved.colorTheme && saved.colorTheme !== "light") {
      const theme = THEMES[saved.colorTheme] || THEMES.light;
      document.documentElement.style.backgroundColor = theme.bg;
      document.body.style.backgroundColor = theme.bg;
      const style = getOrCreateStyle();
      style.textContent = `
      html, body { background-color: ${theme.bg} !important; color: ${theme.color} !important; }
      header, nav, footer, [class*="nav"], [class*="header"], [class*="toolbar"], [class*="bar"] {
        background-color: ${theme.bg} !important;
      }
      h1, h2, h3, h4, h5, h6 { color: ${theme.color} !important; }
      ${TEXT_SELECTOR} { color: ${theme.color} !important; }
    `;
    }
    if (saved.fontColor) {
      const style = getOrCreateStyle();
      style.textContent += `${TEXT_SELECTOR} { color: ${saved.fontColor} !important; }`;
    }
    if (saved.bgColor) {
      const style = getOrCreateStyle();
      style.textContent += `html, body { background-color: ${saved.bgColor} !important; }`;
    }
    if (saved.fontFamily) {
      loadFont(saved.fontFamily);
      const style = getOrCreateStyle();
      style.textContent += `${TEXT_SELECTOR} { font-family: "${saved.fontFamily}", sans-serif !important; }`;
    }
    if (saved.fontSize) {
      const style = getOrCreateStyle();
      style.textContent += `${TEXT_SELECTOR} { font-size: ${saved.fontSize} !important; }`;
    }
  },
);
