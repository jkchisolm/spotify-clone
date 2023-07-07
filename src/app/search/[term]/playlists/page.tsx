"use client";

import InfoCard from "@/app/components/general/InfoCard";
import { useGetSpecificSearchResultsQuery } from "@/store/slices/apiSlice";
import { useParams } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function SearchPlaylists() {
  const params = useParams();

  const { data, isLoading, isError } = useGetSpecificSearchResultsQuery({
    query: params.term,
    category: "playlist",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <MoonLoader color={"#1DB954"} />
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {data && (
        <div className="bg-spotify-dark-bg text-white pt-8 px-3 min-h-full flex flex-col pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {data.playlists?.items
              .filter((n) => n)
              .map((playlist) => {
                return (
                  <InfoCard
                    key={playlist.id}
                    header={playlist.name}
                    description={"By " + playlist.owner.display_name}
                    imageUrl={playlist.images[0].url}
                    imageType="circle"
                    url={`/playlist/${playlist.id}`}
                    id={playlist.id}
                    clampOne={true}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
