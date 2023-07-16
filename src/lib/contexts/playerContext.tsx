import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const PlayerContext = createContext<{
  player: Spotify.Player | null;
  setPlayer: (player: Spotify.Player) => void;
}>({
  player: null,
  setPlayer: (player: Spotify.Player) => {},
});

export const PlayerContextProvider = (props: Props) => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  return (
    <PlayerContext.Provider
      value={{
        player: player,
        setPlayer: setPlayer,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
