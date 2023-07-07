import Image from "next/image";
import Link from "next/link";
import { BsPlayCircleFill } from "react-icons/bs";

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
          <div className="absolute bottom-0 right-0 shadow-xl">
            <BsPlayCircleFill
              size={50}
              className={`text-spotify-green bg-black rounded-full m-2 opacity-0 group-hover:opacity-100 transition-all duration-700`}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start grow">
          <div
            className={`text-white font-bold mt-3 mb-1 line-clamp-1 max-h-5 min-h-[20px]`}
          >
            {props.header}
          </div>
          <div className="text-zinc-400 text-xs line-clamp-2 leading-5 mb-1 max-h-10 min-h-[40px]">
            {props.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
