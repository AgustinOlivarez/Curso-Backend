import { Router } from "express";
import { productsManager } from "../managers/ProductManager.js";
const router = Router();

router.get("/home", async (req, res) => {
  const products = await productsManager.GetProducts();
  res.render("home", { products });
});

router.get("/realtime", async (req, res) => {
  const products = await productsManager.GetProducts();
  res.render("realTimeProducts", { products });
});

export default router;