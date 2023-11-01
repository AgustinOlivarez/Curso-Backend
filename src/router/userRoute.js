import { Router } from "express";
import { usersManager } from "../managers/UserManager.js";
import { compareData, hashData } from "../utils.js";
const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDB = await usersManager.findByEmail(email);
  if (!userDB) {
    return res.json({ error: "This email does not exist" });
  }
  const comparePassword = await compareData(password, userDB.password);
  if (!comparePassword) {
    return res.json({ error: "Email or password do not match" });
  }
  req.session["email"] = email;
  req.session["first_name"] = userDB.first_name;
  req.session["isAdmin"] =
    email === "adminCoder@coder.com" && password === "Cod3r123" ? true : false;
  res.redirect("/home");
});

router.post("/signup", async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashData(password);
  const createdUser = await usersManager.createOne({
    ...req.body,
    password: hashedPassword,
  });
  res.status(200).json({ message: "User created", createdUser });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
export default router;
