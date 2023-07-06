"use client";

import InfoCard from "@/app/components/general/InfoCard";
import { useGetSpecificSearchResultsQuery } from "@/store/slices/apiSlice";
import { useParams } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function SearchAudiobooks() {
  const params = useParams();

  const { data, isLoading, isError } = useGetSpecificSearchResultsQuery({
    query: params.term,
    category: "audiobook",
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
        <div className="bg-zinc-900 text-white pt-8 px-3 min-h-full flex flex-col pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {
              // @ts-ignore
              data.audiobooks?.items
                // @ts-ignore
                .filter((n) => n)
                // @ts-ignore
                .map((audiobook) => {
                  return (
                    <InfoCard
                      key={audiobook.id}
                      header={audiobook.name}
                      description={"By " + audiobook.publisher}
                      imageUrl={audiobook.images[0].url}
                      imageType="circle"
                      url={`/audiobook/${audiobook.id}`}
                      id={audiobook.id}
                      clampOne={true}
                    />
                  );
                })
            }
          </div>
        </div>
      )}
    </div>
  );
}
