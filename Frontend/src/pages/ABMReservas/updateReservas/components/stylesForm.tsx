import { CSSProperties } from 'react';


export const cellStyled = {
    color: 'white',
    backgroundColor: '#212121',
    border: '1px solid #212121',
}

export const inputStyledDate = {
    '& .MuiInputBase-root': { color: 'white', maxWidth:'250px', height:'60px'}, 
    '& .MuiOutlinedInput-notchedOutline': { color:'white', borderColor: 'white', height:'60px' },
    '& .MuiSvgIcon-root': { color: 'white', height:'60px',},
}

export const inputStyled = {
    '& .MuiInputBase-root': { color: 'white'}, 
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white', height:'60px', color:'white'}, 
    '& .MuiInputLabel-root': { color: 'white'}
}

export const btnStyled = {
    color: 'white',
    backgroundColor: '#212121',
    border: '1px solid white'
}

export const errorStyled:CSSProperties = {
    color: 'red',
    fontSize: '9px',
    width: '100%',
    textAlign: 'left',
}
export const modalStyled = {    
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    border: '1px solid white',
    backgroundColor: '#202020',
    maxWidth: 'fit-content',
    display:'flex', 
    flexDirection:'column', 
    alignItems:'center', 
    width:'100%', 
    boxShadow: '0 0 10px white',

}