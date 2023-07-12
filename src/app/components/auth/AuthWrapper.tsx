"use client";

// component to handle the authentication process in useEffect

import { ApiContext } from "@/lib/contexts/apiContext";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { setTokens } from "@/store/slices/spotifyApiSlice";
import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthWrapper(props: Props) {
  const apiContext = useContext(ApiContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function refreshToken() {
      const response = await fetch("/api/refreshToken", { method: "POST" });

      if (response == null) {
        return false;
      }
      apiContext.setRefreshing(false);
      return true;
    }

    if (!Cookies.get("refresh_token")) {
      // user is not authenticated at all
      // console log for now
      console.log("user is not authenticated");
    } else if (
      Cookies.get("access_token") &&
      Cookies.get("creation_time") &&
      (Date.now() - parseInt(Cookies.get("creation_time")!)) / 1000 < 3600
    ) {
      apiContext.setAccessToken(Cookies.get("access_token")!);
      apiContext.setRefreshToken(Cookies.get("refresh_token")!);
      apiContext.setCreationTime(Cookies.get("creation_time")!);
      dispatch(
        setTokens({
          accessToken: Cookies.get("access_token")!,
          refreshToken: Cookies.get("refresh_token")!,
        })
      );
      console.log("authenticated, access tokens set");
    } else if (
      // no access token, or no creation time, or access token has expired (was created over an hour ago)
      !Cookies.get("access_token") ||
      !Cookies.get("creation_time") ||
      (Date.now() - parseInt(Cookies.get("creation_time")!)) / 1000 > 3600
    ) {
      // We must refetch the access token with an API call.
      apiContext.setRefreshing(true);
      refreshToken().then((res) => {
        if (res) {
          apiContext.setAccessToken(Cookies.get("access_token")!);
          apiContext.setRefreshToken(Cookies.get("refresh_token")!);
          apiContext.setCreationTime(Cookies.get("creation_time")!);
          dispatch(
            setTokens({
              accessToken: Cookies.get("access_token")!,
              refreshToken: Cookies.get("refresh_token")!,
            })
          );
          console.log("authenticated, access tokens set");
        } else {
          console.log("something went wrong");
          // remove the cookies
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          Cookies.remove("creation_time");
        }
      });
    }
  });

  return <React.Fragment>{props.children}</React.Fragment>;
}
