// specific categories for search
"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

const categories = {
  All: "all",
  Artists: "artists",
  Albums: "albums",
  Playlists: "playlists",
  Songs: "songs",
  "Podcasts & Shows": "shows",
  Episodes: "episodes",
  Audiobooks: "audiobooks",
};

export default function SearchCategories() {
  const pathname = usePathname();

  const params = useParams();

  const router = useRouter();

  return (
    <div>
      {pathname.startsWith("/search") && params.term && (
        <div className="flex flex-row justify-start items-center my-2">
          {Object.keys(categories).map((category) => {
            const allCategory =
              pathname.endsWith(params.term) || pathname.endsWith("/all");
            return (
              <div
                key={category}
                className="mx-4 rounded-full px-2 py-1 text-sm cursor-pointer"
                style={{
                  // if the current category is All, we want to check if the category param is undefined or empty and if so set color to black
                  // for the other categories, we want to check if the category param is equal to the current category and if so set color to black
                  color:
                    allCategory && category == "All"
                      ? "#000000"
                      : // @ts-ignore
                      !allCategory && pathname.endsWith(categories[category])
                      ? "#000000"
                      : "#ffffff",
                  backgroundColor:
                    allCategory && category == "All"
                      ? "#ffffff"
                      : // @ts-ignore
                      !allCategory && pathname.endsWith(categories[category])
                      ? "#ffffff"
                      : "#27272a",
                }}
              >
                <Link
                  href={
                    "/search/" +
                    params.term +
                    // @ts-ignore
                    (category == "All" ? "" : "/" + categories[category])
                  }
                >
                  {category}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
