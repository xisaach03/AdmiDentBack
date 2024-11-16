import { Router } from "express";
import auth from "../controllers/auth.controller"
import { sendRegisterEmail } from "../controllers/email.controller";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user in the system.
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: "active"
 *       400:
 *         description: Error creating the user, email is already in use.
 *       500:
 *         description: Server error.
 */
router.post('', auth.registerUser, sendRegisterEmail)

export default router;