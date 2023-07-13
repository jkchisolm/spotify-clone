"use client";

import {
  FaPlayCircle,
  FaPauseCircle,
  FaBackward,
  FaForward,
} from "react-icons/fa";

export default function PlayerControls() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center">
        <FaBackward className="text-zinc-400 hover:scale-110 text-2xl" />
        <FaPlayCircle className="text-white text-4xl hover:scale-110 mx-7" />
        <FaForward className="text-zinc-400 hover:scale-110 text-2xl" />
      </div>
    </div>
  );
}
