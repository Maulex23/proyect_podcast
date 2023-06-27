import { useState } from "react";
import { useHistory } from "react-router-dom";

const Registro = () => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = "http://127.0.0.1:5000/store_data";
    const date = new Date();
    const creationTime = `Hour: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}   Date: ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
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
          history.push("/Login");
        } else {
          alert("Usuario invalido");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <body>
      <form class="box" onSubmit={handleSubmit}>
        <h3>Registro</h3>
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
        <a href="/Login">Iniciar Sesión</a>
      </form>
    </body>
  );
};

export default Registro;
