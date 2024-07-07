import React, { createContext, useContext, useState } from "react";

const GeneralContext = createContext();

 const GeneralProvider = ({ children }) => {
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
        console.log("creada correactamente");
      })
      .catch((err) => console.log(err));
  };

  //editarPropiedad
  const editarPropiedad = async (propiedad) => {
    const history = useNavigate();
    history("/crear-propiedad");
    try {
      const propRef = ref(db, `propiedades/${propiedad.id}`);
      update(propRef, propiedad);
      console.log("editada con exito");
    } catch {
      console.log("no se pudo editar");
    }
  };
  const [data, setData] = useState({
    user: null,
    isLoggedIn: false,
  });
  return (
    <GeneralContext.Provider value={{data, setData}}>{children}</GeneralContext.Provider>
  );
};

export {GeneralContext, GeneralProvider};
