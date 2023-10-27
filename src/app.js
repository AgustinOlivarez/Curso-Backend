import express from "express";
import { engine } from "express-handlebars";
import productsRouter from "./router/productsRoute.js";
import cartRouter from "./router/cartRoute.js";
import viewsRouter from "./router/viewRoute.js";
import chatRouter from "./router/chatRoute.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import "./db/config.js";
import { messageManager } from "./managers/messagesManager.js";

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

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Cliente Conectado ${socket.id}`);
  socket.on("disconnect", () => {
      console.log(`Cliente desconectado ${socket.id}`);
  });

  socket.on("bodyMessage", async (message) => {
      const newMessage = await messageManager.createOne(message);
      socketServer.emit("messageCreated", newMessage);
  });
});

// Routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/messages", chatRouter);


