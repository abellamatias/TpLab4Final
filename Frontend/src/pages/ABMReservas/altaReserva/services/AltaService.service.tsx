import { instance } from "../../../../api/Instance";

interface Reserva {
    dia: string,
    hora: string,           
    duracion: number,           
    tel: string,          
    contacto: string,           
    cancha_id: number,                      
}

export const AltaReservaService = async(reserva:Reserva):Promise<Reserva | any> => {

    try {
        const response = await instance.post('/reservas/', reserva);
        return response;
    } catch (error:any) {
        return {data: error.response.data, status: error.response.status, message: error.response.data.message};
    }
}