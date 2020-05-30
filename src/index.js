import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Store from "./Store";
import App from "./App";

// wrapping App with the BrowserRouter so we can specify the routes inside App.js
const Index = () => (
  <BrowserRouter>
    <Store>
      <App />
    </Store>
  </BrowserRouter>
);

render(<Index />, document.getElementById("root"));
