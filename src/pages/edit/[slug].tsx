import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";
import { useState } from "react";
import { useSession } from "next-auth/react";
import WritePost from "../components/WritePost";


const EditPage = () => {
  const {data:session}= useSession()
    const router = useRouter();
    const slug = router.query.slug as string;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [userId, setUserId] = useState("");
    const update = api.post.update.useMutation()

    api.post.getPostById.useQuery(
        {
          postId: slug,
        },
        {
          onSuccess(data) {
            setTitle(data?.title ?? '' );
            setContent(data?.content ?? '' );
            setDescription(data?.description ?? '' );
            setUserId(data?.userId ?? '')
          },
        },
      );
 
    const handleInterestToggle = (interest: string) => {
        if (selectedInterests.includes(interest)) {
          // If the interest is already selected, remove it
          setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
          // If the interest is not selected, add it
          setSelectedInterests([...selectedInterests, interest]);
        }
      };
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
          await router.push("/");
        }
      };
      if(session?.user.id !== userId) return;
  return (
    <div className=' '>
       <WritePost  buttonName="Update" content={content} description={description} setContent={setContent} handleDescriptionChange={handleDescriptionChange} handleInterestToggle={handleInterestToggle} handleSubmit={handleSubmit} handleTitleChange={handleTitleChange} isSubmitting={isSubmitting} selectedInterests={selectedInterests} title={title} />
    </div>
  )
};
export default EditPage;
