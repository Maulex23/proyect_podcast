import React from 'react';
import "./home.css";
import Asset_2 from "./images/Asset_3.png"
import Asset_1 from "./images/Asset_1.png"


const Home = () => {

  const handleRegistroClick=()=> {
    window.location.href="/Registro";
  };

    return (
        <div class="content">
        <img src={Asset_1}  className="image"/>

        <h1 class="title" >BIENVENIDO A NUESTRA PÁGINA DE CREACIÓN DE PODCAST
          <div class="aurora">
            <div class="aurora__item"></div>
            <div class="aurora__item"></div>
            <div class="aurora__item"></div>
            <div class="aurora__item"></div>
          </div>
          </h1>
          <p class="subtitle">Elabore su estilo y amplifique su voz con nuestras <br/> principales soluciones de marca de podcast</p>
          
            <button type="button" class="home-button" onClick={handleRegistroClick}>Solicitar</button>
          
            <img src={Asset_2} className='logo' alt=''/>

            
        </div>
        
    );
}

export default Home