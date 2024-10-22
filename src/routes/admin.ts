import { Router } from "express";
import { authMiddleware } from "../controllers/cookie.controller";
import { isAdminMiddleware, changePassword, changeRole, changeStatus} from "../controllers/admin.controller";

const router = Router();

router.use(authMiddleware)
router.use(isAdminMiddleware)

router.put('/pswd', changePassword, (req, res) => {
    res.send("You've changed your password successfuly")
})

router.put('/role', changeRole, (req, res) => {
    res.send("You've changed your role successfuly")
})

router.put('/status', changeStatus, (req, res) => {
    res.send("You've changed your status successfuly")
})

export default router;