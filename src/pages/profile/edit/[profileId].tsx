import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { api } from '~/utils/api';

const EditPage = () => {
    const router = useRouter()
    const profileId = router.query.profileId as string
    const submit = api.profile.createBio.useMutation()
    const {data:bio} = api.profile.getBio.useQuery({
        userId:profileId
    })
    console.log()
    const [content,setContent]= useState(bio?.bio)
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
     setContent(e.target.value);
   };
   const handleSubmit =()=>{
     try{
       submit.mutate({
         userId:profileId,
         bio: content ?? ''
       })
       
     }catch (error) {
       console.error('Error submitting post:', error);
     } finally {
         router.push(`/profile/${profileId}`)
     }
     
   }
   const { data } = api.post.getPosts.useQuery();
   
     if (!data) return;
     return (
       <div>
         
         <textarea
           id="content"
           className="w-full h-[90px] p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
           value={content}
           onChange={handleContentChange}
         />
         <button
           className={`bg-green-500 text-white py-2 px-4 mt-4 rounded `}
           onClick={handleSubmit}
         >
           Submit
         </button>
    
       </div>
     );
}

export default EditPage