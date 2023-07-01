import Image from "next/image";
import Link from "next/link";

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
};

export default function UserPlaylistCard({ playlist }: Props) {
  return (
    <Link href={`/playlist/${playlist.id}`}>
      <div className="flex flex-row justify-start items-center bg-slate-400 bg-opacity-10 hover:bg-opacity-20 hover:cursor-pointer rounded">
        <Image
          src={playlist.images[0].url}
          alt={playlist.name}
          width={75}
          height={75}
        />
        <div className="text-white ml-2 font-bold">{playlist.name}</div>
      </div>
    </Link>
  );
}
