📝 Todo-App | MERN Stack Task Manager

A modern, scalable, and secure task management application built with the MERN stack. It features a high-fidelity "Glassmorphism" UI, robust authentication, and a responsive dashboard for managing your daily tasks efficiently.

🚀 Features

🔐 Secure Authentication: User registration and login using JWT (JSON Web Tokens) and HTTP-only practices.

🎨 Modern UI/UX: Built with React + Vite and Tailwind CSS, featuring a dark-mode-first "Glassmorphism" aesthetic.

📊 Dashboard: Real-time statistics of your tasks (Total, Completed, Pending, In-Progress).

📱 Fully Responsive: Adaptive layout that works seamlessly on desktops, tablets, and mobile devices.

⚡ Instant Updates: Optimistic UI updates for a snappy user experience.

🛡️ Protected Routes: Dashboard access is restricted to authenticated users only.

🔔 Smart Notifications: Custom toast notifications replacing standard browser alerts.

🛠️ Tech Stack

Frontend

Framework: React.js (via Vite)

Styling: Tailwind CSS, PostCSS

State Management: React Context API

Icons: Lucide React

HTTP Client: Axios (with Interceptors)

Backend

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT & Bcryptjs

CORS: Cross-Origin Resource Sharing enabled

📂 Project Structure

taskmaster-pro/
├── 📂 backend/                 # Node.js API Server
│   ├── 📂 src/
│   │   ├── 📂 config/          # Database connection logic
│   │   ├── 📂 controllers/     # Business logic for Auth & Tasks
│   │   ├── 📂 middleware/      # JWT Authentication middleware
│   │   ├── 📂 models/          # Mongoose Schemas (User, Task)
│   │   ├── 📂 routes/          # API Route definitions
│   │   └── index.js            # Server entry point
│   └── package.json
│
└── 📂 frontend/                # React Client
    ├── 📂 src/
    │   ├── 📂 components/      # Reusable UI components (Buttons, Cards, Inputs)
    │   ├── 📂 context/         # Global Auth State Provider
    │   ├── 📂 pages/           # Dashboard & Login Views
    │   ├── 📂 services/        # Axios API configuration
    │   ├── App.jsx             # Main Application Layout
    │   └── main.jsx            # React Entry Point
    ├── index.html              # HTML Root
    ├── tailwind.config.js      # Tailwind Configuration
    └── vite.config.js          # Vite Configuration (Proxy setup)


⚡ Getting Started

Follow these steps to set up the project locally on your machine.

Prerequisites

Node.js (v16 or higher)

MongoDB (Local service running or Atlas URI)

1. Clone the Repository

git clone [https://github.com/yourusername/todo-app.git](https://github.com/yourusername/todo-app.git)
cd todo-app


2. Backend Setup

Navigate to the backend folder and install dependencies.

cd backend
npm install


Configure Database:
Ensure your local MongoDB is running (mongod) or update backend/src/config/db.js with your MongoDB connection string.

Start the Server:

npm run dev


Output should confirm: Server started on port 5000 & MongoDB Connected

3. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies.

cd ../frontend
npm install


Start the Client:

npm run dev


The app will run at http://localhost:5173

📸 Screenshots

Login Page

Dashboard





(Replace these placeholders with actual screenshots of your beautiful UI!)

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License

Distributed under the MIT License. See LICENSE for more information.

Developed by [Your Name]
