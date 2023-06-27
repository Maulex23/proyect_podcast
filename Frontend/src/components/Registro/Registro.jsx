import React from "react";

const Registro = () => {
  return (
    <body>
      <form class="box">
        <h3>Registro</h3>
        <input placeholder="Email" type="email" />
        <input placeholder="Nombre" type="text" />
        <input value="Suscribirte" type="submit" />
        <a href="/Login">Iniciar Sesión</a>
      </form>
    </body>
  );
};

export default Registro;
