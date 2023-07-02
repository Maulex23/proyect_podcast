import React, { Component } from 'react';
import "./about.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import TextCarousel from "../TextCarousel/TextCarousel"

// const About = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 200,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };
  
//   const textItems = [
//     'Texto 1',
//     'Texto 2',
//     'Texto 3',
//     'Texto 4',
//     'Texto 5'
//   ];

//   return (
//     <Slider {...settings}>
//       {textItems.map((text, index) => (
//         <div key={index}>
//           <h3>{text}</h3>
//         </div>
//       ))}
//     </Slider>
//   );
// };

export default class AutoPlay extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 3000,
      cssEase: "linear"
    };
    return (
      <div>
        <h2>About</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
            <h4>"Desde que empecé a usar el sistema para solicitar podcast, he descubierto tantos nuevos programas increíbles. ¡Nunca había estado tan emocionado por escuchar cada nuevo episodio!" - Juan</h4>
          </div>
          <div>
            <h3>2</h3>
            <h4>"Solía pasar horas buscando nuevos podcasts para escuchar, pero con este sistema, todo lo que tengo que hacer es hacer clic en un botón y lo tengo todo al alcance de mi mano. ¡Es genial!" - María</h4>
          </div>
          <div>
            <h3>3</h3>
            <h4>"Me encanta la facilidad con la que puedo solicitar nuevos episodios de mis podcasts favoritos. Ahora no tengo que esperar semanas para escuchar nuevas actualizaciones, ¡y puedo mantenerme actualizado con todos mis programas de forma regular!" - Carlos</h4>
          </div>
          <div>
            <h3>4</h3>
            <h4>"Antes de utilizar este sistema, me resultaba difícil encontrar nuevos podcasts que me gustaran. Pero desde que lo descubrí, he encontrado tantos programas interesantes y emocionantes que nunca habría encontrado de otra manera." - Ana</h4>
          </div>
          <div>
            <h3>5</h3>
            <h4>"Este sistema ha cambiado completamente la forma en que escucho podcasts. Ahora puedo personalizar completamente mi experiencia de escucha y nunca me pierdo un episodio importante." - Luisa</h4>
          </div>
          <div>
            <h3>6</h3>
            <h4>"Como alguien que siempre está en movimiento, este sistema ha sido un salvavidas para mí. Ahora puedo solicitar y escuchar mis podcasts favoritos en cualquier lugar y en cualquier momento, desde mi teléfono o desde mi computadora. ¡No puedo imaginar mi vida sin él!" - Roberto</h4>
          </div>
        </Slider>
      </div>
    );
  }
}

