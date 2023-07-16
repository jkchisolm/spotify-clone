import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const generateRandomString = (length: number) => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  const inProd = process.env.PROD;

  console.log(inProd);

  const redirectUri =
    inProd == "true"
      ? "https://recreatify.jkchisolm.com/api/callback"
      : "http://localhost:3000/api/callback";

  console.log(redirectUri);

  const scope =
    "streaming user-read-currently-playing user-read-playback-state user-modify-playback-state user-read-email user-read-private playlist-read-private playlist-modify-public playlist-modify-private";
  const state = generateRandomString(16);
  const authQueryParams = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  const authUrl = `https://accounts.spotify.com/authorize?${authQueryParams.toString()}`;

  return NextResponse.json({ authUrl });
}
