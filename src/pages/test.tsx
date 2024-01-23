import { api } from "~/utils/api";
import React, { useState } from "react";
import ToolTip from "./components/ToolTip";
import PostCard from "./components/PostCard";
import SearchBar from "./components/SearchBar";

interface Post {
  id: string;
  title: string;
}


const Test = () => {
  
 const submit = api.profile.createBio.useMutation()
 const [content,setContent]= useState('')
 const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setContent(e.target.value);
};
const handleSubmit =()=>{
  try{
    submit.mutate({
      userId:"clrnpelmp00002i64tnml5r46",
      bio: content
    })
    setContent('')
  }catch (error) {
    console.error('Error submitting post:', error);
  } finally {
    
  }
  
}
const { data } = api.post.getPosts.useQuery();
const postData: Post[] = [
  { id: "clrlwts0j000k6p9vgj66vpnl", title: 'First Post' },
  { id: "clrlwu3zo000o6p9vsg68n4qy", title: 'Second Post' },
  // Add more data as needed
];
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
      <SearchBar data={postData}/>
    </div>
  );
};

export default Test;

// const {data} =api.post.isEdit.useQuery({postId:'clrdpt1yt0006zmiwehgzn223'})
//   console.log(data)
// const response = api.db.uploadImageTRPC.create({ file: { path: file.path, name: file.name } });
// Test anh
// https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81
