"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import { useLazyGetMeQuery } from "@/store/slices/apiSlice";
import { useContext, useEffect } from "react";
import Button from "../../general/Button";
import BrowsingControls from "./BrowsingControls";
import Searchbar from "./Searchbar";
import { StyleContext } from "@/lib/contexts/styleContext";
import SearchCategories from "./SearchCategories";
import { usePathname } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";

type Props = {
  refreshingToken: boolean;
};

export default function Topbar({ refreshingToken }: Props) {
  const loggedIn = useAppSelector(
    (state) => state.spotifyApi.userAuthenticated
  );

  const [trigger, { isLoading, isError, data, error }] = useLazyGetMeQuery();

  const path = usePathname();

  const auth = useAuth();

  const styleContext = useContext(StyleContext);

  useEffect(() => {
    if (auth.accessToken) {
      trigger();
    }
  }, [auth.accessToken, trigger]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleLogin = async () => {
    console.log("Logging in");
    const response = await fetch("/api/generateLink");
    const data = await response.json();

    // if authUrl is received, redirect
    if (data.authUrl) {
      window.location.href = data.authUrl;
    } else {
      console.log("An error occurred.");
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 flex flex-col justify-start items-stretch z-10 transition-all rounded-t bg-transparent">
      <div className={` text-white flex flex-row justify-between items-center`}>
        <div className="flex flex-row justify-start items-center grow">
          <BrowsingControls />
          <Searchbar />
        </div>

        {auth.accessToken ? (
          <div className="grow text-right">
            <div className="flex flex-row justify-end items-center">
              <div className="text-white bg-black px-2 py-1 rounded-full font-semibold">
                {data?.display_name}
              </div>
              <div
                className="text-black bg-white px-2 py-1 rounded-full font-semibold ml-2 hover:cursor-pointer hover:bg-slate-200"
                onClick={() => {
                  auth.logout();
                  // reload page
                  window.location.reload();
                }}
              >
                Logout
              </div>
            </div>
          </div>
        ) : auth.accessToken && refreshingToken ? (
          <div>Getting your data...</div>
        ) : (
          <div className="grow flex flex-row justify-end">
            <Button
              color="bg-green-500"
              hoverColor="bg-green-600"
              textColor="text-white"
              style="pill"
              onClick={handleLogin}
            >
              Log In With Spotify
            </Button>
          </div>
        )}
      </div>
      <SearchCategories />
    </div>
  );
}
