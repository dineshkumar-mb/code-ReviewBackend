const generateContent = require("../services/ai.service.js"); // Ensure correct path

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

// ✅ Ensure getReview is exported correctly
module.exports = { getReview };
