# 🫁 ChestVision 2.0 — Intelligent Lung Health & AQI Impact Analyzer 🌍💨

[![Vercel Deploy ✅](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=for-the-badge&logo=vercel)](https://chestvision2-0.vercel.app)
![Made with HTML](https://img.shields.io/badge/Made%20with-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/Styled%20with-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Scripted%20with-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

🔗 **Live at:** [https://chestvision2-0.vercel.app](https://chestvision2-0.vercel.app)

Welcome to **ChestVision 2.0** — a smart, responsive web app that helps you:
- 🩻 **Detect lung diseases from X-ray images**
- 🌫️ **Convert your air quality into cigarette equivalents**
- 🧠 **Make informed respiratory health decisions**

---

## 🗂️ Project Structure

```

📁 chestvision2-0
├── 🧠 api/
│   ├── 🌫️ airquality.js       → Gets AQI from OpenWeatherMap
│   └── 🌍 geocode.js           → Gets city name from OpenCage
├── 🌐 public/
│   ├── 🏠 index.html           → Main web page
│   └── 🎨 assets/
│       ├── 🖼️ images/         → Logos & UI illustrations
│       ├── ✨ scripts.js       → All JavaScript logic
│       └── 💅 style.css        → All styling and theming
└── 🚀 server.mjs               → Express backend for local use

````

---

## 🌟 Key Features

### 🩺 Lung Disease Detection
🖼️ Upload your chest X-ray image → 💡 Get intelligent predictions via AI  
⚙️ Powered by ML model hosted on Render: `https://chestvision-api.onrender.com/predict`

---

### 🚬 AQI to Cigarettes Converter
📍 Uses your live **geolocation**  
🌫️ Fetches **PM2.5** and **AQI** data  
🚭 Calculates how many **cigarettes/day** you're breathing  
⚠️ Gives health warnings based on air quality level

---

### 🌓 Dark Mode + Responsive UI
💻 Works on desktop & 📱 mobile  
🎨 Auto-switches theme based on your device  
⚡ Smooth animations and transitions  

---

## 🛠️ Tech Stack

| Area | Tools Used |
|------|-------------|
| 🖥️ Frontend | HTML, CSS, JavaScript |
| 🔌 Backend | Node.js + Express |
| ☁️ APIs | OpenWeatherMap, OpenCage Geocoding |
| 🧠 ML Model | External Render API |
| 🚀 Deployment | Vercel |

---

## ⚙️ Local Setup Instructions

### 1. 🔁 Clone the Repo

```bash
git clone https://github.com/yourusername/chestvision2-0.git
cd chestvision2-0
````

### 2. 📦 Install Dependencies

```bash
npm install express node-fetch dotenv
```

### 3. 🗝️ Add `.env` File

Create a `.env` file in the root:

```
OPENCAGE_API_KEY=your_opencage_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
```

### 4. 🚀 Start the Server

```bash
node server.mjs
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment & API Security

🔒 All API keys are kept secure using environment variables.
🌐 On Vercel, you can set them via **Project Settings → Environment Variables**.

---

## 👩‍💻 Contributors

### 👩‍🔬 Arpita Roy

📧 [arpiroy175@gmail.com](mailto:arpiroy175@gmail.com)
🐙 [GitHub: Arpita23r](https://github.com/Arpita23r)
🔗 [LinkedIn](https://www.linkedin.com/in/arpita-roy-295498245/)

---

### 🧑‍💻 Supratim

📧 [maverickunfolded@gmail.com](mailto:maverickunfolded@gmail.com)

---

## 📜 License

🔐 This repository is **private** and intended for academic/personal use only.
🚫 Do not redistribute without permission.

---

🫁 *Breathe smarter. Stay healthier. Explore ChestVision 2.0.* 🚀

```
