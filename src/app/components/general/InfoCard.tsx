import Image from "next/image";
import Link from "next/link";

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
        className="col-span-1 flex flex-col p-3 grow bg-spotify-card-bg rounded hover:bg-zinc-700 hover:cursor-pointer h-full"
        key={props.id}
      >
        <div className="relative w-full aspect-square">
          <Image
            fill
            className={`object-cover ${
              props.imageType == "circle" ? "rounded-full" : "rounded"
            } shadow-md shadow-zinc-800`}
            src={props.imageUrl}
            alt={props.header}
          />
        </div>
        <div className="flex flex-col justify-between items-start grow">
          <div
            className={`text-white font-bold mt-2 ${
              props.clampOne ? "line-clamp-1" : "line-clamp-2"
            }`}
          >
            {props.header}
          </div>
          <div className="text-zinc-400 text-xs line-clamp-2">
            {props.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
