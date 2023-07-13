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
    getSingleAlbum: builder.query<
      SpotifyApi.SingleAlbumResponse,
      { id: string }
    >({
      query: (id) => `albums/${id.id}`,
    }),
    getUserPlaylists: builder.query<
      getUserPlaylistsResponse,
      { limit?: number }
    >({
      query: () => "me/playlists",
    }),
    getSinglePlaylist: builder.query<
      SpotifyApi.SinglePlaylistResponse,
      { id: string }
    >({
      query: (id) => `playlists/${id.id}`,
    }),
    getPlaylistItemsWithOffset: builder.query<
      SpotifyApi.PlaylistTrackResponse,
      { id: string; offset: number }
    >({
      query: (id) => `playlists/${id.id}/tracks?offset=${id.offset}&limit=50`,
    }),
    getUserLibrary: builder.query<getUserPlaylistsResponse, void>({
      query: () => "me/playlists?limit=50",
    }),
    getAvailableCategories: builder.query<
      SpotifyApi.MultipleCategoriesResponse,
      void
    >({
      query: () => "browse/categories?limit=50",
    }),
    getSingleCategory: builder.query<
      SpotifyApi.SingleCategoryResponse,
      { id: string }
    >({
      query: (id) => `browse/categories/${id.id}`,
    }),
    getCategoryPlaylists: builder.query<
      SpotifyApi.CategoryPlaylistsResponse,
      { id: string }
    >({
      query: (id) => `browse/categories/${id.id}/playlists?limit=50`,
    }),
    getGenericSearchResults: builder.query<
      SpotifyApi.SearchResponse,
      { query: string }
    >({
      query: (query) =>
        `search?q=${query.query}&type=track,artist,album,playlist,show,episode,audiobook&limit=7`,
    }),
    getSpecificSearchResults: builder.query<
      SpotifyApi.SearchResponse,
      { category: string; query: string }
    >({
      query: (params) =>
        `search?q=${params.query}&type=${params.category}&limit=50`,
    }),
    getArtistInfo: builder.query<SpotifyApi.ArtistObjectFull, { id: string }>({
      query: (id) => `artists/${id.id}`,
    }),
    getArtistAlbums: builder.query<
      SpotifyApi.ArtistsAlbumsResponse,
      { id: string; limit: number }
    >({
      query: (id) => `artists/${id.id}/albums?limit=${id.limit}`,
    }),
    getArtistTopTracks: builder.query<
      SpotifyApi.ArtistsTopTracksResponse,
      { id: string }
    >({
      query: (id) => `artists/${id.id}/top-tracks?market=US`,
    }),
    getArtistRelatedArtists: builder.query<
      SpotifyApi.ArtistsRelatedArtistsResponse,
      { id: string }
    >({
      query: (id) => `artists/${id.id}/related-artists`,
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
    transferPlayback: builder.mutation<
      void,
      { device_ids: string[]; play: boolean }
    >({
      query: (params) => ({
        url: "me/player",
        method: "PUT",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    play: builder.mutation<void, { device_id: string; uris: string[] }>({
      query: (params) => ({
        url: "me/player/play",
        method: "PUT",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    playCollection: builder.mutation<
      void,
      { device_id: string; context_uri?: string }
    >({
      query: (params) => ({
        url: `me/player/play`,
        method: "PUT",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    pause: builder.mutation<void, { device_id: string }>({
      query: (params) => ({
        url: `me/player/pause`,
        method: "PUT",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useGetUserPlaylistsQuery,
  useGetSinglePlaylistQuery,
  useGetPlaylistItemsWithOffsetQuery,
  useLazyGetPlaylistItemsWithOffsetQuery,
  useLazyGetUserPlaylistsQuery,
  useRefreshAccessTokenQuery,
  useLazyRefreshAccessTokenQuery,
  useGetUserLibraryQuery,
  useLazyGetUserLibraryQuery,
  useGetAvailableCategoriesQuery,
  useGetCategoryPlaylistsQuery,
  useLazyGetCategoryPlaylistsQuery,
  useGetSingleCategoryQuery,
  useGetGenericSearchResultsQuery,
  useGetSpecificSearchResultsQuery,
  useGetArtistInfoQuery,
  useGetArtistAlbumsQuery,
  useGetArtistTopTracksQuery,
  useGetArtistRelatedArtistsQuery,
  useGetSingleAlbumQuery,
  usePlayMutation,
  usePlayCollectionMutation,
  useTransferPlaybackMutation,
  usePauseMutation,
} = apiSlice;
