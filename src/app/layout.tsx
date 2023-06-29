"use client";

import { useState } from "react";
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
  // const [loggedIn, setLoggedIn] = useState(false);
  // const loggedIn = useAppSelector(
  //   (state) => state.spotifyApi.userAuthenticated
  // );
  const loggedIn = Cookies.get("access_token") ? true : false;

  return (
    <html lang="en" className={montserrat.className}>
      <Provider store={store}>
        <body className="bg-black w-screen h-screen p-2 main-layout">
          <Navbar />
          <div
            className={`${
              queueOpen ? "col-span-1" : "col-span-2"
            } flex flex-col overflow-auto`}
          >
            <Topbar />
            {children}
          </div>
          <Player />
        </body>
      </Provider>
    </html>
  );
}
