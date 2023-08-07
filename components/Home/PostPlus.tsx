import Link from 'next/link';

const PostPlus = () => {
  return (
    <Link className='w-full text-white text-xl flex justify-end cursor-pointer hover:underline hover:text-gray-200' href="/posts">
      All post
    </Link>
  )
}

export default PostPlus
