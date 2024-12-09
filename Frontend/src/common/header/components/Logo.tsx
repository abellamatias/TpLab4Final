import { Link } from "react-router"
import {LogoStyled}  from "../styles/HeaderStyles"

const Logo = () => {
  return (
    <div>
      <Link to='/'><img style={LogoStyled} src="/paddleLogo.png" ></img> </Link>
    </div>
  )
}

export default Logo