import React from "react";
import CrearFormulario from "./CrearFormulario";

export default function CrearPropiedad({ editarPropiedad, crearPropiedad }) {
  
  return (
    <section id="crear">
      <CrearFormulario
        editarPropiedad={editarPropiedad}
        crearPropiedad={crearPropiedad}
      />
    </section>
  );
}
