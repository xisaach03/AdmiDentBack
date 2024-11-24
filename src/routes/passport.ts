import { Router } from "express";
import passport from "../middlewares/google-auth";

const router = Router();

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
    res.redirect("/auth/success");
  }
);

// Ruta de éxito
router.get("/success", (req, res) => {
  res.send("Inicio de sesión exitoso");
});

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
