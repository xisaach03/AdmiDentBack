import { Router } from "express";
import passport from "../middlewares/google-auth";
import jwt from "jsonwebtoken";  // Importa el paquete JWT
import cookieParser from "cookie-parser";  // Importa el middleware para manejar cookies

const router = Router();

// Middleware para parsear cookies
router.use(cookieParser());

// Ruta para iniciar sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Ruta de callback después de la autenticación de Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    // Una vez que el usuario esté autenticado, genera el token JWT
    const token = req.user;  // `req.user` contiene la información del usuario autenticado
    
    // Guarda el token en las cookies
    res.cookie("user", token, { 
      httpOnly: false,  // Hace la cookie inaccesible desde JavaScript
      secure: process.env.NODE_ENV === 'production',  // Asegura que solo se pueda acceder en HTTPS en producción
      maxAge: 3600000  // Expiración de 1 hora
    });
    
    // Redirige a la página de inicio (home)
    res.redirect("http://localhost:4200/home");
  }
);


// Ruta de fallo
router.get("/failure", (req, res) => {
  res.send("Error al iniciar sesión");
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error al cerrar sesión");
    }
    res.send("Sesión cerrada");
  });
});

export default router;
