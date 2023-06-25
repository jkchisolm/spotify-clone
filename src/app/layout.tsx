"use client";

import { useState } from "react";
import "./globals.css";
import gotham from "@/lib/fonts/GothamFont";
import Navbar from "./components/Layout/Navbar/Navbar";

import { Montserrat } from "next/font/google";
import Topbar from "./components/Layout/Topbar/Topbar";
import UnauthorizedNP from "./components/Layout/NowPlaying/UnathorizedNP";

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

  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-black w-screen h-screen p-2 main-layout">
        <Navbar />
        <div
          className={`${queueOpen ? "col-span-1" : "col-span-2"} flex flex-col`}
        >
          <Topbar />
          {children}
        </div>
        {loggedIn ? <div>Logged in section</div> : <UnauthorizedNP />}
      </body>
    </html>
  );
}
