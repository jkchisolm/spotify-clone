import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function BrowsingControls() {
  return (
    <div className="flex flex-row items-center">
      <BiChevronLeft
        size={32}
        className="hover:cursor-pointer"
        onClick={() => {
          window.history.back();
        }}
      />
      <BiChevronRight
        size={32}
        className="hover:cursor-pointer"
        onClick={() => {
          window.history.forward();
        }}
      />
    </div>
  );
}
