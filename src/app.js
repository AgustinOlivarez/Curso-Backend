import express from "express";
import { engine } from "express-handlebars";
import productsRouter from "./router/productsRoute.js";
import cartRouter from "./router/cartRoute.js";
import viewsRouter from "./router/viewRoute.js"
import { productsManager } from "./managers/ProductManager.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();
// Config Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});

// websocket - server
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("createProduct", async (product) => {
    const newProduct = await productsManager.addProduct(product);
    socket.emit("productCreated", newProduct);
  });
});

// Routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);


