import React, { createContext, useContext, useState } from "react";

const GeneralContext = createContext();

const GeneralProvider = ({ children }) => {
  const [data, setData] = useState({
    user: null,
    isLoggedIn: false,
    propiedad: {},
  });
  return (
    <GeneralContext.Provider value={{ data, setData }}>
      {children}
    </GeneralContext.Provider>
  );
};

export { GeneralContext, GeneralProvider };
