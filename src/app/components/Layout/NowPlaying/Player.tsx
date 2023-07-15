"use client";

import { PlayerContext } from "@/lib/contexts/playerContext";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import useAuth from "@/lib/hooks/useAuth";
import { useTransferPlaybackMutation } from "@/store/slices/apiSlice";
import {
  setCurrentTrack,
  setDeviceId,
  setTrackStatus,
} from "@/store/slices/playerSlice";
import { useContext, useEffect, useState } from "react";
import DeviceControls from "./DeviceControls";
import PlayerControls from "./PlayerControls";
import PlayerInfo from "./PlayerInfo";
import { Helmet } from "react-helmet";

export default function Player() {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [transferPlayback] = useTransferPlaybackMutation();

  const playerContext = useContext(PlayerContext);

  const auth = useAuth();

  const dispatch = useAppDispatch();

  const curTrack = useAppSelector((state) => state.player.currentTrack);

  useEffect(() => {
    // console.log(props.token);

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spotify Clone",
        getOAuthToken: (cb) => {
          cb(auth.accessToken!);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        dispatch(setDeviceId({ id: device_id }));
        transferPlaybackHere(device_id);
        // setTimeout(() => {
        // }, 2500);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (info) => {
        // playerContext.setPlayer(player);
        if (info) {
          dispatch(setCurrentTrack(info.track_window.current_track));
          dispatch(
            setTrackStatus({
              isPlaying: !info.paused,
              shuffleState: info.shuffle,
              repeatState: info.repeat_mode,
              duration: info.duration,
              currentProgressMs: info.position,
            })
          );
        }
      });

      player.connect();

      // make the current device this one
      async function transferPlaybackHere(deviceId: string) {
        // // transfer playback to this device
        transferPlayback({ device_ids: [deviceId], play: false });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [auth.accessToken, dispatch, playerContext, transferPlayback]);

  return (
    <div className="col-span-3">
      {curTrack && (
        <Helmet>
          <title>
            {curTrack.name} by {curTrack?.artists[0].name}
          </title>
        </Helmet>
      )}
      {auth.accessToken && player ? (
        <div className="text-white bg-black px-4 w-full h-full flex flex-row justify-between items-center">
          <div className="w-[30%]">
            <PlayerInfo />
          </div>
          <div className="w-[40%]">
            <PlayerControls />
          </div>
          <div className="w-[30%] text-right">
            <DeviceControls player={player} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const loadWebPlaybackScript = () => {};
