import { Router } from "express";
import auth from "../controllers/auth.controller"
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { authMiddleware } from "../middlewares/auth.middleware";
config();

const router = Router();
router.use(cookieParser(process.env.secretKey));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user and returns a success message with user data if credentials are valid.
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "A@example.com"
 *               password:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       200:
 *         description: Successful login. User data returned in cookie.
 *       400:
 *         description: Invalid credentials or account status.
 *       401:
 *         description: Wrong email or password.
 *       403:
 *         description: Account is deactivated.
 *       500:
 *         description: Server error.
 */
router.post('', auth.loginUser, (req, res) => {
    console.log('Req user?',req.user);
    const name = req.body.OtherUser?.name;
    res.send(`Welcome ${name}`);
})


/**
 * @swagger
 * /login:
 *   get:
 *     summary: Get welcome message
 *     description: Returns a welcome message for the authenticated user.
 *     tags: [Login]
 *     security:
 *       - bearerAuth: []  # Ajusta esto según tu esquema de autenticación
 *     responses:
 *       200:
 *         description: Welcome message for the authenticated user.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Welcome Juan Pérez"
 *       401:
 *         description: Unauthorized access, user not authenticated.
 *       500:
 *         description: Server error.
 */
router.get('', authMiddleware, (req, res) => {
    console.log('Req user?',req.user);
    const name = req.body.OtherUser?.name;
    res.send(`Welcome ${name}`);
})
//Test

export default router;