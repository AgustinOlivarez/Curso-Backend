import express from "express";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import productsRouter from "./router/productsRoute.js";
import cartRouter from "./router/cartRoute.js";
import viewsRouter from "./router/viewRoute.js";
import chatRouter from "./router/chatRoute.js";
import usersRouter from "./router/userRoute.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import "./db/config.js";
import { messageManager } from "./managers/messagesManager.js";
import session from "express-session";
import FileStore from "session-file-store";
import mongoStore from "connect-mongo";
import passport from "passport";
import "./passport.js";

const app = express();
// Config Express
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Session Mongo
const URI =
    "mongodb+srv://aolivarez:Agus29022000@micluster.c9jldbe.mongodb.net/mongooseCursoCoder?retryWrites=true&w=majority";
app.use(
  session({
    secret: "SESSIONSECRETKEY",
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new mongoStore({
      mongoUrl: URI,
    }),
  })
);

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

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/messages", chatRouter);
app.use("/api/users", usersRouter);


