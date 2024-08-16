import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
