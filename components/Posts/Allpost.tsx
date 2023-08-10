"use client"
import PostCard from '../Home/PostCard';
import { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import usePagination from '@/hooks/usePagination';

interface AllpostProps {
  categoery : string
}

const Allpost:React.FC<AllpostProps> = ({categoery}) => {
  const filteredPosts = allPosts.filter(post => !post._id.startsWith('memo') && post._id.startsWith(categoery));
  const sortedPosts = filteredPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const { currentPage, currentData, totalPages, handlePageChange } = usePagination(sortedPosts);

  return (
    <div>
      <div className='mt-10 grid gap-4 justify-center md:grid-cols-2 grid-cols-1'>
        {currentData.map((post: Post) => (
          <PostCard key={post.title} {...post} />
        ))}
      </div>
      <div className='mt-4 flex justify-center'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 p-1 pl-2 pr-2 rounded-full  ${
              currentPage === index + 1 ? 'bg-blue-700  text-white dark:bg-zinc-900' : 'bg-white text-blue-700 dark:text-zinc-800 dark:bg-zinc-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Allpost;