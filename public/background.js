chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "SUMMARIZE_PAGE") {
        fetch("http://localhost:3000/api/get-summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: msg.text }),
        })
            .then((res) => res.json())
            .then((data) => sendResponse({ success: true, data }))
            .catch((err) => sendResponse({ success: false, error: err.message }));

        return true; // required for async response
    }

    if (msg.type === "FACTCHECK_PAGE") {
        fetch("http://localhost:3000/api/fact-check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paragraphs: msg.paragraphs }),
        })
            .then((res) => res.json())
            .then((data) => sendResponse({ success: true, data }))
            .catch((err) => sendResponse({ success: false, error: err.message }));

        return true;
    }
});