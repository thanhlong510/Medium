import React from "react";
import Link from "next/link";
import { RouterOutputs } from "~/utils/api";


type inputType = RouterOutputs["post"]["getPosts"];
//
const PostIntroduction = ({ post }: { post: inputType }) => {
  return (
    <div className="grid grid-cols-1 space-x-1  p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 ">
      {post?.map((a) => {
        return ( 
          <Link key={a?.postId} href={`/post/${a?.postId}`}>
            <div className="group min-h-[364px] cursor-pointer overflow-hidden rounded-lg border  ">
              <img
                key={a?.title}
                className="object-cove h-60 w-full transition-transform duration-200 ease-in-out group-hover:scale-105"
                src="/screen.jpg"
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p>{a.title}</p>
                  <p>
                    {a.description} by {a.user.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={`${a.user?.image}`}
                  alt=""
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostIntroduction;
