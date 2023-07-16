<h1 align="center">
Recreatify | Spotify Clone
</h1>

[![Version](https://img.shields.io/static/v1?label=version&message=0.1&color=blue)](https://shields.io/)
![Website](https://img.shields.io/website?url=https://recreatify.jkchisolm.com)

### [Website](https://recreatify.jkchisolm.com)

This is a clone of the Spotify Web Application. THe app uses the Spotify Web API to fetch and interact with data, and the Spotify Web Playback SDK to play music.

#### Note: This website only works if you have a Spotify Premium account. This is due to limitations in the API that I cannot change. In the future, I might add a demo account if you do not have a premium account, but for now, a premium account is required.

## Tech Stack
- Framework: `React.js with Next.js`
- Styling: `TailwindCSS`
  
## Setup

### Requirements

In order to run this project locally, you need to have a client key and secret. Create an application in the [Spotify Developer Dashboard](https://developer.spotify.com/), then use your client key and secret and create a `.env` file following the example in `.env.example`. Once you've set that up, you will be able to use the application with your own login given you have a Spotify Premium account.

### Installation

1. Open your CLI and clone the repo

```
git clone git@github.com:frozenal/spotify-clone.git
cd spotify-clone
```

2. Install the required dependencies

```
npm install
```

3. Set up your environment variables in a file named `.env.local`, following the example in `.env.example`
4. Run the development server using `npm run dev`

## Author
Joshua Chisolm
- Website: [jkchisolm.com](https://www.jkchisolm.com)