import {  FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { btnStyled, errorStyled, inputStyled, inputStyledDate } from "../modal/stylesForm";
  
  export interface InputProps 
  {
      handleSubmit:(values:FormikValues)=>void
  }
export const FormularioReservas = ({handleSubmit}: InputProps) => {

const initialValuesFormik={
    dia: '',
    hora: '',
    duracion: '',
    tel: '',
    contacto: '',
    cancha_id: '',
  }

  const validationSchema = yup.object({
    dia: yup.string().required('*Campo requerido'),
    hora: yup.string().required('*Campo requerido'),
    duracion: yup.number()
    .required('*Campo requerido')
    .max(3, '*La duracion no puede ser mayor a 3')
    .min(1, '*La duracion no puede ser menor a 1'),
    tel: yup.string().required('*Campo requerido'),
    contacto: yup.string().required('*Campo requerido'),
    cancha_id: yup.number()
    .required('*Campo requerido')
    .max(3, '*Hay solo 3 canchas')
    .min(1, '*No hay canchas menores a 1'),        
});



      const [fecha, setFecha] = useState<Dayjs | null>(null);
      const [hora, setHora] = useState<number>(0);
    
      const onSubmitFormik =
      async(values:FormikValues) => 
          {
              await handleSubmit(values);
          }

          const formik = useFormik(
            {
                initialValues: initialValuesFormik,
                validationSchema: validationSchema,
                onSubmit:onSubmitFormik ,
            });


    const defHora=(hora:number | string | null)=>{
    return Number(hora)<10 ? `0${hora}:00:00` : `${hora}:00:00` 
    }

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
            <form
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
                
                <FormControl style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', maxWidth:'300px', margin:'50px', color:'white'}}>

                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={fecha}
                    name="dia"
                    onChange={(newValue) => {
                        setFecha(newValue)
                        formik.setFieldValue("dia", newValue!.format('YYYY-MM-DD'))
                    }}
                    
                    sx={inputStyledDate}
                    />
                    {formik.touched.dia && formik.errors.dia ? ( <div style={errorStyled}>{formik.errors.dia}</div> ) : null}   
                    </LocalizationProvider>
                        <InputLabel sx={{color : 'white', marginTop:'70px'}} id="demo-simple-select-label">Hora</InputLabel>
                        <Select
                        fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="hora"
                            value={hora}
                            label="Age"
                            onChange={
                                (e) => {
                                    setHora(Number(e.target.value))
                                    formik.setFieldValue("hora", defHora(e.target.value))
                                }
                            }
                            sx={{...inputStyled, color:'white'}}
                        >
                            <MenuItem value={8}>8hs</MenuItem>
                            <MenuItem value={9}>9hs</MenuItem>
                            <MenuItem value={10}>10hs</MenuItem>
                            <MenuItem value={11}>11hs</MenuItem>    
                            <MenuItem value={12}>12hs</MenuItem>
                            <MenuItem value={13}>13hs</MenuItem>
                            <MenuItem value={14}>14hs</MenuItem>
                            <MenuItem value={15}>15hs</MenuItem>
                            <MenuItem value={16}>16hs</MenuItem>
                            <MenuItem value={17}>17hs</MenuItem>
                            <MenuItem value={18}>18hs</MenuItem>
                            <MenuItem value={19}>19hs</MenuItem>
                            <MenuItem value={20}>20hs</MenuItem>
                        </Select>                        
                    {formik.touched.hora && formik.errors.hora ? ( <div style={errorStyled}>{formik.errors.hora}</div> ) : null}  
                    <TextField 
                        sx={inputStyled} 
                        label="Duración " 
                        name="duracion" 
                        value={formik.values.duracion} 
                        onChange={formik.handleChange}
                        error={formik.touched.duracion && Boolean(formik.errors.duracion)}
                        helperText={formik.touched.duracion && formik.errors.duracion}
                        />
                    <TextField 
                        sx={inputStyled} 
                        label="Teléfono " 
                        name="tel" 
                        value={formik.values.tel} 
                        onChange={formik.handleChange}
                        error={formik.touched.tel && Boolean(formik.errors.tel)}
                        helperText={formik.touched.tel && formik.errors.tel}/>
                    <TextField 
                        sx={inputStyled} 
                        label="Contacto " 
                        name="contacto" 
                        value={formik.values.contacto} 
                        onChange={formik.handleChange}
                        error={formik.touched.contacto && Boolean(formik.errors.contacto)}
                        helperText={formik.touched.contacto && formik.errors.contacto}/>
                    <TextField 
                        sx={inputStyled} 
                        label="Cancha ID " 
                        name="cancha_id" 
                        value={formik.values.cancha_id} 
                        onChange={formik.handleChange}
                        error={formik.touched.cancha_id && Boolean(formik.errors.cancha_id)}
                        helperText={formik.touched.cancha_id && formik.errors.cancha_id}/>
                <Button sx={btnStyled} variant="outlined" type="submit" >Agregar</Button>                
                <Button sx={btnStyled} variant="outlined" >Cancelar</Button>
                </FormControl>
                
            </form>
        </div>
    )
}
