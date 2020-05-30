import React from "react";
import { Switch, Route } from "react-router-dom";
import Show from "./components/Show";
import Episodes from "./components/Episodes";
import Episode from "./components/Episode";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/show" component={Show} />
        <Route exact path="/episodes" component={Episodes} />
        <Route exact path="/episode" component={Episode} />
      </Switch>
    </div>
  );
}

export default App;
