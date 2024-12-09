import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { inputStyled, inputStyledDate } from './ComponentsStyles';
import { Button, Switch, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface InputProps {
  handleSubmit: (consulta: string, selector: boolean) => void;
}

export default function Filter({handleSubmit}: InputProps) {

  const [value, setValue] = useState<string>('');
  const [fecha, setFecha] = useState<Dayjs | null>(null);
  const [selector, setfilterType] = useState<boolean>(false);
  
  
  return (
    <div style={{display:'flex', alignItems:'center', marginTop:'20px'}}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Typography sx={{margin: '20px'}} variant="caption">
            Fecha
          </Typography>
          <Switch checked={selector} onChange={()=>{
            setfilterType(!selector)
            setValue('')
            setFecha(null)
            }}/>
            <Typography sx={{margin: '20px'}} variant="caption">
            Nombre
            </Typography>
      </div>
      {selector && (<TextField sx={inputStyled} label="Cancha " value={value} onChange={(e)=>{
        setValue(e.target.value)
      }}/>)}
      {!selector && (
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DemoContainer sx={inputStyledDate} components={['DatePicker']}>
        <DatePicker sx={inputStyledDate} value={fecha} onChange={(newValue) => {
          setFecha(newValue!)
          setValue(newValue!.format('YYYY-MM-DD'))
        }} />
        </DemoContainer>
      </LocalizationProvider>)}  
      <Button sx={{height:'60px', color: 'white', margin:'20px', border: 'solid 1px white'}} variant='outlined'
      onClick={()=>{value && handleSubmit(value, selector)
      }}
      ><SearchIcon/></Button>     
    </div>
  );
}
