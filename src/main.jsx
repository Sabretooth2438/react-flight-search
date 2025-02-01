import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Customize your theme here
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
