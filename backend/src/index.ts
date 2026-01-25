/**
 * Express Server Entry Point
 * 
 * This is the main entry point for the backend Express server.
 * It sets up middleware, routes, and starts the server.
 */

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import enrollmentRoutes from './routes/enrollment.routes';
import paymentRoutes from './routes/payment.routes';
import userRoutes from './routes/user.routes';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

// Load environment variables
dotenv.config();

// Create Express application
const app: Application = express();

// Server configuration
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ===================
// Middleware Setup
// ===================

// Security middleware
app.use(helmet());

// CORS configuration - allows frontend to communicate with backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true,
}));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Request logging (development only)
if (NODE_ENV === 'development') {
  app.use(requestLogger);
}

// ===================
// API Routes
// ===================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV 
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);

// ===================
// Error Handling
// ===================

// Global error handler (must be last middleware)
app.use(errorHandler);

// ===================
// Server Startup
// ===================

app.listen(PORT, () => {
  console.log(`
🚀 FaxLab AI Backend Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Environment: ${NODE_ENV}
🔗 Server URL: http://localhost:${PORT}
📡 API Base: http://localhost:${PORT}/api
━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

export default app;
