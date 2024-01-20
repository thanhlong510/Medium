import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import PostIntroduction from "../components/PostIntroduction";

const ProfilePage = () => {
  const { data: session } = useSession();

  const { data } = api.post.getPostbyUserId.useQuery({
    userId : session!.user?.id as string
  });
  
  return (
    <div className="flex items-start justify-center p-8">
      <div className="mr-4 flex-shrink-0">
        <img src={`${session?.user.image}`} alt="" className="h-32 w-32 rounded-full" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{session?.user.name}</h1>
        <p className="text-gray-500">Email: {session?.user.email}</p>
        <h2 className="mt-4 text-xl font-bold">Posts</h2>
        {data ? <PostIntroduction post={data} /> : <p>No posts available.</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
