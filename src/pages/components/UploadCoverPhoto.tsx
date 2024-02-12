import React, { useEffect, useState } from "react";
import { FaRegImages } from "react-icons/fa";
interface UploadFileProps {
  initfileName?: string;
  setCoverImage: (a: string) => void;
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

const UploadFileCoppy: React.FC<UploadFileProps> = ({ initfileName, setCoverImage }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadFile = useFileUpload();
  const fileName= initfileName + 'coverphoto' 
  useEffect(() => {
    const uploadSelectedFile = async () => {
      
      try {
        if (!selectedFile) {
          // Handle case when no file is selected
          return;
        }
  
        const uploadOk = await uploadFile(
          fileName ?? selectedFile.name,
          selectedFile,
        );
        if (uploadOk) {
          // show success
          console.log("Upload successful");
          setCoverImage(fileName ?? selectedFile?.name)
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

  return (
    <div className="cursor-pointer">
      <div className="relative mt-[60px] flex cursor-pointer items-center">
        <div className=" flex items-center space-x-1 ">
          <FaRegImages className="h-[20px] w-[20px]" />
          <p className="cursor-pointer text-center text-sm font-semibold text-[#334155]">
            Add image
          </p>
        </div>
        <input
          type="file"
          className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileSelect}
        />
        <p className="ml-2 text-sm">{selectedFile?.name}</p>
      </div>
    </div>
  );
};
export default UploadFileCoppy;
