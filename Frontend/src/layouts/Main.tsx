import { Outlet } from "react-router"
import Header from "../common/header/Header"


const Main = () => {
  return (
    <>
         <Header></Header>
         <div style={{width: '100%', height:'100%', position: 'relative', top:'110px'}}>
          <Outlet></Outlet>
         </div>
    </>
  )
}

export default Main