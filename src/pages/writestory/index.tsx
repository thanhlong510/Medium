
import { useSession } from 'next-auth/react'
import React, {  useState } from 'react'
import { api } from '~/utils/api'

const WriteStory = () => {
  const {status}= useSession()
  const [title,setTitle] = useState('')
  const [description,setDescription]= useState('')
  const [content,setContent]= useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = api.post.create.useMutation()
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

    
      submit.mutate({
        title:title,
        description:description,
        content:content
      })
      // Clear form after successful submission
      setTitle('');
      setContent('');
      setDescription('')
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if(status!=='authenticated') return;
  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow-md w-full sm:max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <label htmlFor="title" className="block text-sm font-medium text-gray-600">
        Title:
      </label>
      <input
        type="text"
        id="title"
        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
        value={title}
        onChange={handleTitleChange}
      />
      <label htmlFor="content" className="block text-sm font-medium text-gray-600 mt-4">
        Description:
      </label>
      <textarea
        id="content"
        className="w-full h-[50px] p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
        value={description}
        onChange={handleDescriptionChange}
      />

      <label htmlFor="content" className="block text-sm font-medium text-gray-600 mt-4">
        Content:
      </label>
      <textarea
        id="content"
        className="w-full h-[90px] p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
        value={content}
        onChange={handleContentChange}
      />

      <button
        className={`bg-green-500 text-white py-2 px-4 mt-4 rounded ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
        }`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  </div>
  )
}

export default WriteStory