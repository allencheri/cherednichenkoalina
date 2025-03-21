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
import Stripe from "stripe";
import 'dotenv/config'

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
const uploadCv = path.join(__dirname, "uploads/cv");
if (!fs.existsSync(uploadCv)) {
  fs.mkdirSync(uploadCv);
}

const uploadImg = path.join(__dirname, "uploads/img");
if (!fs.existsSync(uploadImg)) {
  fs.mkdirSync(uploadImg);
}

// Configuración de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadCv); // Usa ruta absoluta para evitar errores
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo
  }
});

const storageImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadImg); // Usa ruta absoluta para evitar errores
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo
  }
});

const img = multer({ storage: storageImg });

const upload = multer({ storage: storage });

// Ruta para subir archivos
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se subió ningún archivo" });
  }
  res.json({ fileUrl: req.file.filename });
});

app.post("/uploadImg", img.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se subió ningún archivo" });
  }
  res.json({ fileUrl: req.file.filename });
});

app.delete("/uploads/cv/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", "cv", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }
  })

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error al eliminar el archivo", error: err });
    }
    res.json({ message: "Archivo eliminado correctamente" })
  })
})

// Servir archivos estáticos desde la carpeta uploads
app.use("/uploads/cv", express.static(uploadCv));
app.use("/uploads/img", express.static(uploadImg));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor en Marcha");
});


//Para pagos
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/crear-checkout-session", async (req, res) => {
  console.log("Recibida solicitud con body:", req.body);
  try {
    const { items, amount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No hay productos en el carrito" });
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "El monto no es válido" });
    }

    // Crear la sesión de Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.nombre,
        },
        unit_amount: item.precio * 100,

      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error al crear la sesión:", error);
    res.status(500).json({ error: "Error al crear la sesión" });
  }
});

mongoose.connect("mongodb://admin:abc123@localhost:27017/bbdd?authSource=admin")
  .then((db) => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));


server.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("port")}`);
});