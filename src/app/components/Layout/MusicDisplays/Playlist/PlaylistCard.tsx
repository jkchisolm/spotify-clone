import Image from "next/image";

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
};

export default function PlaylistCard({ playlist }: Props) {
  return (
    <div
      className="flex flex-col p-3 bg-zinc-800 mx-3 min-w-[30rem]"
      key={playlist.id}
    >
      <Image
        src={playlist.images[0].url}
        alt={playlist.name}
        width={300}
        height={300}
      />
      <div className="text-white">{playlist.name}</div>
    </div>
  );
}
