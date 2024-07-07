import React, { useContext, useEffect } from "react";
import { GeneralContext } from "../context/GeneralContext";
export const NavList = () => {
  const links = ["Login"];

  const { data, setData } = useContext(GeneralContext);

  return (
    <div className="navlist-container">
      {links.map((link, i) => {
        return (
          <a href={`#${link}`} key={i}>
            {link}
          </a>
        );
      })}
      {data.isLoggedIn && <li>{<a href={"/crear-propiedad"} >crear propiedad</a>}</li>}
    </div>
  );
};
export const Navbar = () => {
  return (
    <nav className="nav-container">
      <p>
        Pro<span className="text-gradient-blue">piedades</span>
      </p>
      <NavList />
    </nav>
  );
};
