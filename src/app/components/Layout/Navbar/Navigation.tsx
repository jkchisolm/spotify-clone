"use client";

import { BiHome, BiHomeAlt, BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  PiHouse,
  PiHouseFill,
  PiMagnifyingGlass,
  PiMagnifyingGlassFill,
} from "react-icons/pi";

type Props = {};

const Navigation = (props: Props) => {
  const pathname = usePathname();

  const selected = pathname.startsWith("/search")
    ? "search"
    : pathname.length == 1
    ? "home"
    : "other";

  return (
    <div className="text-white flex flex-col bg-spotify-dark-bg p-4">
      <div className="rounded flex flex-col justify-evenly h-full">
        <div
          className={`${
            selected == "home" ? " text-white" : " text-spotify-gray-text"
          } font-bold flex flex-row items-center justify-start`}
        >
          {selected == "home" ? (
            <PiHouseFill size={28} />
          ) : (
            <PiHouse size={28} />
          )}
          <span className="ml-4 text-md">
            <Link href="/">Home</Link>
          </span>
        </div>
        <div
          className={`${
            selected == "search" ? " text-white" : "text-spotify-gray-text"
          } font-bold flex flex-row items-center justify-start my-2`}
        >
          {selected == "search" ? (
            <PiMagnifyingGlassFill size={28} />
          ) : (
            <PiMagnifyingGlass size={28} />
          )}
          <span className="ml-4 text-md">
            <Link href="/search">Search</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
