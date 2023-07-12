"use client";

import { PiClockBold } from "react-icons/pi";
import TrackRow from "./TrackRow";

type Props = {
  tracks: SpotifyApi.TrackObjectFull[];
  displayType: "playlist" | "results" | "album";
};

const gridOptions = [
  "16px 4fr minmax(120px, 1fr)",
  "16px 4fr 2fr minmax(120px, 1fr)",
  "16px 6fr 4fr 3fr minmax(120px, 1fr)",
];

export default function TrackContainer(props: Props) {
  return (
    <div className="w-full h-full text-white">
      <div
        className="grid gap-x-4"
        style={{
          gridTemplateColumns:
            props.displayType == "album"
              ? gridOptions[0]
              : props.displayType == "results"
              ? gridOptions[1]
              : gridOptions[2],
        }}
      >
        <div className="col-span-1 text-zinc-400">#</div>
        <div className="col-span-1 text-zinc-400">Title</div>
        {props.displayType == "results" || props.displayType == "playlist" ? (
          <div className="col-span-1 text-zinc-400">Album</div>
        ) : (
          <></>
        )}
        {props.displayType == "playlist" ? (
          <div className="col-span-1 text-zinc-400">Date added</div>
        ) : (
          <></>
        )}
        <div className="col-span-1 text-zinc-400 flex flex-row justify-center items-center">
          <PiClockBold size={16} />
        </div>
        <div className="flex flex-col justify-stretch items-start border-t-2 border-zinc-500 col-span-full pt-5 mt-2">
          {
            // map each track to a TrackRow component
            props.tracks.map((track, index) => {
              return (
                <TrackRow
                  key={index}
                  track={track}
                  index={index + 1}
                  displayType={props.displayType}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
