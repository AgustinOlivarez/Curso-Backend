import mongoose from "mongoose";
const URI =
  "mongodb+srv://aolivarez:Agus29022000@micluster.c9jldbe.mongodb.net/mongooseCursoCoder?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la DB"))
  .catch((error) => console.log(error));
