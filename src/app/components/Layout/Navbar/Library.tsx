import { BiLibrary } from "react-icons/bi";

export default function Library() {
  return (
    <div className="bg-zinc-900 rounded flex flex-col my-2 text-white p-2">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-lg text-zinc-500 font-bold flex flex-row items-center">
            <BiLibrary size={32} /> <span className="ml-4">Your Library</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
