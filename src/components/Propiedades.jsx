import React, { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { ref, get } from "firebase/database";
import PropiedadCard from "./PropiedadCard.jsx";
export default function Propiedades({ eliminarPropiedad, propiedades }) {

  return (
    <section>
      <h2>Propiedades</h2>
      <div className="propiedades-container">
        {propiedades.map((propiedad, i) => {
          return (
            <PropiedadCard
              eliminarPropiedad={eliminarPropiedad}
              propiedad={propiedad}
              key={i}
            />
          );
        })}
      </div>
    </section>
  );
}
