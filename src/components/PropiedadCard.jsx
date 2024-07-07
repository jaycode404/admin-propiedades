import React from "react";

export default function PropiedadCard({ propiedad, handleDelete, setCreateForm }) {
  const {
    id,
    nombre,
    direccion,
    precio_de_renta,
    estado,
    pago_corriente,
    dia_de_pago,
    numero_de_inquilinos,
    duracion_de_contrato,
    tiempo_restante_de_contrato,
  } = propiedad;
  return (
    <div className="propiedad-card">
      <img src="/assets/propiedad-1.jpg" alt="" />
      <p>{id}</p>
      <p>{nombre}</p>
      <p>{direccion}</p>
      <p>{precio_de_renta}</p>
      <p>{pago_corriente}</p>
      <p>{estado}</p>
      <p>{dia_de_pago}</p>
      <p>{numero_de_inquilinos}</p>
      <p>{duracion_de_contrato}</p>
      <p>{tiempo_restante_de_contrato}</p>
      <div className="card-button-container">
        <button className="button" onClick={handleDelete(id)}>
          Eliminar
        </button>
        <button  className="button">
          Editar
        </button>
      </div>
    </div>
  );
}
