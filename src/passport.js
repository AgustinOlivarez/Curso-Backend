import passport from "passport";
import { usersManager } from "./managers/UserManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";

// LOCAL
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userDB = await usersManager.findByEmail(email);
        if (userDB) {
          return done(null, false);
        }
        const hashedPassword = await hashData(password);
        const createdUser = await usersManager.createOne({
          ...req.body,
          password: hashedPassword,
        });
        done(null, createdUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const userDB = await usersManager.findByEmail(email);
        if (!userDB) {
          return done(null, false);
        }
        const isValid = await compareData(password, userDB.password);
        if (!isValid) {
          return done(null, false);
        }
        done(null, userDB);
      } catch (error) {
        done(error);
      }
    }
  )
);

// GITHUB

passport.use(
  new GithubStrategy(
    {
      clientID: "Iv1.616015b1f65fec46",
      clientSecret: "e02f7d7a8826be154661afa3bb7782a8a04500ba",
      callbackURL: "http://localhost:8080/api/users/github",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("profile", profile);
      done(null, false);
      try {
        const userDB = await usersManager.findByEmail(profile.email);
        // login
        if (userDB) {
          if (userDB.from_github) {
            return done(null, userDB);
          } else {
            return done(null, false);
          }
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
