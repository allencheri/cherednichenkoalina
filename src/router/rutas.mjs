import express from 'express';
import Articulo from "../modelos/modelos.mjs";
import mongoose from 'mongoose';

const rutas = express.Router();


rutas.get('/articulos', async (req, res)=> {
    try {
        const articulos = await Articulo.find({});
        res.json(articulos);

    } catch (error) {
        res.status(500).json({error: error.message});
        console.log("error obtener artículos", error)
    }
});

rutas.post('/articulos', async (req, res) => {
    try {
        const articulo = new Articulo(req.body);
        await articulo.save();
        res.status(201).json(articulo);
        console.log("Artículo guardado correctamente");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Error al guardar artículo:", error);
    }
});

rutas.put('/articulos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('No hay artículo con ese ID');
        }

        const articulo = await Articulo.findByIdAndUpdate(id, req.body, { new: true });

        if (!articulo) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        res.json(articulo);
        console.log("Artículo actualizado correctamente");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Error al actualizar artículo:", error);
    }
});

rutas.delete('/articulos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('No hay artículo con ese ID');
        }

        const articulo = await Articulo.findByIdAndDelete(id);

        if (!articulo) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }

        res.json(articulo);
        console.log("Artículo eliminado correctamente");
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Error al eliminar artículo:", error);
    }
}); 

export default rutas; 