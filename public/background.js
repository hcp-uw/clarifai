chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "ANALYZE_PAGE") {
        const url = sender.tab ? sender.tab.url : msg.url;
        const cacheKey = "clarifai_cache_" + url;

        Promise.all([
            fetch("http://localhost:3000/api/get-summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: msg.paragraphs.map((p) => p.text).join("\n") })
            }).then(r => r.json()),

            fetch("http://localhost:3000/api/fact-check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paragraphs: msg.paragraphs })
            }).then(r => r.json())
        ])
            .then(([summaryData, factCheckData]) => {
                const resultData = {
                    summary: summaryData.summary,
                    flagged: factCheckData.flagged || []
                };

                // Cache the result and update stats
                chrome.storage.local.get(['stats_factchecks', 'stats_summaries'], (stats) => {
                    chrome.storage.local.set({
                        [cacheKey]: resultData,
                        stats_factchecks: (stats.stats_factchecks || 0) + resultData.flagged.length,
                        stats_summaries: (stats.stats_summaries || 0) + 1
                    }, () => {
                        sendResponse({ success: true, data: resultData });
                    });
                });
            })
            .catch(err => sendResponse({ success: false, error: err.message }));

        return true; // Keep message channel open for async response
    }
});