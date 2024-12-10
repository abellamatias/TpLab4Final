export interface IReserva {
        dia:String,
        hora: String,
        duracion: Number,
        tel: String,
        contacto: String,
        cancha_id: Number,
        techada:boolean
    }

export interface IReservasResponse{
    data?: IReserva[];
    status?: number;
    message?: string;
}

export interface IParamsConsulta{
    fecha?: string;
    nombre?: string;
    selector: number;
}

export interface IEditarReserva{
    dia?: string;
    hora?: string;
    cancha_id?: number;
    tel?: string;
    contacto?: string;
    duracion?: number;
}

export interface IEndpointEliminarEditarReserva{
    dia: string;
    hora: string;
    cancha_id: number;
}