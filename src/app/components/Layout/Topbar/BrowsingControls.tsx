import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function BrowsingControls() {
  return (
    <div className="flex flex-row items-center z-20">
      <div className="bg-spotify-dark-bg bg-opacity-70 rounded-full mr-2">
        <BiChevronLeft
          size={32}
          className="hover:cursor-pointer"
          onClick={() => {
            window.history.back();
          }}
        />
      </div>
      <div className="bg-spotify-dark-bg bg-opacity-70 rounded-full">
        <BiChevronRight
          size={32}
          className="hover:cursor-pointer"
          onClick={() => {
            window.history.forward();
          }}
        />
      </div>
    </div>
  );
}
