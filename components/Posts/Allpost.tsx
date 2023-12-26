"use client"
import PostCard from '../Home/PostCard';
import { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import usePagination from '@/hooks/usePagination';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

interface AllpostProps {
  categoery : string
}

const Allpost:React.FC<AllpostProps> = ({categoery}) => {
  const searchparams = useSearchParams()
  const categoryParams = searchparams.get('category')
  const post = categoryParams ? '?category=' : '?'
  const category = categoryParams ? `${categoryParams}&` : ""
  const pageParams = searchparams.get('page');

  const filteredPosts = allPosts
  .filter(post => 
    !post._id.startsWith('memo') && !post._id.startsWith('코딩테스트')
  )
  .filter(post => post._id.startsWith(categoery));
  
  const sortedPosts = filteredPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const { currentPage, currentData, totalPages, handlePageChange } = usePagination(sortedPosts,categoery);
  
  useEffect(() => {
    handlePageChange(parseInt(pageParams as string, 10) || 1);
  }, [pageParams, handlePageChange, currentPage]);

  return (
    <div>
      <div className='mt-10 grid gap-1 justify-center items-center md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
        {currentData.map((post: Post) => (
          <PostCard key={post.title} {...post} />
        ))}
      </div>
      <div className='mt-4 flex justify-center'>
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            href={
              `/posts${post}${category}page=${index+1}`
            }
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-3 py-1 border-blue-500 border-[1px]   ${
              currentPage === index + 1 ? 'bg-blue-500  text-white dark:bg-zinc-900' : 'bg-white text-blue-700 dark:text-zinc-800 dark:bg-zinc-500'
            }`}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Allpost;