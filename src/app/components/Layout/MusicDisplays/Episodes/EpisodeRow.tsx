import Image from "next/image";
import { BiPlayCircle } from "react-icons/bi";
import { PiPlay, PiPlayCircleFill, PiPlayFill } from "react-icons/pi";

type Props = {
  episode: SpotifyApi.EpisodeObjectSimplified;
};

export default function EpisodeRow(props: Props) {
  return (
    <div className="flex flex-row justify-start items-stretch pb-4 border-b-2 border-b-zinc-700 my-3 w-full">
      <div>
        <Image
          src={props.episode.images[0].url}
          alt={props.episode.name}
          width={125}
          height={125}
        />
      </div>
      <div className="flex flex-col justify-between h-full items-start ml-4 w-full max-w-full">
        <div className="text-bold text-lg text-white">{props.episode.name}</div>
        <div className="text-md text-zinc-500 line-clamp-2">
          {props.episode.description}
        </div>
        <div className="flex flex-row justify-center items-start">
          <PiPlayCircleFill className="text-white" size={40} />
        </div>
      </div>
    </div>
  );
}
