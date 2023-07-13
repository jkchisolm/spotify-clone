"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import styles from "./Seekbar.module.css";
import { stat } from "fs";
import { useEffect, useRef, useState } from "react";
import { useSeekMutation } from "@/store/slices/apiSlice";

export default function Seekbar() {
  const progressBar = useRef(null);

  const [curProgress, setCurProgress] = useState(0);

  const duration = useAppSelector(
    (stat) => stat.player.currentTrack?.duration_ms
  );

  const currentProgressFromState = useAppSelector(
    (state) => state.player.trackStatus.currentProgressMs
  );

  const curTrack = useAppSelector((state) => state.player.currentTrack?.id);
  const deviceId = useAppSelector((state) => state.player.deviceId);
  const [prevTrack, setPrevTrack] = useState<string | null>(null);
  const isPlaying = useAppSelector(
    (state) => state.player.trackStatus.isPlaying
  );

  const [seek] = useSeekMutation();

  const updateProgress = () => {
    setCurProgress((prev) => prev + 1000);
    progressBar!.current!.style.setProperty(
      "--seek-before-width",
      `${
        (curProgress / duration!) * 100 >= 1
          ? (curProgress / duration!) * 100
          : 1
      }%`
    );
    moveHead();
  };

  const moveHead = () => {
    if (progressBar.current) {
      progressBar.current.value = curProgress;
    }
  };

  const seekToPosition = (e: any) => {
    const pos = progressBar.current.value;
    seek({ position_ms: pos, device_id: deviceId! });
  };

  // store current track and check out if track changes
  useEffect(() => {
    if (curTrack != prevTrack) {
      setPrevTrack(curTrack as string);
      // wait a second, then change
      setTimeout(() => {
        setCurProgress(0);
        progressBar!.current!.style.setProperty("--seek-before-width", `1%`);
      }, 100);
    }
  }, [curTrack, prevTrack]);

  useEffect(() => {
    // useEffect to increase curProgress every second while song is playing
    if (isPlaying && duration && progressBar.current) {
      progressBar!.current!.style.setProperty(
        "--seek-before-width",
        `${
          (curProgress / duration) * 100 >= 1
            ? (curProgress / duration) * 100
            : 1
        }%`
      );
      const interval = setInterval(updateProgress, 1000);
      return () => clearInterval(interval);
    } else {
    }
  });

  useEffect(() => {
    // change progress  bar if the state's current progress changes
    if (
      progressBar.current &&
      duration &&
      currentProgressFromState &&
      curTrack == prevTrack
    ) {
      setCurProgress(0);
      setCurProgress(currentProgressFromState);
      progressBar.current.max = duration;
      progressBar.current.style.setProperty(
        "--seek-before-width",
        `${
          (currentProgressFromState / duration) * 100 > 1
            ? (currentProgressFromState / duration) * 100
            : 1
        }%`
      );
    }
    // if the current track changes, reset the progress bar
  }, [currentProgressFromState, duration, curTrack]);

  return (
    <div className="w-full h-3 flex flex-row justify-center items-center mt-3 relative">
      <div>
        {
          // convert current progress into mm:ss, add a 0 if seconds is less than 10
          curProgress
            ? `${Math.floor(curProgress / 60000)}:${
                Math.floor((curProgress % 60000) / 1000) < 10
                  ? "0" + Math.floor((curProgress % 60000) / 1000)
                  : Math.floor((curProgress % 60000) / 1000)
              }`
            : "0:00"
        }
      </div>
      <input
        type="range"
        className={styles.progBar}
        style={{ margin: "0px 10px", position: "relative" }}
        ref={progressBar}
        onChange={seekToPosition}
      />
      <div>
        {
          // convert duration into mm:ss, add a 0 if seconds is less than 10
          duration
            ? `${Math.floor(duration / 60000)}:${
                Math.floor((duration % 60000) / 1000) < 10
                  ? "0" + Math.floor((duration % 60000) / 1000)
                  : Math.floor((duration % 60000) / 1000)
              }`
            : "0:00"
        }
      </div>
    </div>
  );
}
