import { Router } from "express";
import passport from "passport";
const router = Router();

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/error",
  })
);

router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/home",
    failureRedirect: "/error",
  })
);

// GITHUB

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github",
  passport.authenticate("github", {
    failureRedirect: "/error",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/home");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
export default router;
