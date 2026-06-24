const { generateContent, simulateExecution } = require("../services/ai.service.js"); // Ensure correct path

async function getReview(req, res) {
    try {
        const { code } = req.body; // Get code from request
        if (!code) return res.status(400).json({ error: "Code is required" });

        const review = await generateContent(code); // Call AI service
        res.json({ review });
    } catch (error) {
        console.error("Error in getReview:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function executeCode(req, res) {
    try {
        const { code, language } = req.body;
        if (!code) return res.status(400).json({ error: "Code is required" });

        const rawResult = await simulateExecution(code, language);
        
        let parsedResult;
        try {
            parsedResult = JSON.parse(rawResult);
        } catch (err) {
            // Fallback in case Gemini responds with plain text instead of JSON
            parsedResult = {
                logs: [{ type: "log", text: rawResult }],
                result: null,
                error: null
            };
        }
        res.json(parsedResult);
    } catch (error) {
        console.error("Error in executeCode:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// ✅ Ensure handlers are exported correctly
module.exports = { getReview, executeCode };
