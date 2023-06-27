import React, {useEffect} from 'react'
import Asset_1 from "../home/images/Asset_2.jpg"

const Registro = () => {
  
    return (
    
    <div>
    <body>
        <form class="box">
          
          <h2>Registro</h2>
          <input placeholder="Email" type="text" />
          <input placeholder="Clave" type="password"/>
          <input value="Suscribirte" type="submit"/>
        </form>
    </body>
    <img src={Asset_1} className='background' alt=''/>  
    </div>  
            
    )
}

export default Registro