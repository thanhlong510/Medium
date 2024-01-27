import Link from "next/link";
import React from "react";
import { RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
type inputType = RouterOutputs["post"]["getPosts"];
const PostCard = ({ post }: { post: inputType }) => {
  return (
    <div>
      {post?.map((a) => {
        return (
          <Link key={a?.postId} href={`/post/${a?.postId}`}>
            <div className="flex h-[10rem]  cursor-pointer items-center justify-between gap-[1rem] border-b border-solid border-gray-200">
              <div className="">
                <div className=" flex gap-[.4rem]">
                  <div className="grid h-[1.4rem] w-[1.4rem] place-items-center overflow-hidden rounded-full">
                    <img
                      className="h-[40px] w-[40px] object-cover"
                      src="/download.png"
                    />
                  </div>
                  <div className=" font-semibold text-[#787878]">{a.user.name}</div>
                </div>
                <h1 className="text-lg font-bold ">{a.title}</h1>
                <div className="text-[#787878]">{a.description}</div>
                <div className="flex items-center justify-between text-[#787878]">
                  <span className="text-[.8rem] my-2">
                    {`${dayjs(a.createdAt).format('YYYY-MM-DD HH:mm:ss')}`}
                    <span className="rounded-full bg-[#F2F3F2] p-2">
                      Productivity
                    </span>
                  </span>
                </div>
              </div>
              <div className="group">
                <img
                  className="h-[134px] w-[200px] max-w-none rounded-[6px] transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src="/screen.jpg"
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostCard;
