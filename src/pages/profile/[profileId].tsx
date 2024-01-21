import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import PostIntroduction from "../components/PostIntroduction";
import { useState } from "react";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const profileId = router.query.profileId as string;
  const { data: postData } = api.post.getPostbyUserId.useQuery({
    userId: profileId,
  });
  const { data: profileData } = api.profile.getProfilebyUserId.useQuery({
    userId: profileId,
  });

  return (
    <div className="flex items-start justify-between p-8">
      <div className="flex-shrink-0">
        <img
          src={`${profileData?.image}`}
          alt={``}
          className="h-32 w-32 rounded-full"
        />
      </div>
      <div className="ml-4 flex flex-grow flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{`${profileData?.name}`}</h1>
            <p className="text-gray-500">Email: {`${profileData?.email}`}</p>
          </div>
          {/* Search Bar */}
          {session?.user.id == profileId ? (
            <div>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded border border-gray-300 p-2"
              />
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Bio Section */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Bio</h2>
          <p>{"No bio available."}</p>
        </div>

        {/* Posts Section */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Posts</h2>
          {postData ? (
            <PostIntroduction post={postData} />
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
