import { Box, Button, Modal, Typography } from "@mui/material";


interface InputProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit:(valor?:any) => void;
    mensaje:string;
}

export const ModalConfirmacion = ({open,  mensaje, handleClose, handleSubmit}:InputProps) => {
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#212121',
        color: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
        <Box sx={{ ...style}}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center', gap:'10px'}}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Estás seguro de {mensaje}?
          </Typography>
          </div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center', gap:'20px', width:'100%', marginTop:'20px'}}>
          <Button onClick={()=>handleSubmit()} variant="contained" sx={{color:'white', backgroundColor:'#212121', border:'solid 1px #f3f3f3', boxShadow:' 0 0 5px #f3f3f3'}}>Sí</Button> 
          <Button onClick={handleClose} variant="contained" sx={{color:'white', backgroundColor:'#212121', border:'solid 1px #f3f3f3', boxShadow:' 0 0 5px #f3f3f3' }}>No</Button>
          </div>
        </Box>
        </Modal>
    )
}