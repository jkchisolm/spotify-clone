"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import {
  useNextMutation,
  usePauseMutation,
  usePlayCollectionMutation,
  usePreviousMutation,
  useRepeatMutation,
  useShuffleMutation,
} from "@/store/slices/apiSlice";
import {
  FaCirclePlay,
  FaCirclePause,
  FaForwardFast,
  FaBackwardFast,
  FaShuffle,
  FaRepeat,
} from "react-icons/fa6";
import { MdRepeat, MdRepeatOne } from "react-icons/md";
import Seekbar from "./Seekbar";

export default function PlayerControls() {
  const isPlaying = useAppSelector(
    (state) => state.player.trackStatus.isPlaying
  );

  const deviceId = useAppSelector((state) => state.player.deviceId);
  const currentTrack = useAppSelector((state) => state.player.currentTrack);
  const shuffle = useAppSelector(
    (state) => state.player.trackStatus.shuffleState
  );
  const repeatStatus = useAppSelector(
    (state) => state.player.trackStatus.repeatState
  );

  const [triggerPlay] = usePlayCollectionMutation();
  const [triggerPause] = usePauseMutation();
  const [triggerNext] = useNextMutation();
  const [triggerPrevious] = usePreviousMutation();
  const [triggerShuffle] = useShuffleMutation();
  const [triggerRepeat] = useRepeatMutation();

  const handlePlay = () => {
    // resume
    if (deviceId && currentTrack) {
      triggerPlay({ device_id: deviceId });
    }
  };

  const handlePause = () => {
    if (deviceId) {
      triggerPause({ device_id: deviceId });
    }
  };

  const handleNext = () => {
    if (deviceId) {
      triggerNext({ device_id: deviceId });
    }
  };

  const handlePrevious = () => {
    if (deviceId) {
      triggerPrevious({ device_id: deviceId });
    }
  };

  const handleShuffle = () => {
    if (deviceId) {
      triggerShuffle({ device_id: deviceId, state: !shuffle });
    }
  };

  const handleRepeat = () => {
    const newStatus =
      repeatStatus == 2 ? "off" : repeatStatus == 1 ? "track" : "context";
    if (deviceId) {
      triggerRepeat({ device_id: deviceId, state: newStatus });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center">
        <FaShuffle
          className={`${
            shuffle ? "text-spotify-green" : "text-zinc-400"
          } hover:scale-110  mr-7 text-2xl`}
          onClick={handleShuffle}
        />
        <FaBackwardFast
          className="text-zinc-400 hover:scale-110 text-2xl"
          onClick={handlePrevious}
        />
        {isPlaying ? (
          <FaCirclePause
            className="text-white text-4xl hover:scale-110 mx-7"
            onClick={handlePause}
          />
        ) : (
          <FaCirclePlay
            className="text-white text-4xl hover:scale-110 mx-7"
            onClick={handlePlay}
          />
        )}
        <FaForwardFast
          className="text-zinc-400 hover:scale-110 text-2xl"
          onClick={handleNext}
        />
        {repeatStatus != 2 ? (
          <MdRepeat
            className={`${
              repeatStatus == 0 ? "text-zinc-400" : "text-spotify-green"
            } hover:scale-110 text-3xl ml-7 relative z-0`}
            onClick={handleRepeat}
          />
        ) : (
          <MdRepeatOne
            className="text-spotify-green hover:scale-110 text-3xl ml-7 relative z-0"
            onClick={handleRepeat}
          />
        )}
      </div>
      <div className="w-full">
        <Seekbar />
      </div>
    </div>
  );
}
