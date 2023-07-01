import Link from "next/link";
import PlaylistCard from "./PlaylistCard";

type Props = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  rowName: string;
  rowCategory: string;
};

export default function PlaylistCategoryRow({
  playlists,
  rowName,
  rowCategory,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{rowName}</h1>
        <Link
          href={`/playlistCategory/${rowCategory}`}
          className="text-sm font-bold text-zinc-400 hover:text-green-600"
        >
          Show all
        </Link>
      </div>
      <div className="grid grid-cols-7 mt-3">
        {playlists.map((playlist) => (
          <PlaylistCard playlist={playlist} key={playlist.id} />
        ))}
      </div>
    </div>
  );
}
