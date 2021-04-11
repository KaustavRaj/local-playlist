import React, { Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";

export const PlaylistCardSkeleton = () => {
  return (
    <div className="animate-pulse ring-1 w-full ring-gray-300 rounded-md p-3 flex justify-between items-center shadow-lg">
      <div className="bg-gray-400 w-36 h-5 rounded"></div>
      <div className="bg-gray-400 w-16 h-3 rounded"></div>
    </div>
  );
};

export const PlaylistCard = (props) => {
  return (
    <Draggable draggableId={props.data.id} index={props.index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="ring-1 w-full ring-gray-300 rounded-md p-3 flex justify-between items-center shadow-lg">
              <h1 className="text-sm truncate">{props.data.name}</h1>
              <h1 className="opacity-60 text-sm">
                {props.data.tracks.total} Songs
              </h1>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
