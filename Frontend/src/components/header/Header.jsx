import React from 'react';
import "./header.css"



const Header = () => {
    return (
<nav>
  <a href="/">INICIO</a>
  <a href="/Registro">INICIO SESIÓN</a>
  <a href="/Review">RESEÑAS</a>
  <div id="indicator"></div>
</nav>
    );
}

export default Header