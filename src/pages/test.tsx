import React, { useState } from "react";

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

const Test = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadFile = useFileUpload();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        // Handle case when no file is selected
        return;
      }
      const uploadOk = await uploadFile(selectedFile.name, selectedFile);
      if (uploadOk) {
        // show success
        console.log('Upload successful');
      } else {
        // show error
        console.error('Upload failed');
      }
    } catch (error) {
      // Handle other errors that might occur during file upload
      console.error('Error during file upload:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
export default Test;
// const {data} =api.post.isEdit.useQuery({postId:'clrdpt1yt0006zmiwehgzn223'})
//   console.log(data)
// const response = api.db.uploadImageTRPC.create({ file: { path: file.path, name: file.name } });
// Test anh
// https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81
