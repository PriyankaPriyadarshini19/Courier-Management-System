import express from "express"
import { addCheckpoint, calculateCostCalculator, createParcel, getAllParcels, getParcelByTrackingId } from "../controllers/parcelController.js"
import { authLimiter } from "../middlewares/rateLimiter.js"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Parcels
 *   description: Endpoints for managing parcels
 */

/**
 * @swagger
 * /api/parcels:
 *   post:
 *     summary: Create a new parcel (admin)
 *     tags: [parcels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              senderName:
 *                type: String
 *              senderPhone:
 *                type: string
 *              senderAddress:
 *                type: string
 *              receiverName:
 *                type: string
 *              receiverPhone:
 *                type: string
 *              receiverAddress:
 *                type: string
 *              shipmentType:
 *                type: string
 *                enum: [national, international]
 *              originCity:
 *                type: string 
 *              destinationCity:
 *                type: string 
 *              deliveryType:
 *                type: string
 *                enum: [sameDay, overnight, standard]
 *              category:
 *                type: string
 *                enum: [document, electronics, fragile, clothing, food, medicine, cosmetics, books, small_package, large_package]
 *              weight:
 *                type: number
 *            example:
 *              senderName: Priyanka Behera
 *              senderPhone: +91-9692606890
 *              senderAddress: Street 01, Bhubaneswara
 *              receiverName: Satyajit Mohanty
 *              receiverPhone: +91-8144058789
 *              receiverAddress: Street 10, Jagatshingpur
 *              shipmentType: national
 *              originCity: Bhubaneswara
 *              destinationCity: Jagatshingpur
 *              deliveryType: overnight
 *              parcelCategory: electronics
 *              weight: 3.5
 *     responses:
 *       201:
 *        description: Parcel created successfully
 *       400:
 *        description: Validation error
 *       401:
 *        description: Unauthorized (missing or invalid token)
 */

router.post("/", protect, adminOnly, createParcel);

/**
 * @swagger
 * /api/parcels/track/{trackingId}:
 *   get:
 *     summary: Get parcel by tracking Id (public)
 *     tags: [parcels]
 *     parameters:
 *       - in: path
 *         name: trackingId
 *         schema:
 *           type: string 
 *     responses:
 *       200:
 *        description: Parcel details with checkpoints
 *       404:
 *        description: Parcel not found
 */

router.get("/track/:trackingId", getParcelByTrackingId);


/**
 * @swagger
 * /api/parcels/{id}/checkpoint:
 *   post:
 *     summary: Add a new Checkpoint to Parcel (admin)
 *     tags: [parcels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              location:
 *                type: string
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              status:
 *                type: string
 *                enum: [arrived, in_transit, out_for_delivery, delivered]
 *            example:
 *              location: Warehouse A
 *              title: In Transit
 *              description: Parcel is currently in transit
 *              status: in_transit
 *     responses:
 *       201:
 *        description: Checkpoint added successfully
 *       400:
 *        description: Validation error
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 *       404:
 *        description: Parcel not found
 */

router.post("/:id/checkpoint", protect, adminOnly, addCheckpoint)


/**
 * @swagger
 * /api/parcels:
 *   get:
 *     summary: Get all parcels (admin)
 *     tags: [parcels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [arrived, in_transit, out_for_delivery, delivered]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: List of parcels with pagination and optional filtering
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */

router.get("/", protect, getAllParcels);


/**
 * @swagger
 * /api/parcels/calculate-cost:
 *   post:
 *     summary: Calculate parcel cost
 *     tags: [parcels]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - originCity
 *              - destinationCity
 *              - shipmentType
 *              - parcelCategory
 *              - weight
 *              - deliveryType
 *            properties:
 *              originCity:
 *                type: string
 *              destinationCity:
 *                type: string
 *              shipmentType:
 *                type: string
 *                enum: [national, international]
 *              parcelCategory:
 *                type: string
 *                enum: [document, electronics, fragile, clothing, food, medicine, cosmetics, books, small_package, large_package]
 *              weight:
 *                type: number
 *              deliveryType:
 *                type: String
 *                enum: [sameDay, overnight, standard]
 *     responses:
 *       200:
 *        description: Parcel cost calculated successfully
 *       400:
 *        description: Validation error
 */

router.post("/calculate-cost", calculateCostCalculator);

export default router;
