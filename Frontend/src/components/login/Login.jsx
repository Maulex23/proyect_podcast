import React from 'react'
import "./login.css";

const Login = () => {
  return (
  
    <body>
    
        <form className="box">
          
          <h2>Iniciar Sesión</h2>
          <input placeholder="Email" type="text" />
          <input placeholder="Clave" type="password"/>
          <input value="Iniciar Sesión" type="submit"/>
        </form>
    </body>  
    
  
    
  )
}

export default Login