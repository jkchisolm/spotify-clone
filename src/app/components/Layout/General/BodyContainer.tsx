"use client";

type Props = {
  children: React.ReactNode;
};

import { StyleContext } from "@/lib/contexts/styleContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function BodyContainer(props: Props) {
  const styleContext = useContext(StyleContext);

  const pathname = usePathname();

  // if the pathname is on the main artist or playlist page, use the background url
  const [useBgUrl, setUseBgUrl] = useState<boolean>(false);

  useEffect(() => {
    console.log(pathname.endsWith("/discography"));

    if (
      (pathname.includes("/artist/") || pathname.includes("/playlist/")) &&
      !pathname.endsWith("/discography")
    ) {
      setUseBgUrl(true);
    } else {
      setUseBgUrl(false);
    }
  }, [pathname]);

  // const [bgColor, setBgColor] = useState<number[]>([0, 0, 0, 0]);

  // useEffect(() => {
  //   setBgColor(styleContext.topbar_bg);
  // }, [styleContext.topbar_bg]);

  return (
    <div className="transition-all min-h-full bg-spotify-dark-bg rounded-t-lg">
      <div
        className="px-5 py-2 relative"
        style={{
          background: `${
            styleContext.backgroundUrl && useBgUrl
              ? "transparent"
              : `linear-gradient(180deg, ${styleContext.topbar_bg} 0%, #121212 25rem)`
          }`,
          // backgroundImage: `url(${styleContext.backgroundUrl})`,
          // backgroundSize: "cover",
          // // offset background and move it up
          // backgroundPosition: "center top -30rem",
        }}
      >
        {styleContext.backgroundUrl && useBgUrl && (
          <div
            className="absolute top-0 bottom-0 left-0 right-0"
            style={{ height: "26rem" }}
          >
            <Image
              src={styleContext.backgroundUrl}
              alt={"artist image"}
              objectFit="cover"
              layout="fill"
              className="filter brightness-75"
            />
          </div>
        )}
        <div className="z-10">{props.children}</div>
      </div>
    </div>
  );
}
