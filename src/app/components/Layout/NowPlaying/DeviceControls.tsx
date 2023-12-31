"use client";

import { PlayerContext } from "@/lib/contexts/playerContext";
import { useContext, useEffect, useRef, useState } from "react";
import { FaVolumeHigh } from "react-icons/fa6";
import styles from "./DeviceControls.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";

type Props = {
  player: Spotify.Player;
};

export default function DeviceControls(props: Props) {
  const [volume, changeVolume] = useState(0.5);

  // const playerContext = useContext(PlayerContext);

  const volumeBar = useRef<HTMLInputElement>(null);

  const handleVolumeChange = async () => {
    const pos = volumeBar.current!.value;

    if (props.player) {
      // await props.player.setVolume(Math.round(parseInt(pos)) / 100);
      changeVolume(Math.round(parseInt(pos)) / 100);
    }
  };

  useEffect(() => {
    async function getCurrentVolume() {
      // const vol = await props.player.getVolume();
      // changeVolume(vol!);
    }
    getCurrentVolume();
  });

  useEffect(() => {
    // update volume bar
    if (volumeBar.current) {
      volumeBar.current.max = "100";
      volumeBar.current.value = (volume * 100).toString();
      volumeBar.current.style.setProperty(
        "--seek-before-width",
        `${volume * 100}%`
      );
    }
  }, [volume]);

  return (
    <div className="flex flex-row justify-center items-center relative">
      <div className="w-1/2"></div>
      <div className="w-1/2 flex flex-row justify-end items-center">
        <FaVolumeHigh className="text-white text-2xl" />
        <div className="mx-3">
          <input
            type="range"
            className={styles.volumeBar}
            style={{ position: "relative" }}
            ref={volumeBar}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}
