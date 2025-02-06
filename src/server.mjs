// zona de importaciones
import express from "express";
import http from "http";
import morgan from "morgan";
import mongoose from "mongoose";
import rutas from "./router/rutas.mjs";
import cors from 'cors';
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creación del servidor
const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(rutas);

// Definir puerto
app.set("port", process.env.PORT || 5000);

// Verificar si la carpeta "uploads" existe, si no, crearla
const uploadDir = path.join(__dirname, "uploads/cv");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Usa ruta absoluta para evitar errores
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo
  }
});

const upload = multer({ storage: storage });

// Ruta para subir archivos
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se subió ningún archivo" });
  }
  res.json({ fileUrl: `http://localhost:${app.get("port")}/uploads/cv/${req.file.filename}` });
});

// Servir archivos estáticos desde la carpeta uploads
app.use("/uploads/cv", express.static(uploadDir));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor en Marcha");
});

mongoose.connect("mongodb://root:renaido@localhost:27017/bbdd?authSource=admin")
  .then((db) => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));


server.listen(app.get("port"), () => {
console.log(`Servidor corriendo en http://localhost:${app.get("port")}`);
});