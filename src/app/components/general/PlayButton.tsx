type Props = {
  requireHover: boolean;
  commmand?: string;
};

export default function PlayButton(props: Props) {
  return (
    <div
      className={`text-black bg-spotify-green text-2xl leading-6 rounded-full w-full h-full flex flex-row justify-center items-center ${
        props.requireHover ? "opacity-0 group-hover:opacity-100" : ""
      } transform-all duration-500 shadow-lg shadow-black`}
    >
      ▶
    </div>
  );
}
