import { useState } from "react";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = "http://127.0.0.1:5000/check_user";
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    };
    fetch(URL, request)
      .then((response) => response.json())
      .then((data) => (data.status ? setIsAuth(true) : setIsAuth(false)))
      .catch((error) => console.error(error));
  };

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "http://127.0.0.1:5000/spotify_login";
  };

  return (
    <div>
      <body>
        <form className="box" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          <input placeholder="Email" type="email" />
          <input
            placeholder="Nombre"
            type="text"
            onChange={(e) => setEmail({ email: e.target.value })}
          />
          <input value="Iniciar Sesión" type="submit" />
          <i class="bi bi-spotify"></i>
          <a className="button" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              color="LawnGreen"
              fill="currentColor"
              class="bi bi-spotify"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
            </svg>
          </a>
        </form>
      </body>
    </div>
  );
};

export default Login;
