import React from "react";
import "./header.css";



const Header = () => {
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reseñas');
    if (reviewsSection) {
      window.scrollTo({
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav>
      <a href="/">INICIO</a>
      <a href="/Login">INICIO SESIÓN</a>
      <a href="#reseñas" onClick={scrollToReviews} >RESEÑAS</a>
      <div id="indicator"></div>
    </nav>
  );
};
export default Header;




  


  
