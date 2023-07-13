"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import useAuth from "@/lib/hooks/useAuth";
import {
  useLazyGetMeQuery,
  useLazyRefreshAccessTokenQuery,
  useTransferPlaybackMutation,
} from "@/store/slices/apiSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  setDeviceId,
  setCurrentTrack,
  setTrackStatus,
} from "@/store/slices/playerSlice";
import PlayerInfo from "./PlayerInfo";
import PlayerControls from "./PlayerControls";

export default function Player() {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [transferPlayback, transferResult] = useTransferPlaybackMutation();

  const dispatch = useAppDispatch();

  const loggedIn = useAppSelector(
    (state) => state.spotifyApi.userAuthenticated
  );

  const auth = useAuth();

  // const accessToken = Cookies.get("access_token");

  const [trigger, { isLoading, isError, data, error }] =
    useLazyRefreshAccessTokenQuery();

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
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (info) => {
        if (info) {
          console.log("Currently Playing", info.track_window.current_track);
          if (info.position) {
            console.log("Position in Song", info.position);
          }
          console.log("Duration of Song", info.duration);
          dispatch(setCurrentTrack(info.track_window.current_track));
          dispatch(setTrackStatus({ isPlaying: !info.paused }));
        }
      });

      player.connect();

      // make the current device this one
      async function transferPlaybackHere(deviceId: string) {
        // first get available devices
        await fetch("https://api.spotify.com/v1/me/player/devices", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });

        // // transfer playback to this device
        transferPlayback({ device_ids: [deviceId], play: false });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [auth.accessToken]);

  return (
    <div className="col-span-3">
      {auth.accessToken && player ? (
        <div className="text-white bg-black px-4 w-full h-full flex flex-row justify-between items-center">
          <div className="w-[30%]">
            <PlayerInfo />
          </div>
          <div className="w-[40%]">
            <PlayerControls />
          </div>
          <div className="w-[30%] text-right">Volume and stuff</div>
        </div>
      ) : (
        <div>Not logged in</div>
      )}
    </div>
  );
}

const loadWebPlaybackScript = () => {};
