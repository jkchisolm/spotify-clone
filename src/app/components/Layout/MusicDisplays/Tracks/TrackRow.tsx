import Image from "next/image";
import Link from "next/link";

type Props = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
  displayType: "playlist" | "results" | "album";
  index: number;
};

export default function TrackRow(props: Props) {
  return (
    <div
      className="grid w-full gap-4 text-white text-md hover:bg-zinc-700 py-1"
      style={{
        gridTemplateColumns:
          props.displayType == "album"
            ? "16px 4fr minmax(120px, 1fr)"
            : props.displayType == "results"
            ? "16px 4fr 2fr minmax(120px, 1fr)"
            : "16px 6fr 4fr 3fr minmax(120px, 1fr)",
      }}
    >
      <div className="col-span-1 flex flex-col justify-center items-center">
        {props.index}
      </div>
      <div className="col-span-1 flex flex-row justify-start items-center">
        <Image
          src={(props.track as SpotifyApi.TrackObjectFull).album.images[0].url}
          alt={(props.track as SpotifyApi.TrackObjectFull).name}
          width={40}
          height={40}
        />
        <div className="flex flex-col justify-center items-start ml-4">
          {(props.track as SpotifyApi.TrackObjectFull).name}
          <div className="text-zinc-400">
            {(props.track as SpotifyApi.TrackObjectFull).explicit ? (
              <span className="bg-zinc-400 text-zinc-900 px-1 text-sm mr-2 rounded">
                E
              </span>
            ) : (
              ""
            )}
            {
              // list each artist in a span
              (props.track as SpotifyApi.TrackObjectFull).artists.map(
                (artist, index) => {
                  return (
                    <Link
                      href={`/artist/${artist.id}`}
                      key={index}
                      className="hover:underline"
                    >
                      <span key={index}>
                        {artist.name}
                        {index ==
                        (props.track as SpotifyApi.TrackObjectFull).artists
                          .length -
                          1
                          ? ""
                          : ", "}
                      </span>
                    </Link>
                  );
                }
              )
            }
          </div>
        </div>
      </div>
      {props.displayType == "results" || props.displayType == "playlist" ? (
        <div className="col-span-1 text-zinc-400 flex flex-col justify-center items-start hover:underline hover:text-white">
          <Link
            href={`/album/${
              (props.track as SpotifyApi.TrackObjectFull).album.id
            }`}
          >
            {(props.track as SpotifyApi.TrackObjectFull).album.name}
          </Link>
        </div>
      ) : (
        <></>
      )}
      {props.displayType == "playlist" ? (
        <div className="col-span-1 text-zinc-400">
          {(props.track as SpotifyApi.PlaylistTrackObject).added_at}
        </div>
      ) : (
        <></>
      )}
      <div className="col-span-1 flex flex-row justify-center items-center text-zinc-400">
        {
          // convert milliseconds to mm:ss
          new Date((props.track as SpotifyApi.TrackObjectFull).duration_ms)
            .toISOString()
            .substr(14, 5)
        }
      </div>
    </div>
  );
}
