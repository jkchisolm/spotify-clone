import Image from "next/image";
import Link from "next/link";

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
};

export default function UserPlaylistCard({ playlist }: Props) {
  return (
    <Link href={`/playlist/${playlist.id}`}>
      <div className="flex flex-row justify-start items-center bg-spotify-playlist-bg bg-opacity-70 hover:cursor-pointer hover:bg-zinc-700 hover:bg-opacity-70 rounded transition-all">
        <Image
          src={playlist.images[0].url}
          alt={playlist.name}
          width={75}
          height={75}
          className="rounded-l"
        />
        <div className="text-white ml-2 font-bold">{playlist.name}</div>
      </div>
    </Link>
  );
}
