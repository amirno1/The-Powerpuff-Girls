import React, { useState } from "react";

export const ShowContext = React.createContext();
export const EpisodesContext = React.createContext();

// Put all the states inside store
const Store = ({ children }) => {
  const [show, setShow] = useState({
    state: "initial",
    data: []
  });
  const [episodes, setEpisodes] = useState({
    state: "initial",
    data: []
  });
  return (
    <ShowContext.Provider value={[show, setShow]}>
      <EpisodesContext.Provider value={[episodes, setEpisodes]}>
        {children}
      </EpisodesContext.Provider>
    </ShowContext.Provider>
  );
};

export default Store;
