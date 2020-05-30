import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShowContext } from "../Store";

const NavBar = () => {
  const [show] = useContext(ShowContext);
  return (
    <nav className="navbar">
      <NavLink
        activeClassName="navbar__active"
        className="navbar__tab"
        exact
        strict
        to={`/shows/${show.data.id}/${show.data.name.replace(/\s/g, "-")}`}
        replace
      >
        Show
      </NavLink>
      <NavLink
        activeClassName="navbar__active"
        className="navbar__tab"
        exact
        strict
        to={`/shows/${show.data.id}/${show.data.name.replace(
          /\s/g,
          "-"
        )}/episodes`}
        replace
      >
        Episodes
      </NavLink>
    </nav>
  );
};

export default NavBar;
