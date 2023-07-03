import React from 'react';
import "./home.css";



const Home = () => {

  const handleRegistroClick=()=> {
    window.location.href="/Registro";
  };

    return (
        <div class="content">
        

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
          
            

            
        </div>
        
    );
}


export default Home