import InfoCard from "@/app/components/general/InfoCard";
import Link from "next/link";

type CategoryCard = {
  header: string;
  description: string;
  imageUrl: string;
  url: string;
  id: string;
};

type Props = {
  playlists?: SpotifyApi.PlaylistObjectSimplified[];
  items: CategoryCard[];
  rowName: string;
  rowCategory?: string;
  useShowAllButton: boolean;
  showAllUrl?: string;
  rounded?: boolean;
  clampOne?: boolean;
};

export default function CategoryRow({
  playlists,
  items,
  rowName,
  rowCategory,
  useShowAllButton,
  rounded,
  clampOne,
  showAllUrl,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{rowName}</h1>
        {useShowAllButton && (
          <Link
            href={showAllUrl ? showAllUrl : `/playlistCategory/${rowCategory}`}
            className="text-sm font-bold text-zinc-400 hover:text-green-600"
          >
            Show all
          </Link>
        )}
      </div>
      <div className="grid grid-cols-7 mt-3 gap-3">
        {items.map((item) => (
          <InfoCard
            key={item.id}
            header={item.header}
            description={item.description}
            imageUrl={item.imageUrl}
            imageType={rounded ? "circle" : "square"}
            url={item.url}
            id={item.id}
            clampOne={clampOne}
          />
        ))}
      </div>
    </div>
  );
}
