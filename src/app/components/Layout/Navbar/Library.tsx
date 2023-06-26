import { useState } from "react";
import { BiLibrary, BiPlus } from "react-icons/bi";
import Button from "../../general/Button";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);

  return (
    <div className="bg-zinc-900 rounded flex flex-col mt-2 text-white p-2 h-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-lg text-zinc-500 font-bold flex flex-row items-center">
            <BiLibrary size={32} /> <span className="ml-4">Your Library</span>
          </h1>
        </div>
        <div className="text-zinc-500">
          <BiPlus size={24} />
        </div>
      </div>
      {playlists.length > 0 ? (
        <div></div>
      ) : (
        <div className="text-white flex flex-col items-stretch my-4">
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
