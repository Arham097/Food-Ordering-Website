import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
