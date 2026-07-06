import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import{
    getDeliveryPerformance,
    getParcelGrowth,
    getRevenueAnalytics,
    getTopCities,
    getAnalyticsSummary,
} from "../controllers/analyticsController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics endpoints for admin charts (Admin)
 */

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Analytics summary cards (admin)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *        description: Summary totals and status distribution
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */

router.get("/summary", protect, adminOnly, getAnalyticsSummary);

/**
 * @swagger
 * /api/analytics/revenue:
 *   get:
 *     summary: Revenue analytics (admin)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *        description: Revenue data for the past 12 months
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */

router.get("/revenue", protect, adminOnly, getRevenueAnalytics);

/**
 * @swagger
 * /api/analytics/parcels:
 *   get:
 *     summary: Parcel growth analytics (admin)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *        description: Parcel growth data for the past 12 months
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */

router.get("/parcels", protect, adminOnly, getParcelGrowth);

/**
 * @swagger
 * /api/analytics/top-cities:
 *   get:
 *     summary: Top cities analytics (admin)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *        description: Top cities data for the past 12 months
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */

router.get("/top-cities", protect, adminOnly, getTopCities);

/**
 * @swagger
 * /api/analytics/delivery-performance:
 *   get:
 *     summary: Delivery performance analytics (admin)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *        description: Delivery performance data for the past 12 months
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */

router.get("/delivery-performance", protect, adminOnly, getDeliveryPerformance);

export default router;