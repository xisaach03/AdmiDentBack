import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

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
      callbackURL: "http://localhost:3000/auth/google/callback",

    },
    (accessToken, refreshToken, profile, done) => {
      // Aquí puedes manejar la lógica de usuario
      // Por ejemplo: Crear o buscar un usuario en tu base de datos
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
      };
      return done(null, user);
    }
  )
);

export default passport;
