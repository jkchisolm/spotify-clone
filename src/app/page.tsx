"use client";

import { ApiContext } from "@/lib/contexts/apiContext";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useLazyGetUserPlaylistsQuery } from "@/store/slices/apiSlice";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import CategoryRow from "./components/Layout/MusicDisplays/CategoryRow";
import UserPlaylistRow from "./components/Layout/MusicDisplays/Playlist/UserPlaylistRow";
import { StyleContext } from "@/lib/contexts/styleContext";

export default function Home() {
  const loggedIn = useAppSelector(
    (state) => state.spotifyApi.userAuthenticated
  );

  const dispatch = useAppDispatch();

  const apiContext = useContext(ApiContext);
  const styleContext = useContext(StyleContext);

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
    styleContext.setTopbarBG("#121212");

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
    <div className="text-white bg-spotify-dark-bg w-full h-full pb-4 rounded">
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
                <CategoryRow
                  // playlists={topPlaylists}
                  items={topPlaylists.map((playlist) => {
                    return {
                      id: playlist.id,
                      header: playlist.name,
                      description: playlist.description!,
                      imageUrl: playlist.images[0].url,
                      url: playlist.uri,
                    };
                  })}
                  rowName="Top Playlists"
                  rowCategory="toplists"
                  useShowAllButton={true}
                />
              </div>
            )}
            {featuredPlaylists != undefined && (
              <div className="mt-4 mx-3">
                <CategoryRow
                  // playlists={featuredPlaylists}
                  items={featuredPlaylists.map((playlist) => {
                    return {
                      id: playlist.id,
                      header: playlist.name,
                      description: playlist.description!,
                      imageUrl: playlist.images[0].url,
                      url: playlist.uri,
                    };
                  })}
                  rowName="Featured Playlists"
                  rowCategory="featured"
                  useShowAllButton={true}
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
