"use client";

import TrackContainer from "@/app/components/Layout/MusicDisplays/Tracks/TrackContainer";
import PlayButton from "@/app/components/general/PlayButton";
import { StyleContext } from "@/lib/contexts/styleContext";
import { formatDate } from "@/lib/helpers/formatDate";
import { useGetSingleAlbumQuery } from "@/store/slices/apiSlice";
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { MoonLoader } from "react-spinners";

export default function AlbumPage() {
  const params = useParams();

  const styleContext = useContext(StyleContext);

  const { data, isLoading, isError } = useGetSingleAlbumQuery({
    id: params.id,
  });

  const getTotalAlbumLength = () => {
    let total = 0;
    data?.tracks.items.forEach((track) => {
      total += track.duration_ms;
    });
    return total;
  };

  const getTextSize = () => {
    // make text smaller the longer it gets
    if (data) {
      if (data.name.length > 50) {
        return "text-4xl";
      } else if (data.name.length > 35) {
        return "text-5xl";
      } else if (data.name.length > 20) {
        return "text-6xl";
      } else {
        return "text-7xl";
      }
    }
  };

  useEffect(() => {
    async function getColor() {
      fac
        .getColorAsync(
          data?.images[0].url
            ? data?.images[0].url
            : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a"
        )
        .then((color) => {
          styleContext.setTopbarBG(color.hex);
        });
    }

    const fac = new FastAverageColor();
    if (data) {
      getColor();
    }
  }, [data, styleContext]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-screen">
        <MoonLoader color="#1DB954" />
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-fit">
      {data && (
        <div className="h-full w-full flex flex-col justify-start items-center pt-4">
          <div className="flex flex-row justify-start items-center pt-4 w-full">
            <div
              className="relative drop-shadow-2xl shadow-black"
              style={{ width: "225px", height: "225px" }}
            >
              <Image
                src={data.images[0].url}
                alt={data.name}
                className="object-cover rounded"
                fill
              />
            </div>
            <div className="flex flex-col justify-start items-start ml-4 h-full">
              <h2 className="text-sm font-bold text-white">
                {data.album_type.charAt(0).toUpperCase() +
                  data.album_type.slice(1)}
              </h2>
              <h1
                className={`text-white ${getTextSize()} font-bold my-2`}
                // style={{ fontSize: `${100 - data.name.length / 10}vw` }}
              >
                {data.name}
              </h1>
              <div className="leading-5 min-h-[1.25rem]"></div>
              <div className="text-sm text-white">
                {data.artists.map((artist, i) => {
                  return (
                    <Link href={`/artist/${artist.id}`} key={artist.id}>
                      <span key={artist.id} className="font-bold">
                        <span className="hover:underline">{artist.name}</span>
                        {i !== data.artists.length - 1 ? ` • ` : ""}
                      </span>
                    </Link>
                  );
                })}
                {` • `}
                {data.release_date.slice(0, 4)} • {data.tracks.total}{" "}
                {data.tracks.total > 1 ? "songs" : "song"}
                {", "}
                <span className="text-spotify-gray-text">
                  {
                    Math.floor(getTotalAlbumLength() / 60000) +
                      " min " +
                      ((getTotalAlbumLength() % 60000) / 1000).toFixed(0) +
                      " sec"
                    // format to x min y sec
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center w-full mt-10">
            <div className="w-16 h-16">
              <PlayButton
                requireHover={false}
                fontSize="text-4xl"
                playContext={data.uri}
              />
            </div>
          </div>
          <div className="mt-4 w-full">
            <TrackContainer
              // @ts-ignore
              tracks={data.tracks.items.map((track) => {
                return {
                  ...track,
                  album: {
                    ...data,
                  },
                };
              })}
              displayType={"album"}
            />
          </div>
          <div className="mt-4 text-spotify-gray-text flex flex-col justify-start items-start w-full">
            <p className="text-sm">
              {formatDate("long", new Date(data.release_date))}
            </p>
            {data.copyrights.map((copyright, index) => {
              return (
                <div key={copyright.text} className="text-xs">
                  {
                    // if text doesn't start with the copyright symbol, add it
                    copyright.text.startsWith(
                      index == 0 ? String.fromCharCode(169) : "℗"
                    )
                      ? ""
                      : index == 0
                      ? String.fromCharCode(169) + " "
                      : "℗ "
                  }
                  {copyright.text}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
