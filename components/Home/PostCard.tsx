import Link from 'next/link';
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";

function PostCard(post: Post) {
  
  return (
    <div className="mb-4 rounded-xl shadow-md p-2 cursor-pointer hover:-translate-y-1 ease-in duration-100 bg-white dark:bg-zinc-900">
      <Link href={post.url}>
        <div className='h-20 mb-4'>
          <h2 className="mb-1 mt-2 text-lg pl-1 font-bold">
            {post.title}
          </h2>
          <h3 className="mb-1 mt-2 text-xs text-gray-400 pl-1">
            {post.description}
          </h3>
        </div>
        <div className='mt-2 mb-2 flex justify-between items-center'>
          <ul className='flex gap-2 pl-1 flex-wrap w-4/5'>
            {post.tags?.map((tag) => {
              return <li key={tag} className='rounded-md bg-slate-100 dark:bg-zinc-700 pl-1 pr-1'>{tag}</li>
            })}
          </ul>
          <time dateTime={post.date} className="block text-xs text-gray-600 datk:text-gray-200">
            {format(parseISO(post.date), 'yy-MM-dd')}
          </time>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;