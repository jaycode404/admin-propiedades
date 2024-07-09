import React from "react";
import CrearFormulario from "./CrearFormulario";

export default function CrearPropiedad({ editarPropiedad, crearPropiedad }) {
  const propiedadToEdit = location.state?.propiedad || null;
  return (
    <section id="crear">
      <h2>{propiedadToEdit ? "Editar" : "Crear"}</h2>
      <CrearFormulario
        editarPropiedad={editarPropiedad}
        crearPropiedad={crearPropiedad}
      />
    </section>
  );
}
