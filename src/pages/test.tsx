import React, { useState } from "react";
import EditProfileForm from "./components/EditProfileForm";
import { api } from "~/utils/api";


export function Test() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
 
  const handleOpenEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  const { data: bio } = api.profile.getBio.useQuery({
    userId: "clrnpelmp00002i64tnml5r46"
  });
  if(!bio) return;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleOpenEditProfile}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Open Edit Profile Form
      </button>

      <EditProfileForm bioData={bio} isOpen={isEditProfileOpen} onClose={handleCloseEditProfile} />
    </div>
  );
};
export default Test;
// const {data} =api.post.isEdit.useQuery({postId:'clrdpt1yt0006zmiwehgzn223'})
//   console.log(data)
// const response = api.db.uploadImageTRPC.create({ file: { path: file.path, name: file.name } });
// Test anh
// https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81
