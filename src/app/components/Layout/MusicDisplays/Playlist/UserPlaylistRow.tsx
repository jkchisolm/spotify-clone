import UserPlaylistCard from "./UserPlaylistCard";

type Props = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  rowName: string;
};

export default function UserPlaylistRow({ playlists, rowName }: Props) {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1">
      {playlists.map((playlist) => (
        <div className="col-span-1 row-span-1">
          <div className="flex flex-col p-3" key={playlist.id}>
            <UserPlaylistCard playlist={playlist} />
          </div>
        </div>
      ))}
    </div>
  );
}
