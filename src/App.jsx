import React from "react";
import Header from "./components/Header";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Navbar } from "./components/Navbar";
import Propiedades from "./components/Propiedades";
import CrearPropiedad from "./components/CrearPropiedad";
import uuid4 from "uuid4";
import { db } from "../firebase";
import { ref, get, set, push, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

const App = () => {
  //crearPropiedad
  const crearPropiedad = (propiedad) => {
    const propId = uuid4();
    const propData = {
      id: propId,
      ...propiedad,
    };
    const propRef = push(ref(db, "propiedades"));
    set(propRef, propData)
      .then(() => {
        console.log("creada correactamente");
      })
      .catch((err) => console.log(err));
  };

  //editarPropiedad
  const editarPropiedad = async (propiedad) => {
    try {
      const propRef = ref(db, `propiedades/${propiedad.id}`);
      update(propRef, propiedad);
      console.log("editada con exito");
    } catch {
      console.log("no se pudo editar");
    }
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route
          path="/crear-propiedad"
          element={
            <CrearPropiedad
              crearPropiedad={crearPropiedad}
              editarPropiedad={editarPropiedad}
            />
          }
        />
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
