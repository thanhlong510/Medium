import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UploadFile from "~/pages/components/UploadFile";
import { api } from "~/utils/api";

const EditPage = () => {
  const router = useRouter();
  const profileId = router.query.profileId as string;
  const { data: session } = useSession();

  const submit = api.profile.createBio.useMutation();
  const { data: bio } = api.profile.getBio.useQuery({
    userId: profileId,
  });
  const [content, setContent] = useState(bio?.bio);
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      submit.mutate({
        userId: profileId,
        bio: content ?? "",
      });
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      await router.push(`/profile/${profileId}`);
    }
  };
  if (profileId !== session?.user.id) return;

  return (
    <div>
      <textarea
        id="content"
        className="mt-1 h-[90px] w-full resize-none rounded border border-gray-300 p-2 transition-all duration-300 focus:border-blue-300 focus:outline-none focus:ring"
        value={content}
        onChange={handleContentChange}
      />
      <button
        className={`mt-4 rounded bg-green-500 px-4 py-2 text-white `}
        onClick={handleSubmit}
      >
        Submit
      </button>
      <UploadFile />
    </div>
  );
};

export default EditPage;
