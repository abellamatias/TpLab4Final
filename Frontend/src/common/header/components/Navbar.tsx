
import { Link } from "react-router"
import { NavbarContainerStyled, NavbarSubGroupStyled, } from "../styles/HeaderStyles"
import './styles.css'

const Navbar = () => {
  return (
    <div style={NavbarContainerStyled}>
      <div style={NavbarSubGroupStyled}>
      <Link className="link" to='/inicio'>Inicio</Link>
      <Link className="link"  to='/reservas'>Consultas</Link>
    </div>
    </div>
  )
}

export default Navbar