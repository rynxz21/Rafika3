import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Baris ini opsional, tapi biarkan saja
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);