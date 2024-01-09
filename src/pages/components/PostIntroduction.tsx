import React from 'react'
import Link from 'next/link'
const PostIntroduction = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 p-2 md:p-6 ">
          <Link href={`post/testStory1`}>
            <div className="group border rounded-lg cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cove group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src="screen.jpg"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p>This is my first post</p>
                  <p>Post Description by Long Nguyen</p>
                </div>
                <img className="h-12 w-12 rounded-full" src="/avatar.jpg"/>
              </div>
            </div>
          </Link>
          <Link href={`post/testStory2`}>
            <div className="group border rounded-lg cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src="screen.jpg"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p>This is my first post</p>
                  <p>Post Description by Long Nguyen</p>
                </div>
                <img className="h-12 w-12 rounded-full" src="/avatar.jpg"/>
              </div>
            </div>
          </Link>
          <Link href={`post/testStory3`}>
            <div className="group border rounded-lg cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cove group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src="screen.jpg"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p>This is my first post</p>
                  <p>Post Description by Long Nguyen</p>
                </div>
                <img className="h-12 w-12 rounded-full" src="/avatar.jpg"/>
              </div>
            </div>
          </Link>
        </div>
  )
}

export default PostIntroduction