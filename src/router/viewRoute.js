import { Router } from "express";
import { productsManager } from "../managers/ProductManager.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/home", async (req, res) => {
  const products = await productsManager.findAllSimpleProducts();
  console.log("req", req);
  const { email, first_name } = req.session;
  res.render("all", { products, email, first_name });
});

router.get("/createProduct", (req, res) => {
  res.render("createProduct");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/carts", (req, res) => {
  res.render("carts");
});

router.get("/productsFetch", (req, res) => {
  res.render("productsFetch");
});

router.get("/products", async (req, res) => {
  const products = await productsManager.findAllSimpleProducts();
  res.render("all", { products });
});

router.get("/oneProduct/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const productInfo = await productsManager.findById(idProduct);
  const { price, title, description, category, _id } =
    productInfo;
  res.render("oneProduct", {
    price,
    title,
    description,
    category,
    _id
  });
});

export default router;