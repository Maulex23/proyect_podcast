import React, { Component } from 'react';
import "./review.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import review1 from "../home/images/review_2.png"
import review2 from "../home/images/review_1.png"
import review3 from "../home/images/review_3.png"
import review4 from "../home/images/review_4.png"



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
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: false,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear"


    };
    return (
      <div className='container-review'>
        <h3>Testimonios</h3>

        <Slider {...settings}>
          <div className='review-container'>
            <div className='wrapper'>
              <img src={review1} alt="" className='card_images' />
              <h4 className='"name-review"'>Enzo Zamora</h4>
              <h5>Project Manager</h5>
              <p class="card-text">"Desde que empecé a usar el sistema para solicitar podcast, he descubierto tantos nuevos programas increíbles. ¡Nunca había estado tan emocionado por escuchar cada nuevo episodio!"</p>
            </div>
          </div>
          <div className='review-container'>
            <div className='wrapper'>
              <img src={review2} alt="" className='card_images' />
              <h4 className='"name-review"'>Maria Muñoz</h4>
              <h5>Engineer</h5>
              <p class="card-text">"Solía pasar horas buscando nuevos podcasts para escuchar, pero con este sistema, todo lo que tengo que hacer es hacer clic en un botón y lo tengo todo al alcance de mi mano. ¡Es genial!"</p>
            </div>
          </div>
          <div className='review-container'>
            <div className='wrapper'>
              <img src={review3} alt="" className='card_images' />
              <h4 className='"name-review"'>Roberto Moreno</h4>
              <h5>CEO Revaluarte</h5>
              <p class="card-text">"Como alguien que siempre está en movimiento, este sistema ha sido un salvavidas para mí. Ahora puedo solicitar y escuchar mis podcasts favoritos en cualquier lugar y en cualquier momento, desde mi teléfono o desde mi computadora. ¡No puedo imaginar mi vida sin él!"</p>
            </div>
          </div>
          <div className='review-container'>
            <div className='wrapper'>
              <img src={review4} alt="" className='card_images' />
              <h4 className='"name-review"'>Luis Diaz</h4>
              <h5>Chef ejecutivo</h5>
              <p class="card-text">"Este sistema ha cambiado completamente la forma en que escucho podcasts. Ahora puedo personalizar completamente mi experiencia de escucha y nunca me pierdo un episodio importante."</p>
            </div>
          </div>



        </Slider>
      </div>
    );
  }
}

