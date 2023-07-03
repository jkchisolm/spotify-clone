"use client";

import CategoryRow from "@/app/components/Layout/MusicDisplays/Playlist/CategoryRow";
import { useGetGenericSearchResultsQuery } from "@/store/slices/apiSlice";

export default function SearchResultsPage({
  params,
}: {
  params: { term: string };
}) {
  const { data, isLoading, isError } = useGetGenericSearchResultsQuery({
    query: params.term,
  });

  return (
    <div className="bg-zinc-900 text-white pt-12 h-full">
      {data && (
        <div className="flex flex-col">
          <div className="mt-4 mx-3">
            <CategoryRow
              items={data!
                .artists!.items.filter((n) => n)
                .map((artist) => {
                  return {
                    id: artist.id,
                    header: artist.name,
                    description: "",
                    imageUrl:
                      artist.images.length > 0
                        ? artist.images[0].url
                        : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a",
                    url: `/artist/${artist.id}`,
                  };
                })}
              rowName="Artists"
              rowCategory="artists"
              useShowAllButton={false}
            />
          </div>
          <div className="mt-4 mx-3">
            <CategoryRow
              items={
                // filter the playlists to only include the necessary props
                data!
                  .playlists!.items.filter((n) => n)
                  .map((playlist) => {
                    return {
                      id: playlist.id,
                      header: playlist.name,
                      description: playlist.description!,
                      imageUrl: playlist.images[0].url,
                      url: `/playlist/${playlist.id}`,
                    };
                  })
              }
              rowName="Playlists"
              rowCategory="toplists"
              useShowAllButton={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
