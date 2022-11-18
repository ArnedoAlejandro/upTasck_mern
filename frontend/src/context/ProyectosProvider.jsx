import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom"

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {

  const [ proyectos, setProyectos ] = useState([])
  const [ alerta, setAlerta ] = useState({})
  const [ proyecto, setProyecto ] = useState({})
  const [ cargando, setCargando ] = useState(false)
  const [ modaFormularioTarea, setModalFormularioTarea ] = useState(false)
  const [ modalEliminarTarea, setModalEliminarTarea ] = useState(false)
  const [ tarea, setTarea ] = useState({})

  //REDIRECCIONA RUTAS BIBLIOTECA DE REACT_ROUTER
  const navigate = useNavigate()

  //CONSULTA A LA BASE DE DATOS DE LOS PROYECTOS EXISTENTES
  useEffect(  ()=>{
    const obtenerProyectos = async () =>{
      try {
        const token= localStorage.getItem("token")
        if(!token) return

        const config = {
          headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`  
          }
        }
        const  { data } = await clienteAxios("/proyectos", config)
        setProyectos(data)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerProyectos()
  },[])

//ALERTA DE ERROR
  const mostrarAlerta = alerta =>{
    setAlerta(alerta);
    setTimeout(()=>{
      setAlerta(false)
    },2000)
  }

//CREACION DE PROYECTOS
  const submitProyecto = async proyecto =>{
    
    if(proyecto.id){
      await editarProyecto(proyecto)
    }else{
      await nuevoProyecto(proyecto)  
    }
  }

//EDITAR PROYECTO
  const editarProyecto = async proyecto =>{
    try {
      const token = localStorage.getItem("token")
      if(!token) return

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`  
        }
      }
      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
    //SINCRONIZAR EL ESTADO 
      const proyectosActualizados = proyectos.map( proyectoState =>
        proyectoState._id === data._id ? data : proyectoState)
        setProyectos(proyectosActualizados)

        setAlerta({
          msg: "Proyecto editado correctamente",
          error: false
        })        
        setTimeout(()=>{
          setAlerta({})
          navigate("/proyectos")
        },2000)

        
    } catch (error) {
      console.log(error)
    }
  }
//NUEVO PROYECTO
  const nuevoProyecto = async proyecto =>{
    try {
      const token = localStorage.getItem("token")
      if(!token) return

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`  
        }
      }
      const { data } = await clienteAxios.post("/proyectos", proyecto, config)

      setProyectos([...proyectos, data])
      
      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false
      })
      setTimeout(()=>{
        setAlerta({})
        navigate("/proyectos")
      },2000)

    } catch (error) {
      console.log(error)
    }
  }

//OBTENCION DE PROYECTOS YA EXISTENTES 
  const obtenerProyecto = async id =>{
    setCargando(true)
    try {
      const token = localStorage.getItem("token")
      if(!token) return

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`  
        }
      }
      const { data } = await clienteAxios(`/proyectos/${id}`, config)
      setProyecto(data)

    } catch (error) {
      console.log(error)
    }finally{
      setCargando(false)
    }
  }

//ELIMINAR PROYECTO
  const eliminarProyecto = async id =>{
    try {
      const token = localStorage.getItem("token")
      if(!token) return

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`  
        }
      }
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
    //SINCRONIZAR EL STATE
      const proyectosActualizados = proyectos.filter( proyectoState => 
        proyectoState._id !== id )
      setProyectos(proyectosActualizados)
        
      setAlerta({
        msg: "Proyecto eliminado correctamente",
        error: false
      })
      setTimeout(() =>{
        setAlerta({})
        navigate("/proyectos")
      },2000)
    }catch (error){
      console.log(error)
    }
  }

//ESTADO DE MODAL TAREA
  const handleModalTarea = () => {
    setModalFormularioTarea(!modaFormularioTarea)
  }

  const submitTarea = async tarea =>{
    
    if(tarea?.id){
      editarTarea(tarea)
    }else{
      await crearTarea(tarea)
    }
  }
//CREAR TAREA NUEVA
  const crearTarea = async tarea => {
    try {
    const token = localStorage.getItem("token")
    if(!token) return
    const config = {
      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`  
      }
    }
    const { data } = await clienteAxios.post("/tareas", tarea, config)
    //AGREGAR TAREA
    const proyectoActualizado = { ...proyecto }
    proyectoActualizado.tareas = [ ...proyecto.tareas, data]
    setProyecto(proyectoActualizado) 
    setModalFormularioTarea(false)
    setTimeout(() =>{
      setAlerta({
        msg : "Tarea agregada correctamente",
        error :false
      })
      },1500 )
    } catch (error) {
      console.log(error)
    }
  }
//EDITAR TAREA YA EXISTENTE
  const editarTarea = async tarea =>{
    try {
      const token = localStorage.getItem("token")
    if(!token) return
    const config = {
      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`  
      }
    }
    const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
    
    const proyectoActualizado = { ...proyecto }
    proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => (
        tareaState._id === data._id ? data : tareaState ))
    
    setProyecto(proyectoActualizado)
    setAlerta({})
    setModalFormularioTarea(false)    
    
    } catch (error) {
      console.log(error)
    }
  }
    
//EDITAR TAREA DESDE EL MODAL
  const handleModalEditarTarea = tarea =>{
    setTarea(tarea)
    setModalFormularioTarea(true)
  }
//ELIMINAR TAREA
  const handleEliminarTarea = (tarea) =>{
    setTarea(tarea)
    setModalEliminarTarea(!modalEliminarTarea)
  } 
//ELIMINAR TAREA
  const eliminarTarea = async () =>{
    try {
      const token = localStorage.getItem("token")
    if(!token) return
    const config = {
      headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`  
      }
    }
    const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)

    setAlerta({
      msg : "La tarea se elimino correctamente",
      error: false
    })
  
    const proyectoActualizado = { ...proyecto }
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState =>
      tareaState._id !== tarea._id )
    
    setProyecto(proyectoActualizado)
    setModalEliminarTarea(false) 
    setTarea({})   
    setTimeout(()=>{
      setAlerta({})
    },2000)

    } catch (error) {
      console.log(error)
    }
}


  return (
    <ProyectosContext.Provider value={{
      proyectos,
      alerta,
      mostrarAlerta,
      submitProyecto,
      obtenerProyecto, 
      proyecto, 
      cargando,
      eliminarProyecto,
      modaFormularioTarea,
      handleModalTarea,
      submitTarea,
      handleModalEditarTarea,
      tarea,
      handleEliminarTarea,
      modalEliminarTarea,
      eliminarTarea
    }}>
        {children}
    </ProyectosContext.Provider>
  )
}

export {
  ProyectosProvider
}

export default ProyectosContext
