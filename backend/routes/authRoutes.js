import express from "express"
import { addUser, login } from "../controllers/authController.js"
import { authLimiter } from "../middlewares/rateLimiter.js"
import { adminOnly, protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for Admin authentication and management
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Authentication]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                minLength: 6
 *     responses:
 *       200:
 *        description: Successful login, returns a JWT token and user info
 *       400:
 *        description: Validation error
 *       401:
 *        description: Invalid email or password
 */

router.post("/login", authLimiter, login)

/**
 * @swagger
 * /api/auth/add-user:
 *   post:
 *     summary: Add a new admin user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                minLength: 6
 *     responses:
 *       201:
 *        description: Successful user creation, returns a JWT token and user info
 *       400:
 *        description: Validation error
 *       401:
 *        description: Unauthorized
 *       403:
 *        description: Forbidden
 */

router.post("/add-user", protect, adminOnly, addUser)

export default router;
