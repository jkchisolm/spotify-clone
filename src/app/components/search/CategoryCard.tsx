"use client";

import {
  getRandomCategoryBackgroundColor,
  getRandomTailwindColor,
} from "@/lib/helpers/RandomTailwindColor";
import Image from "next/image";

type Props = {
  category: SpotifyApi.CategoryObject;
};

export default function CategoryCard(props: Props) {
  const bgColor = "bg-" + getRandomTailwindColor();

  return (
    <div
      className={`col-span-1 text-white ${bgColor} pt-3 rounded relative overflow-hidden max-h-52`}
      style={{ backgroundColor: getRandomCategoryBackgroundColor() }}
    >
      <span className="font-bold text-xl text-left w-full break-words absolute px-3">
        {props.category.name}
      </span>
      <div className="relative w-full aspect-square self-end">
        <Image
          src={props.category.icons[0].url}
          alt={props.category.name}
          width={100}
          height={100}
          className="rounded-lg absolute -bottom-4 -right-4 rotate-12"
        />
      </div>
    </div>
  );
}
