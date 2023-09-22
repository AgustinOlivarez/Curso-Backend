import { Router } from "express";
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


export default router