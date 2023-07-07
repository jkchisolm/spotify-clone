"use client";

import { BiHome, BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {};

const Navigation = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="text-white flex flex-col">
      <div className="bg-spotify-dark-bg rounded py-6 px-5">
        <div
          className={`${
            pathname == "/" ? "font-bold" : ""
          } flex flex-row items-center justify-start`}
        >
          <BiHome size={32} />{" "}
          <span className="ml-4 text-xl">
            <Link href="/">Home</Link>
          </span>
        </div>
        <div
          className={`${
            pathname == "/search" ? "font-bold" : ""
          } flex flex-row items-center justify-start my-2`}
        >
          <BiSearch size={32} />{" "}
          <span className="ml-4 text-xl">
            <Link href="/search">Search</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
