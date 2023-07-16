"use client";

import InfoCard from "@/app/components/general/InfoCard";
import {
  useGetCategoryPlaylistsQuery,
  useGetSingleCategoryQuery,
} from "@/store/slices/apiSlice";
import { Helmet } from "react-helmet";

type Props = {
  categoryId: string;
};

export default function SearchCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: categoryInfo, isLoading: categoryInfoLoading } =
    useGetSingleCategoryQuery({ id: params.id });

  const { data, isLoading, isError } = useGetCategoryPlaylistsQuery({
    id: params.id,
  });

  console.log(data);

  return (
    <div className="">
      {data && categoryInfo && (
        <div className="bg-transparent text-white pt-8 px-3 flex flex-col pb-4">
          <Helmet>
            <title>{categoryInfo.name} | Recreatify</title>
          </Helmet>
          <div className="text-7xl text-white font-bold pt-16 mb-20">
            {categoryInfo.name}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {data.playlists.items
              .filter((n) => n)
              // remove any duplicates
              .filter(
                (thing, index, self) =>
                  index ===
                  self.findIndex(
                    (t) => t.id === thing.id && t.name === thing.name
                  )
              )
              .map((playlist) => {
                return (
                  <InfoCard
                    key={playlist.id}
                    header={playlist.name}
                    description={playlist.description!}
                    imageUrl={playlist.images[0].url}
                    imageType="square"
                    url={`/playlist/${playlist.id}`}
                    id={playlist.id}
                    uri={playlist.uri}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
