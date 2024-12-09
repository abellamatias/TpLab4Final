import { imagenes } from "./Imagenes"
import './styles/styles.css'


const Inicio = () => {
  return (
    <div style={{width: '100%', height:'100%' }}>
      <h1>Bienvenido a Padel Pro</h1>
        {imagenes && imagenes.map((imagen, index) => (
          <img  src={`/imagenesInicio/${imagen.name}`} alt={imagen.name} key={index}/>
        ))}
      </div>
  )
}

export default Inicio