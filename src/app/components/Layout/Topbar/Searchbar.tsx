"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function Searchbar() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);

  const [inFocus, setInFocus] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/search")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pathname]);

  return (
    <div
      className={`text-xl font-bold ${
        visible ? "visible" : "invisible"
      } grow bg-spotify-light-bg rounded-full py-2 border-2 border-transparent hover:border-white focus-within:border-white ml-3`}
      onMouseEnter={() => {
        setInFocus(true);
      }}
      onMouseLeave={() => {
        setInFocus(false);
      }}
      onFocus={() => {
        setInFocus(true);
      }}
      onBlur={() => {
        setInFocus(false);
      }}
    >
      <form
        className="flex flex-row justify-start items-center self-start rounded-full p-2 "
        onSubmit={(e) => {
          e.preventDefault();
          router.push(
            "/search/" +
              (document.querySelector("input") as HTMLInputElement).value
          );
        }}
      >
        <BiSearch
          size={24}
          className={`mr-2 ${inFocus ? "text-white" : "text-zinc-400"}`}
        />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="text-white bg-transparent text-sm outline-none w-full"
          onFocus={() => {
            setInFocus(true);
          }}
          onBlur={() => {
            setInFocus(false);
          }}
        />
      </form>
    </div>
  );
}
