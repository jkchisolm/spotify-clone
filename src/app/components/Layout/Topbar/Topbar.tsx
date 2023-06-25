"use client";

import { useState } from "react";
import BrowsingControls from "./BrowsingControls";
import Button from "../../general/Button";

export default function Topbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div
      className={`sticky top-0 left-0 right-0 text-white pt-4 flex flex-row justify-between items-center`}
    >
      <BrowsingControls />
      {loggedIn ? (
        <div>User is logged in</div>
      ) : (
        <div>
          <Button
            color="bg-green-500"
            hoverColor="bg-green-600"
            textColor="text-white"
            style="pill"
          >
            Log In With Spotify
          </Button>
        </div>
      )}
    </div>
  );
}
