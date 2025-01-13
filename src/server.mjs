// zona de importaciones
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import mongoose from 'mongoose';
import rutas from './router/rutas.mjs';
import cors from 'cors';

// creamos un servidor
const app = express();
const server = http.createServer(app);


app.use(cors());
app.use('api', rutas);
app.use(express.json());

app.use(morgan('dev'));


app.get('/', (req, res)=> {
    res.send('Servidor en Marcha');
});

// eligimos el puerto
app.set('port', process.env.PORT || 5000);


//cuando lanzemos el servidor express ponga un mensaje que todo bien
server.listen(app.get('port'), ()=> {
    console.log('Servidor corriendo en el puerto ', app.get('port'));
});


// Conectamos a la base de datos, datos de mongodb compass
// Hay que cear usuario en compass con db.createUser({user: "root", pwd: "renaido", roles: [{role: "readWrite", db: "admin"}]})
// Y despues hacer db.auth("root", "renaido") 
// Y cambiar archivo /etc/mongod.conf, hay que poner security: authorization: enabled

mongoose.connect('mongodb://root:renaido@localhost:27017/?authMechanism=DEFAULT&authSource=admin')
    .then(db => console.log('Conectado a MongoDB'))
    .catch(err => console.log(err));
    