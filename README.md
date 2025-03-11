# 🚀 3D CAD Viewer (STL/OBJ)

A web-based **3D model viewer** that supports **uploading, viewing, and exporting** STL/OBJ files.  
Built using **React (TypeScript), Three.js, Flask, and Trimesh** for 3D model conversion.

---

## 🔧 Installation & Setup

# Clone repo & move into project folder

git clone https://github.com/RahulVijaySingh/INSIDE.IO.git
cd INSIDE.IO

# Backend Setup

cd backend
pip install -r requirements.txt
python app.py & # Run backend in background

# Frontend Setup

cd ../frontend
npm install
npm run dev # Start frontend

## 📌 Features

✅ Upload & view STL and OBJ files in 3D  
✅ Rotate, zoom, and pan models with **Three.js**  
✅ Export **STL → OBJ** and **OBJ → STL**  
✅ Download converted files

---

## ⚡ Tech Stack

- **Frontend:** React (Vite + TypeScript), Three.js (`@react-three/fiber`, `@react-three/drei`)
- **Backend:** Flask (Python), Trimesh for model conversion
- **Storage:** Local file storage for uploads & exports

---
