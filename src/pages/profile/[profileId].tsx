import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { GoPencil } from 'react-icons/go';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import { RouterOutputs } from '~/utils/api';
import Link from 'next/link';

type inputType = RouterOutputs['post']['getPosts'];

const ProfilePage = () => {
  const [bold, setBold] = useState('1');
  const router = useRouter();
  const { data: session } = useSession();
  const profileId = router.query.profileId as string;
  const { data: postData } = api.post.getPostsbyUserId.useQuery({
    userId: profileId,
  });
  const { data: postHidedata } = api.post.getHidePostbyUserId.useQuery({
    userId: profileId,
  });
  const { data: postUnhidedata } = api.post.getUnhidePostbyUserId.useQuery({
    userId: profileId,
  });
  const [showData, setShowdata] = useState<inputType | undefined>(postUnhidedata);
  const { data: profileData } = api.profile.getinforProfilebyUserId.useQuery({
    userId: profileId,
  });
  const { data: bioData } = api.profile.getBio.useQuery({
    userId: profileId,
  });

  useEffect(() => {
    // Kiểm tra xem dữ liệu từ postUnhidedata đã sẵn có chưa
    if (postUnhidedata) {
      setShowdata(postUnhidedata);
    }
  }, [postUnhidedata]);

  const handleBold = (data: string) => {
    setBold(data);
    if (data == '1') {
      setShowdata(postUnhidedata);
    } else if (data == '2') {
      setShowdata(postHidedata);
    }
  };

  return (
    <div className=" m-auto sm:max-w-xs md:max-w-screen-xl  lg:max-w-2xl ">
      <div className="mx-auto flex w-full  flex-col py-8 ">
        <div className="flex flex-col gap-5  ">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0 rounded-full border-[2px] border-solid">
                <img
                  src="/screen.jpg"
                  alt={``}
                  className="h-[112px] w-[112px] rounded-full object-cover p-[3px]"
                />
              </div>

              <div>
                <div className="flex items-center justify-end gap-2">
                  <div className="flex flex-row items-center gap-2 ">
                    {session?.user.id==profileId? <Link href={`/profile/edit/${profileId}`}>
                      <button className="relative flex h-[40px] w-[40px] items-center overflow-hidden rounded-full border-2 first-line:border-blue-500">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="h-[40px] w-[40px] pl-2 pt-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                          >
                            <GoPencil />
                          </svg>
                        </div>
                      </button>
                    </Link>:''}
                   

                    {postData == undefined ? "" : <SearchBar data={postData} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <h1 className="space-[.41px] text-3xl font-bold">
            {profileData?.name}
          </h1>
          <p className="cursor-pointer space-x-[.2px] text-base font-bold text-orange-600 hover:underline">
            Email: {profileData?.email}
          </p>
          <div className="text-sm font-normal text-gray-400">
            {bioData?.bio}
          </div>
        </div>
      </div>
      <div className=" mx-auto w-full">
        <div className="flex h-10 items-center justify-between border-b border-gray-400 ">
          <button
            onClick={() => {
              handleBold("1");
            }}
            className={`flex h-full shrink grow basis-[1px] items-center justify-center px-3 font-semibold text-gray-400 hover:bg-gray-100 hover:text-slate-800  ${
              bold == "1" ? "border-b-[3px] border-black" : ""
            } `}
          >
            <div>Post</div>
          </button>
          <button
            onClick={() => {
              handleBold("2");
            }}
            className={`flex h-full shrink grow basis-[1px] items-center justify-center px-3 font-semibold text-gray-400 hover:bg-gray-100 hover:text-slate-800  ${
              bold == "2" ? "border-b-[3px] border-black" : ""
            } `}
          >
            <div>Saved</div>
          </button>
          <button
            onClick={() => {
              handleBold("3");
            }}
            className={`flex h-full shrink grow basis-[1px] items-center justify-center px-3 font-semibold text-gray-400 hover:bg-gray-100 hover:text-slate-800  ${
              bold == "3" ? "border-b-[3px] border-black" : ""
            } `}
          >
            <div>Favourite</div>
          </button>
        </div>
        <div className="flex justify-between ">
          <div className="shrink grow">
            {showData == undefined ? "" : <PostCard post={showData} />}
          </div>
        </div>
      </div>
    </div> 
  );
};

export default ProfilePage;
