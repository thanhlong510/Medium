import React, { useEffect, useState } from "react";

interface UploadFileProps {
  fileName?: string

}



export function useFileUpload() {
  return async (filename: string, file: File) => {
    const result = await fetch(`/api/upload-url?file=${filename}`);
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

const UploadFile: React.FC<UploadFileProps> = ({fileName}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadFile = useFileUpload();

  useEffect(() => {
    const uploadSelectedFile = async () => {
      try {
        if (!selectedFile) {
          // Handle case when no file is selected
          return;
        }
        const uploadOk = await uploadFile(fileName ?? selectedFile.name, selectedFile);
        if (uploadOk) {
          // show success
          console.log("Upload successful");
        } else {
          // show error
          console.error("Upload failed");
        }
      } catch (error) {
        // Handle other errors that might occur during file upload
        console.error("Error during file upload:", error);
      }
    };

    uploadSelectedFile().catch((error) => {
      // Handle any unhandled errors during uploadSelectedFile
      console.error("Error during uploadSelectedFile:", error);
    });
  }, [selectedFile, uploadFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };
  // const handleUpload = async () => {
  //   try {
  //     if (!selectedFile) {
  //       // Handle case when no file is selected
  //       return;
  //     }
  //     const uploadOk = await uploadFile(selectedFile.name, selectedFile);
  //     if (uploadOk) {
  //       // show success
  //       console.log("Upload successful");
  //     } else {
  //       // show error
  //       console.error("Upload failed");
  //     }
  //   } catch (error) {
  //     // Handle other errors that might occur during file upload
  //     console.error("Error during file upload:", error);
  //   }
  // };

  return (
    <div>
      <label className="relative flex cursor-pointer items-center">
        <button className="relative z-10 rounded  p-4    focus:outline-none focus:ring">
          Add Image
        </button>

        <input
          type="file"
          className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileSelect}
        />
      </label>
    </div>
  );
};
export default UploadFile;
