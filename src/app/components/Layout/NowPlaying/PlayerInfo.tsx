"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import Image from "next/image";
import Link from "next/link";

export default function PlayerInfo() {
  const currentTrack = useAppSelector((state) => state.player.currentTrack);

  return (
    <div className="flex flex-row justify-start items-center">
      <div className="w-14 h-14 relative">
        <Image
          src={
            currentTrack
              ? currentTrack.album.images
                ? currentTrack.album.images[0].url
                : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a"
              : "https://i.scdn.co/image/ab6761610000e5ebb1a15fd3e7c1b375dea2637a"
          }
          alt={currentTrack ? currentTrack.name : "No track playing"}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex flex-col justify-center items-start h-full ml-3">
        <div className="text-white font-bold line-clamp-1 max-h-5 min-h-[20px]">
          {currentTrack ? (
            <span className="hover:underline">
              <Link href={`/album/${currentTrack.album.uri.slice(14)}`}>
                {currentTrack.name}
              </Link>
            </span>
          ) : (
            "No track playing"
          )}
        </div>
        <div className="text-zinc-400 text-xs line-clamp-2 leading-5 max-h-10">
          {currentTrack
            ? currentTrack.artists.map((artist, index) => {
                return (
                  <span key={artist.name}>
                    <Link href={`/artist/${artist.uri.slice(15)}`}>
                      <span className="font-bold hover:underline">
                        {artist.name}
                      </span>
                      {index !== currentTrack.artists.length - 1 ? ", " : ""}
                    </Link>
                  </span>
                );
              })
            : "No track playing"}
        </div>
      </div>
    </div>
  );
}
