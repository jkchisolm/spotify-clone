import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

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
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = apiSlice;
