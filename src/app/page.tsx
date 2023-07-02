"use client";

import { ApiContext } from "@/lib/contexts/apiContext";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useLazyGetUserPlaylistsQuery } from "@/store/slices/apiSlice";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import PlaylistCategoryRow from "./components/Layout/MusicDisplays/Playlist/PlaylistCategoryRow";
import UserPlaylistRow from "./components/Layout/MusicDisplays/Playlist/UserPlaylistRow";

export default function Home() {
  const loggedIn = useAppSelector(
    (state) => state.spotifyApi.userAuthenticated
  );

  const dispatch = useAppDispatch();

  const apiContext = useContext(ApiContext);

  const [
    triggerGetUserPlaylists,
    { isLoading, isError, data: userPlaylistData, error },
  ] = useLazyGetUserPlaylistsQuery();

  const [welcomeString, setWelcomeString] = useState("");

  const [topPlaylists, setTopPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  const [featuredPlaylists, setFeaturedPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  const fetchTopPlaylists = () => {
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(Cookies.get("access_token")!);

    // get the top playlists
    spotifyApi.getCategoryPlaylists("toplists", { limit: 7 }).then((data) => {
      console.log(data);
      setTopPlaylists(data.playlists.items);
    });
  };

  const fetchFeaturedPlaylists = () => {
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(Cookies.get("access_token")!);

    spotifyApi.getFeaturedPlaylists({ limit: 7 }).then((data) => {
      console.log(data);
      setFeaturedPlaylists(data.playlists.items);
    });
  };

  useEffect(() => {
    let date = new Date();
    let hour = date.getHours();

    if (hour < 12) {
      setWelcomeString("Good morning");
    } else if (hour < 18) {
      setWelcomeString("Good afternoon");
    } else {
      setWelcomeString("Good evening");
    }
  }, []);

  useEffect(() => {
    if (apiContext.refresh_token != "" && apiContext.refreshing != true) {
      // fetchUserPlaylists();
      triggerGetUserPlaylists({ limit: 50 });
      fetchTopPlaylists();
      fetchFeaturedPlaylists();
    }
  }, [apiContext.refresh_token]);

  return (
    <div className="text-white bg-zinc-900 w-full h-full mt-2 rounded">
      {apiContext.refresh_token != "" ? (
        <div className="">
          <div className="text-3xl font-bold ml-2 pt-5">{welcomeString}</div>
          <div>
            {userPlaylistData != undefined && (
              <UserPlaylistRow
                rowName="Good evening"
                playlists={userPlaylistData.items.slice(0, 6)}
              />
            )}
            {topPlaylists != undefined && (
              <div className="mt-4 mx-3">
                <PlaylistCategoryRow
                  playlists={topPlaylists}
                  rowName="Top Playlists"
                  rowCategory="toplists"
                />
              </div>
            )}
            {featuredPlaylists != undefined && (
              <div className="mt-4 mx-3">
                <PlaylistCategoryRow
                  playlists={featuredPlaylists}
                  rowName="Featured Playlists"
                  rowCategory="featured"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          You need to log in to access the site. Press the &quot;Log In With
          Spotify&quot; button to get started.
        </div>
      )}
    </div>
  );
}
