import InfoCard from "@/app/components/general/InfoCard";
import Link from "next/link";

type Props = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  rowName: string;
  rowCategory: string;
  useShowAllButton: boolean;
};

export default function PlaylistCategoryRow({
  playlists,
  rowName,
  rowCategory,
  useShowAllButton,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{rowName}</h1>
        {useShowAllButton && (<Link
          href={`/playlistCategory/${rowCategory}`}
          className="text-sm font-bold text-zinc-400 hover:text-green-600"
        >
          Show all
        </Link>)}
      </div>
      <div className="grid grid-cols-7 mt-3 gap-3">
        {playlists.map((playlist) => (
          <InfoCard
            key={playlist.id}
            header={playlist.name}
            description={playlist.description!}
            imageUrl={playlist.images[0].url}
            imageType="square"
            url={`/playlist/${playlist.id}`}
            id={playlist.id}
          />
        ))}
      </div>
    </div>
  );
}
