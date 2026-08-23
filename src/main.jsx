import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ScrollToHash from "./components/ui/ScrollToHash.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ScrollToHash />
      <App />
    </HashRouter>
  </StrictMode>,
);
