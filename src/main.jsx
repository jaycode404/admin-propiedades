import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import {App} from "./App"; 
import { GeneralProvider } from "./context/GeneralContext";

createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Router>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </Router>
  </React.StrictMode>
);
