import React, { useState, useEffect, Fragment } from "react";
import { Droppable } from "react-beautiful-dnd";
import { AiOutlineLoading } from "react-icons/ai";
import { PlaylistCard, PlaylistCardSkeleton } from "./PlaylistCard";
import { ACTIONS } from "../store/methods";
import useStore from "../hooks/useStore";

const Playlists = ({ methods, mylist, listIds }) => {
  const [state, dispatch] = useStore();
  const [intialLoading, setIntialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const playlists = mylist ? state.myPlaylists : state.spotifyPlaylists;
  const playlistId = mylist ? listIds.MINE : listIds.SPOTIFY;

  const loadData = (callback) => {
    let initialCallMethod = mylist
      ? methods.getMyPlaylists
      : methods.getSpotifyPlaylists;

    initialCallMethod()
      .then((newPlaylists) =>
        dispatch({
          type: mylist ? ACTIONS.MYLIST_ADD : ACTIONS.SPOTIFY_ADD,
          playlists: newPlaylists,
        })
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(callback);
  };

  useEffect(() => {
    if (intialLoading) {
      loadData(() => {
        setIntialLoading(false);
        console.log(state);
      });
    }
  }, [playlists]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      loadData(() => {
        setLoadingMore(false);
      });
    }
  };

  const PlaylistsSkeleton = () => {
    return (
      <Fragment>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <PlaylistCardSkeleton key={index} />
          ))}
      </Fragment>
    );
  };

  return (
    <Droppable droppableId={playlistId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col w-full h-full ring-1 ring-gray-300 rounded-md py-3 px-4 overflow-hidden"
        >
          {/* Header - title & button */}
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-lg">
              {mylist ? "My playlists" : "Spotify playlists"}
            </h1>
            {/* {mylist && (
              <h1 className="opacity-80 text-sm cursor-pointer">See all</h1>
            )} */}
          </header>

          {/* Grid display of playlists */}
          <main className="flex flex-col gap-y-5">
            {intialLoading ? (
              <PlaylistsSkeleton />
            ) : (
              playlists.map((eachPlaylist, index) => (
                <PlaylistCard
                  key={eachPlaylist.id}
                  data={eachPlaylist}
                  index={index}
                  movable={mylist ? false : true}
                />
              ))
            )}
          </main>

          {/* Load more footer */}
          {!intialLoading && (
            <footer className="w-full mt-8 flex justify-center">
              <div
                className="py-1 px-2 ring-2 ring-gray-500 rounded-lg cursor-pointer flex items-center hover:bg-gray-500 hover:text-white"
                onClick={handleLoadMore}
              >
                {loadingMore && (
                  <AiOutlineLoading className="animate-spin h-4 w-4 mr-2" />
                )}
                <h1>Load more</h1>
              </div>
            </footer>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default Playlists;
