"use client";

import InfoCard from "@/app/components/general/InfoCard";
import { useGetSpecificSearchResultsQuery } from "@/store/slices/apiSlice";
import { useParams } from "next/navigation";

export default function SearchAlbums() {
  const params = useParams();

  const { data, isLoading, isError } = useGetSpecificSearchResultsQuery({
    query: params.term,
    category: "album",
  });

  return (
    <div className="min-h-full">
      {data && (
        <div className="bg-zinc-900 text-white pt-8 px-3 min-h-full flex flex-col pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 auto-rows-fr">
            {data.albums?.items
              .filter((n) => n)
              .map((album) => {
                return (
                  <InfoCard
                    key={album.id}
                    header={album.name}
                    description={
                      album.release_date +
                      " • " +
                      album.artists.map((artist) => artist.name).join(", ")
                    }
                    imageUrl={
                      album.images.length > 0
                        ? album.images[0].url
                        : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a"
                    }
                    imageType="circle"
                    url={`/album/${album.id}`}
                    id={album.id}
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
