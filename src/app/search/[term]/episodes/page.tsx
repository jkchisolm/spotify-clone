"use client";

import EpisodeContainer from "@/app/components/Layout/MusicDisplays/Episodes/EpisodeContainer";
import { useGetSpecificSearchResultsQuery } from "@/store/slices/apiSlice";
import { useParams } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function SearchEpisodes() {
  const params = useParams();

  const { data, isLoading, isError } = useGetSpecificSearchResultsQuery({
    query: params.term,
    category: "episode",
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
        <div className="bg-zinc-900 pt-8 px-8 min-h-full pb-4">
          <div className="w-1/2">
            <EpisodeContainer episodes={data.episodes?.items!} />
          </div>
        </div>
      )}
    </div>
  );
}
