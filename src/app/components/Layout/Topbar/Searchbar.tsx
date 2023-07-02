"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function Searchbar() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/search")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pathname.startsWith("/search")]);

  return (
    <div className={`text-xl font-bold ${visible ? "visible" : "invisible"}`}>
      <form
        className="flex flex-row justify-start items-center self-start rounded-full p-2 border-2 border-white"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href =
            "/search/" +
            (document.querySelector("input") as HTMLInputElement).value;
        }}
      >
        <BiSearch size={16} />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="text-white bg-transparent text-sm outline-none"
        />
      </form>
    </div>
  );
}
