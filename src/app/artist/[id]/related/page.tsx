"use client";

import InfoCard from "@/app/components/general/InfoCard";
import { useGetArtistRelatedArtistsQuery } from "@/store/slices/apiSlice";
import { useParams } from "next/navigation";
import { MoonLoader } from "react-spinners";

export default function RelatedArtists() {
  const params = useParams();

  const { data, isLoading, isError } = useGetArtistRelatedArtistsQuery({
    id: params.id,
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
          <h1 className="text-2xl font-bold mb-4">Fans also like</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {data.artists
              .filter((n) => n)
              .map((artist) => {
                return (
                  <InfoCard
                    key={artist.id}
                    header={artist.name}
                    description={
                      artist.type.charAt(0).toUpperCase() + artist.type.slice(1)
                    }
                    imageUrl={
                      artist.images.length > 0
                        ? artist.images[0].url
                        : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a"
                    }
                    imageType="circle"
                    url={`/artist/${artist.id}`}
                    id={artist.id}
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
