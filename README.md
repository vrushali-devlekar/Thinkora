# Thinkora

A full-stack MERN application featuring user authentication, email services, and a modern React frontend with dark theme UI.

##  Features

### Backend

- **User Authentication**: Secure signup/login with JWT tokens
- **Email Notifications**: Automated emails via Gmail SMTP with Nodemailer
- **Database Management**: MongoDB with Mongoose ODM
- **API Validation**: Express-validator for input sanitization
- **Security**: Password hashing with bcrypt, CORS protection
- **Email Verification**: Token-based email verification system

### Frontend

- **Modern React 19** with hooks and functional components
- **Redux Toolkit** for state management
- **React Router** for client-side routing
- **Tailwind CSS** for styling with dark theme
- **Axios** for API communication
- **Responsive Design** with mobile-first approach

## 🏗️ Architecture

### Project Structure

```html
Thinkora/
├── backend/                 # Backend application
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   └── auth.controller.js
│   │   ├── models/          # MongoDB schemas
│   │   │   └── user.model.js
│   │   ├── routes/          # API routes
│   │   │   └── auth.routes.js
│   │   ├── services/        # External services
│   │   │   └── mail.service.js
│   │   ├── middleware/      # Auth & validation
│   │   │   └── auth.middleware.js
│   │   ├── validators/      # Input validation
│   │   │   └── auth.validator.js
│   │   └── config/          # Database config
│   ├── server.js            # Entry point
│   ├── package.json
│   └── .env                 # Environment variables
├── frontend/                # Frontend application
│   ├── src/
│   │   ├── app/            # App configuration
│   │   │   ├── App.jsx     # Main component
│   │   │   ├── app.routes.jsx # Routes
│   │   │   ├── app.store.js # Redux store
│   │   │   └── index.css   # Global styles
│   │   ├── features/       # Feature modules
│   │   │   ├── auth/       # Authentication
│   │   │   │   ├── pages/  # Login/Register
│   │   │   │   ├── hooks/  # Auth hooks
│   │   │   │   └── service/# Auth API & Redux
│   │   │   └── chat/       # Chat feature
│   │   └── main.jsx        # App entry
│   ├── public/             # Static assets
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite config
│   └── package.json
└── README.md               # This file
```

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Express-validator
- **Security**: bcrypt, CORS
- **Email**: Nodemailer with Gmail SMTP

### Frontend

- **Library**: React 19
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Gmail account (for email service)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Thinkora
   ```
1. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```
1. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

### Environment Configuration

Create `.env` file in the `backend` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/thinkora
GOOGLE_USER=your-email@gmail.com
GOOGLE_PASSWORD=your-app-password
JWT_SECRET=your-super-secret-jwt-key
GEMINI_API_KEY=your-gemini-api-key
```

### Database Setup

1. **Start MongoDB** (if running locally)

   ```bash
   mongod
   ```
1. **The application will automatically create collections** when you run it.

### Running the Application

1. **Start Backend** (from backend directory)

   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```
1. **Start Frontend** (from frontend directory)

   ```bash
   npm run dev
   ```
1. **Access the application**

   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint                 | Description       | Access  |
| ------ | ------------------------ | ----------------- | ------- |
| POST   | `/api/auth/register`     | User registration | Public  |
| POST   | `/api/auth/login`        | User login        | Public  |
| GET    | `/api/auth/get-me`       | Get current user  | Private |
| GET    | `/api/auth/verify-email` | Verify email      | Public  |

### Request/Response Examples

**Registration:**

```json
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login:**

```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

## 🎨 Frontend Features

### Authentication Flow

- **Registration**: Form validation, API call, email verification
- **Login**: JWT token storage, Redux state management
- **Protected Routes**: Automatic redirects for unauthenticated users

### UI Components

- **Dark Theme**: Slate-based color palette with red accents
- **Glassmorphism**: Backdrop blur effects on forms
- **Responsive**: Mobile-first design with Tailwind utilities
- **Loading States**: Redux-managed loading indicators

### State Management

- **Auth Slice**: User data, loading states, error handling
- **API Integration**: Axios interceptors for token handling

## 🔧 Development

### Available Scripts

**Backend:**

```bash
npm start      # Production server
npm run dev    # Development with nodemon
```

**Frontend:**

```bash
npm run dev    # Development server
npm run build  # Production build
npm run lint   # ESLint check
npm run preview # Preview production build
```

### Code Quality

- **ESLint**: Configured for both backend and frontend
- **Prettier**: Code formatting (if configured)
- **TypeScript Support**: Type definitions included

## 🚀 Deployment

### Backend Deployment

1. Set production environment variables
2. Use a process manager like PM2
3. Configure MongoDB Atlas for production database
4. Set up proper CORS origins

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy `dist/` folder to static hosting
3. Configure API base URLs for production

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb+srv://...
GOOGLE_USER=your-production-email@gmail.com
GOOGLE_PASSWORD=your-production-app-password
JWT_SECRET=your-production-jwt-secret
```

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: HTTP-only cookies for session management
- **Input Validation**: Comprehensive validation with express-validator
- **CORS Protection**: Configured for cross-origin requests
- **Email Verification**: Token-based account activation

## 📧 Email Service

### Gmail SMTP Configuration

- Uses OAuth2/App Password authentication
- Automated welcome emails
- Email verification system
- Error handling and logging

### Email Templates

- Welcome message for new users
- Verification links with JWT tokens
- Professional HTML formatting

## 🤝 Contributing

1. Follow the existing folder structure
2. Use feature-based organization for frontend
3. Maintain consistent API response formats
4. Add proper error handling
5. Test authentication flows thoroughly

## 📝 License

This project is developed for educational and portfolio purposes.

## 🔗 Links

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`
- **MongoDB**: Local or Atlas connection

---

**Happy Coding! 🚀**