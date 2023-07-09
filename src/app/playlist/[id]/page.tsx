"use client";

import { StyleContext } from "@/lib/contexts/styleContext";
import { useGetSinglePlaylistQuery } from "@/store/slices/apiSlice";
import { FastAverageColor } from "fast-average-color";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import Image from "next/image";

const decodeUnicode = (text: string) => {
  const decoded = text.replace(/&#x([0-9a-f]+);/gi, (_, code) =>
    String.fromCharCode(parseInt(code, 16))
  );
  return decoded;
};

export default function PlaylistPage() {
  const params = useParams();

  const styleContext = useContext(StyleContext);

  const { data, isLoading, isError } = useGetSinglePlaylistQuery({
    id: params.id,
  });

  useEffect(() => {
    async function getColor() {
      fac.getColorAsync(data?.images[0].url!).then((color) => {
        styleContext.setTopbarBG(color.hex);
      });
    }

    const fac = new FastAverageColor();
    if (data) {
      getColor();
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <MoonLoader color={"#1DB954"} />
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-fit">
      {data && (
        <div
          className={`h-full w-full flex flex-col justify-start items-center pt-4`}
        >
          <div className="flex flex-row justify-start items-center w-full">
            <div
              className="relative"
              style={{ width: "225px", height: "225px" }}
            >
              <Image
                src={data.images[0].url}
                alt={data.name}
                className="object-cover rounded"
                fill
              />
            </div>
            <div className="flex flex-col justify-start items-start ml-4">
              <h1 className="text-sm font-bold text-white">
                {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
              </h1>
              <p className="text-white text-7xl font-bold my-2">{data.name}</p>
              <div className="text-spotify-gray-text text-sm leading-5 min-h-[1.25rem]">
                {decodeUnicode(data.description)}
              </div>
              <div className="text-white text-sm">
                <span className="font-bold">{data.owner.display_name}</span>{" "}
                &#x2022; {data.tracks.total} songs,{" "}
                <span className="text-spotify-gray-text">
                  {data.followers.total} followers
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
