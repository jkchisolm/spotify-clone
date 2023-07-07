"use client";

import InfoCard from "@/app/components/general/InfoCard";
import { useGetSpecificSearchResultsQuery } from "@/store/slices/apiSlice";
import { useParams } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function Searchshows() {
  const params = useParams();

  const { data, isLoading, isError } = useGetSpecificSearchResultsQuery({
    query: params.term,
    category: "show",
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
            {data.shows?.items
              .filter((n) => n)
              .map((show) => {
                return (
                  <InfoCard
                    key={show.id}
                    header={show.name}
                    description={"By " + show.publisher}
                    imageUrl={show.images[0].url}
                    imageType="circle"
                    url={`/show/${show.id}`}
                    id={show.id}
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
