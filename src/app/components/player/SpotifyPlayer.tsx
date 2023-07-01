import { useEffect } from "react";

export default function SpotifyPlayer() {
  useWebPlaybackScript();

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {};
  });
}

const useWebPlaybackScript = () => {
  useEffect(() => {
    if (!window.Spotify) {
      // append sdk to dom
      appendSdkToDom();
    }
  }, []);
};

const appendSdkToDom = () => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);
};
