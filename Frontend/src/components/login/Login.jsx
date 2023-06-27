import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState({ email: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = "http://127.0.0.1:5000/check_user";
    const fecha = new Date();
    setEmail((prevEmail) => ({ ...prevEmail }));
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    };
    console.log(request);
    fetch(URL, request)
      .then((response) => response.json())
      .then((data) => console.log(data.status))
      .catch((error) => console.error(error));
  };

  return (
    <body>
      <form className="box" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail({ email: e.target.value })}
        />
        <input value="Iniciar Sesión" type="submit" />
        <a href="/Registro">Registrarse</a>
      </form>
    </body>
  );
};

export default Login;
