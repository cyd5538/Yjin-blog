"use client";

import { Post, allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'  
import Memopost from './Memopost';

const Memoposts = () => {
  const filteredPosts = allPosts.filter(post => post._id.startsWith('memo'));
  const posts = filteredPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div>
      <div className='mt-10 grid gap-4 justify-center md:grid-cols-3 grid-cols-1'>
        {posts.map((post: Post) => (
          <Memopost key={post.title} {...post} />
        ))}
      </div>
    </div>
  )
}

export default Memoposts
