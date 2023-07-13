"use client";

import { useContext, useState } from "react";
import Navbar from "./components/Layout/Navbar/Navbar";
import "./globals.css";

import { ApiContext, ApiContextProvider } from "@/lib/contexts/apiContext";
import {
  StyleContext,
  StyleContextProvider,
} from "@/lib/contexts/styleContext";
import useAuth from "@/lib/hooks/useAuth";
import { Montserrat } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../store/store";
import BodyContainer from "./components/Layout/General/BodyContainer";
import Player from "./components/Layout/NowPlaying/Player";
import Topbar from "./components/Layout/Topbar/Topbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queueOpen, setQueueOpen] = useState(false);

  const auth = useAuth();

  const apiContext = useContext(ApiContext);
  const styleContext = useContext(StyleContext);

  const [topbarOpacity, setTopbarOpacity] = useState("");

  return (
    <Provider store={store}>
      <ApiContextProvider>
        <StyleContextProvider>
          <html lang="en" className={montserrat.className}>
            <body className="bg-black w-screen h-screen p-2 main-layout">
              <Navbar />
              <div
                className={`${
                  queueOpen ? "col-span-1" : "col-span-2 scrollbox"
                } flex flex-col overflow-auto relative `}
              >
                <BodyContainer>
                  <Topbar refreshingToken={apiContext.refreshing} />
                  {children}
                </BodyContainer>
              </div>
              <Player />
            </body>
          </html>
        </StyleContextProvider>
      </ApiContextProvider>
    </Provider>
  );
}
