import React from "react";
import PostIntroduction from "../components/PostIntroduction";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const Discovery = () => {
  const router = useRouter();
  const categoryName = router.query.category as string;
  function capitalizeFirstLetter(
    str: string | null | undefined,
  ): string | null | undefined {
    if (str == null) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const categorytoBackend = capitalizeFirstLetter(categoryName);
  const { data } = api.post.getPostbyCategories.useQuery({
    categories: categorytoBackend ?? "",
  });
  console.log(categoryName);
  if (!data) return;
  return (
    <div className="h-[calc(100vh-75px)] bg-slate-900">
      <div className="">
        <h2 className="flex  justify-center border-b border-solid border-slate-600 py-12  text-5xl font-bold tracking-wide text-white ">
          {categoryName.toUpperCase()}
        </h2>
      </div>
      <PostIntroduction post={data} />
    </div>
  );
};

export default Discovery;
