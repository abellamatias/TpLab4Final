import { CSSProperties } from 'react';

export const HeaderContainerStyled = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'calc(100% - 40px)',
    backgroundColor: "#212121",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 0 25px red',
    padding: ' 15px 20px',
    height: '50px',
}

export const LogoStyled = {
    // width: '50px',
    height: '50px',
    marginLeft: '20px',
    marginTop: '20px',
    marginBottom: '15px',
    cursor: 'pointer',
}

export const NavbarContainerStyled = {
    cursor: 'pointer',
    display: 'flex',
}

export const ToggleButtonStyled = {
    color: 'white',
    border: '0.1px solid #fff',
    
}

export const NavbarSubGroupStyled: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0 20px'
}

