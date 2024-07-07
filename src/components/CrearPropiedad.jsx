import React from "react";
import CrearFormulario from "./CrearFormulario";

export default function CrearPropiedad({editarPropiedad, crearPropiedad}) {
  return (
    <div>
      <h1>Crear Propiedad</h1>
      <CrearFormulario editarPropiedad={editarPropiedad} crearPropiedad={crearPropiedad}/>
    </div>
  );
}
