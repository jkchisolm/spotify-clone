"use client";

import TrackContainer from "@/app/components/Layout/MusicDisplays/Tracks/TrackContainer";
import PlayButton from "@/app/components/general/PlayButton";
import { StyleContext } from "@/lib/contexts/styleContext";
import { sanitizeDescription } from "@/lib/helpers/sanitizeDescription";
import {
  useGetSinglePlaylistQuery,
  useLazyGetPlaylistItemsWithOffsetQuery,
} from "@/store/slices/apiSlice";
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MoonLoader } from "react-spinners";

type Props = {
  params: { id: string };
};

export default function PlaylistPage() {
  const params = useParams();

  const styleContext = useContext(StyleContext);
  const [tracks, setTracks] = useState<SpotifyApi.PlaylistTrackObject[]>([]);

  const { data, isLoading, isError } = useGetSinglePlaylistQuery({
    id: params.id,
  });

  const [trigger, { data: tracksData, isLoading: tracksLoading }] =
    useLazyGetPlaylistItemsWithOffsetQuery();

  useEffect(() => {
    async function getColor() {
      fac.getColorAsync(data?.images[0].url!).then((color) => {
        styleContext.setTopbarBG(color.hex);
        // styleContext.setBackgroundUrl(data?.images[0].url!);
        if (data?.owner.display_name == "Spotify") {
          styleContext.setBackgroundUrl(data?.images[0].url!);
        } else {
          styleContext.setBackgroundUrl("");
        }
      });
    }

    const fac = new FastAverageColor();
    if (data) {
      getColor();
    }
  }, [data, styleContext]);

  useEffect(() => {
    if (data) {
      // console.log(data.tracks.total);
      // setTracks(data.tracks.items);
    }
    if (data && data.tracks.total > 100) {
      // if the tracks are greater than 100, we need to keep refetching until we get all of them
      console.log("fetching more tracks");
      let curTracks = tracks;
      let trackCount = data.tracks.total - 100;
      let i = 1;

      let newTracks: SpotifyApi.PlaylistTrackObject[] = [];

      trigger({ id: params.id, offset: 100 }).then((res) => {
        console.log(res.data!.items);
        curTracks = [...curTracks, ...res.data!.items];
        setTracks(curTracks);
      });

      trackCount -= 50;

      while (trackCount > 0) {
        setTimeout(() => {}, 500);
        trigger({ id: params.id, offset: 100 + i * 50 }).then((res) => {
          curTracks = [...curTracks, ...res.data!.items];
          setTracks(curTracks);
          console.log(curTracks);
        });
        i++;
        trackCount -= 50;
      }

      console.log(newTracks);
      console.log(tracks);
    }
  }, [data]);

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
        <div
          className={`h-full w-full flex flex-col justify-start items-center pt-4`}
        >
          <Helmet>
            <title>
              {data.name} - a playlist by {data.owner.display_name} | Recreatify{" "}
            </title>
          </Helmet>
          <div className="flex flex-row justify-start items-center w-full z-20">
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
            <div className="flex flex-col justify-start items-start ml-4 drop-shadow-2xl">
              <h1 className="text-sm font-bold text-white">
                {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
              </h1>
              <p className="text-white text-7xl font-bold my-2">{data.name}</p>
              <div className="text-white text-sm leading-5 min-h-[1.25rem]">
                {/* @ts-ignore */}
                {sanitizeDescription(data.description)}
              </div>
              <div className="text-white text-sm">
                <span className="font-bold">{data.owner.display_name}</span>{" "}
                &#x2022; {data.tracks.total} songs,{" "}
                <span className="text-white">
                  {data.followers.total
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  followers
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center w-full mt-5 mb-5 z-20">
            <div className="w-16 h-16">
              <PlayButton
                requireHover={false}
                fontSize="text-4xl"
                playContext={data.uri}
              />
            </div>
          </div>
          <div className="mt-4">
            <TrackContainer
              // @ts-ignore
              tracks={
                tracks.length > 0
                  ? [...data.tracks.items, ...tracks]
                  : data.tracks.items
              }
              displayType="playlist"
              playlistUri={data.uri}
            />
          </div>
        </div>
      )}
    </div>
  );
}
