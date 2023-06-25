import React from 'react';
import "./home.css";
import Asset_2 from "./images/Asset_3.png"


const Home = () => {
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
            <button type="button" class="home-button">Solicitar</button>
            <img src={Asset_2} className='logo' alt=''/>
        </div>
        
    );
}


export default Home