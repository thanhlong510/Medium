import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { api } from "~/utils/api";
import Link from "next/link";

interface TooltipProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  postId: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({
  onEditClick,
  onDeleteClick,
  postId,
}) => {
  const deletePost = api.post.delete.useMutation();
  return (
    <div className="flex bg- flex-col">
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
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const ToolTip = ({ postId }: { postId: string }) => {
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
