"use client";

import { useState } from "react";
import "./globals.css";
import gotham from "@/lib/fonts/GothamFont";
import Navbar from "./components/Layout/Navbar/Navbar";

import { Montserrat } from "next/font/google";
import Topbar from "./components/Layout/Topbar/Topbar";

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

  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-black w-screen h-screen p-2 main-layout">
        <Navbar />
        <div className={`relative ${queueOpen ? "col-span-1" : "col-span-2"}`}>
          <Topbar />
          {children}
        </div>
      </body>
    </html>
  );
}
