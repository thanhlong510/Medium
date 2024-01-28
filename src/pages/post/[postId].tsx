import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import ToolTip from "../components/ToolTip";
import Link from "next/link";
import dayjs from 'dayjs'
import CommentForm from "../components/comment/CommentForm";
import CommentList from "../components/comment/CommentList";
const Post = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const postId = router.query.postId as string;
  const postQuery = api.post.getPostById.useQuery({
    postId: postId,
  });
  const data = postQuery.data;
  if (!data ) return;
  
  return (
    <div className="bg-slate-900 -mt-10 ">
      <article className="mx-auto mb-40 sm:w-full md:max-w-3xl lg:max-w-5xl p-5 text-white ">
      <img
          src="/postImage.webp"
          alt=""
          className="my-5  w-full object-cover rounded-lg"
        />
        <h1 className="mb-3 mt-5 text-5xl font-bold text-center tracking-tight ">{data?.title}</h1>
        <h2 className="mb-2 text-2x1 text-center lg:text-3xl  text-slate-400 font-normal">
          {data?.description}
        </h2>
        <div className="flex mb-10 items-center justify-between space-x-12 ">
          <Link href={`/profile/${data.userId}`}>
            <div className="flex items-center  space-x-4 ">
              <img
                alt=""
                src={`${data?.user.image}`}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-extralight">{data?.user.name}</p>
                <p className="text-[#6B6B6B]">Published at {`${dayjs(data.createdAt).format('YYYY-MM-DD HH:mm:ss')}`} </p>
              </div>
            </div>
          </Link>

          {session?.user.id == data?.user.id ? <ToolTip postId={postId} userId={data.userId} /> : ""}
        </div>
        <div className="">
          <p className="text-xl">{data?.content}</p>
        </div>
      </article>
     <CommentForm postId={postId} userId={session?.user?.id ?? '' } username={session?.user?.name ?? '' }/> 
     <CommentList postId={postId}/>
    </div>
  );
};

export default Post;
