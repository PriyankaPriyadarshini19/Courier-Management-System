import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import dotenv from 'dotenv';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUI from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { globalLimiter } from './middlewares/rateLimiter.js';
import { swaggerSpec } from './config/swagger.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

// Router files
import authRoutes from "./routes/authRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());

//Global API rate limiter
app.use(globalLimiter);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/health", (req,res) => {
    res.status(200).json({ status:"ok", message: "Server is healthy"});
});

app.use("/api/auth", authRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app; 