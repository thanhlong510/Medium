import Link from "next/link";
import React, { useState } from "react";
import { api } from "~/utils/api";
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/react";

interface ReplyCommentProps {
  postId: string;
}

const CommentList: React.FC<ReplyCommentProps> = ({ postId }) => {
  const { data: session } = useSession();
  const { data, refetch } = api.replies.getReplies.useQuery({
    postId: postId,
  });
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(
    null,
  );

  const handleReplyButtonClick = async (commentId: string) => {
    setReplyingCommentId((prev) => (prev === commentId ? null : commentId));
    await refetch();
  };

  return (
    <div>
      {data?.map((a) => (
        <div className="ml-8 flex rounded p-4" key={a.id}>
          <div>
            <Link href={`/profile/${a.user?.id}`}>
              <img
                className="mr-4 h-8 w-8 cursor-pointer rounded-full"
                src="/download.png"
                alt="User Avatar"
              />
            </Link>
          </div>

          <div className="flex-grow">
            <Link href={`/profile/${a.user?.id}`}>
              <p className="mb-1 cursor-pointer font-bold text-white">
                {a.user?.name}
              </p>
            </Link>

            <p className="mb-1 text-white">{a.repliesContent}</p>

            <button
              className="mt-2 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
              onClick={() => handleReplyButtonClick(a.id)}
            >
              Reply
            </button>
            {a.children.map((b) => {
              return (
                <div key={b.id} className="m-3 flex">
                  <div>
                    <Link href={`/profile/${a.user?.id}`}>
                      <img
                        className="mr-4 h-8 w-8 cursor-pointer rounded-full"
                        src="/download.png"
                        alt="User Avatar"
                      />
                    </Link>
                  </div>
                  {b.repliesContent}
                </div>
              );
            })}
            {replyingCommentId === a.id && (
              <CommentForm
                parentId={a.id}
                postId={postId}
                userId={session?.user.id ?? ""}
                username={session?.user.name ?? ""}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
