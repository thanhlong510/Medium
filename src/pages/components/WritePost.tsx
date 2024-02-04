import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "~/utils/api";
import MultiSelectCategory from "../components/MultiSelectCategory";
interface WriteStoryProps {
  title: string;
  description: string;
  content: string;
  isSubmitting: boolean;
  selectedInterests: string[];
  buttonName?:string;
  handleInterestToggle: (interest: string) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
}
const WritePost: React.FC<WriteStoryProps> = ({
  title,
  content,
  description,
  handleContentChange,
  handleDescriptionChange,
  handleInterestToggle,
  handleSubmit,
  handleTitleChange,
  isSubmitting,
  selectedInterests,
  buttonName
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <div className="w-full rounded   sm:max-w-3xl md:max-w-2xl lg:max-w-5xl ">
          <div className="mb-[15px] flex w-full items-center">
            <MultiSelectCategory
              handleInterestToggle={handleInterestToggle}
              selectedInterests={selectedInterests}
            />
          </div>
          <input
            type="text"
            id="title"
            className="mt-1 h-auto min-h-[33px] w-full rounded  py-4    text-4xl  font-extrabold focus:outline-none "
            value={title}
            placeholder="Post Title ..."
            onChange={handleTitleChange}
          />

          <textarea
            id="description"
            className="mt-[0.75rem] h-auto min-h-[50px] w-full resize-none rounded py-2 text-2xl font-medium focus:outline-none"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Post Description ..."
          />

          <textarea
            id="content"
            className="mt-1 min-h-[200px] h-auto w-full resize-none rounded py-2 text-xl font-normal focus:outline-none"
            value={content}
            placeholder="Create your content ..."
            onChange={handleContentChange}
          />
        </div>
      </div>
      <button
        className={`absolute right-8 top-8 mt-4 rounded-full bg-blue-700 px-4 py-2 font-semibold text-white ${
          isSubmitting ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"
        }`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? `${buttonName}ing` : `${buttonName}`}
      </button>
    </div>
  );
};

export default WritePost;
