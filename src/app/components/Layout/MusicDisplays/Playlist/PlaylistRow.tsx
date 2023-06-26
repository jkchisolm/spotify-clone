import React from "react";
import PlaylistCard from "./PlaylistCard";

type Props = {
  rowName: string;
  playlists: SpotifyApi.PlaylistObjectSimplified[];
};

const PlaylistRow = (props: Props) => {
  return (
    <div>
      <div className="text-white text-2xl font-bold">{props.rowName}</div>
      <div className="flex flex-row overflow-x-auto">
        {props.playlists.map((playlist) => (
          <PlaylistCard playlist={playlist} key={playlist.id} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistRow;
