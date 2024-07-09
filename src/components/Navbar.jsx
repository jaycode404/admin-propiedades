import React, { useContext, useEffect } from "react";
import { GeneralContext } from "../context/GeneralContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const NavList = () => {
  const links = ["Login"];
  const navigate = useNavigate();
  const { data, setData } = useContext(GeneralContext);
  const propiedad = {};

  const handleCreate = () => {
    navigate("/crear-propiedad", { state: { propiedad } });
  };
  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setData({ user: null, isLoggedIn: false });
        navigate("/");
      })
      .catch((err) => {
        console.log("error al cerrar la sesion", err);
      });
  };

  return (
    <div className="navlist-container">
      {data.isLoggedIn ? (
        <>
          <button onClick={handleCreate} className="button button-blue">
            Crear <span className="symbol">+</span>
          </button>
          <button className="button button-blue" onClick={handleLogOut}>
            Cerrar Sesión
          </button>
        </>
      ) : (
        <a href={"/"}>Login </a>
      )}
    </div>
  );
};
export const Navbar = () => {
  return (
    <nav className="nav-container">
      <a href="/propiedades">
        Pro<span className="text-gradient-blue">piedades</span>
      </a>
      <NavList />
    </nav>
  );
};
