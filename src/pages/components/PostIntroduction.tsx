import React from "react";
import Link from "next/link";
import { RouterOutputs } from "~/utils/api";
import { IoMdBook } from "react-icons/io";

type inputType = RouterOutputs["post"]["getPostbyCategories"];
//
const PostIntroduction = ({ post }: { post: inputType }) => {
  return (
    <div className="grid grid-cols-1 space-x-1  p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 font-sans ">
      {post?.map((a) => {
        return (
          <div  key={a?.postId} className="col-span-1 rounded-lg  ">
            <Link href={`/post/${a?.postId}`}>
              <div className="group  cursor-pointer overflow-hidden   ">
                <img
                  key={a?.title}
                  className="object-cove h-60 w-full rounded-lg transition-transform duration-200 ease-in-out group-hover:scale-105  "
                  src="/screen.jpg"
                />
                <div className="flex justify-between py-3 px-5">
                  <div>
                    <p className="break-words text-2xl font-extrabold text-slate-100 hover:opacity-75 ">
                      {a.title}
                    </p>
                    <p className="font-semibold text-slate-400">
                      {a.user.name}
                    </p>
                    <div className="flex flex-row gap-2 mt-3 items-center text-sm text-slate-500">
                      <IoMdBook />
                      <span>5 min read</span>
                    </div>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={`${a.user?.image}`}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostIntroduction;
