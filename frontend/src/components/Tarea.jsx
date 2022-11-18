import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"

const Tarea = ({tarea}) => {

  const { handleModalEditarTarea, handleEliminarTarea } = useProyectos()

  const { nombre, descripcion, prioridad, fechaEntrega, estado, _id } = tarea

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="">
        <p className="mb-3 uppercase font-bold text-1xl mr-3">{nombre}</p>
        <p className="mb-2 text-gray-600  uppercase text-sm  mr-3">{descripcion}</p>
        <p className="mb-2 text-gray-600 font-bold  uppercase mr-3">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-2 text-gray-600 font-bold text-sm mr-3">{prioridad}</p>
      </div>
      <div className="flex gap-2">
        <button 
          className="bg-indigo-600 rounded font-bold uppercase p-2 border-black text-white hover:bg-indigo-700"
          onClick={()=>handleModalEditarTarea(tarea)}
        >  
            Editar
        </button>

        {estado ? (<button className="bg-blue-600 rounded font-bold uppercase p-2 border-black text-white hover:bg-blue-700">
            Completa
          </button>) :
          <button className="bg-gray-500 rounded font-bold uppercase p-2 border-black text-white hover:bg-gray-700">
            Incompleta
        </button> }
        
        
        <button 
          className="bg-red-600 rounded font-bold uppercase p-2 border-black text-white hover:bg-red-700"
          onClick={ ()=> handleEliminarTarea(tarea)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Tarea
