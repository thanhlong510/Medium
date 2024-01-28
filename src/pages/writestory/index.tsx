import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "~/utils/api";
import MultiSelectCategory from "../components/MultiSelectCategory";

const WriteStory = () => {
  const { status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const submit = api.post.create.useMutation();
  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      // If the interest is already selected, remove it
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      // If the interest is not selected, add it
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  console.log(selectedInterests)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      submit.mutate({
        title: title,
        description: description,
        content: content,
        categories: selectedInterests,
      });
      // Clear form after successful submission
      setTitle("");
      setContent("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
      await router.push("/");
    }
  };
  if (status !== "authenticated") return;
  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <div className="w-full rounded   sm:max-w-3xl md:max-w-2xl lg:max-w-5xl ">
          <div className="flex w-full mb-[15px] items-center">
            <MultiSelectCategory handleInterestToggle={handleInterestToggle}  selectedInterests={selectedInterests} />
          
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
            className="mt-[0.75rem] resize-none min-h-[50px] h-auto w-full rounded py-2 text-2xl font-medium focus:outline-none"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Post Description ..."
          />

          <textarea
            id="content"
            className="mt-1 resize-none h-auto w-full rounded py-2 text-xl font-normal focus:outline-none"
            value={content}
            placeholder="Create your content ..."
            onChange={handleContentChange}
          />

         
        </div>
      </div>
      <button
            className={`mt-4 absolute top-8 right-8 font-semibold rounded-full bg-blue-700 px-4 py-2 text-white ${
              isSubmitting
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-blue-600"
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
    </div>
  );
};

export default WriteStory;
