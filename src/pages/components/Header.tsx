import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { BsPencilSquare } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { api } from "~/utils/api";
const Header = () => {
  const { data: session, status } = useSession();
  const { data: avatarImage } = api.profile.getAvataruser.useQuery({
    fileName: `${session?.user.id}avatar`,
  });
  return (
    <div>
      <div className="fixed left-0 right-0 top-0 z-10 mx-auto w-full border-b border-solid border-[#242424] bg-yellow-400">
        <header className=" z-10  mx-auto flex max-w-7xl justify-between  p-5">
          <div className="flex">
            <Link href="/">
              <img
                alt=""
                className="w-44 cursor-pointer object-contain"
                src="/Medium_(website)_logo.svg"
              />
            </Link>
            <div className="ml-5 hidden items-center space-x-5 md:inline-flex">
              <h3> About</h3>
              {status == "authenticated" ? (
                <Link href={`/profile/${session.user.id}`}>
                  {" "}
                  <h3> Profile</h3>
                </Link>
              ) : (
                <h3>Contact</h3>
              )}
              <h3 className="rounded-full bg-green-600 px-4 py-1 text-white">
                {" "}
                Follow
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-5 text-slate-600">
            <AuthShowcase />

            {status == "authenticated" ? (
              <div className="flex items-center justify-between space-x-5">
                <Link href="/writestory" className="flex items-center space-x-1">
                  <BsPencilSquare className="h-[20px] w-[20px]" />
                  <h3 className="  py-[3px] text-sm">Write</h3>
                </Link>
                <div>
                  <Link href={`/profile/${session.user.id}`}>
                  <img
                    src={
                      Array.isArray(avatarImage)
                        ? avatarImage[0]
                        : avatarImage ?? "/download.png"
                    }
                    className="h-[40px] w-[40px] rounded-full"
                  />
                  </Link>
                  
                </div>
              </div>
            ) : (
              <h3 className="rounded-full border border-green-600 px-4 py-1">
                Get Started
              </h3>
            )}
          </div>
        </header>
      </div>
      <div className="h-[75px]"></div>
    </div>
  );
};
function AuthShowcase() {
  const { data: sessionData } = useSession();
  return (
    <div className="flex h-full flex-col items-center justify-center ">
      <button
        className="ml-10 rounded-full bg-black px-2 py-[4px]  text-sm font-semibold text-white no-underline transition "
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? (
          <div className="flex items-center space-x-1">
            <FaSignOutAlt />
            <p className="hidden md:block">Sign out</p>
          </div>
        ) : (
          "Sign in"
        )}
      </button>
    </div>
  );
}
export default Header;
