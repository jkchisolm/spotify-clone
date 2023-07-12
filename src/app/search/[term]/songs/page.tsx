"use client";

import TrackContainer from "@/app/components/Layout/MusicDisplays/Tracks/TrackContainer";
import InfoCard from "@/app/components/general/InfoCard";
import { useGetSpecificSearchResultsQuery } from "@/store/slices/apiSlice";
import { useParams } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function SearchSongs() {
  const params = useParams();

  const { data, isLoading, isError } = useGetSpecificSearchResultsQuery({
    query: params.term,
    category: "track",
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
        <div className="bg-spotify-dark-bg pt-8 px-8  min-h-full pb-4">
          <TrackContainer displayType="results" tracks={data.tracks?.items!} />
        </div>
      )}
    </div>
  );
}
