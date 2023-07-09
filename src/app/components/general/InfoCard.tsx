import Image from "next/image";
import Link from "next/link";
import PlayButton from "./PlayButton";
import { sanitizeDescription } from "@/lib/helpers/sanitizeDescription";

type Props = {
  header: string;
  description: string;
  imageUrl: string;
  imageType: "circle" | "square";
  url: string;
  id: string;
  clampOne?: boolean;
};

export default function InfoCard(props: Props) {
  // if the description has an anchor tag, remove it and only show the text inside

  let description = sanitizeDescription(props.description);

  return (
    <Link href={props.url}>
      <div
        className="col-span-1 flex flex-col p-3 grow bg-spotify-card-bg rounded hover:bg-zinc-700 hover:cursor-pointer h-full transition-all group"
        key={props.id}
      >
        <div className="relative w-full aspect-square">
          <Image
            fill
            className={`object-cover ${
              props.imageType == "circle" ? "rounded-full" : "rounded"
            } shadow-md shadow-zinc-800 relative`}
            src={props.imageUrl}
            alt={props.header}
          />
          <div className="absolute bottom-3 right-3 shadow-xl">
            <div className="w-12 h-12">
              <PlayButton requireHover />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start grow">
          <div
            className={`text-white font-bold mt-3 mb-1 line-clamp-1 max-h-5 min-h-[20px]`}
          >
            {props.header}
          </div>
          <div className="text-zinc-400 text-xs line-clamp-2 leading-5 mb-1 max-h-10 min-h-[40px]">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
}
