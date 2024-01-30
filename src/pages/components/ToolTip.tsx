import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { api } from "~/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";

interface TooltipProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  postId: string;
  userId: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({
  onEditClick,
  onDeleteClick,
  postId,
  userId,
}) => {
  const router = useRouter();
  const deletePost = api.post.delete.useMutation();
  const hidePost = api.post.hidePost.useMutation();
  return (
    <div className="bg- flex flex-col">
      <div>
        <Link href={`/edit/${postId}`}>
          <button
            onClick={(e) => {
              onEditClick();
              e.stopPropagation();
            }}
            className="mb-[8px]"
          >
            Edit
          </button>
        </Link>
      </div>
      <div>
        <button
          className="mb-[8px]"
          onClick={async (e) => {
            await deletePost.mutateAsync({
              postId: postId,
            });
            e.stopPropagation();
            onDeleteClick();
            await router.push(`/profile/${userId}`);
          }}
        >
          Delete
        </button>
      </div>
      <div>
        <button
          className="mb-[8px]"
          onClick={async (e) => {
            await hidePost.mutateAsync({
              postId: postId,
            });
            e.stopPropagation();
            onDeleteClick();
            await router.push(`/profile/${userId}`);
          }}
        >
          Hide Post
        </button>
      </div>
    </div>
  );
};
type ToolTipProps = {
  postId: string;
  userId: string;
};
const ToolTip = ({ postId, userId }: ToolTipProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleEditClick = () => {
    // Handle edit logic

    console.log("Edit clicked");
    setIsTooltipOpen(false); // Tự đóng Tippy sau khi bấm Edit
  };

  const handleDeleteClick = () => {
    // Handle delete logic
    console.log("Delete clicked");
    setIsTooltipOpen(false); // Tự đóng Tippy sau khi bấm Delete
  };

  return (
    <Tippy
      content={
        <CustomTooltip
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          postId={postId}
          userId={userId}
        />
      }
      interactive
      interactiveBorder={10}
      visible={isTooltipOpen}
      onClickOutside={() => setIsTooltipOpen(false)}
      placement="bottom"
    >
      <div
        className="w-16"
        onMouseEnter={() => setIsTooltipOpen(true)}
        // onMouseLeave={() => setIsTooltipOpen(false)}
        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
      >
        <RxHamburgerMenu />
      </div>
    </Tippy>
  );
};

export default ToolTip;
