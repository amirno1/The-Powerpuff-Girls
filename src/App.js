import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";
import { ShowContext } from "./Store";
import Show from "./components/Show";
import Episodes from "./components/Episodes";
import Episode from "./components/Episode";
import Navbar from "./components/Navbar";
import "./App.scss";

function App(props) {
  const [show, setShow] = useContext(ShowContext);

  // Fetching the Show data
  useEffect(() => {
    const fetchShow = async () => {
      const showresponse = await fetch(
        "http://api.tvmaze.com/singlesearch/shows?q=the-powerpuff-girls"
      ).then(res => res.json());

      // Set the show data after fetching
      setShow({
        state: "loaded",
        data: showresponse
      });

      // Redirect to the Show Url after fetching data
      props.history.push(
        `/shows/${showresponse.id}/${showresponse.name.replace(/\s/g, "-")}`
      );
    };

    if (show.state === "initial") {
      fetchShow();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulate loading when the data is fetching
  if (show.state === "initial") {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/shows/:showId/:showName" component={Show} />
        <Route
          exact
          path="/shows/:showId/:showName/episodes"
          component={Episodes}
        />
        <Route exact path="/episode" component={Episode} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
