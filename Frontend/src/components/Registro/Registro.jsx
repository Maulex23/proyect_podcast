import { useState } from "react";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) {
      alert("Usuario invalido");
      return;
    }
    const URL = "http://127.0.0.1:5000/store_data";
    const date = new Date();
    const creationTime = `Hour: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}   Date: ${date.getDay()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, created_at: creationTime }),
    };
    fetch(URL, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          alert("Usuario registrado");
          window.location.href = "http://127.0.0.1:5173/login";
        } else {
          alert("Usuario invalido");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <body>
        <form class="box" onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Nombre"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input value="Suscribirte" type="submit" />
          <a href="/Login" style={{ position: "relative", left: "0" }}>
            Iniciar Sesión
          </a>
        </form>
      </body>
    </div>
  );
};

export default Registro;
