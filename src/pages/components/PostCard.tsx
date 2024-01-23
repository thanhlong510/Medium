import React from "react";
import { RouterOutputs } from "~/utils/api";

type inputType = RouterOutputs["post"]["getPosts"];
const PostCard = ({ post }: { post: inputType }) => {
  return (
    <div>
      {post.map((a) => {
        return (
          <div
            key={a.postId}
            className="flex h-[10rem] max-w-[40rem] cursor-pointer items-center justify-between gap-[1rem]"
          >
            <div className="">
              <div className=" flex gap-[.4rem]">
                <div className="grid h-[1.4rem] w-[1.4rem] place-items-center overflow-hidden rounded-full">
                  <img
                    className="h-[40px] w-[40px] object-cover"
                    src="/avatar.jpg"
                  />
                </div>
                <div className=" font-semibold">{a.user.name}</div>
              </div>
              <h1 className="text-2xl font-bold ">{a.title}</h1>
              <div className="text-[#787878]">{a.description}</div>
              <div className="flex items-center justify-between text-[#787878]">
                <span className="texty-[.8rem] my-2">
                  June 15{" "}
                  <span className="rounded-full bg-[#F2F3F2] p-1">
                    Productivity
                  </span>
                </span>
              </div>
            </div>
            <div>
              <img className="h-[100px] w-[100px] max-w-none" src="/screen.jpg" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;
