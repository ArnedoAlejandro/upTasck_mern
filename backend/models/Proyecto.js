import mongoose from 'mongoose'

const proyectoSchema = mongoose.Schema({
    nombre:{
        type: String,
        trim:true,
        required: true,
    },
    descripcion: {
        type: String,
        trim:true,
        required: true,
    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),
    },
    cliente: {
        type: String,
        trim:true,
        required: true,
    },
    creador: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Usuario",
    },
    tareas: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "Tarea"
        }
    ],
    colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectID, 
            ref: "Usuario", 
        },
    ],
},
{
    timestamp: true,
}
);

const Proyecto = mongoose.model("Proyecto", proyectoSchema ) ;
export default Proyecto;