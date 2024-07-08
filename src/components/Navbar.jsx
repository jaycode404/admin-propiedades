import React, { useContext, useEffect } from "react";
import { GeneralContext } from "../context/GeneralContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const NavList = () => {
  const links = ["Login"];
  const navigate = useNavigate();
  const { data, setData } = useContext(GeneralContext);

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
          <a href="/crear-propiedad">crear propiedad</a>
          <button onClick={handleLogOut}>Cerrar Sesión</button>
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
