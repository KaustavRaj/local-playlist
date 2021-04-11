import React from "react";
import { FcGoogle } from "react-icons/fc";
import { DragDropContext } from "react-beautiful-dnd";
import PlaylistsProvider from "./store/PlaylistsProvider";
import Playlists from "./components/Playlists";
import useStore from "./hooks/useStore";
import { ACTIONS } from "./store/methods";

const spotify = require("./data/spotify.json").data;
const me = require("./data/mylist.json").data;

const Heading = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="text-2xl">Save.it</h1>
      <div className="p-2 bg-red-400 hover:bg-red-500 cursor-pointer rounded-md text-white">
        Sign out
      </div>
    </div>
  );
};

const App = () => {
  const [_, dispatch] = useStore();

  const listIds = {
    SPOTIFY: "spotifyList",
    MINE: "myList",
  };

  const getSpotifyPlaylists = (offset) => {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(spotify), 3000)
    );
  };

  const getMyPlaylists = (offset) => {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(me), 3000)
    );
  };

  const movePlaylist = (source, destination) => {};

  const onDragEnd = ({ source, destination }) => {
    // dropped outside, ignore it
    if (!destination) {
      return;
    }

    // dropped in same playlist, ignore it
    if (source.droppableId === destination.droppableId) {
      return;
    }

    // move from spotifyList -> myList only
    if (source.droppableId !== listIds.SPOTIFY) {
      return;
    }

    // otherwise
    console.log("SOURCE", source);
    console.log("DEST", destination);

    dispatch({ type: ACTIONS.SHIFT, source: source, destination: destination });
  };

  const childMethods = { getSpotifyPlaylists, getMyPlaylists };

  const defaultBody = () => {
    return (
      <div className="p-2 w-full group rounded-lg ring-2 ring-indigo-600 text-white flex justify-center items-center text-center cursor-pointer hover:bg-indigo-500 hover:text-white">
        <div className="rounded-full group-hover:bg-white p-0.5">
          <FcGoogle className="h-7 w-7" />
        </div>
      </div>
    );
  };

  return (
    <PlaylistsProvider>
      <div className="h-screen w-screen py-3 px-8 text-gray-800 flex flex-col font-quicksand font-bold overflow-x-auto">
        <Heading />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full flex gap-x-8 my-5">
            <Playlists methods={childMethods} listIds={listIds} />
            <Playlists methods={childMethods} listIds={listIds} mylist />
          </div>
        </DragDropContext>
      </div>
    </PlaylistsProvider>
  );
};

export default App;
