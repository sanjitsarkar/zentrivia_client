import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProviderWrapper } from "./components";

ReactDOM.createRoot(document.getElementById("root")  as HTMLElement).render(
  <ProviderWrapper>
    <App />
  </ProviderWrapper>
);
