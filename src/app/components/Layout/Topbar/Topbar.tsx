import BrowsingControls from "./BrowsingControls";

export default function Topbar() {
  return (
    <div
      className={`absolute top-0 left-0 right-0 text-white bg-slate-400 flex flex-row justify-between`}
    >
      <BrowsingControls />
    </div>
  );
}
