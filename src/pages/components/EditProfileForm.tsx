import React, { useState } from "react";
import UploadFile from "./UploadFile";
import { RouterOutputs } from "~/utils/api";
import { FaEarthAfrica } from "react-icons/fa6";
type inputType = RouterOutputs["profile"]["getBio"];
interface EditProfileFormProps {
  isOpen: boolean;
  onClose: () => void;
  bioData: inputType;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  isOpen,
  onClose,
  bioData,
}) => {
  const [bio, setBio] = useState(bioData?.bio);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };
  const handleSubmit = () => {
    // Xử lý logic khi nhấn nút lưu
    console.log("Save button clicked:");
  };
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Đóng form chỉ khi nhấn vào background đen (overlay)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const counter = bio?.length;
  return (
    <>
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="w-full rounded-lg border border-solid  bg-white p-4 sm:max-w-md lg:max-w-2xl">
            <div className="flex items-center justify-between border-b border-solid pb-3  ">
              <h1 className="text-2xl font-bold ">Edit Profile</h1>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-10 w-10 rounded-full bg-slate-300 p-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="pb-5  ">
              <div className="mt-2 flex items-center justify-between text-xl">
                <p className="mb-2  font-bold ">Profile Picture</p>
                <button className="text-sky-800 ">
                  <UploadFile />
                </button>
              </div>
              <div className="mx-auto flex  h-[168px] w-[168px]">
                <img className="rounded-full " src="/download.png" />
              </div>
            </div>
            <div className="pb-5  ">
              <p className="mb-2 text-xl font-bold ">Bio</p>
              <div className="relative mx-auto flex ">
                <textarea
                  id="bio"
                  className=" mx-auto h-[150px] w-3/4 resize-none rounded bg-slate-200 p-2 focus:outline-none "
                  value={bio}
                  onChange={handleBioChange}
                  placeholder="Describe who you are"
                />
                <span className="absolute bottom-0 right-0 text-slate-700">
                  Words : {counter}
                </span>
              </div>
            </div>
            <div className="flex w-full justify-center">
            <div className="flex space-x-4 items-center">
                <div className="flex space-x-2 items-center">
                <FaEarthAfrica className="h-[20px] w-[20px]" />
            <p className="text-slate-600">
                Public
            </p>
                </div>
           
            <div className="flex space-x-1">
            <button
                onClick={handleSubmit}
                className=" font-semibold rounded-lg bg-slate-600 px-4 py-[6px]   text-white hover:bg-green-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="  font-semibold rounded-lg bg-blue-700 px-4 py-[6px]  text-white hover:bg-green-600"
              >
                Save
              </button>
            </div>
             
              
            </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfileForm;
