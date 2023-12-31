"use client";

import { useGetAvailableCategoriesQuery } from "@/store/slices/apiSlice";
import CategoryCard from "../components/search/CategoryCard";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@/lib/contexts/apiContext";
import { StyleContext } from "@/lib/contexts/styleContext";
import useAuth from "@/lib/hooks/useAuth";
import { Helmet } from "react-helmet";

export default function SearchPage() {
  const apiContext = useContext(ApiContext);
  const styleContext = useContext(StyleContext);

  const {
    data: availableCategories,
    isLoading,
    isError,
    refetch,
  } = useGetAvailableCategoriesQuery();

  const [refreshing, setRefreshing] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    styleContext.setTopbarBG("#121212");
  });

  useEffect(() => {
    if (apiContext.refreshing) {
      setRefreshing(true);
    } else if (apiContext.refreshing == false && refreshing) {
      setRefreshing(false);
      console.log("refetching user api");
      refetch();
    }
  }, [apiContext.refreshing, refetch, refreshing]);

  return (
    <div className="bg-spotify-dark-bg text-white pt-16 px-4 min-h-fit pb-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col">
          <Helmet>
            <title>Search | Recreatify</title>
          </Helmet>
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
