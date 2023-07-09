"use client";

type Props = {
  children: React.ReactNode;
};

import { StyleContext } from "@/lib/contexts/styleContext";
import { useContext, useEffect, useState } from "react";

export default function BodyContainer(props: Props) {
  const styleContext = useContext(StyleContext);

  // const [bgColor, setBgColor] = useState<number[]>([0, 0, 0, 0]);

  // useEffect(() => {
  //   setBgColor(styleContext.topbar_bg);
  // }, [styleContext.topbar_bg]);

  return (
    <div className="transition-all min-h-fit bg-spotify-dark-bg">
      <div
        className="px-5 py-2"
        style={{
          background: `linear-gradient(180deg, ${styleContext.topbar_bg} 0%, #121212 30%)`,
          backgroundSize: "auto 50rem important!",
          backgroundRepeat: "no-repeat important!",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
