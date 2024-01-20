import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import ToolTip from "../components/ToolTip";

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
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mb-3 mt-5 text-3xl">{data?.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {data?.description}
        </h2>
        <div className="flex items-center justify-between space-x-12 ">
          <div className="flex items-center  space-x-4">
            <img
              src={`${data?.user.image}`}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm font-extralight">{data?.user.name}</p>
              <p className="text-[#6B6B6B]">Published at</p>
            </div>
          </div>
          {session?.user.id == data?.user.id ? <ToolTip postId={postId} /> : ""}
        </div>
        <img src="/screen.jpg" alt="" className="my-5 h-80 w-full object-cover" />
        <div>
          <p>{data?.content}</p>
        </div>
      </article>
    </div>
  );
};

export default Post;
