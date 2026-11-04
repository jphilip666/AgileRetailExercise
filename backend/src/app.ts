import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import apiV1ProductRoutes from '@/routes/v1/productRoutes.js';
import apiV1TasktRoutes from '@/routes/v1/taskRoutes.js';

const app: Express = express();

// CORS Middleware
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

// JSON Middleware
app.use(express.json());

// Routes
app.use('/api/v1/products', apiV1ProductRoutes);
app.use('/api/v1/tasks', apiV1TasktRoutes);

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
    res.send('Server is running!');
});

// 404 handler (last route-level middleware)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
