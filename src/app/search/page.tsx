"use client";

import { useGetAvailableCategoriesQuery } from "@/store/slices/apiSlice";
import CategoryCard from "../components/search/CategoryCard";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@/lib/contexts/apiContext";

export default function SearchPage() {
  const apiContext = useContext(ApiContext);

  const {
    data: availableCategories,
    isLoading,
    isError,
    refetch,
  } = useGetAvailableCategoriesQuery();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (apiContext.refreshing) {
      setRefreshing(true);
    } else if (apiContext.refreshing == false && refreshing) {
      setRefreshing(false);
      console.log("refetching user api");
      refetch();
    }
  }, [apiContext.refreshing]);

  return (
    <div className="bg-zinc-900 text-white pt-16 px-4 h-full">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">Browse all</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 auto-rows-fr gap-5">
            {availableCategories?.categories.items.map((category) => {
              return <CategoryCard key={category.id} category={category} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
