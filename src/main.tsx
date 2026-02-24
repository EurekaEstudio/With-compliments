import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

// GoogleReCaptchaProvider se movió al ContactForm para carga diferida.
// Se carga solo cuando el usuario hace scroll hasta el formulario,
// eliminando ~1.000ms de bloqueo del hilo principal en la carga inicial.

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
