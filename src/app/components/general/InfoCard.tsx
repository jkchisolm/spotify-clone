import Image from "next/image";

type Props = {
  header: string;
  description: string;
  imageUrl: string;
  imageType: "circle" | "square";
  url: string;
  id: string;
};

export default function InfoCard(props: Props) {
  return (
    <div
      className="col-span-1 flex flex-col p-3 grow bg-zinc-800 rounded hover:bg-zinc-700 hover:cursor-pointer"
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
      <div className="text-white font-bold mt-2">{props.header}</div>
      <div className="text-zinc-400 text-xs line-clamp-2">
        {props.description}
      </div>
    </div>
  );
}
