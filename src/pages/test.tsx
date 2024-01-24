import { api } from "~/utils/api";
import React, { useState } from "react";
import ToolTip from "./components/ToolTip";
import PostCard from "./components/PostCard";
import SearchBar from "./components/SearchBar";
import axios from 'axios';

interface Post {
  id: string;
  title: string;
}



export function useFileUpload() {
    return async (filename: string, file: File) => {
      const result = await fetch(`/api/files/upload-url?file=${filename}`);
      const { url, fields } = await result.json();
      const formData = new FormData();
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });
      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });
      return upload.ok;
    };
  }
// const {data} =api.post.isEdit.useQuery({postId:'clrdpt1yt0006zmiwehgzn223'})
//   console.log(data)
// const response = api.db.uploadImageTRPC.create({ file: { path: file.path, name: file.name } });
// Test anh
// https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81
