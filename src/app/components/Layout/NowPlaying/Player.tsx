"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import {
  useLazyGetMeQuery,
  useLazyRefreshAccessTokenQuery,
} from "@/store/slices/apiSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Player() {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const loggedIn = useAppSelector(
    (state) => state.spotifyApi.userAuthenticated
  );

  const accessToken = Cookies.get("access_token");

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
          cb(accessToken!);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        transferPlaybackHere(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();

      // make the current device this one
      async function transferPlaybackHere(deviceId: string) {
        // first get available devices
        await fetch("https://api.spotify.com/v1/me/player/devices", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });

        // // get the current playback info
        // await fetch("https://api.spotify.com/v1/me/player", {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data);
        //   });

        // await fetch("https://api.spotify.com/v1/me/player", {
        //   method: "PUT",
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        //   body: JSON.stringify({
        //     device_ids: [deviceId],
        //     // play: true,
        //   }),
        // });
      }
    };
  }, [accessToken]);

  return (
    <div className="col-span-3">
      {loggedIn ? (
        <div className="text-white bg-black w-full h-full">Player</div>
      ) : (
        <div>Not logged in</div>
      )}
    </div>
  );
}

const loadWebPlaybackScript = () => {};
