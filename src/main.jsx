import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import DocumentTitle from "./components/ui/DocumentTitle.jsx";
import ScrollToHash from "./components/ui/ScrollToHash.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <DocumentTitle />
      <ScrollToHash />
      <App />
    </HashRouter>
  </StrictMode>,
);
