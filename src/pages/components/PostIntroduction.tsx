import React from 'react'
import Link from 'next/link'
import { RouterOutputs } from '~/utils/api';



type inputType =  RouterOutputs['post']['getPosts']

//
const PostIntroduction  = ({ post }: { post:inputType }) => {
   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 p-2 md:p-6 ">
      {post.map((a)=>{
          return <Link href={`post/${a.postId}`}>
            <div className="group border rounded-lg cursor-pointer overflow-hidden ">
              <img
              key={a.title}
                className="h-60 w-full object-cove group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src="screen.jpg"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p>{a.title}</p>
                  <p>{a.description} by {a.user.name}</p>
                </div>
                <img className="h-12 w-12 rounded-full" src={`${a.user?.image}`}/>
              </div>
            </div>
          </Link>
      })}  
        </div>
  )
}

export default PostIntroduction