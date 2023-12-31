"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import { useSeekMutation } from "@/store/slices/apiSlice";
import { useEffect, useRef, useState } from "react";
import styles from "./Seekbar.module.css";

export default function Seekbar() {
  const progressBar = useRef<HTMLInputElement>(null);

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
    if (duration) {
      progressBar.current!.max = duration!.toString();
    }
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
      progressBar.current.value = curProgress.toString();
    }
  };

  const seekToPosition = (e: any) => {
    // only run if user is not dragging
    const pos = progressBar.current!.value;
    seek({ position_ms: parseInt(pos), device_id: deviceId! });
  };

  // store current track and check out if track changes
  useEffect(() => {
    if (curTrack != prevTrack) {
      setPrevTrack(curTrack as string);
      // wait a second, then change
      // update max duration
      if (duration) {
        progressBar.current!.max = duration!.toString();
      }
      setTimeout(() => {
        setCurProgress(0);
        progressBar!.current!.style.setProperty("--seek-before-width", `1%`);
      }, 100);
    } else if (curTrack == prevTrack && currentProgressFromState == 0) {
      setCurProgress(0);
      progressBar!.current!.style.setProperty("--seek-before-width", `1%`);
    }
  }, [curTrack, prevTrack, currentProgressFromState]);

  useEffect(() => {
    // useEffect to increase curProgress every second while song is playing
    if (duration) {
      progressBar.current!.max = duration!.toString();
    }
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
      progressBar.current.max = duration.toString();
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
  }, [currentProgressFromState, duration, curTrack, prevTrack]);

  return (
    <div className="w-full h-3 flex flex-row justify-center items-center mt-3 relative">
      <div className="w-8 min-w-[2rem] max-w-8">
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
      <div className="w-8">
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
