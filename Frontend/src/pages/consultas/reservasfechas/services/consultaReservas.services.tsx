
import { instance } from "../../../../api/Instance";
import { IEditarReserva, IEndpointEliminarEditarReserva, IReserva, IReservasResponse } from "../interfaces/interfazTabla";

export const consultaReservasFechas = async (fecha:string):Promise<IReservasResponse> => {
    
    try{
        const response = await instance.get(`/reservas/fecha/${fecha}`);
        return response.data;
    }catch(error:any){
        return { status: error.response.status, message: error.response.statusText};
    }    
}

export const consultaReservasNombre = async (nombre:string):Promise<IReservasResponse> => {
    try{
        const response = await instance.get(`/reservas/nombre/${nombre}`);
        return response.data;
    }catch(error:any){
        return { status: error.response.status, message: error.response.statusText};
    }
}

export const consultaFechaYCancha = async (fecha:string, nombre:string):Promise<IReservasResponse> => {
    try{
        const response = await instance.get(`/reservas/fecha/${fecha}/nombre/${nombre}`);
        return response.data;
    }catch(error:any){
        return { status: error.response.status, message: error.response.statusText};
    }
}

export const agregarReserva = async (reserva:IReserva):Promise<IReservasResponse> => {
    try{
        const response = await instance.post(`/reservas`, reserva);
        return response.data;
    }catch(error:any){
        return { status: error.response.status, message: error.response.statusText};
    }
}

export const eliminarReserva = async (endpoint:IEndpointEliminarEditarReserva):Promise<IReservasResponse> => {
    try{
        const response = await instance.delete(`/reservas/delete/cancha/${endpoint.cancha_id}/dia/${endpoint.dia}/hora/${endpoint.hora}`);
        return response.data;
    }catch(error:any){
        return { status: error.response.status, message: error.response.statusText};
    }
}

export const editarReserva = async (endpoint:IEndpointEliminarEditarReserva, cambios:IEditarReserva):Promise<IReservasResponse> => {
    try{
        const response = await instance.patch(`/reservas/update/cancha/${endpoint.cancha_id}/dia/${endpoint.dia}/hora/${endpoint.hora}`, cambios);
        return response.data;
    }catch(error:any){
        return { status: error.response.status, message: error.response.statusText};
    }
}