import express from "express";
// import { productsManager } from "./src/ProductManager.js";
import productsRouter from "./router/productsRoute.js"
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// get all products
// app.get("/api/products", async (req, res) => {
//   const {limit} = req.query
//   try {
//     const products = await productsManager.GetProducts(limit);
//     if (!products.length) {
//       return res.status(200).json({ message: "No products" });
//     }
//     res.status(200).json({ message: "Products found", products });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get("/api/products/:idProduct", async (req, res) => {
//   try {
//     const product = await productsManager.getProductById(+req.params.idProduct);
//     if (!product) {
//       return res.status(400).json({ message: "Product not found with the id" });
//     }
//     res.status(200).json({ message: "Product found", product });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.use("/", productsRouter);
// app.use("/api/cart", cartRouter);

app.listen(8080, () => {
  console.log("Escuchando al puerto 8080");
});
