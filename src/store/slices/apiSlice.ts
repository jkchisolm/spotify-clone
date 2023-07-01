import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

type getUserPlaylistsResponse = {
  items: SpotifyApi.PlaylistObjectSimplified[];
};

export const apiSlice = createApi({
  reducerPath: "webApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get("access_token")}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<SpotifyApi.CurrentUsersProfileResponse, void>({
      query: () => "me",
    }),
    getUserPlaylists: builder.query<
      getUserPlaylistsResponse,
      { limit?: number }
    >({
      query: () => "me/playlists",
    }),
    refreshAccessToken: builder.query<{ access_token: string }, void>({
      query: () => ({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        body: `grant_type=refresh_token&refresh_token=${Cookies.get(
          "refresh_token"
        )}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOITFY_CLIENT_SECRET}`
          )}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useGetUserPlaylistsQuery,
  useLazyGetUserPlaylistsQuery,
  useRefreshAccessTokenQuery,
  useLazyRefreshAccessTokenQuery,
} = apiSlice;
