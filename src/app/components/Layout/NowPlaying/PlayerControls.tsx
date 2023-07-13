"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import {
  useNextMutation,
  usePauseMutation,
  usePlayCollectionMutation,
  usePreviousMutation,
} from "@/store/slices/apiSlice";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaBackward,
  FaForward,
} from "react-icons/fa";

export default function PlayerControls() {
  const isPlaying = useAppSelector(
    (state) => state.player.trackStatus.isPlaying
  );

  const deviceId = useAppSelector((state) => state.player.deviceId);
  const currentTrack = useAppSelector((state) => state.player.currentTrack);

  const [triggerPlay, result] = usePlayCollectionMutation();
  const [triggerPause, pauseResult] = usePauseMutation();
  const [triggerNext, _] = useNextMutation();
  const [triggerPrevious, __] = usePreviousMutation();

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

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center">
        <FaBackward
          className="text-zinc-400 hover:scale-110 text-2xl"
          onClick={handlePrevious}
        />
        {isPlaying ? (
          <FaPauseCircle
            className="text-white text-4xl hover:scale-110 mx-7"
            onClick={handlePause}
          />
        ) : (
          <FaPlayCircle
            className="text-white text-4xl hover:scale-110 mx-7"
            onClick={handlePlay}
          />
        )}
        <FaForward
          className="text-zinc-400 hover:scale-110 text-2xl"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
