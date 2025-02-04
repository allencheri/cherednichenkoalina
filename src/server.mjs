// Zona de importaciones
import express from 'express'; 
import http from 'http';
import morgan from 'morgan';
import rutas from "../src/router/rutas.mjs";
import mongoose from 'mongoose';
import cors from 'cors'; 
import multer from 'multer'; 
import path from 'path';
import fs from 'fs';

const app = express();
const server = http.createServer(app); 


app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:5000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
  }));

app.options('*', cors()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(morgan('dev'));
app.use(rutas);


app.get('/subircv', (req,res) => {
    res.send("Paso por aquí");
    });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'uploads/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
  
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); 
        const originalName = file.originalname.split('.')[0]; 
        const filename = `${originalName}${fileExtension}`; 
        cb(null, filename) 
    }
  });
  
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Tipo de archivo no permitido'), false);
        }
        cb(null, true);
    }
});
  
app.post('/subircv', upload.single('archivo'), (req, res) => {
    console.log('Archivo recibido:', req.file);
    console.log('Candidato ID:', req.body.candidatoId);
    if (!req.file) {
        return res.status(400).json({ mensaje: 'No se subió ningún archivo' });
    }

    res.status(200).json({
        mensaje: 'Archivo subido con éxito',
        archivo: req.file,
    });
});

app.set('port', process.env.PORT  || 5000);

app.get("/", (req, res) => {
    res.send("Servidor en Funcionamiento");

});
server.listen(app.get("port"), () => {
    console.log(`Servidor corriendo en el puerto: ${app.get('port')}`)
});

mongoose.connect("mongodb://root:renaido@localhost:27017/bbdd?authSource=admin")
  .then((db) => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));