import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const propInitialState = {
  id: null,
  nombre: "",
  direccion: "",
  precio_de_renta: "",
  estado: "",
  pago_corriente: false,
  dia_de_pago: "",
  numero_de_inquilinos: "",
  duracion_de_contrato: "",
  tiempo_restante_de_contrato: "",
  imagen: "",
};
const CrearFormulario = ({ crearPropiedad, editarPropiedad }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const propiedadToEdit = location.state?.propiedad || null;
  const [propiedad, setPropiedad] = useState(propInitialState);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (propiedadToEdit) {
      setPropiedad(propiedadToEdit);
    }
  }, [propiedadToEdit]);

  //handleChange
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setPropiedad((prevPropiedad) => ({
        ...prevPropiedad,
        imagen: files[0].name,
      }));
      console.log(files[0].name);
    } else {
      setPropiedad((prevPropiedad) => ({
        ...prevPropiedad,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear una instancia de FormData
    const formData = new FormData();
    formData.append("imagen", propiedad.imagen);

    try {
      // Enviar la imagen al servidor
      const response = await axios.post(
        "http://localhost:3000/imagenes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Verificar la estructura de la respuesta del servidor
      console.log("Respuesta del servidor:", response.data);
      if (propiedad.id !== null) {
        editarPropiedad(propiedad);
      } else {
        crearPropiedad(propiedad);
      }
      setPropiedad(propInitialState);
      navigate("/propiedades");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  /*  if (propiedad.id !== null) {
        editarPropiedad(propiedad);
      } else {
        crearPropiedad(propiedad);
      }
      setPropiedad(propInitialState);
      navigate("/propiedades");*/
  return (
    <div className="form-card crear-form">
      <h2>{propiedad.id ? "Editar" : "Crear"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="imagen">Imagen:</label>
          <input type="file" name="imagen" onChange={handleChange} />
          {uploadProgress > 0 && <progress value={uploadProgress} max={100} />}
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={propiedad.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={propiedad.direccion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="precio_de_renta">Precio de Renta:</label>
          <input
            type="number"
            id="precio_de_renta"
            name="precio_de_renta"
            value={propiedad.precio_de_renta}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={propiedad.estado}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            Pago Corriente:
            <input
              type="checkbox"
              name="pago_corriente"
              checked={propiedad.pago_corriente}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="dia_de_pago">Día de Pago:</label>
          <input
            type="number"
            id="dia_de_pago"
            name="dia_de_pago"
            value={propiedad.dia_de_pago}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="numero_de_inquilinos">Número de Inquilinos:</label>
          <input
            type="number"
            id="numero_de_inquilinos"
            name="numero_de_inquilinos"
            value={propiedad.numero_de_inquilinos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="duracion_de_contrato">Duración de Contrato:</label>
          <input
            type="text"
            id="duracion_de_contrato"
            name="duracion_de_contrato"
            value={propiedad.duracion_de_contrato}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tiempo_restante_de_contrato">
            Tiempo Restante de Contrato:
          </label>
          <input
            type="text"
            id="tiempo_restante_de_contrato"
            name="tiempo_restante_de_contrato"
            value={propiedad.tiempo_restante_de_contrato}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`button ${propiedad.id ? "button-green" : "button-blue"}`}
        >
          Guardar Propiedad
        </button>
      </form>
    </div>
  );
};

export default CrearFormulario;
