import Cookies from "js-cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // const refreshToken = Cookies.get("refresh_token");
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refresh_token");
  console.log(refreshToken!.value);
  console.log(process.env.SPOTIFY_CLIENT_ID);
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken!.value,
      }),
    });
    const result = await response.json();
    cookieStore.set("access_token", result.access_token);
    cookieStore.set("creation_time", Date.now().toString());
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err);
  }
}
