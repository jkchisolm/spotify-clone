import Image from "next/image";

type Props = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
};

export default function PlaylistCard({ playlist }: Props) {
  // truncate the description if it's too long
  // if (playlist.description!.length > 45) {
  //   playlist.description = playlist.description!.slice(0, 38) + "...";
  // }

  return (
    <div
      className="col-span-1 flex flex-col p-3 grow bg-zinc-800 rounded hover:bg-zinc-700 hover:cursor-pointer"
      key={playlist.id}
    >
      <div className="relative w-full aspect-square">
        <Image
          fill
          className="object-cover"
          src={
            playlist
              ? playlist.images[0].url
              : "https://via.placeholder.com/150"
          }
          alt={playlist.name}
        />
      </div>
      <div className="text-white font-bold mt-2">{playlist.name}</div>
      <div className="text-zinc-400 text-xs line-clamp-2">
        {playlist.description}
      </div>
    </div>
  );
}
