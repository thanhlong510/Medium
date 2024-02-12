import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import ToolTip from "../components/ToolTip";
import Link from "next/link";
import dayjs from "dayjs";
import StarterKit from "@tiptap/starter-kit";
import CommentForm from "../components/comment/CommentForm";
import CommentList from "../components/comment/CommentList";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
const Post = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const postId = router.query.postId as string;
  const postQuery = api.post.getPostById.useQuery({
    postId: postId,
  });
  const { data: avatarImage } = api.profile.getAvataruser.useQuery({
    fileName: `${postQuery.data?.userId}avatar`,
  });
  const data = postQuery.data;

  if (!data) return;

  return (
    <div className="-mt-10 h-full bg-slate-900 ">
      <article className="mx-auto p-5 text-white sm:w-full md:max-w-3xl lg:max-w-5xl ">
        <img
          src="/postImage.webp"
          alt=""
          className="my-5  w-full rounded-lg object-cover"
        />
        <h1 className="mb-3 mt-5 text-center text-5xl font-bold tracking-tight ">
          {data?.title}
        </h1>
        <h2 className="text-2x1 mb-2 text-center font-normal  text-slate-400 lg:text-3xl">
          {data?.description}
        </h2>
        <div className="mb-10 flex items-center justify-between space-x-12 ">
          <Link href={`/profile/${data.userId}`}>
            <div className="flex items-center  space-x-4 ">
              {avatarImage === "" ? (
                <img
                  alt=""
                  src={data.user.image ?? ""}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <img
                  alt=""
                  src={
                    Array.isArray(avatarImage) ? avatarImage[0] : avatarImage
                  }
                  className="h-10 w-10 rounded-full"
                />
              )}

              <div>
                <p className="text-sm font-extralight">{data?.user.name}</p>
                <p className="text-[#6B6B6B]">
                  Published at{" "}
                  {`${dayjs(data.createdAt).format("MMM D, YYYY")}`}{" "}
                </p>
              </div>
            </div>
          </Link>

          {session?.user.id == data?.user.id ? (
            <ToolTip postId={postId} userId={data.userId} />
          ) : (
            ""
          )}
        </div>
        <div className="">
          <p className="text-xl">
            <div dangerouslySetInnerHTML={{ __html: data.content ?? "" }}></div>
          </p>
        </div>
      </article>
      {status == "authenticated" ? (
        <div>
          <CommentForm
            avatarImage={
             
              avatarImage == null ||
              avatarImage  == "{}" ||
              avatarImage  == "" ||
              avatarImage  == undefined 
                ? data.user.image
                : Array.isArray(avatarImage)
                  ? avatarImage[0]
                  : avatarImage
            }
            postId={postId}
            userId={session?.user?.id ?? ""}
            username={session?.user?.name ?? ""}
          />
          <CommentList avatarImageofReplier= {
             
             avatarImage == null ||
             avatarImage  == "{}" ||
             avatarImage  == "" ||
             avatarImage  == undefined 
               ? data.user.image
               : Array.isArray(avatarImage)
                 ? avatarImage[0]
                 : avatarImage
           } postId={postId} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
