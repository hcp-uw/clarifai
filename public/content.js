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

const getCacheKey = () => "clarifai_cache_" + window.location.href;

const renderSummary = (summaryText) => {
  if (document.getElementById("clarifai-summary-banner")) return;
  const banner = document.createElement("div");
  banner.id = "clarifai-summary-banner";
  banner.style.cssText = `
    width: 90%; max-width: 800px; margin: 20px auto;
    background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
    padding: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #334155; line-height: 1.5; font-size: 15px;
    position: relative; z-index: 999999;
  `;
  banner.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        <strong style="color: #0f172a; font-size: 16px;">AI Summary</strong>
      </div>
      <button id="clarifai-summary-close" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #94a3b8; line-height: 1; padding: 0;">&times;</button>
    </div>
    <div style="color: #475569;">${summaryText}</div>
  `;
  const paragraphs = Array.from(document.querySelectorAll("p")).filter(p => p.innerText.trim().length > 100);
  if (paragraphs.length > 0) {
    paragraphs[0].insertAdjacentElement("beforebegin", banner);
  } else {
    document.body.prepend(banner);
  }
  document.getElementById("clarifai-summary-close").addEventListener("click", () => banner.remove());
};

const renderFactCheck = (flaggedData) => {
  const paragraphs = Array.from(document.querySelectorAll("p"))
    .filter(p => p.innerText.trim().length > 100);

  flaggedData.forEach(({ index, claim, correction, reason, sources }) => {
    if (paragraphs[index].previousElementSibling && paragraphs[index].previousElementSibling.classList.contains("clarifai-factcheck-box")) {
      return;
    }
    const card = document.createElement("div");
    card.className = "clarifai-factcheck-box";
    card.style.cssText = `
      background: #fefce8; border: 1px solid #e5e2d3; border-radius: 12px;
      padding: 20px 24px; margin-bottom: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #333; position: relative; box-shadow: 0 1px 4px rgba(0,0,0,0.06); line-height: 1.6;
    `;

    const header = document.createElement("div");
    header.style.cssText = "display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;";
    const headerLeft = document.createElement("div");
    headerLeft.style.cssText = "display: flex; align-items: center; gap: 10px;";
    const warningIcon = document.createElement("span");
    warningIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    const title = document.createElement("span");
    title.textContent = "Fact Check: Incorrect Information";
    title.style.cssText = "font-weight: 600; font-size: 15px; color: #1a1a2e;";
    headerLeft.appendChild(warningIcon);
    headerLeft.appendChild(title);
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.style.cssText = "background: none; border: none; font-size: 22px; color: #999; cursor: pointer; padding: 0 4px; line-height: 1;";
    closeBtn.addEventListener("click", () => card.remove());
    header.appendChild(headerLeft);
    header.appendChild(closeBtn);
    card.appendChild(header);

    const claimText = claim || reason || "This claim could not be verified.";
    const redBox = document.createElement("div");
    redBox.style.cssText = "background: #fce4e4; border-left: 4px solid #e53e3e; padding: 12px 16px; border-radius: 6px; margin-bottom: 12px; font-size: 14px; color: #7f1d1d;";
    redBox.textContent = claimText;
    card.appendChild(redBox);

    if (correction) {
      const greenBox = document.createElement("div");
      greenBox.style.cssText = "background: #dcfce7; border-left: 4px solid #22c55e; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-size: 14px; color: #14532d;";
      greenBox.textContent = correction;
      card.appendChild(greenBox);
    }

    if (sources && sources.length > 0) {
      const sourcesSection = document.createElement("div");
      sourcesSection.style.cssText = "margin-top: 4px;";
      const sourcesLabel = document.createElement("div");
      sourcesLabel.textContent = "Reliable Sources:";
      sourcesLabel.style.cssText = "font-size: 13px; font-weight: 500; color: #555; margin-bottom: 8px;";
      sourcesSection.appendChild(sourcesLabel);
      sources.forEach(({ title: srcTitle, url }) => {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.style.cssText = "display: flex; align-items: center; gap: 6px; color: #3b82f6; text-decoration: none; font-size: 13px; margin-bottom: 4px; padding-left: 8px;";
        link.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
        link.appendChild(document.createTextNode(srcTitle || url));
        link.addEventListener("mouseenter", () => link.style.textDecoration = "underline");
        link.addEventListener("mouseleave", () => link.style.textDecoration = "none");
        sourcesSection.appendChild(link);
      });
      card.appendChild(sourcesSection);
    }

    if (paragraphs[index]) {
      paragraphs[index].insertAdjacentElement("beforebegin", card);
    }
  });
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
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

    // Remove fact check and summary elements from UI
    const banner = document.getElementById("clarifai-summary-banner");
    if (banner) banner.remove();
    document.querySelectorAll('.clarifai-factcheck-box').forEach(el => el.remove());
  }

  const handleAnalyzeAndRender = (type, cb) => {
    const cacheKey = getCacheKey();
    chrome.storage.local.get([cacheKey], (result) => {
      if (result[cacheKey]) {
        if (type === "SHOW_SUMMARY") renderSummary(result[cacheKey].summary);
        if (type === "SHOW_FACTCHECK") renderFactCheck(result[cacheKey].flagged);
        if (cb) cb({ success: true });
      } else {
        const paragraphs = Array.from(document.querySelectorAll("p"))
          .filter(p => p.innerText.trim().length > 100);
        const texts = paragraphs.map((p, i) => ({ index: i, text: p.innerText }));

        chrome.runtime.sendMessage({ type: "ANALYZE_PAGE", paragraphs: texts }, (response) => {
          if (!response || !response.success) {
            if (cb) cb({ success: false });
            return;
          }
          if (type === "SHOW_SUMMARY") renderSummary(response.data.summary);
          if (type === "SHOW_FACTCHECK") renderFactCheck(response.data.flagged);
          if (cb) cb({ success: true });
        });
      }
    });
  };

  if (msg.type === "SHOW_SUMMARY") {
    chrome.storage.local.set({ [`toggle_summary_${window.location.href}`]: true });
    handleAnalyzeAndRender("SHOW_SUMMARY", sendResponse);
    return true;
  }

  if (msg.type === "HIDE_SUMMARY") {
    chrome.storage.local.set({ [`toggle_summary_${window.location.href}`]: false });
    const banner = document.getElementById("clarifai-summary-banner");
    if (banner) banner.remove();
    sendResponse({ success: true });
  }

  if (msg.type === "SHOW_FACTCHECK") {
    chrome.storage.local.set({ [`toggle_factcheck_${window.location.href}`]: true });
    handleAnalyzeAndRender("SHOW_FACTCHECK", sendResponse);
    return true;
  }

  if (msg.type === "HIDE_FACTCHECK") {
    chrome.storage.local.set({ [`toggle_factcheck_${window.location.href}`]: false });
    document.querySelectorAll('.clarifai-factcheck-box').forEach(el => el.remove());
    sendResponse({ success: true });
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

// Auto-restore on page load
const toggleSummaryKey = `toggle_summary_${window.location.href}`;
const toggleFactCheckKey = `toggle_factcheck_${window.location.href}`;
const cacheKey = getCacheKey();

chrome.storage.local.get([toggleSummaryKey, toggleFactCheckKey, cacheKey], (result) => {
  if (result[cacheKey]) {
    if (result[toggleSummaryKey]) {
      renderSummary(result[cacheKey].summary);
    }
    if (result[toggleFactCheckKey]) {
      renderFactCheck(result[cacheKey].flagged);
    }
  }
});
