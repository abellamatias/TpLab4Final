import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { inputStyled, inputStyledDate, toggleButtonStyled } from './ComponentsStyles';
import { Button, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface InputProps {
  handleSubmit: (selector: number, fechaString: string, nombre: string) => void;
}

export default function Filter({handleSubmit}: InputProps) {

  const [nombre, setNombre] = useState<string>('');
  const [fecha, setFecha] = useState<Dayjs | null>(null);
  const [fechaString, setFechaString] = useState<string>('');
  const [selector, setfilterType] = useState<number>(0);
  
  const handleChangeSelector =(e:any)=>{
    setfilterType(e.target.value)
  }
  
  return (
    <div style={{display:'flex', alignItems:'center', marginTop:'20px'}}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* <Typography sx={{margin: '20px'}} variant="caption">
            Fecha
          </Typography>
          <Switch checked={selector} onChange={()=>{
            setfilterType(!selector)
            setValue('')
            setFecha(null)
            }}/>
            <Typography sx={{margin: '20px'}} variant="caption">
            Nombre
            </Typography> */}


<ToggleButtonGroup
      sx={toggleButtonStyled}
      color="primary"
      value={selector}
      exclusive
      onChange={(e)=>handleChangeSelector(e)}
      aria-label="Platform"
    >
      <ToggleButton sx={{color:'white', border:'1px solid white'}} value="0">Fecha</ToggleButton>
      <ToggleButton sx={{color:'white', border:'1px solid white'}} value="1">Cancha</ToggleButton>
      <ToggleButton sx={{color:'white', border:'1px solid white'}} value="2">Ambos</ToggleButton>
    </ToggleButtonGroup>



      </div>
      {(selector ==2 || selector ==1) && (<TextField sx={inputStyled} label="Cancha " value={nombre} onChange={(e)=>{ (
        setNombre(e.target.value)
      )
      }}/>)}
      {(selector==2 || selector==0)&& ( 
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DemoContainer sx={inputStyledDate} components={['DatePicker']}>
        <DatePicker sx={inputStyledDate} value={fecha} onChange={(newValue) => {
          setFecha(newValue!)
          setFechaString(newValue!.format('YYYY-MM-DD'))
        }} />
        </DemoContainer>
      </LocalizationProvider>)}  
      <Button sx={{height:'60px', color: 'white', margin:'20px', border: 'solid 1px white'}} variant='outlined'
      onClick={()=>{nombre && fechaString && handleSubmit(selector, fechaString, nombre)
      }}
      ><SearchIcon/></Button>     
    </div>
  );
}

//2= los 2, 1=cancha, 0=fecha