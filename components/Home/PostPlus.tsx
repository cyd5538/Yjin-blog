import Link from 'next/link';

const PostPlus = () => {
  return (
    <Link className='w-full flex justify-end cursor-pointer hover:underline hover:text-gray-400' href="/posts">
      All post
    </Link>
  )
}

export default PostPlus
