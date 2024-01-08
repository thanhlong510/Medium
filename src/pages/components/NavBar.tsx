import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const NavBar = () => {
    

  return (
    <nav className='fixed w-full h-24 shadow-xl bg-white'>
        <div className='flex justify-between items-center h-full w-full px-4 2xl:px-16'>
            <Link href='/'>
                <Image
                    src="/Teenlife-Logo.png.webp"
                    alt ="Logo"
                    width="205"
                    height="75"
                />
            </Link>
            
            <div>
                <ul className='hidden sm:flex'>
                    <Link href='/guides'>
                        <li className='ml-10 uppercase hover:border-b text-xl'> Guides</li>
                    </Link>
                    <Link href='/events'>
                        <li className='ml-10 uppercase hover:border-b text-xl'> Events</li>
                    </Link>
                    <Link href='/blog'>
                        <li className='ml-10 uppercase hover:border-b text-xl'> Blog</li>
                    </Link>
                    <Link href='/region'>
                        <li className='ml-10 uppercase hover:border-b text-xl'> Region</li>
                    </Link>
                    <AuthShowcase/>

                </ul>
            </div>
        </div>
    </nav>
  )
}
function AuthShowcase() {
    const { data: sessionData } = useSession();
  
    const { data: secretMessage } = api.post.getSecretMessage.useQuery(
      undefined, // no input
      { enabled: sessionData?.user !== undefined }
    );
  
    return (
      <div className="flex h-full flex-col items-center justify-center ">
        <button
          className="rounded-full ml-10 px-2 bg-black uppercase font-semibold text-white text-xl no-underline transition hover:bg-black/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    );
  }
  
export default NavBar