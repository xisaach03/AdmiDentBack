import { Router } from "express";
import welcomeRoutes from './welcome';
import registerRoutes from './register';
import loginRoutes from './login';
import homeRoutes from './home';


const router = Router();

router.get('', (req, res) => {
    res.send('Api works!');
})

router.use('/welcome', welcomeRoutes);
router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/home', homeRoutes);

export default router;