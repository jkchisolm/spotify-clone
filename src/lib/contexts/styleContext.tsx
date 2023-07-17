import { stringify } from "querystring";
import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const StyleContext = createContext({
  topbar_bg: "#121212",
  backgroundUrl: "",
  setTopbarBG: (value: string) => {},
  setBackgroundUrl: (value: string) => {},
});

export const StyleContextProvider = (props: Props) => {
  const [topbar_bg, setTopbarBG] = useState<string>("#121212");
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");

  return (
    <StyleContext.Provider
      value={{
        topbar_bg: topbar_bg,
        backgroundUrl: backgroundUrl,
        setTopbarBG: setTopbarBG,
        setBackgroundUrl: setBackgroundUrl,
      }}
    >
      {props.children}
    </StyleContext.Provider>
  );
};
