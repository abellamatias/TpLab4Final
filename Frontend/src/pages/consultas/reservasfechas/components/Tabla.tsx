
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IReserva } from '../interfaces/interfazTabla';
import { cellBtnStyled, cellStyled } from './ComponentsStyles';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

interface InputProps {
  rows: IReserva[];
  handleAdd: () => void;
  handleUpdate: (row:IReserva) => void;
  handleDelete: (row:IReserva) => void;
}


export default function Tabla({rows, handleAdd, handleUpdate, handleDelete}: InputProps) {
  return (
      <div style={{width:'75%'}}>
        <Paper sx={{  overflow: 'hidden', boxShadow:'0 0 5px white'}}>
          <TableContainer sx={{ maxHeight: 440 , backgroundColor:'#212121', }}> 
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{backgroundColor:'#212121'}}>
                <TableRow >
                  <TableCell sx={cellStyled} align="left">Dia</TableCell>
                  <TableCell sx={cellStyled} align="right">Hora</TableCell>
                  <TableCell sx={cellStyled} align="right">Duracion</TableCell>
                  <TableCell sx={cellStyled} align="right">Tel</TableCell>
                  <TableCell sx={cellStyled} align="right">Contacto</TableCell>
                  <TableCell sx={cellStyled} align="right">Cancha</TableCell> 
                  <TableCell sx={cellStyled} align="right">Techada</TableCell> 
                  <TableCell sx={cellStyled} align="center">Modificar</TableCell>
                  <TableCell sx={cellStyled} align="center">Eliminar</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell sx={{color:'white'}} align="left">{row.dia}</TableCell>
                        <TableCell sx={{color:'white'}} align="right">{row.hora}</TableCell>
                        <TableCell sx={{color:'white'}} align="right">{row.duracion.toString()}</TableCell>
                        <TableCell sx={{color:'white'}} align="right">{row.tel}</TableCell>
                        <TableCell sx={{color:'white'}} align="right">{row.contacto}</TableCell>
                        <TableCell sx={{color:'white'}} align="right">{row.cancha_id.toString()}</TableCell>                        
                        <TableCell sx={{color:'white'}} align="right">{row.techada?'Techada':'No Techada'}</TableCell>
                        <TableCell sx={{color:'white'}} align="center"><Button onClick={()=>{handleUpdate(row)}} sx={{...cellBtnStyled, color:'blue'}}><EditIcon/></Button></TableCell>
                        <TableCell sx={{color:'white'}} align="center"><Button onClick={()=>{handleDelete(row)}} sx={{...cellBtnStyled, color:'red'}}><DeleteIcon/></Button></TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div style={{width:'100%', display:'flex', justifyContent:'right', marginRight:'400px'}}>
          <Button sx={{backgroundColor:'rgba(0, 0, 0, 0.4)', color:'red', boxShadow:'0 0 2px red', marginTop:'20px'}} onClick={handleAdd}><AddIcon/></Button>
        </div>
      </div>
  );
}
