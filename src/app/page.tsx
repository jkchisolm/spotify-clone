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
import useAuth from "@/lib/hooks/useAuth";

export default function Home() {
  const loggedIn = useAppSelector(
    (state) => state.spotifyApi.userAuthenticated
  );

  const dispatch = useAppDispatch();

  const apiContext = useContext(ApiContext);
  const styleContext = useContext(StyleContext);
  const auth = useAuth();

  const [
    triggerGetUserPlaylists,
    { isLoading, isError, data: userPlaylistData, error },
  ] = useLazyGetUserPlaylistsQuery();

  const [welcomeString, setWelcomeString] = useState("");

  const [topPlaylists, setTopPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  const [featuredPlaylists, setFeaturedPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  const [featuredPlaylistMessage, setFeaturedPlaylistMessage] = useState("");

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
      setFeaturedPlaylistMessage(data.message || "Featured Playlists");
    });
  };

  useEffect(() => {
    styleContext.setTopbarBG("#03331a");

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
    if (
      auth.refreshToken != "" &&
      apiContext.refreshing != true &&
      auth.refreshing != true
    ) {
      triggerGetUserPlaylists({ limit: 50 });
      fetchTopPlaylists();
      fetchFeaturedPlaylists();
    }
  }, [auth.refreshToken, apiContext.refreshing, auth.refreshing]);

  return (
    <div className="text-white w-full bg-transparent">
      {auth.refreshToken != "" && auth.accessToken ? (
        <div className="">
          <div className="text-3xl font-bold py-3">{welcomeString}</div>
          <div>
            {userPlaylistData != undefined && (
              <UserPlaylistRow
                rowName="Good evening"
                playlists={userPlaylistData.items.slice(0, 6)}
              />
            )}
            {topPlaylists != undefined && (
              <div className="mt-4">
                <CategoryRow
                  // playlists={topPlaylists}
                  items={topPlaylists.map((playlist) => {
                    return {
                      id: playlist.id,
                      header: playlist.name,
                      description: playlist.description!,
                      imageUrl: playlist.images[0].url,
                      url: `/playlist/${playlist.id}`,
                      uri: playlist.uri,
                    };
                  })}
                  rowName="Top Playlists"
                  rowCategory="toplists"
                  useShowAllButton={true}
                  showAllUrl={"/search/category/toplists"}
                />
              </div>
            )}
            {featuredPlaylists != undefined && (
              <div className="mt-4">
                <CategoryRow
                  // playlists={featuredPlaylists}
                  items={featuredPlaylists.map((playlist) => {
                    return {
                      id: playlist.id,
                      header: playlist.name,
                      description: playlist.description!,
                      imageUrl: playlist.images[0].url,
                      url: `/playlist/${playlist.id}`,
                      uri: playlist.uri,
                    };
                  })}
                  rowName={featuredPlaylistMessage}
                  rowCategory="featured"
                  useShowAllButton={true}
                  showAllUrl={"/search/"}
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
