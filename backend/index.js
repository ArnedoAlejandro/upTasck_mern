import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js'



const app = express();
app.use(express.json())

dotenv.config();

conectarDB();

//Configurar cors
//Constante que almacena la ruta de nuestro servidor que envia los datos del formulario
const whitelist = [process.env.FRONTEND_URL];

const corsOption = {
    origin: function(origin, callback){
       
        if(whitelist.includes(origin)){
            //Puede consultar la api
            callback( null, true );
        }else{
            //No esta permitido 
            callback(new Error("Error de cors"));
        }
    }
}

app.use(cors(corsOption));

//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes )




const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});