import { useState } from "react";
import { agregarReserva, consultaFechaYCancha, consultaReservasFechas, consultaReservasNombre, editarReserva, eliminarReserva } from "../services/consultaReservas.services";
import { IEditarReserva, IEndpointEliminarEditarReserva, IParamsConsulta, IReserva } from "../interfaces/interfazTabla";
import { FormikValues } from "formik";


export const useConsulta = ()  => {
    const [rows, setRows] = useState<IReserva[]>([]);
    const [ultimaBusqueda, setUltimaBusqueda] = useState<IParamsConsulta>({fecha:'',nombre:'', selector:0}); 

    const ConsultaReserva = async ({fecha, nombre, selector}:IParamsConsulta) => {
            if (selector==0) //Buscar por fecha
                {                    
                    await consultaReservasFechas(fecha!).then((res)=>{
                    if(res.data){ 
                        setRows(res.data) 
                        if(res.data.length===0) {
                            setRows([])
                            alert('No se encontraron reservas')
                        }
                        setUltimaBusqueda({fecha:fecha, nombre:'', selector:selector})
                    }
                    else{
                        res.status==422? alert('Error en la entrada de datos'): res.status==500? alert('Error en el servidor'): alert('No se pudo consultar la reserva');
                    }
                    })
                    .catch((err)=>{
                        alert(err.message);
                    });
                
                }
                else if(selector==1) //Buscar por nombre
                {
                    await consultaReservasNombre(nombre!).then((res)=>{
                    if(res.data){ 
                        setRows(res.data) 
                        if(res.data.length===0) {
                            setRows([])
                            alert('No se encontraron reservas')
                        }
                        setUltimaBusqueda({fecha:'', nombre:nombre, selector:selector})
                    }
                    
                    else{
                        res.status==422? alert('Error en la entrada de datos'): res.status==500? alert('Error en el servidor'): alert('No se pudo consultar la reserva');
                    }
                    })
                    .catch((err)=>{
                        alert(err.message);
                    });
                
                }
        
        else if(selector==2) //Buscar por ambos
        {
            await consultaFechaYCancha(fecha!, nombre!).then((res)=>{
            if(res.data){ 
                setRows(res.data) 
                if(res.data.length===0) {
                    setRows([])
                    alert('No se encontraron reservas')
                }
                setUltimaBusqueda({fecha:fecha, nombre:nombre, selector:selector})
            }
            else{
                res.status==422? alert('Error en la entrada de datos'): res.status==500? alert('Error en el servidor'): alert('No se pudo consultar la reserva');
            }
            })
            .catch((err)=>{
                alert(err.message);
            });
            
        }
    
    }
    const AgregarReserva = async (values:FormikValues) => {
            const body:IReserva={
                dia: values.dia,
                hora: values.hora,
                duracion: values.duracion,
                tel: values.tel,
                contacto: values.contacto,
                cancha_id: values.cancha_id,
                techada: values.techada
            }
            await agregarReserva(body).then((res)=>{
                if(res.status==201){ 
                    ConsultaReserva({nombre:ultimaBusqueda.nombre, fecha:ultimaBusqueda.fecha, selector:ultimaBusqueda.selector})
                    alert('Reserva Agregada exitosamente')
                }
                else{
                    alert('No se pudo agregar la reserva');
                }
            })
        }

        const EditarReserva = async (row:IReserva, cambios:IEditarReserva) => {
            const body:IEndpointEliminarEditarReserva={
                dia: row.dia.toString(),
                hora: row.hora.toString(),
                cancha_id: Number(row.cancha_id),
            }
            await editarReserva(body, cambios).then((res)=>{
                if(res.status==200){ 
                    ConsultaReserva({nombre:ultimaBusqueda.nombre, fecha:ultimaBusqueda.fecha, selector:ultimaBusqueda.selector})
                    alert('Reserva editada exitosamente')
                }
                else{
                    alert('No se pudo editar la reserva');
                }
            })
        }

        const EliminarReserva = async (row:IReserva) => {
            const body:IEndpointEliminarEditarReserva={
                dia: row.dia.toString(),
                hora: row.hora.toString(),
                cancha_id: Number(row.cancha_id),
            }
            await eliminarReserva(body).then((res)=>{
                if(res.status==200){ 
                    ConsultaReserva({nombre:ultimaBusqueda.nombre, fecha:ultimaBusqueda.fecha, selector:ultimaBusqueda.selector})
                    alert('Reserva eliminada exitosamente')
                }
                else{
                    alert('No se pudo eliminar la reserva');
                }
            })
        }
    
return {rows, ConsultaReserva, AgregarReserva, EliminarReserva, EditarReserva};
};