import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";  // Asegúrate de instalar este paquete
import { IUser } from "../types/user";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL + "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Crear un objeto de usuario
      const user: IUser = {
        token: accessToken,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        password: '',
        role: '',
        status: ''
      };

      // Generar un JWT para el usuario
      const token = user;  // Llamar a la función que genera el JWT

      // Pasar el token al siguiente middleware
      return done(null, { user, token });
    }
  )
);


export default passport;
