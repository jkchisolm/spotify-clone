"use client";

import PlaylistCard from "@/app/components/Layout/MusicDisplays/Playlist/PlaylistCard";
import {
  useGetCategoryPlaylistsQuery,
  useGetSingleCategoryQuery,
} from "@/store/slices/apiSlice";
import { usePathname } from "next/navigation";

type Props = {
  categoryId: string;
};

export default function SearchCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: categoryInfo, isLoading: categoryInfoLoading } =
    useGetSingleCategoryQuery({ id: params.id });

  const { data, isLoading, isError } = useGetCategoryPlaylistsQuery({
    id: params.id,
  });

  console.log(data);

  return (
    <div className="h-full">
      {data && categoryInfo && (
        <div className="bg-zinc-900 text-white pt-12 px-3 flex flex-col">
          <div className="text-7xl text-white font-bold pt-16 mb-20">
            {categoryInfo.name}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {data.playlists.items
              .filter((n) => n)
              .map((playlist) => {
                return <PlaylistCard playlist={playlist} key={playlist.id} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}
