import express from 'express';
const rutas = express.Router();
import multer from 'multer';


rutas.use(expres.json());

const upload = multer({ dest: 'uploads/' });

rutas.get('/', async(req, res) => {
    try{
        const tareas = await 
    }
})


