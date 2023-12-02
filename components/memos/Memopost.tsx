import Link from 'next/link';
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import PostCardTags from '../Home/PostCardTags';

function Memopost(post: Post) {
  
  return (
    <div className="mb-4 rounded-xl shadow-md p-2 bg-white dark:bg-zinc-900">
      <div className='flex gap-2 h-auto'>
        <div className='mb-4 w-full flex flex-col'>
          <Link href={{
            pathname : `memo/${post.url}`
          }}>
            <h2 className="mb-1 mt-3 text-2xl pl-1 font-bold cursor-pointer hover:underline underline-offset-8">
              {post.title}
            </h2>
          </Link>
          <ul className='flex mt-2 gap-2 pl-1 flex-wrap pb-2'>
            {post.tags?.map((tag, index) =>
              <PostCardTags key={tag} tag={tag}/>
            )}
          </ul>
          <div className='mb-1 pl-2'>
            <time dateTime={post.date} className="block text-xs text-gray-600 dark:text-white">
              {format(parseISO(post.date), 'yy-MM-dd')}
            </time>
          </div>
        </div>
      </div>
  </div>
  );
}

export default Memopost;