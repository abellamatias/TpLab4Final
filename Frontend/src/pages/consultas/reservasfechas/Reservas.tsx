
import Tabla from "./components/Tabla"
import Filter from "./components/Filtro";
import { useConsulta } from "./hooks/consultarReservas";
import { ModalAlta } from "../../ABMReservas/altaReserva/components/modal/ModalAlta";
import { useState } from "react";
import { FormikValues } from "formik";
import { IEditarReserva, IReserva } from "./interfaces/interfazTabla";
import { ModalConfirmacion } from "../../../common/modal/ModalConfirmacion";
import { ModalUpdate } from "../../ABMReservas/updateReservas/components/ModalUpdate";

const Reservas = () => {

  const { rows, ConsultaReserva, AgregarReserva, EliminarReserva, EditarReserva} = useConsulta();
  const [open, setOpen] = useState(false);
  const [openModalConfirmar, setOpenModalConfirmar] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [tempValor, setTempValor] = useState<IReserva>({dia:'', hora:'', duracion:0, tel:'', contacto:'', cancha_id:0, techada:false});


  const handleSubmitConsulta = async (selector: number, fecha: string, nombre: string) => {
    const regexNombre = /^cancha[1-9][0-9]*$/;
    const regexFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if(((selector == 2 || selector==0)&& !regexFecha.test(fecha) )) 
      alert("La fecha no es valida");
    else if(((selector == 2 || selector==1)&& !regexNombre.test(nombre)))
      alert("El nombre de la cancha no es valido");
    else
    await ConsultaReserva({fecha, nombre, selector});
    }
    
    const handleSubmitAdd = async (values:FormikValues) => {
        await AgregarReserva(values);
        setOpen(false);
    }

    const handleUpdate = async (row:IReserva) => {
      setOpenUpdate(true);
      setTempValor(row);
    }
    const handleUpdateAccept = async (row:FormikValues) => {
      const body:IEditarReserva={
        dia: row.dia?row.dia:undefined,
        hora: row.hora?row.hora:undefined,
        cancha_id: row.cancha_id?Number(row.cancha_id):undefined,
        tel: row.tel?row.tel:undefined,
        contacto: row.contacto?row.contacto:undefined,
        duracion: row.duracion?Number(row.duracion):undefined,
      }
      setOpenUpdate(false);
      await EditarReserva(tempValor, body);
    }



    const handleDeleteOpenModal = async (row:IReserva) => {
        setOpenModalConfirmar(true);
        setTempValor(row);
    }
    const handleDelete = async () => {
      setOpenModalConfirmar(false);
      await EliminarReserva(tempValor);
      setTempValor({dia:'', hora:'', duracion:0, tel:'', contacto:'', cancha_id:0, techada:false});
    }

  return (
    <div style={{width: '100%', height:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Filter handleSubmit={handleSubmitConsulta} /> 
      {rows && <Tabla rows={rows} handleAdd={()=>{setOpen(true)}} handleDelete={(handleDeleteOpenModal)} handleUpdate={handleUpdate}/>}
      { open && (<ModalAlta open={open} handleClose={()=>{setOpen(false)}} handleSubmit={handleSubmitAdd}/>)}
      { openUpdate && (<ModalUpdate open={openUpdate} handleClose={()=>{setOpenUpdate(false); setTempValor({dia:'', hora:'', duracion:0, tel:'', contacto:'', cancha_id:0, techada:false});}} handleSubmit={handleUpdateAccept}/>)}
      { openModalConfirmar && (<ModalConfirmacion open={openModalConfirmar} mensaje="Eliminar reserva" handleClose={()=>{setOpenModalConfirmar(false); setTempValor({dia:'', hora:'', duracion:0, tel:'', contacto:'', cancha_id:0, techada:false});}} handleSubmit={handleDelete}/>)}
      
    </div>
  )
  }

export default Reservas