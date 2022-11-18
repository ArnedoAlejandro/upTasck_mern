import { Link } from "react-router-dom"

const PreviewProyecto = ({proyecto}) => {

    const { nombre, _id, cliente } = proyecto

  return (
    <div className="border-b flex p-5">
        <p className="flex-1 ">
            {nombre} {" "}  
        </p>
       

        <Link 
            to={`${_id}`}
            className="text-gray-600 uppercase font-black hover:text-gray-900 "
        >Ver Proyecto</Link>
    </div>
  )
}

export default PreviewProyecto