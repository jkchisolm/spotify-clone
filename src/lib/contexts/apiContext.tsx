import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const ApiContext = createContext({
  access_token: "",
  refresh_token: "",
  creation_time: "",
  refreshing: false,
  setAccessToken: (access_token: string) => {},
  setRefreshToken: (refresh_token: string) => {},
  setCreationTime: (creation_time: string) => {},
  setRefreshing: (refreshing: boolean) => {},
});

export const ApiContextProvider = (props: Props) => {
  const [access_token, setAccessToken] = useState("");
  const [refresh_token, setRefreshToken] = useState("");
  const [creation_time, setCreationTime] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [newCookieSet, setNewCookieSet] = useState(false);

  return (
    <ApiContext.Provider
      value={{
        access_token,
        refresh_token,
        creation_time,
        refreshing,
        setAccessToken,
        setRefreshToken,
        setCreationTime,
        setRefreshing,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};
