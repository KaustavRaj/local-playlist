import React, { createContext } from "react";
import useStore from "../hooks/useStore";

const PlaylistContext = createContext();

function PlaylistsProvider(props) {
  const { children } = props;

  return (
    <PlaylistContext.Provider value={useStore()}>
      {children}
    </PlaylistContext.Provider>
  );
}

export default PlaylistsProvider;
