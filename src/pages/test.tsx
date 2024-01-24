// import { api } from "~/utils/api";
// import React, { useState } from "react";
// import ToolTip from "./components/ToolTip";
// import PostCard from "./components/PostCard";
// import SearchBar from "./components/SearchBar";
// import axios from 'axios';

// interface Post {
//   id: string;
//   title: string;
// }



// export default function FileUpload({
//   isPublic = true,
//   fileContent,
//   companyId,
//   userId,
//   onFileUpload,
//   downloadKey,
// }: FileUploadProps): ReactElement {
//   const [pending, setPending] = useState(false);
//   const [uploadedFileName, setUploadedFileName] = useState('');

//   const generateSignedUploadUrlMutation = trpc.files.generateSignedUploadUrl.useMutation();

//   const uploadFile = async (e: any) => {
//     e.preventDefault();
//     if (e.target.files.length < 1) return;

//     setPending(true);

//     const { signedUrl, downloadKey } = await generateSignedUploadUrlMutation.mutateAsync({
//       fileName: e?.target?.files[0]?.name,
//       isPublic,
//       fileContent,
//       companyId,
//       userId,
//     });

//     const uploadResponse = await axios.put(signedUrl, e.target.files[0], {
//       headers: {
//         'Content-Type': `${e.target.files[0].type}`,
//         'Access-Control-Allow-Origin': '*',
//       },
//     });

//     if (uploadResponse.status === 200) {
//       setPending(false);
//       onFileUpload(downloadKey);
//       setUploadedFileName(e.target.files[0].name);
//       toast.success('Profile Image Updated!');
//     } else {
//       setPending(false);
//       toast.error('Profile Image Failed to Update.');
//     }
//   };

//   return (
//     <div className="relative">
//       <label htmlFor="file-input" className="cursor-pointer text-white text-4xl rounded-full h-32 w-32">
//         📷
//       </label>
//       <input
//         id="file-input"
//         type="file"
//         className="hidden"
//         onChange={uploadFile}
//         disabled={pending}
//         accept=".jpg, .jpeg, .png"
//       />
//     </div>
//   );
// }
// // const {data} =api.post.isEdit.useQuery({postId:'clrdpt1yt0006zmiwehgzn223'})
// //   console.log(data)
// // const response = api.db.uploadImageTRPC.create({ file: { path: file.path, name: file.name } });
// // Test anh
// // https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81
