import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AudioProvider } from "./contexts/AudioContext.jsx";
import { CartProvider } from "./shop/context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AudioProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AudioProvider>
  </StrictMode>,
);
