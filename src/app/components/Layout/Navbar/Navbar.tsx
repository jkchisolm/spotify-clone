import Library from "./Library";
import Navigation from "./Navigation";

export default function Navbar() {
  return (
    <div className="flex flex-col w-96">
      <Navigation /> <Library />
    </div>
  );
}
