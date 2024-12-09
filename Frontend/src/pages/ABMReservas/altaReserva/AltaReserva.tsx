import { FormikValues } from "formik"

import { AltaReservaService } from "./services/AltaService.service"
import { Alert } from "@mui/material"
import { useState } from "react"
import { FormularioReservas } from "./components/form/FormularioReservas"


export const AltaReserva = () => {

  const [alert, setAlert ] = useState<string>(''); 

  const handleSubmitFormAlta = async(values: FormikValues) => {
    const body={
      dia: values.dia,
      hora: values.hora,
      duracion: Number(values.duracion),
      tel: values.tel,
      contacto: values.contacto,
      cancha_id: Number(values.cancha_id),
    }
  //  await AltaReservaService(body);
  AltaReservaService(body).then((res)=>{
    if(res.status===200 || res.status===201){ 
      setAlert('Reserva creada exitosamente');
    }
    else{      
      setAlert('No se pudo crear la reserva, revise los datos');
    }

  })
    
}

  return (
    <div>
      {alert !== '' && <Alert severity={alert==='Reserva creada exitosamente' ? 'success' : 'error'}>{alert}</Alert>}
      <FormularioReservas handleSubmit={handleSubmitFormAlta}/>

    </div>
  )
}
