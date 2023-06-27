"use client";

import { useAppSelector } from "@/lib/hooks/hooks";
import Button from "../../general/Button";
import BrowsingControls from "./BrowsingControls";

export default function Topbar() {
  const loggedIn = useAppSelector((state) => state.api.userAuthenticated);

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
    <div
      className={`sticky top-0 left-0 right-0 text-white bg-black pt-4 flex flex-row justify-between items-center`}
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
            onClick={handleLogin}
          >
            Log In With Spotify
          </Button>
        </div>
      )}
    </div>
  );
}
