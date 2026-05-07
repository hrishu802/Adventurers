# 🌍 Adventurers – Travel & Booking Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render)

🚀 **Live Demo**  
- 🌐 Frontend: https://adventurers-mocha.vercel.app/  
- ⚙️ Backend API: https://adventurers-3d1r.onrender.com  

📦 **GitHub Repository**  
👉 https://github.com/hrishu802/Adventurers  

---

# ✨ Overview

**Adventurers** is a modern full-stack travel booking and destination discovery platform built using the **MERN Stack**. The application enables users to explore curated travel packages, view destination details, create user profiles, and book adventures through a responsive and user-friendly interface.

The project demonstrates full-stack development concepts including:
- RESTful API architecture
- Authentication systems
- Cloud deployment
- MongoDB integration
- Frontend-backend communication
- Component-based UI design

---

# 🛠️ Tech Stack

## Frontend
- React.js (Create React App)
- React Router DOM
- CSS / Tailwind CSS
- Axios / Fetch API

## Backend
- Node.js
- Express.js
- TypeScript
- REST APIs

## Database
- MongoDB Atlas
- Mongoose ODM

## Deployment
- Vercel (Frontend Hosting)
- Render (Backend Hosting)
- MongoDB Atlas (Cloud Database)

---

# 🚀 Features

## ✅ Core Features
- 🏝️ Browse travel destinations
- 📦 Explore detailed travel packages
- 👤 User authentication system
- 🔐 Login & Signup functionality
- 🧾 Booking interface
- 📊 Profile dashboard
- 🌐 Cloud-hosted full-stack architecture

## ✅ Advanced Features
- 🔄 REST API integration
- ⚡ Responsive UI
- ☁️ MongoDB Atlas integration
- 🔒 Environment variable security
- 🚀 CI/CD deployment workflow
- 🧠 Component-based architecture

---

# 📸 Screenshots

## 🏠 Homepage
_Add homepage screenshot here_

## 📦 Packages Page
_Add packages screenshot here_

## 👤 Profile Dashboard
_Add profile screenshot here_

---

# ⚙️ Installation & Local Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/hrishu802/Adventurers.git
cd Adventurers
```

---

# 🔧 Backend Setup

```bash
cd server
npm install
```

Create `.env` file inside `server`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
ALLOWED_ORIGINS=http://localhost:3000
```

Run backend:

```bash
npm start
```

---

# 🎨 Frontend Setup

```bash
cd client
npm install
```

Create `.env` file inside `client`:

```env
REACT_APP_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm start
```

---

# 🔗 Environment Variables

## Backend (.env)

| Variable | Description |
|----------|-------------|
| MONGO_URI | MongoDB Atlas connection string |
| PORT | Backend server port |
| ALLOWED_ORIGINS | Allowed frontend domains |

---

## Frontend (.env)

| Variable | Description |
|----------|-------------|
| REACT_APP_API_URL | Backend API URL |

---

# 🌐 Deployment Architecture

## Hosting Platforms

| Component | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 🧠 System Architecture

```text
User
 ↓
React Frontend (Vercel)
 ↓ REST API Calls
Node.js + Express Backend (Render)
 ↓
MongoDB Atlas Database
```

---

# 📂 Project Structure

```text
Adventurers/
│
├── client/
│   ├── src/
│   ├── public/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│
└── README.md
```

---

# 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users/register | Register new user |
| POST | /api/users/login | User login |
| GET | /api/users/profile/:id | Fetch user profile |
| PUT | /api/users/:id | Update user profile |

---

# 🧩 Design Patterns Used

## MVC Architecture
- Model → MongoDB/Mongoose
- View → React Frontend
- Controller → Express Controllers

## Singleton Pattern
Used in frontend services to maintain a single service instance across the application.

## Service Layer Pattern
Encapsulates API communication logic from UI components.

## Component-Based Architecture
Reusable React components such as Navbar, Packages, and Profile.

## REST Architecture
Uses HTTP methods:
- GET
- POST
- PUT
- DELETE

## Middleware Pattern
Used in Express for:
- CORS handling
- JSON parsing
- Request processing

---

# 🧠 OOP Concepts Used

- Encapsulation
- Abstraction
- Inheritance
- Polymorphism
- Interfaces & Contracts

---

# 🧪 Testing & Debugging

- Manual API testing
- Frontend integration testing
- Deployment debugging
- CORS troubleshooting
- Environment variable validation

---

# ⚠️ Challenges Faced

| Challenge | Solution |
|-----------|----------|
| CORS errors | Configured backend whitelist |
| MongoDB connection | Environment variables |
| Deployment issues | Render + Vercel setup |
| State synchronization | React hooks & routing |

---

# 🚀 Future Improvements

- 💳 Payment gateway integration
- ⭐ Reviews & ratings
- 🔍 Advanced filtering system
- 📱 Improved mobile responsiveness
- 🧠 AI-based recommendations
- 🛠️ Admin dashboard
- 📧 Email notifications

---

# 👨‍💻 Authors

| Name | GitHub |
|------|--------|
| Hrishabh Prajapati | https://github.com/hrishu802 |
| Divyansh Bhartia | https://github.com/DivyanshBhartia |
| Lakshay Saharan | https://github.com/LakshaySaharan |
| Rahul Thalor | https://github.com/RahulThalor |
| Vidit Sachan | https://github.com/viditsachan |

---

# ⭐ Support

If you like this project:

- ⭐ Star this repository
- 🍴 Fork the project
- 🚀 Share with others

---

# 📚 Learning Outcomes

This project helped in understanding:
- MERN Stack architecture
- REST API development
- Cloud deployment workflows
- MongoDB schema design
- Authentication systems
- Software design patterns
- Frontend-backend integration

---

# 📌 License

This project is open-source and available under the MIT License.
