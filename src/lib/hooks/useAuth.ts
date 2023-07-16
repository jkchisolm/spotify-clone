import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  async function handleRefresh() {
    const res = await fetch("/api/refreshToken", { method: "POST" });

    if (res == null) {
      return false;
    }
    return true;
  }

  const logout = () => {
    // clear cookies and state
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("expires_in");
    Cookies.remove("creation_time");
    setAccessToken(null);
    setRefreshToken(null);
    setExpiresIn(null);
  };

  useEffect(() => {
    // get accesstoken, refreshtoken, expiresin from cookies and set

    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");
    const expiresIn = Cookies.get("expires_in");

    setAccessToken(accessToken ? accessToken : null);
    setRefreshToken(refreshToken ? refreshToken : null);
    setExpiresIn(expiresIn ? Number(expiresIn) : null);
  }, []);

  // effect hook to handle automatically refreshing the access token
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    // if there is no access token, refresh token
    if (
      (!accessToken && refreshToken) ||
      (accessToken &&
        refreshToken &&
        Date.now() - Number(Cookies.get("creation_time"))! > expiresIn! * 1000)
    ) {
      setRefreshing(true);
      handleRefresh()
        .then((res) => {
          if (res) {
            setAccessToken(Cookies.get("access_token")!);
            setExpiresIn(Number(Cookies.get("expires_in")));
            setRefreshing(false);
          } else {
            console.log("error refreshing token");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // we have an access token, so we use setInterval to refresh the token a minute before expiration
      const interval = setInterval(
        () => {
          setRefreshing(true);
          handleRefresh()
            .then((res) => {
              if (res) {
                setAccessToken(Cookies.get("access_token")!);
                setExpiresIn(Number(Cookies.get("expires_in")));
                setRefreshing(false);
              } else {
                console.log("error refreshing token");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
        // refresh every 59 minutes
        (expiresIn - 60) * 1000
      );
    }
  }, [accessToken, refreshToken, expiresIn]);

  return { accessToken, refreshToken, expiresIn, refreshing, logout };
}
