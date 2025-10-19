# 🧑‍💻 Open Source Contributor Profile Generator

> ⚡ Instantly generate a personalized **Open Source Bio** using your GitHub activity + AI magic!  
> Built for MLH Hackathons 💫

---

## 🚀 Overview

The **Open Source Contributor Profile Generator** helps developers quickly create an inspiring open-source contributor bio based on their **GitHub activity**.

You simply enter your **GitHub username**, and the app:
1. Fetches your latest repositories, stars, and languages via the **GitHub API**
2. Summarizes your contributions using an **AI model (OpenAI GPT-4o-mini)**
3. Generates a short, creative, and professional **Open Source Bio**

---

## ✨ Demo

🔗 **Live App:** [https://your-vercel-deployment-url.vercel.app](https://your-vercel-deployment-url.vercel.app)  
🧠 Example Input: `torvalds`  
💬 Example Output:

> “A visionary open-source engineer passionate about building systems that empower developers globally.”

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| 🖥️ Frontend | Next.js (TypeScript) |
| ⚙️ Backend | Next.js API Routes |
| 🧠 AI | OpenAI GPT-4o-mini |
| 🧑‍💻 Data Source | GitHub REST API |
| ☁️ Hosting | Vercel |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/yourusername/oss-profile-gen.git
cd oss-profile-gen
npm install
