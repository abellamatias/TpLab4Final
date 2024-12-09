import { Box } from "@mui/material"
import {HeaderContainerStyled} from "./styles/HeaderStyles"
import Logo from "./components/Logo"
import Navbar from "./components/Navbar"


const Header = () => {
  return (
    <Box sx={HeaderContainerStyled}>
        <Logo></Logo>
        <Navbar></Navbar>
    </Box>
  )
}

export default Header