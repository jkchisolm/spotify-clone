"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Layout/Navbar/Navbar";
import "./globals.css";

import { Montserrat } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../store/store";
import UnauthorizedNP from "./components/Layout/NowPlaying/UnathorizedNP";
import Topbar from "./components/Layout/Topbar/Topbar";
import Player from "./components/Layout/NowPlaying/Player";
import { useAppSelector } from "@/lib/hooks/hooks";
import Cookies from "js-cookie";
import { useGetMeQuery } from "@/store/slices/apiSlice";
import { refreshAccessToken } from "@/lib/helpers/RefreshAccessToken";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [refreshingToken, setRefreshingToken] = useState(false);

  useEffect(() => {
    async function refreshToken() {
      const response = await fetch("/api/refreshToken", { method: "POST" });

      if (response == null) {
        return false;
      }
      setRefreshingToken(false);
      return true;
    }
    // if no access token or if creation time was over an hour ago
    if (
      !Cookies.get("access_token") ||
      !Cookies.get("creation_time") ||
      (Date.now() - parseInt(Cookies.get("creation_time")!)) / 1000 > 3600
    ) {
      // refresh access token
      setRefreshingToken(true);
      refreshToken();
      console.log("Access token refreshed");
    }
  });

  return (
    <Provider store={store}>
      <html lang="en" className={montserrat.className}>
        <body className="bg-black w-screen h-screen p-2 main-layout">
          <Navbar />
          <div
            className={`${
              queueOpen ? "col-span-1" : "col-span-2"
            } flex flex-col overflow-auto`}
          >
            <Topbar refreshingToken />
            {!refreshingToken ? (
              children
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-zinc-900">
                <div className="text-white">Getting your data...</div>
              </div>
            )}
          </div>
          <Player />
        </body>
      </html>
    </Provider>
  );
}
