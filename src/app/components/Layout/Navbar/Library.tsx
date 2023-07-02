"use client";

import {
  useGetUserLibraryQuery,
  useGetUserPlaylistsQuery,
} from "@/store/slices/apiSlice";
import { BiLibrary, BiPlus } from "react-icons/bi";
import { MoonLoader } from "react-spinners";
import Button from "../../general/Button";
import NavbarPlaylistRow from "../MusicDisplays/Playlist/NavbarPlaylistRow";

export default function Library() {
  const { data: userPlaylists, isFetching, isError } = useGetUserLibraryQuery();

  return (
    <div className="bg-zinc-900 rounded flex flex-col mt-2 text-white px-2 pb-2 h-full overflow-scroll relative">
      <div className="flex flex-row justify-between items-center sticky top-0 bg-zinc-900 py-4">
        <div>
          <h1 className="text-lg text-zinc-500 font-bold flex flex-row items-center">
            <BiLibrary size={32} /> <span className="ml-4">Your Library</span>
          </h1>
        </div>
        <div className="text-zinc-500">
          <BiPlus size={24} />
        </div>
      </div>
      {isFetching ? (
        <div className="text-white flex flex-row justify-center items-center justify-self-center">
          <MoonLoader color="#ffffff" loading={isFetching} size={50} />
        </div>
      ) : isError ? (
        <div className="text-white">Error</div>
      ) : userPlaylists != undefined && userPlaylists.items.length > 0 ? (
        <div className="flex flex-col">
          {userPlaylists.items.map((playlist) => (
            <NavbarPlaylistRow key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <div className="text-white flex flex-col items-stretch my-4 grow-0">
          <div className="bg-zinc-800 p-4 rounded">
            <div className="font-bold">Create your first playlist</div>
            <div className="my-1">It&apos;s easy, we&apos;ll help you.</div>
            <div className="my-4">
              <Button
                color="bg-white"
                hoverColor="bg-slate-400"
                textColor="text-black"
                style="pill"
              >
                Create playlist
              </Button>
            </div>
          </div>
          <div className="bg-zinc-800 p-4 rounded mt-4">
            <div className="font-bold">
              Let&apos;s find some podcasts to follow
            </div>
            <div className="my-1">
              We&apos;ll keep you updated on new episodes.
            </div>
            <div className="my-4">
              <Button
                color="bg-white"
                hoverColor="bg-slate-400"
                textColor="text-black"
                style="pill"
              >
                Browse podcasts
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
