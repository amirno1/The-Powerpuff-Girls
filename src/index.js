import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// wrapping App inside the BrowserRouter so we can specify the router inside App.js
const Index = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

render(<Index />, document.getElementById("root"));
