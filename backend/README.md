# FaxLab AI - Backend

Express.js + TypeScript backend for the FaxLab AI learning platform.

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers (business logic)
│   ├── middleware/      # Express middleware (auth, error handling, etc.)
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic & database operations
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and helpers
│   ├── validators/      # Request validation schemas (Zod)
│   └── index.ts         # Server entry point
├── .env.example         # Environment variables template
├── tsconfig.json        # TypeScript configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Fill in your environment variables in `.env`

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Enrollments
- `GET /api/enrollments` - Get user enrollments
- `POST /api/enrollments` - Enroll in a course
- `GET /api/enrollments/:courseId/progress` - Get course progress
- `POST /api/enrollments/:courseId/progress` - Update progress

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Get payment history

### Users
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/certificates` - Get certificates
- `GET /api/users/dashboard-stats` - Get dashboard stats

## 🔧 Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests
```

## 🏗️ Architecture

This backend follows a **layered architecture**:

1. **Routes** - Define API endpoints and connect to controllers
2. **Controllers** - Handle HTTP requests/responses, delegate to services
3. **Services** - Contain business logic and database operations
4. **Middleware** - Cross-cutting concerns (auth, logging, validation)

### Key Design Decisions

- **Clean separation of concerns** - Each layer has a specific responsibility
- **Dependency injection ready** - Services can be easily mocked for testing
- **Type-safe** - Full TypeScript support with strict mode
- **Validation first** - All inputs validated with Zod schemas
- **Error handling** - Centralized error handling with custom AppError class

## 🔐 Security

- JWT-based authentication via Supabase
- Request validation with Zod
- Helmet.js for security headers
- CORS configuration
- Rate limiting (add as needed)

## 📝 License

MIT
