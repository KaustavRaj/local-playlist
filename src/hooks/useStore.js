import { useReducer } from "react";
import * as methods from "../store/methods";

const initialState = {
  isAuthenticated: false,
  spotifyPlaylists: [],
  myPlaylists: [],
  userData: {},
};

const { ACTIONS } = methods;

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTHENTICATED:
      return methods.auth(state, action);

    case ACTIONS.SPOTIFY_ADD:
      return methods.spotifyAdd(state, action);

    case ACTIONS.SPOTIFY_REMOVE:
      return methods.spotifyRemove(state, action);

    case ACTIONS.MYLIST_ADD:
      return methods.mylistAdd(state, action);

    case ACTIONS.SHIFT:
      return methods.spotifyToMyList(state, action);

    default: {
      return state;
    }
  }
};

const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};

export default useStore;
