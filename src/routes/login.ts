import { Router } from "express";
import auth from "../controllers/auth.controller"
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import authMiddleware from "../controllers/cookie.controller";
config();

const router = Router();
router.use(cookieParser(process.env.secretKey));


router.post('', auth.loginUser, (req, res) => {
    const { found, user } = req.body
    console.log("found: ", found)
    console.log("json:", user)
    if (found) {
        res.cookie('user', JSON.stringify(user), { signed: true });
        res.send('Success');
    } else {
        res.sendStatus(400);
    }
})

router.get('', authMiddleware, (req, res) => {
    console.log('Req user?',req.user);
    const name = req.user?.name;
    res.send(`Welcome ${name}`);
})

export default router;