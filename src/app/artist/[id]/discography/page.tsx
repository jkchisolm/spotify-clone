"use client";

import {
  useGetArtistAlbumsQuery,
  useGetArtistInfoQuery,
} from "@/store/slices/apiSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PiPlayCircleFill } from "react-icons/pi";
import { MoonLoader } from "react-spinners";

export default function ArtistDiscography() {
  const params = useParams();

  const {
    data: artistInfo,
    isLoading: loadingArtistInfo,
    isError: errorArtistInfo,
  } = useGetArtistInfoQuery({
    id: params.id,
  });

  const { data, isLoading, isError } = useGetArtistAlbumsQuery({
    id: params.id,
    limit: 50,
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
          <h1 className="text-3xl font-bold mb-4">{artistInfo?.name}</h1>
          {data.items.map((album) => {
            return (
              <div
                key={album.id}
                className="flex flex-row items-center justify-start my-2"
              >
                <Image
                  src={album.images[0].url}
                  alt={album.name}
                  width={125}
                  height={125}
                />
                <div className="flex flex-col items-start justify-evenly ml-4">
                  <h1 className="text-3xl font-bold hover:underline ml-1">
                    <Link href={`/album/${album.id}`}>{album.name}</Link>
                  </h1>
                  <h2 className="text-sm text-zinc-400 ml-1">
                    {album.album_type.charAt(0).toUpperCase() +
                      album.album_type.substring(
                        1,
                        album.album_type.length + 1
                      )}
                  </h2>
                  <div className="mt-4 text-left">
                    <PiPlayCircleFill className="text-white" size={40} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
