import Link from "next/link";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/react";
import { error } from "console";

interface ReplyCommentProps {
  postId: string;
  avatarImageofReplier?:string
}

const CommentList: React.FC<ReplyCommentProps> = ({ postId, avatarImageofReplier }) => {
  const { data: session } = useSession();
  const { data, refetch } = api.replies.getReplies.useQuery({
    postId: postId,
  });
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(
    null,
  );
  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };
    try {
      fetchData().catch((error)=>{
        console.error("Error during uploadSelectedFile:", error);
      });
    } catch (error) {}
  }, [data]);
  const handleReplyButtonClick = async (commentId: string) => {
    setReplyingCommentId((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <div>
      {data?.map((a) => (
        <div className="ml-8 flex rounded p-4" key={a.id}>
          <div>
            <Link href={`/profile/${a.user?.id}`}>{
             a.user?.bio?.avatarImage == null ||
             a.user?.bio?.avatarImage == "{}" ||
             a.user?.bio?.avatarImage == "" ||
             a.user?.bio?.avatarImage == undefined ? <img
             className="mr-4 h-10 w-10 cursor-pointer rounded-full"
             src={a.user?.image ?? ""}
             alt="User Avatar"
           />:
           <img
                className="mr-4 h-10 w-10 cursor-pointer rounded-full"
                src={a.user?.bio?.avatarImage ?? ""}
                alt="User Avatar"
              />
            }
              
            </Link>
          </div>

          <div className="flex-grow">
            <Link href={`/profile/${a.user?.id}`}>
              <p className="cursor-pointer font-bold text-white">
                {a.user?.name}
              </p>
            </Link>

            <p className="mb-1 text-white">{a.repliesContent}</p>

            <button
              className="mt-2 cursor-pointer rounded-full bg-blue-500 px-4 py-1 text-center text-sm font-semibold text-white hover:bg-opacity-90 hover:shadow-lg  "
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
                        src={avatarImageofReplier ?? ""}
                        alt="User Avatar"
                      />
                    </Link>
                  </div>
                  <p className="text-white">{b.repliesContent}</p>
                </div>
              );
            })}
            {replyingCommentId === a.id && (
              <CommentForm
                avatarImage={avatarImageofReplier}
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
