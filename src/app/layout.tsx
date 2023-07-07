"use client";

import { useContext, useState } from "react";
import Navbar from "./components/Layout/Navbar/Navbar";
import "./globals.css";

import { ApiContext, ApiContextProvider } from "@/lib/contexts/apiContext";
import { Montserrat } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Player from "./components/Layout/NowPlaying/Player";
import Topbar from "./components/Layout/Topbar/Topbar";
import AuthWrapper from "./components/auth/AuthWrapper";
import {
  StyleContext,
  StyleContextProvider,
} from "@/lib/contexts/styleContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queueOpen, setQueueOpen] = useState(false);

  const apiContext = useContext(ApiContext);
  const styleContext = useContext(StyleContext);

  return (
    <Provider store={store}>
      <ApiContextProvider>
        <StyleContextProvider>
          <html lang="en" className={montserrat.className}>
            <body className="bg-black w-screen h-screen p-2 main-layout">
              <Navbar />
              <div
                className={`${
                  queueOpen ? "col-span-1" : "col-span-2"
                } flex flex-col overflow-auto relative`}
              >
                <Topbar refreshingToken={apiContext.refreshing} />
                {!apiContext.refreshing ? (
                  <AuthWrapper>{children}</AuthWrapper>
                ) : (
                  // children
                  <div className="flex flex-col items-center justify-center h-full bg-spotify-dark-bg">
                    <div className="text-white">Getting your data...</div>
                  </div>
                )}
              </div>
              <Player />
            </body>
          </html>
        </StyleContextProvider>
      </ApiContextProvider>
    </Provider>
  );
}
