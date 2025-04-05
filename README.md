# 🩻 ChestVision – AI-Powered Chest X-Ray Classification

> Detect COVID-19, Lung Opacity, Normal lungs, and Viral Pneumonia in X-ray images using deep learning.

![Made with love](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F%20and%20%E2%9A%A1-blueviolet)

---

## 🌐 Live Demo

🚀 **Frontend**: [https://chestvision.vercel.app](https://chestvision.vercel.app)  
🧠 **API Endpoint**: [https://chestvision-api.onrender.com/predict](https://chestvision-api.onrender.com/predict)

---

## 📸 What is ChestVision?

ChestVision is an AI-powered web app that uses a trained VGG16 deep learning model to classify chest radiography (X-ray) images into:

- 🦠 COVID-19  
- ☁️ Lung Opacity  
- ✅ Normal  
- 🧬 Viral Pneumonia

Upload an X-ray and get instant predictions backed by powerful AI. Built with **FastAPI + TensorFlow** on the backend and a **React.js** frontend. Clean UI, fast performance, and totally free to use.

---

## ⚙️ Tech Stack

| Tech       | Role                      |
|------------|---------------------------|
| 🐍 Python  | Backend API (FastAPI)     |
| 🧠 TensorFlow | Image Classification Model |
| ⚛️ React.js | Frontend (Upload & Display) |
| 🎨 CSS      | Styling (shades of blue & black) |
| ☁️ Render   | Backend Deployment        |
| ⚡ Vercel   | Frontend Deployment       |

---

## 🗂️ Folder Structure

```
ChestVision/
├── app.py                        # FastAPI backend
├── covid19_vgg16_combined.h5    # Trained VGG16 model
├── requirements.txt             # Dependencies for API
├── Procfile                     # For Render deployment
├── static/                      # Unused in frontend
│   └── uploads/                 # Image uploads
├── templates/                   # Base HTML (not used in React)
├── frontend/                    # React App here
│   ├── public/
│   └── src/
└── README.md                    # You're reading it 😉
```

---

## 🛠️ Getting Started

### 🧪 Backend (FastAPI)

```bash
git clone https://github.com/sgindeed/ChestVision.git
cd ChestVision
pip install -r requirements.txt
python app.py
```

> ⚠️ Ensure your model file `covid19_vgg16_combined.h5` is in the same directory.

---

### 💻 Frontend (React)

```bash
cd frontend
npm install
npm start
```

This will run your frontend on `http://localhost:3000`, connected to your backend at `http://localhost:8000`.

---

## 🌟 Features

✅ Upload chest X-ray images  
📊 Get AI predictions in real-time  
📱 Fully responsive UI  
🖤 Dark-themed with blue-black gradients  
🚀 Deployed & production-ready

---

## 🧠 Model Info

- Architecture: **VGG16**
- Trained on: Publicly available chest X-ray dataset
- Output Classes: `["COVID-19", "Lung_Opacity", "Normal", "Viral Pneumonia"]`

---

## 💌 Credits

Made with ❤️ and ⚡ by **Supratim**

[![GitHub](https://img.shields.io/badge/GitHub-sgindeed-181717?style=for-the-badge&logo=github)](https://github.com/sgindeed)

---

## 🌈 Show Some Love

If you liked this project, drop a ⭐ on [GitHub](https://github.com/sgindeed/ChestVision)  
or share it with your tech buddies 💬

```
