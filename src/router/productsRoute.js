import { Router } from "express";
import { productsManager } from "../managers/ProductManager.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.findAllProducts(req.query);
    if (!products.length) {
      return res.status(200).json({ message: "No products found" });
    }
    res.status(200).json({ message: "Products found", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await productsManager.findById(idProduct);
    res.redirect(`/oneProduct/${product._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;
  let NewProduct = req.body;
  if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const result = await productsManager.createOne(req.body);
    res.status(200).json({ message: "Product Added", product: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:idProduct", async (req, res) => {
  const newValue = req.body;
  const { idProduct } = req.params;
  try {
    const product = await productsManager.updateOne(idProduct, newValue);
    if (response === -1) {
      res.status(400).json({ message: "Product not found with the id sent" });
    } else {
      res.status(200).json({ message: "Product updated", product });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  console.log(req.params);
  try {
    const product = await productsManager.deleteOne(idProduct);
    res.status(200).json({ message: "deleted Product", product });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
export default router;
