import { useRouter } from 'next/router'
import React from 'react'
import { api } from '~/utils/api'

const Post = () => {
    const router=useRouter()
    const { query: { slug },} = router

    if (typeof slug !== 'string') {
        console.error('Invalid parameters');
        return <div>Error</div>;
      }
    const {data}=api.post.getPostById.useQuery({postId:slug})
      
  return (
    <div>   
        <article className='max-w-3xl mx-auto p-5'>
            <h1 className='text-3xl mt-5 mb-3'>  
                {data?.title}
            </h1>
            <h2 className='text-xl font-light text-gray-500 mb-2'>
                {data?.description}
            </h2>
            <div className='flex items-center space-x-2'>
                <img
                    src='/avatar.jpg'
                    className='h-10 w-10 rounded-full'
                />
                <p className='font-extralight text-sm'>
                    Blog post by Long Nguyen - Publish at 9/1/2023
                </p>
                <button>
                    Edit
                </button>
            </div>
            <img
            src='/screen.jpg'
            className='w-full h-80 my-5 object-cover'
            />
            <div>
                <p>
                    {data?.content}
                </p>
            </div>
        </article>
    </div>
  )
}

export default Post