import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
const Header = () => {
    const { data: sessionData, status } = useSession();
  return (
    <header className='flex justify-between p-5 max-w-7xl  mx-auto'>
        <div className='flex'>
            <Link href="/">
                <img
                    className='w-44 object-contain cursor-pointer'
                    src='/Medium_(website)_logo.svg'
                />
            </Link>
            <div className='hidden md:inline-flex items-center space-x-5 ml-5'>
            <h3> About</h3>
            <h3> Contact</h3>    
            <h3 className='text-white bg-green-600 px-4 py-1 rounded-full'> Follow</h3>
            </div>
        </div>

        <div className='flex space-x-5 text-green-600 items-center'>
            <AuthShowcase/>
            {(status=='authenticated'? <Link href="/writestory"> <h3 className='border px-4 py-1 rounded-full border-green-600'> Write</h3> </Link> : <h3 className='border px-4 py-1 rounded-full border-green-600'> Get Started</h3>)}
        </div>
        
    </header>
  )
}
function AuthShowcase() {
    const { data: sessionData } = useSession();
    return (
      <div className="flex h-full flex-col items-center justify-center ">
        <button
          className="rounded-full ml-10 px-2 bg-black  font-semibold text-white text-xl no-underline transition "
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    );
  }
export default Header