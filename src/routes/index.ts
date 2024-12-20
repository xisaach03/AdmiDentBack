import { Router } from "express";
import welcomeRoutes from './welcome';
import registerRoutes from './register';
import loginRoutes from './login';
import homeRoutes from './home';
import { logout } from "../middlewares/auth.middleware";
import admin from "./admin";
import clientRoutes from './client';
import treatmentRoutes from './treatment';
import passport from "./passport";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check API status
 *     description: Returns a simple message indicating that the API is working.
 *     tags: [Index]
 *     responses:
 *       200:
 *         description: Successful operation. Returns a confirmation message.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Api works!
 *       500:
 *         description: Internal server error.
 */
router.get('', (req, res) => {
    res.send('Api works!');
});

router.post('/logout', logout, (req, res) => {
    res.send("You've logged out successfuly")
})

router.use('/welcome', welcomeRoutes);
router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/home', homeRoutes);
router.use('/admin', admin);
router.use('/clients', clientRoutes);
router.use('/treatment', treatmentRoutes);
router.use("/auth", passport);


export default router;