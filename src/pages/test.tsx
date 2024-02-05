import React, { useState } from "react";
import EditProfileForm from "./components/EditProfileForm";
import { api } from "~/utils/api";
import UploadFile from "./components/UploadFile";


export function Test() {
  const a ='xin chao'
  console.log(`${a} moi nguoi`)

  return (
    <UploadFile/>
  );
};
export default Test;
// const {data} =api.post.isEdit.useQuery({postId:'clrdpt1yt0006zmiwehgzn223'})
//   console.log(data)
// const response = api.db.uploadImageTRPC.create({ file: { path: file.path, name: file.name } });
// Test anh
// https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81
