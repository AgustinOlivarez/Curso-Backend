import { Router } from "express";
import { productsManager } from "./../ProductManager.js";
const router = Router();

router.get("/api/products", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productsManager.GetProducts(limit);
    if (!products.length) {
      return res.status(200).json({ message: "No products" });
    }
    res.status(200).json({ message: "Products found", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/api/products/:idProduct", async (req, res) => {
  try {
    const product = await productsManager.getProductById(+req.params.idProduct);
    if (!product) {
      return res.status(400).json({ message: "Product not found with the id" });
    }
    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/products", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;
  let NewProduct = req.body;
  if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const result = await productsManager.addProduct(NewProduct);
    res.status(200).json({ message: "Product Added", product: result });
    req.product = result;
    res.redirect(`/api/products/${result.id}`);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// terminar update
router.put("/api/products/:idProduct", async (req, res) => {
  const newValue = req.body
  const { idProduct } = req.params
  console.log(newValue)
  console.log(req.params)
  try {
    const response = await productsManager.updateProduct(idProduct, newValue)
    if (response === -1) {
      res.status(400).json({ message: "Product not found with the id sent" });
    } else {
      res.status(200).json({ message: "Product updated" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }

});

router.delete("/api/products/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  console.log(req.params)
  try {
    const response = await productsManager.deleteProduct(+idProduct);
    if (response === -1) {
      res.status(400).json({ message: "Product not found with the id sent" });
    } else {
      res.status(200).json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }

});
export default router;
