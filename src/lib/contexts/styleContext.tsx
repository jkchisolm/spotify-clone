import { stringify } from "querystring";
import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const StyleContext = createContext({
  topbar_bg: "#121212",
  setTopbarBG: (value: string) => {},
});

export const StyleContextProvider = (props: Props) => {
  const [topbar_bg, setTopbarBG] = useState<string>("#121212");

  return (
    <StyleContext.Provider
      value={{
        topbar_bg: topbar_bg,
        setTopbarBG: setTopbarBG,
      }}
    >
      {props.children}
    </StyleContext.Provider>
  );
};
