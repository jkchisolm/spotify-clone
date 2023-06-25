"use client";

import { useState } from "react";
import "./globals.css";
import Navigation from "./components/Layout/Navigation";
import gotham from "@/lib/fonts/GothamFont";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);

  return (
    <html lang="en" className={gotham.className}>
      <body className="bg-black flex flex-row w-screen h-screen text-white">
        <div className=" sm:grow-[2] md:grow shrink-0">
          <Navigation />
        </div>
        <div
          className={`bg-zinc-900 grow-[2] md:grow-[${
            currentlyPlaying ? "3" : "4"
          }] shrink my-2 mx-1`}
        >
          Main Page
          {children}
        </div>
        {currentlyPlaying && (
          <div className="bg-zinc-900 grow">Now Playing Section</div>
        )}
      </body>
    </html>
  );
}
