import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

let spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
let spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

export async function GET(request: NextRequest) {
  // get code from request url
  const url = request.url;
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const code = urlParams.get("code");

  console.log(code);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: code as string,
      redirect_uri:
        process.env.PROD == "true"
          ? "https://recreatify.jkchisolm.com/api/callback"
          : "http://localhost:3000/api/callback",
      grant_type: "authorization_code",
    }).toString(),
  });

  const data = await response.json();

  // if no error and code is 200, redirect
  if (!data.error && response.status == 200) {
    let access_token = data.access_token;
    let refresh_token = data.refresh_token;

    console.log("setting and responding");

    const cookieStore = cookies();
    cookieStore.set("access_token", access_token);
    cookieStore.set("refresh_token", refresh_token);
    cookieStore.set("creation_time", Date.now().toString());
    cookieStore.set("expires_in", data.expires_in);

    return NextResponse.redirect(
      process.env.PROD == "true"
        ? "https://recreatify.jkchisolm.com"
        : "http://localhost:3000"
    );
  }
}
