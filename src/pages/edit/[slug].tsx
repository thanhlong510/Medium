import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import { useState } from "react";
const EditPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const update = api.post.update.useMutation();
  api.post.getPostById.useQuery(
    {
      postId: slug,
    },
    {
      onSuccess(data) {
        setTitle(data?.title as string);
        setContent(data?.content as string);
        setDescription(data?.description as string);
      },
    },
  );

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

      update.mutate({
        title: title,
        description: description,
        content: content,
        postId: slug,
      });
      // Clear form after successful submission
      setTitle("");
      setContent("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full rounded bg-white p-8 shadow-md sm:max-w-3xl">
        <h1 className="mb-4 text-2xl font-bold">Editting the post</h1>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-600"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 w-full rounded border border-gray-300 p-2 transition-all duration-300 focus:border-blue-300 focus:outline-none focus:ring"
          value={title}
          onChange={handleTitleChange}
        />
        <label
          htmlFor="content"
          className="mt-4 block text-sm font-medium text-gray-600"
        >
          Description:
        </label>
        <textarea
          id="content"
          className="mt-1 h-[50px] w-full rounded border border-gray-300 p-2 transition-all duration-300 focus:border-blue-300 focus:outline-none focus:ring"
          value={description}
          onChange={handleDescriptionChange}
        />

        <label
          htmlFor="content"
          className="mt-4 block text-sm font-medium text-gray-600"
        >
          Content:
        </label>
        <textarea
          id="content"
          className="mt-1 h-[90px] w-full rounded border border-gray-300 p-2 transition-all duration-300 focus:border-blue-300 focus:outline-none focus:ring"
          value={content}
          onChange={handleContentChange}
        />

        <button
          className={`mt-4 rounded bg-green-500 px-4 py-2 text-white ${
            isSubmitting
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-green-600"
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};
export default EditPage;
