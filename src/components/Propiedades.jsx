import React, { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { ref, get } from "firebase/database";
import PropiedadCard from "./PropiedadCard.jsx";
export default function Propiedades() {
  const [propiedades, setPropiedades] = useState([]);

  /* GET PROPIEDADES --- */
  useEffect(() => {
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
            console.log(propiedades);
          } else {
            console.log("no se pudo obtener las propiedades");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPropiedades();
  }, []);

  //DELETE
  const handleDelete = () => {};

  return (
    <section>
      <h2>Propiedades</h2>
      <div className="propiedades-container">
        {propiedades.map((propiedad, i) => {
          return (
            <PropiedadCard
              propiedad={propiedad}
              key={i}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </section>
  );
}
