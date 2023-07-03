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
    <div className="bg-zinc-900 text-white pt-12 min-h-fit pb-4">
      {data && (
        <div className="flex flex-col h-full">
          <div className="mt-4 mx-3">
            <CategoryRow
              items={data!
                .tracks!.items.filter((n) => n)
                .map((track) => {
                  return {
                    id: track.id,
                    header: track.name,
                    description: track.artists[0].name,
                    imageUrl:
                      track.album.images.length > 0
                        ? track.album.images[0].url
                        : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a",
                    url: `/track/${track.id}`,
                  };
                })}
              rowName="Tracks"
              useShowAllButton={false}
              clampOne
            />
          </div>
          <div className="mt-4 mx-3">
            <CategoryRow
              items={data!
                .artists!.items.filter((n) => n)
                .map((artist) => {
                  return {
                    id: artist.id,
                    header: artist.name,
                    description:
                      artist.type.charAt(0).toUpperCase() +
                      artist.type.slice(1),
                    imageUrl:
                      artist.images.length > 0
                        ? artist.images[0].url
                        : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a",
                    url: `/artist/${artist.id}`,
                  };
                })}
              rowName="Artists"
              useShowAllButton={false}
              rounded
              clampOne
            />
          </div>
          <div className="mt-4 mx-3">
            <CategoryRow
              items={data!
                .albums!.items.filter((n) => n)
                .map((album) => {
                  return {
                    id: album.id,
                    header: album.name,
                    description:
                      album.release_date + " • " + album.artists[0].name,
                    imageUrl:
                      album.images.length > 0
                        ? album.images[0].url
                        : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a",
                    url: `/album/${album.id}`,
                  };
                })}
              rowName="Albums"
              useShowAllButton={false}
              clampOne
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
                      description: "By " + playlist.owner.display_name,
                      imageUrl: playlist.images[0].url,
                      url: `/playlist/${playlist.id}`,
                    };
                  })
              }
              rowName="Playlists"
              useShowAllButton={false}
              clampOne
            />
          </div>
          <div className="mt-4 mx-3">
            <CategoryRow
              items={
                // filter the playlists to only include the necessary props
                data!
                  .shows!.items.filter((n) => n)
                  .map((show) => {
                    return {
                      id: show.id,
                      header: show.name,
                      description: "By " + show.publisher,
                      imageUrl: show.images[0].url,
                      url: `/show/${show.id}`,
                    };
                  })
              }
              rowName="Podcasts"
              useShowAllButton={false}
              clampOne
            />
          </div>
          <div className="mt-4 mx-3">
            <CategoryRow
              items={
                // filter the playlists to only include the necessary props
                data!
                  .episodes!.items.filter((n) => n)
                  .map((episode) => {
                    return {
                      id: episode.id,
                      header: episode.name,
                      // convert duration to minutes
                      description:
                        episode.release_date +
                        " • " +
                        Math.round(episode.duration_ms / 60000) +
                        " min",
                      imageUrl: episode.images[0].url,
                      url: `/episode/${episode.id}`,
                    };
                  })
              }
              rowName="Episodes"
              useShowAllButton={false}
              clampOne
            />
          </div>
          <div className="mt-4 mx-3">
            <CategoryRow
              items={
                // filter the playlists to only include the necessary props
                data!
                  .audiobooks!.items.filter((n) => n)
                  .map((audiobook) => {
                    return {
                      id: audiobook.id,
                      header: audiobook.name,
                      // convert duration to minutes
                      description: audiobook.authors[0].name,
                      imageUrl: audiobook.images[0].url,
                      url: `/audiobook/${audiobook.id}`,
                    };
                  })
              }
              rowName="Audiobooks"
              useShowAllButton={false}
              clampOne
            />
          </div>
        </div>
      )}
    </div>
  );
}
