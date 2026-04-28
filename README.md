# 🌍 Adventurers – Travel & Booking Platform

🚀 Live Demo:  
- 🌐 Frontend: https://adventurers-mocha.vercel.app/  
- ⚙️ Backend: https://adventurers-3d1r.onrender.com  

📦 GitHub Repository:  
👉 https://github.com/hrishu802/Adventurers  

---

## ✨ Overview

**Adventurers** is a full-stack travel web application that allows users to explore destinations, view travel packages, and make bookings. It provides a smooth user experience with a modern UI and real-time backend integration.

---

## 🛠️ Tech Stack

### Frontend
- React (Create React App)
- CSS / Tailwind

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)

---

## 🚀 Features

- 🏝️ Browse travel destinations  
- 📦 View detailed travel packages  
- 💳 Booking form for trips  
- 👤 User profile system  
- 🔐 Authentication (Login/Signup)  
- 🌐 Fully deployed (Frontend + Backend + Database)

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/hrishu802/Adventurers.git
cd Adventurers
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm start
```

---

## 🔗 Environment Variables

### Backend (.env)
- MONGO_URI → MongoDB Atlas connection string  
- PORT → Server port  

### Frontend (.env)
- REACT_APP_API_URL → Backend API URL  

---

## 🌐 Deployment

- Frontend deployed on Vercel  
- Backend deployed on Render  
- Database hosted on MongoDB Atlas  

---

## 🧠 Architecture

```
User → Vercel (Frontend)
        ↓ API Calls
     Render (Backend)
        ↓
   MongoDB Atlas
```

---

## ⚠️ Known Issues

- First request may be slow (Render free tier sleep)  
- Profile editing improvements pending  
- Logout feature recently added  

---

## 🚀 Future Improvements

- Profile editing system  
- Payment integration (Stripe/Razorpay)  
- Mobile responsiveness improvements  
- Reviews & ratings system  
- AI-based travel recommendations  

---

## 👨‍💻 Authors

- **Hrishabh Prajapati**  
  GitHub: https://github.com/hrishu802  

- **Divyansh Bhartia**  
  GitHub: https://github.com/DivyanshBhartia  

- **Lakshay Saharan**  
  GitHub: https://github.com/LakshaySaharan  

- **Rahul Thalor**  
  GitHub: https://github.com/RahulThalor  

- **Vidit Sachan**  
  GitHub: https://github.com/viditsachan    

---

## ⭐ Support

If you like this project:

- ⭐ Star this repo  
- 🍴 Fork it  
- 🚀 Share it  

---

## 📌 License

This project is open-source and available under the MIT License.
