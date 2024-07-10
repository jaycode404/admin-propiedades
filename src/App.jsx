import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Navbar } from "./components/Navbar";
import Propiedades from "./components/Propiedades";
import CrearPropiedad from "./components/CrearPropiedad";
import uuid4 from "uuid4";
import { db } from "../firebase";
import { ref, get, set, push, update, remove } from "firebase/database";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GeneralContext } from "./context/GeneralContext";
import DragDrop from "./components/DragDrop";
Swal;
import { storage } from "../firebase";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";

const App = () => {
  const { data, setData } = useContext(GeneralContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [propiedades, setPropiedades] = useState([]);
  /* GET USER ---------- */
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setData({ user: user.email, isLoggedIn: true });
      } else {
        setData({ user: null, isLoggedIn: false });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setData]);
  /* GET PROPIEDADES --- */
  const getPropiedades = () => {
    const propiedadesRef = ref(db, "propiedades");
    return get(propiedadesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const propiedadesData = snapshot.val();
          if (!propiedadesData) return [];
          const propiedadesArr = Object.keys(propiedadesData).map((key) => ({
            id: key,
            ...propiedadesData[key],
          }));
          setPropiedades(propiedadesArr);
        } else {
          console.log("no se pudo obtener las propiedades");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPropiedades();
  }, []);
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
        getPropiedades();
        Swal.fire({
          title: "Propiedad Creada",
          text: "Propiedad creada correctamente..",
          icon: "success",
        });
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
      getPropiedades();
      Swal.fire({
        title: "Cambios Guardados",
        text: "Propiedad editada correctamente..",
        icon: "success",
      });
    } catch {
      console.log("no se pudo editar");
    }
  };

  //ELIMINAR PROPIEDAD
  const eliminarPropiedad = async (id) => {
    try {
      if (id) {
        Swal.fire({
          title: "Seguro que quieres eliminar la propiedad?",
          text: "Estos cambios no se pueden revertir",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar propiedad!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log("eliminando");

            const propiedad = propiedades.find(
              (propiedad) => propiedad.id == id
            );
            if (!propiedad) {
              console.log("propiedad no encontrada");
              return;
            }

            try {
              const storage = getStorage();
              const imgRef = storageRef(storage, propiedad.imagen);
              await deleteObject(imgRef);
              console.log("Imagen eliminada de Firebase Storage");
            } catch (error) {
              console.error("Error al eliminar la imagen:", error);
            }
            const propRef = ref(db, `propiedades/${id}`);
            await remove(propRef);
            getPropiedades();
            Swal.fire({
              title: "Eliminada!",
              text: "Propiedad eliminada",
              icon: "success",
            });
          }
        });
      } else {
        console.log("asd");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "No se pudo eliminar la propiedad", "error");
    }
  };
  const eliminarImagen = (imgRef) => {
    // const propiedad = propiedades.find((propiedad) => propiedad.id == id);
    // const imgToDel = ref(storage, `/imagenes/${propiedad.imagen}`);
    // deleteObject(imgToDel)
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/propiedades"
          element={
            <Propiedades
              propiedades={propiedades}
              eliminarPropiedad={eliminarPropiedad}
            />
          }
        />
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
