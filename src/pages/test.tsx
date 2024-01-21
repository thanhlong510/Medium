import { api } from "~/utils/api";
import React from "react";
import ToolTip from "./components/ToolTip";
interface FileObject {
  filePath: string;
  fileName: string;
}

const Test = () => {
 const {data:a}= api.profile.getProfilebyUserId.useQuery({
  userId:'clrn2bi800002em2d4ch8l01a'
 })


  return (
    <div>

      <ToolTip postId="clrlvvzmt000g6p9vciy64syi" />
    </div>
  );
};

export default Test;

// const {data} =api.post.isEdit.useQuery({postId:'clrdpt1yt0006zmiwehgzn223'})
//   console.log(data)
// const response = api.db.uploadImageTRPC.create({ file: { path: file.path, name: file.name } });
// Test anh
// https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81
