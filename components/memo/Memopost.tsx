import Link from 'next/link';
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";

function Memopost(post: Post) {

  return (
    <div className="mb-4 rounded-xl shadow-md p-2 bg-white dark:bg-zinc-900">
      <div className='flex gap-2 h-28 sm:h-40'>
        <div className='mb-4 w-3/4 flex flex-col'>
          <Link href={post.url}>
            <h2 className="mb-1 mt-3 text-3xl pl-1 font-bold cursor-pointer hover:underline underline-offset-8">
              {post.title}
            </h2>
          </Link>
          <h3 className="mb-2 text-sm text-gray-400 pl-1">
            {post.description}
          </h3>
          <div className='mb-1 pl-2'>
            <time dateTime={post.date} className="block text-xs text-gray-600 datk:text-gray-200">
              {format(parseISO(post.date), 'yy-MM-dd')}
            </time>
          </div>
        </div>
      </div>
  </div>
  );
}

export default Memopost;