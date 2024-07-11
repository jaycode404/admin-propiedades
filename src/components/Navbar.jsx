import React, { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export const NavList = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(GeneralContext);

  const handleCreate = () => {
    navigate("/crear-propiedad");
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
        <Link to="/">Login</Link>
      )}
    </div>
  );
};

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <Link to="/propiedades">
        Pro<span className="text-gradient-blue">piedades</span>
      </Link>
      <NavList />
    </nav>
  );
};
