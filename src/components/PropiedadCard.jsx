import React from "react";
import { useNavigate } from "react-router-dom";
export default function PropiedadCard({ propiedad, eliminarPropiedad }) {
  const navigate = useNavigate();
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
    imagen,
  } = propiedad;

  const handleEdit = () => {
    navigate("/crear-propiedad", { state: { propiedad } });
  };

  return (
    <div className="propiedad-card">
      {imagen !== "" ? (
        <img src={`${imagen}`} alt="" />
      ) : (
        <img src="/assets/propiedad-1.jpg" alt="" />
      )}
      <div className="card-info-container">
        {/* <div>
          <h3>id:</h3>
          <p>{id}</p>
        </div> */}
        {/* <div>
          <h3>imagen:</h3>
          <p>{imagen === "" ? "no hay imagen" : `${imagen}`}</p>
        </div> */}
        <div>
          <h3>Nombre:</h3>
          <p>{nombre}</p>
        </div>
        <div>
          <h3>Direccion:</h3>
          <p>{direccion}</p>
        </div>
        <div>
          <h3>Precio:</h3>
          <p>{precio_de_renta}</p>
        </div>
        <div>
          <h3>Pago corriente:</h3>
          <p className={`${pago_corriente ? "pagado" : "pendiente"}`}>
            {pago_corriente ? "Pagado" : "Pendiente"}
          </p>
        </div>
        <div>
          <h3>Estado:</h3>
          <p>{estado}</p>
        </div>
        <div>
          <h3>Día de pago:</h3>
          <p>{dia_de_pago}</p>
        </div>
        <div>
          <h3>Inquilinos:</h3>
          <p>{numero_de_inquilinos}</p>
        </div>
        <div>
          <h3>Duracion de contrato:</h3>
          <p>{duracion_de_contrato}</p>
        </div>
        <div>
          <h3>Tiempo restante:</h3>
          <p>{tiempo_restante_de_contrato}</p>
        </div>
      </div>

      <div className="card-button-container">
        <button
          onClick={() => {
            eliminarPropiedad(id);
          }}
          className="button button-red"
        >
          Eliminar
        </button>
        <button onClick={handleEdit} className="button button-green">
          Editar
        </button>
      </div>
    </div>
  );
}
