import React from "react";
import Header from "./components/Header";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Navbar } from "./components/Navbar";
import Propiedades from "./components/Propiedades";
import CrearPropiedad from './components/CrearPropiedad'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/crear-propiedad" element={<CrearPropiedad />} />
        
      </Routes>
    </div>
  );
};

const Home = () => {
  return (
    <main>
      <Header />
      <Login />
    </main>
  );
};
export { App, Home };
