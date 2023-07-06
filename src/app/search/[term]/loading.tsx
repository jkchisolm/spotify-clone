import { CircleLoader } from "react-spinners";

export default function SearchLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <CircleLoader color={"#1DB954"} />
      <p className="text-gray-400">Loading...</p>
    </div>
  );
}
