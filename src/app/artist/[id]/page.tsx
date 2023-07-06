"use client";

import {
  useGetArtistAlbumsQuery,
  useGetArtistInfoQuery,
  useGetArtistRelatedArtistsQuery,
  useGetArtistTopTracksQuery,
} from "@/store/slices/apiSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
import { useContext, useEffect, useState } from "react";
import { PiPlayCircleFill } from "react-icons/pi";
import TrackRow from "@/app/components/Layout/MusicDisplays/Tracks/TrackRow";
import CategoryRow from "@/app/components/Layout/MusicDisplays/CategoryRow";
import { StyleContext } from "@/lib/contexts/styleContext";

export default function ArtistPage() {
  const params = useParams();
  const [bgGradient, setBgGradient] = useState("");
  const [mainColor, setMainColor] = useState<FastAverageColorResult | null>(
    null
  );

  const colorContext = useContext(StyleContext);

  const { data, isLoading, isError } = useGetArtistInfoQuery({
    id: params.id,
  });

  const {
    data: artistTopTracks,
    isLoading: loadingTopTracks,
    isError: errorTopTracks,
  } = useGetArtistTopTracksQuery({
    id: params.id,
  });

  const {
    data: artistDiscography,
    isLoading: loadingDiscography,
    isError: errorDiscography,
  } = useGetArtistAlbumsQuery({
    id: params.id,
    limit: 7,
  });

  const {
    data: relatedArtists,
    isLoading: loadingRelated,
    isError: errorRelated,
  } = useGetArtistRelatedArtistsQuery({
    id: params.id,
  });

  useEffect(() => {
    async function getColor() {
      fac.getColorAsync(data?.images[0].url!).then((color) => {
        // console.log(color);
        setBgGradient(color.hex);
        setMainColor(color);
        colorContext.setTopbarBG(color.hex);
      });
    }

    const fac = new FastAverageColor();
    if (data) {
      getColor();
    }
  }, [data]);

  return (
    <div className="min-h-fit">
      {data ? (
        <div
          className={`h-full w-full flex flex-col justify-start items-center pt-10 pb-4`}
          style={{
            background: `linear-gradient(180deg, ${bgGradient} 0%, #18181b 30%)`,
          }}
        >
          <div className="flex flex-row justify-start items-center w-full px-4">
            <Image
              src={data.images[0].url}
              alt={data.name}
              style={{
                borderRadius: "100%",
              }}
              height={200}
              width={200}
            />
            <div className="flex flex-col ml-5">
              <h1 className="text-7xl font-extrabold text-white">
                {data.name}
              </h1>
              <div className="mt-4 text-gray-400">
                <p
                  className={`text-lg`}
                  style={{ textShadow: "#000 1px 0 10px" }}
                >
                  {
                    // format follower count
                    data.followers.total
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }{" "}
                  followers
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center w-full px-4 mt-5">
            <PiPlayCircleFill
              className="text-green-500 text-4xl hover:text-green-700 hover:cursor-pointer"
              size={72}
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full px-4 mt-5 pt-10 bg-zinc-900">
            <h1 className="text-2xl font-bold text-white pl-2 mb-2">Popular</h1>
            {artistTopTracks ? (
              <div className="w-full px-8">
                {artistTopTracks.tracks.map((track, index) => {
                  return (
                    <TrackRow
                      key={track.id}
                      index={index + 1}
                      track={{
                        ...track,
                        album: {
                          ...track.album,
                          name: track.popularity.toString(),
                        },
                      }}
                      displayType="album"
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-400">Loading...</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-start items-start w-full px-4 mt-5 text-white">
            {artistDiscography ? (
              <CategoryRow
                items={artistDiscography.items!.map((album) => {
                  return {
                    ...album,
                    header: album.name,
                    description:
                      album.album_type.charAt(0).toUpperCase() +
                      album.album_type.slice(1, album.type.length + 1),
                    imageUrl: album.images[0].url,
                    type: "album",
                    url: `/album/${album.id}`,
                  };
                })}
                rowName="Discography"
                useShowAllButton={true}
                showAllUrl={`/artist/${params.id}/discography`}
                clampOne
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-400">Loading...</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-start items-start w-full px-4 mt-5">
            {relatedArtists ? (
              <div className="w-full text-white">
                <CategoryRow
                  items={relatedArtists!.artists
                    .slice(0, 7)
                    .filter((n) => n)
                    .map((artist) => {
                      return {
                        id: artist.id,
                        header: artist.name,
                        description:
                          artist.type.charAt(0).toUpperCase() +
                          artist.type.slice(1),
                        imageUrl:
                          artist.images.length > 0
                            ? artist.images[0].url
                            : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a",
                        url: `/artist/${artist.id}`,
                      };
                    })}
                  rowName="Fans also like"
                  useShowAllButton={true}
                  showAllUrl={`/artist/${params.id}/related`}
                  rounded
                  clampOne
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-400">Loading...</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-400">Loading...</p>
        </div>
      )}
    </div>
  );
}
