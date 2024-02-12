import React, { useState } from "react";
import { api } from "~/utils/api";

interface CommentFormProps {
  username: string;
  userId: string;
  postId: string;
  parentId?: string;
  avatarImage? : string
}

const CommentForm: React.FC<CommentFormProps> = ({
  username,
  userId,
  postId,
  parentId,
  avatarImage
}) => {
  const [comment, setComment] = useState("");
  const addReplies = api.replies.create.useMutation();
  const handlePostReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      await addReplies.mutateAsync({
        postId: postId,
        repliesContent: comment,
        userId: userId,
        parentId: parentId,
      });
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setComment("");
    }
  };

  return (
    <div className="mx-auto max-w-sm mt-5 flex rounded border-t border-solid  border-slate-400 p-4 sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
      <img
        className="mr-4 mt-2 h-10 w-10 rounded-full"
        src={avatarImage ?? "/download.png"}
        alt="User Avatar"
      />
      <div className="flex-grow">
        <p className="mb-1 font-bold text-white">{username}</p>
        <textarea
          className="h-auto w-full resize-none rounded bg-gray-700 p-2 text-white focus:outline-none"
          placeholder="Type your reply here..."
          rows={4}
          onChange={handlePostReply}
          value={comment}
        />
        <button
          className="float-right mt-2 hover:shadow-lg hover:bg-opacity-90 bg-blue-500 px-4 py-1 font-semibold rounded-full text-white"
          onClick={handleSubmit}
        >
         Comment
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
