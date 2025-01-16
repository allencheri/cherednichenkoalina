// zona de importaciones
import express from "express";
import http from "http";
import morgan from "morgan";
import mongoose from "mongoose";
import rutas from "./router/rutas.mjs";
import cors from 'cors';

// creamos un servidor
const app = express();

const server = http.createServer(app);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(morgan("dev"));
app.use(express.json());

// eligimos el puerto
app.use(morgan("dev"));
app.use(express.json());
app.use(rutas);
app.set("port", process.env.PORT || 5000);
app.get("/", (req, res) => {
  res.send("Servidor en Marcha");
});

//cuando lanzemos el servidor express ponga un mensaje que todo bien
server.listen(app.get("port"), () => {
  console.log("Servidor corriendo en el puerto ", app.get("port"));
});

mongoose.connect("mongodb://root:renaido@localhost:27017/bbdd?authSource=admin")
  .then((db) => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));