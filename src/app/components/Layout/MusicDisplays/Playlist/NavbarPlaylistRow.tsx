import Image from "next/image";
import Link from "next/link";

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
};

export default function NavbarPlaylistRow({ playlist }: Props) {
  return (
    <Link href={`/playlist/${playlist.id}`}>
      <div className="flex flex-row justify-start items-center hover:bg-zinc-400 hover:bg-opacity-10 hover:cursor-pointer p-3">
        <Image
          src={playlist.images[0].url}
          alt={playlist.name}
          width={50}
          height={50}
          className="rounded"
        />
        <div className="flex flex-col justify-center items-start ml-2">
          <div className="text-white font-bold">{playlist.name}</div>
          <div className="text-zinc-400 text-sm">
            by {playlist.owner.display_name} | {playlist.tracks.total} tracks
          </div>
        </div>
      </div>
    </Link>
  );
}
