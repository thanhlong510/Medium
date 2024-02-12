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
            <div className="mx-2 flex h-[10rem] cursor-pointer  items-center justify-between gap-[1rem] border-b border-solid border-gray-200 sm:mx-0">
              <div className="">
                <div className=" flex gap-[.4rem]">
                  <div className="grid h-[1.4rem] w-[1.4rem] place-items-center overflow-hidden rounded-full">
                    {a.user.bio?.avatarImage == null ||
                    a.user.bio?.avatarImage == "{}" ||
                    a.user.bio?.avatarImage == "" ||
                    a.user.bio?.avatarImage == undefined ? (
                      <img
                        className="h-[40px] w-[40px] object-cover"
                        src={a.user.image ?? ""}
                      />
                    ) : (
                      <img
                        className="h-[40px] w-[40px] object-cover"
                        src={a.user.bio?.avatarImage ?? ""}
                      />
                    )}

                    {/* <img
                      className="h-[40px] w-[40px] object-cover"
                      src="/download.png"
                    /> */}
                  </div>
                  <div className=" font-semibold text-slate-500">
                    {a.user.name}
                  </div>
                </div>
                <h1 className="text-lg font-bold ">{a.title}</h1>
                <div className="text-[#787878]">{a.description}</div>
                <div className="items-center justify-between text-[#787878] sm:hidden md:flex">
                  <span className="my-2 text-[.8rem]">
                    <span className="">
                      {`${dayjs(a.createdAt).format("MMM D, YYYY")}`}
                    </span>

                    {a.categories.map((b) => {
                      return b.category.map((c) => {
                        return (
                          <Link
                            key={Math.random().toString(36).substring(7)}
                            href={`/discovery/${c}`}
                            className=" "
                          >
                            <span className="mx-2   rounded-full bg-[#F2F3F2] p-2">
                              {c}
                            </span>
                          </Link>
                        );
                      });
                    })}
                  </span>
                </div>
              </div>
              <div className="group hidden sm:block">
                <img
                  alt=""
                  className="h-[134px] w-[200px] max-w-none rounded-[6px] transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src="/postCardimage.jpg"
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
