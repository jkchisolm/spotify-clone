"use client";

type Props = {
  children: React.ReactNode;
};

import { StyleContext } from "@/lib/contexts/styleContext";
import { useContext, useEffect, useState } from "react";

export default function BackgroundColorWrapper(props: Props) {
  const styleContext = useContext(StyleContext);

  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    setBgColor(styleContext.topbar_bg);
  }, [styleContext.topbar_bg]);

  return (
    <div
      className="transition-all"
      style={{
        background: `linear-gradient(180deg, ${bgColor} 0%, #121212 30%)`,
      }}
    >
      {props.children}
    </div>
  );
}
