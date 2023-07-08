import UserPlaylistCard from "./UserPlaylistCard";

type Props = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  rowName: string;
};

export default function UserPlaylistRow({ playlists, rowName }: Props) {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-5">
      {playlists.map((playlist) => (
        <div className="col-span-1 row-span-1" key={playlist.id}>
          <div className="flex flex-col" key={playlist.id}>
            <UserPlaylistCard playlist={playlist} />
          </div>
        </div>
      ))}
    </div>
  );
}
