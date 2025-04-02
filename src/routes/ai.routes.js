const express = require('express');
const aicontroller = require('../controllers/ai.controller.js');
const router = express.Router();


router.post("/get-review", aicontroller.generateContent);  // ✅ Use the correct function name

module.exports = router;
