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
  Shows: "shows",
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
        <div className="flex flex-row justify-start items-center">
          {Object.keys(categories).map((category) => {
            const allCategory =
              params.category == undefined || params.category == "";
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
                      : !allCategory && params.category == categories[category]
                      ? "#000000"
                      : "#ffffff",
                  backgroundColor:
                    allCategory && category == "All"
                      ? "#ffffff"
                      : !allCategory && params.category == categories[category]
                      ? "#ffffff"
                      : "#27272a",
                }}
              >
                <Link
                  href={
                    "/search/" +
                    params.term +
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
