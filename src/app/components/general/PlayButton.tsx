"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import {
  usePlayCollectionMutation,
  useTransferPlaybackMutation,
} from "@/store/slices/apiSlice";

type Props = {
  requireHover: boolean;
  commmand?: string;
  fontSize?: string;
  playContext?: string;
};

export default function PlayButton(props: Props) {
  const [playSong, result] = usePlayCollectionMutation();

  const device_id = useAppSelector((state) => state.player.deviceId);

  const handlePlay = () => {
    if (props.playContext && device_id) {
      playSong({ device_id, context_uri: props.playContext });
    }
  };

  return (
    <div
      className={`text-black bg-spotify-green ${
        props.fontSize ? props.fontSize : "text-2xl"
      } leading-6 rounded-full w-full h-full flex flex-row justify-center items-center ${
        props.requireHover ? "opacity-0 group-hover:opacity-100" : ""
      } transform-all duration-300 shadow-lg shadow-black hover:scale-110 hover:cursor-pointer`}
      onClick={handlePlay}
    >
      ▶
    </div>
  );
}
