import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase";

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

  //handle upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `imagenes/${file.name}`);

    try {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error al subir el archivo:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("URL de descarga:", downloadURL);
            setPropiedad((prevPropiedad) => ({
              ...prevPropiedad,
              imagen: downloadURL,
            }));
          });
        }
      );
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  };
  //handleChange
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPropiedad((prevPropiedad) => ({
      ...prevPropiedad,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (propiedad.id !== null) {
      editarPropiedad(propiedad);
    } else {
      crearPropiedad(propiedad);
    }
    setPropiedad(propInitialState);
    navigate("/propiedades");
  };

  return (
    <div className="form-card crear-form">
      <h2>{propiedad.id ? "Editar" : "Crear"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="imagen">Imagen:</label>
          <input type="file" name="imagen" onChange={handleFileUpload} />
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
