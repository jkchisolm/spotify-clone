"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="text-white bg-zinc-900 w-full h-full my-2 rounded">
      {loggedIn ? (
        <div>Logged in section</div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          You need to log in to access the site. Press the &quot;Log In With
          Spotify&quot; button to get started.
        </div>
      )}
    </div>
  );
}
