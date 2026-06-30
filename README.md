# AI Code Reviewer - Backend

Welcome to the Code Reviewer project! This is the backend service that powers an AI-driven code analysis and simulated execution platform, leveraging Google's Generative AI (Gemini 2.5 Flash).

## 🚀 What Was Built

A Node.js/Express server that acts as a proxy and orchestrator for Google's Generative AI models. It exposes endpoints to:
1. **Analyze Code:** Generate senior-level code reviews based on strict guidelines.
2. **Simulate Execution:** Mimic a sandboxed online compiler (like Node.js, Python 3, GCC) and return structured runtime logs and errors.

## 💡 Why It's Technically Interesting

The technical challenge lies in coercing a Large Language Model (LLM) to act as deterministic infrastructure. Rather than conversational output, the AI is constrained to act as a compiler that outputs strict JSON schemas, allowing the frontend to render dynamic terminal logs without requiring an actual Dockerized code execution environment.

## 🛠️ Proof It Works: Architecture & AI Integration

### Architecture
- **Backend:** Node.js + Express, utilizing `@google/generative-ai` SDK. Hosted on [Render](https://code-reviewbackend.onrender.com).
- **Frontend:** React application, hosted on [Netlify](https://codereviewer2.netlify.app).

### The Prompt Structure
The AI's behavior is shaped by two distinct system instructions:
- **Code Reviewer:** Instructed to assume the role of a Senior Developer (7+ years experience) focusing on 6 pillars: Code Quality, Best Practices, Efficiency, Error Detection, Scalability, and Readability. The prompt enforces a strict output format containing categories: `Bad Code`, `Issues`, `Recommended Fix`, and `Improvements`.
- **Compiler Simulation:** Instructed to behave as a sandboxed execution engine. It analyzes the language, simulates execution line-by-line, and is strictly ordered to return a **raw JSON object** (without markdown).

### Response-Schema Validation & Fallback Approach
Since LLMs can sometimes ignore formatting instructions, the backend implements robust parsing and fallback strategies in the `executeCode` controller:
1. **Sanitization:** The `simulateExecution` service strips unwanted Markdown artifacts (like ```json) from the raw AI response using Regex.
2. **Validation:** The controller attempts to `JSON.parse()` the sanitized response expecting a specific schema: `{ logs: [...], result: String, error: String }`.
3. **Graceful Fallback:** If the AI's response is malformed and fails JSON parsing, the server does not retry (to save latency/cost). Instead, the `catch` block intercepts the failure and bundles the raw text into a safe fallback schema:
   ```json
   {
       "logs": [{ "type": "log", "text": "Raw LLM string output..." }],
       "result": null,
       "error": null
   }
   ```
This guarantees the API always returns a predictable schema, preventing frontend crashes.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16+ recommended)
- A Google Gemini API Key

### Installation
```bash
git clone https://github.com/dineshkumar-mb/code-ReviewBackend
cd code-ReviewBackend
npm install
```

### Environment Variables
Create a `.env` file in the root directory:
```
GOOGLE_GEMINI_KEY=your_gemini_api_key
```

### Running the Server
```bash
npm start
```

## 🤝 Contribution
Contributions are welcome! Please fork the repo, create a feature branch, and submit a PR.

## 📄 License
This project is licensed under the MIT License.
