import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const StyleContext = createContext({
  topbar_bg: "",
  setTopbarBG: (color: string) => {},
});

export const StyleContextProvider = (props: Props) => {
  const [topbar_bg, setTopbarBG] = useState("");

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
