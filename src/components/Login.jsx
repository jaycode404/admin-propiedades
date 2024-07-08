import React, { useState, useContext } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GeneralContext } from "../context/GeneralContext";
import { db } from "../../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { data, setData, isLoggedIn } = useContext(GeneralContext);

  /* handle change ------- */
  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  /* AUTH -------- */
  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(
          auth,
          loginForm.email,
          loginForm.password
        );
      })
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setData({ user: user.email, isLoggedIn: true });
          Swal.fire({
            title: "Bienvenido",
            text: "sesion iniciada..",
            icon: "success",
          });
          setTimeout(() => {
            navigate("/propiedades");
          }, 2000);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Datos incorrectos",
          text: "los datos no coinciden",
          icon: "error",
        });
        console.error("Error de inicio de sesión:", error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <div className="form-card">
        <form onSubmit={handleSubmit} action="">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              value={loginForm.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={loginForm.password}
            />
          </div>
          <button type="submit" className="button">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
