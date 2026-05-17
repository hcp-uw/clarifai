"use strict";
/**
 * adblock.ts
 * Chrome extension content script — identifies and removes ads on page load.
 * Covers: known ad selectors, ad-serving iframes/scripts, and a MutationObserver
 * for dynamically injected ads.
 */
// ---------------------------------------------------------------------------
// Selectors — elements matching any of these are treated as ads and removed.
// ---------------------------------------------------------------------------
const AD_SELECTORS = [
    // Generic ad slot class/id patterns
    '[id*="google_ads"]',
    '[id*="div-gpt-ad"]',
    '[id*="ad-container"]',
    '[id*="ad_container"]',
    '[id*="adunit"]',
    '[id*="ad-slot"]',
    '[class*="ad-slot"]',
    '[class*="adsbygoogle"]',
    '[class*="ad-banner"]',
    '[class*="ad-wrapper"]',
    '[class*="ad-block"]',
    '[class*="ad-zone"]',
    '[class*="advertisement"]',
    '[class*="sponsored-content"]',
    '[class*="sponsored_content"]',
    '[data-ad-unit]',
    '[data-ad-slot]',
    '[data-ad-client]',
    // Google AdSense / Ad Manager
    'ins.adsbygoogle',
    // Common third-party ad containers
    '[id^="taboola"]',
    '[id^="outbrain"]',
    '[class*="taboola"]',
    '[class*="outbrain"]',
    '[class*="teads"]',
    '[class*="criteo"]',
    '[class*="mgid"]',
    // "Promoted" / "Sponsored" labels (social / search style)
    '[aria-label="Sponsored"]',
    '[aria-label="Advertisement"]',
    // Generic iframes from known ad networks (handled separately via src matching)
    'iframe[src*="doubleclick.net"]',
    'iframe[src*="googlesyndication.com"]',
    'iframe[src*="googleadservices.com"]',
    'iframe[src*="amazon-adsystem.com"]',
    'iframe[src*="media.net"]',
    'iframe[src*="outbrain.com"]',
    'iframe[src*="taboola.com"]',
    // Script tags that load ad SDKs (removing the element stops future calls)
    'script[src*="googlesyndication.com"]',
    'script[src*="doubleclick.net"]',
    'script[src*="googletagservices.com"]',
    'script[src*="amazon-adsystem.com"]',
];
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
/**
 * Remove a single element from the DOM and optionally collapse the space it
 * occupied so the page doesn't show an ugly blank region.
 */
function removeElement(el) {
    // Collapse the parent if it becomes empty after removal and looks like a
    // pure ad wrapper (no meaningful text children).
    const parent = el.parentElement;
    el.remove();
    if (parent &&
        parent !== document.body &&
        parent.children.length === 0 &&
        (parent.textContent ?? "").trim() === "") {
        parent.remove();
    }
}
/**
 * Run all selectors against a root element (or the document) and remove hits.
 * Returns the number of elements removed.
 */
function purgeAds(root = document) {
    const combined = AD_SELECTORS.join(",");
    const hits = Array.from(root.querySelectorAll(combined));
    hits.forEach(removeElement);
    return hits.length;
}
// ---------------------------------------------------------------------------
// Initial sweep — runs as soon as the content script is injected
// ---------------------------------------------------------------------------
const initialCount = purgeAds();
if (initialCount > 0) {
    console.debug(`[adblock] Removed ${initialCount} ad element(s) on load.`);
}
// ---------------------------------------------------------------------------
// MutationObserver — catches ads injected after initial page load
// (lazy-loaded content, infinite scroll, single-page app navigation, etc.)
// ---------------------------------------------------------------------------
const observer = new MutationObserver((mutations) => {
    let removed = 0;
    for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
            if (!(node instanceof Element))
                continue;
            // Check the node itself
            const combined = AD_SELECTORS.join(",");
            if (node.matches(combined)) {
                removeElement(node);
                removed++;
                continue;
            }
            // Check descendants of the added node
            removed += purgeAds(node);
        }
    }
    if (removed > 0) {
        console.debug(`[adblock] Removed ${removed} dynamically injected ad(s).`);
    }
});
observer.observe(document.documentElement, {
    childList: true, // watch for added/removed children
    subtree: true, // recurse into all descendants
});
// Clean up the observer if the page is unloaded (good practice for SPAs)
window.addEventListener("unload", () => observer.disconnect());
