export const ACTIONS = {
  AUTHENTICATED: "authenticated",
  SPOTIFY_ADD: "spotify_add",
  SPOTIFY_REMOVE: "spotify_remove",
  MYLIST_ADD: "mylist_add",
  SHIFT: "shift",
};

export const auth = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
  };
};

export const spotifyAdd = (state, action) => {
  const { playlists } = action;
  state.spotifyPlaylists = state.spotifyPlaylists.concat(playlists);
  return state;
};

export const spotifyRemove = (state, action) => {
  const { playlist } = action;

  return {
    ...state,
    spotifyPlaylists: state.spotifyPlaylists.filter(
      (eachPlaylist) => eachPlaylist.id !== playlist.id
    ),
  };
};

export const mylistAdd = (state, action) => {
  const { playlists } = action;
  state.myPlaylists = state.myPlaylists.concat(playlists);
  return state;
};

export const spotifyToMyList = (state, action) => {
  // react beautiful dnd's source of the form :
  // {droppableId: <string>, index: <number>}
  const { source } = action;
  let removeFromIndex = source.index;

  let [playlist] = state.spotifyPlaylists.splice(removeFromIndex, 1);
  state.myPlaylists.push(playlist);
  return state;
};
