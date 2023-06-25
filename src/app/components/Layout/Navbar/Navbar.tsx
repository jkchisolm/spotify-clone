import Library from "./Library";
import Navigation from "./Navigation";

export default function Navbar() {
  return (
    <div className="flex flex-col">
      <Navigation /> <Library />
    </div>
  );
}
