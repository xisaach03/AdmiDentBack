import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { body } from "express-validator";
import { isAdminMiddleware, changePassword, changeRole, changeStatus} from "../middlewares/admin.middleware";

const router = Router();

router.use(authMiddleware)
router.use(isAdminMiddleware)

router.put('/pswd', body('email').isEmail(), changePassword, (req, res) => {
    res.send("You've changed your password successfuly")
})

router.put('/role', body('email').isEmail(), changeRole, (req, res) => {
    res.send("You've changed your role successfuly")
})

router.put('/status', body('email').isEmail(), changeStatus, (req, res) => {
    res.send("You've changed your status successfuly")
})

export default router;