import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import { getDashboardStatus } from "../controllers/dashboardController.js"

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard Analytics (Admin)
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard analytics for graphs (admin)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *        description: Dashboard stats payload for graphs
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */

router.get("/stats", protect, adminOnly, getDashboardStatus);


export default router;
