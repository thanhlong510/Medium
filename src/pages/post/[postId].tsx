import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import ToolTip from "../components/ToolTip";
import Link from "next/link";
import dayjs from 'dayjs'
const Post = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const postId = router.query.postId as string;
  const postQuery = api.post.getPostById.useQuery({
    postId: postId,
  });
  const data = postQuery.data;
  if (!data) return;
  
  return (
    <div>
      <article className="mx-auto max-w-2xl p-5">
        <h1 className="mb-3 mt-5 text-5xl font-bold tracking-tight ">{data?.title}</h1>
        <h2 className="mb-2 text-2xl  text-[#6B6B6B] font-normal">
          {data?.description}
        </h2>
        <div className="flex items-center justify-between space-x-12 ">
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
        <img
          src="/screen.jpg"
          alt=""
          className="my-5 h-80 w-full object-cover rounded-lg"
        />
        <div>
          <p>{data?.content}</p>
        </div>
      </article>
    </div>
  );
};

export default Post;
