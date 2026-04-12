# Thinkora

Thinkora is a full-stack web application built using the **MERN** stack _(MongoDB, Express, React, Node.js)_. It features a robust backend for user authentication and automated email services.

---

## 🚀 Features

- **User Authentication**: Secure signup and login flow.

- **Email Notifications**: Automated emails powered by Nodemailer and Gmail SMTP.

- **Database Management**: Scalable data storage using MongoDB.

- **Modern UI**: Responsive frontend built with React and styled using Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Utilities**: Nodemailer, GitHub

---

## 📦 Installation & Setup

### 1. Initial Backend Setup

_If you are starting from scratch, initialize npm and install the core dependencies:_

```bash
npm init -y
npm i express mongoose jsonwebtoken dotenv cookie-parser bcrypt express-validator nodemailer cors
```

### 2. Clone the Repository

```bash
git clone [https://github.com/your-username/Thinkora.git](https://github.com/your-username/Thinkora.git)
cd Thinkora
```

### 3. Install Dependencies

_For the Backend:_

> npm install

_For the Frontend (React):_

> cd client && npm install

### 4. Environment Variables

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your_secret_key
```

### 5. Run the Application

```bash
# Run backend (from root)
npm run dev
```

### Project Structure

```bash
Thinkora/
├── controllers/    # Logic for handling API requests
├── models/         # MongoDB schemas (User, etc.)
├── routes/         # API endpoint definitions
├── services/       # External services (e.g., mail.service.js)
├── middleware/     # Auth and validation helpers
├── client/         # React frontend (Tailwind configured)
└── server.js       # Entry point for the backend
```

## Code Explanation

_1. Folder Structure_

**The project follows a Separation of Concerns pattern:**

- `models/`: Defines the data structure. For example, the User model defines fields like email and hashed passwords.

- `routes/`: Acts as the traffic controller. It maps URLs (like /api/signup) to specific logic.

- `services/`: Houses standalone logic like mail.service.js. Keeping Nodemailer here makes the code reusable.

- `client/:` The React application. This is where your Tailwind CSS and UI components live.

_2. Core Logic (The Backend)_

**The backend uses Express to handle requests. When a user interacts with the app:**

- The Route receives the request.

- The Controller processes data (e.g., using bcrypt to hash passwords).

- The Model saves the data to MongoDB.

- The Mail Service triggers a confirmation email via Gmail SMTP.
