import Link from 'next/link';
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import Image from 'next/image';

function PostCard(post: Post) {

  return (
    <div className="mb-4 rounded-xl shadow-md p-2 bg-white dark:bg-zinc-900">
      <div className='flex gap-2 h-40'>
        <div className='mb-4 w-3/4 flex flex-col'>
          <Link href={post.url}>
            <h2 className="mb-1 mt-3 text-3xl pl-1 font-bold cursor-pointer hover:underline underline-offset-8">
              {post.title}
            </h2>
          </Link>
          <h3 className="mb-2 text-xs text-gray-400 pl-1">
            {post.description}
          </h3>
          <ul className='flex mt-2 gap-2 pl-1 flex-wrap'>
            {post.tags?.map((tag,index) => 
              <Link 
                key={index}                       
                href={{
                  pathname: `/tag`,
                  query: { tag: `${tag}` }
                }}
              >
                <li className='rounded-md bg-slate-100 dark:bg-zinc-700 pl-1 pr-1'>{tag}</li>
              </Link>
            )}
          </ul>
          <div className='mb-1 mt-4 pl-2'>
            <time dateTime={post.date} className="block text-xs text-gray-600 datk:text-gray-200">
              {format(parseISO(post.date), 'yy-MM-dd')}
            </time>
          </div>
        </div>
        <div className='w-1/4 flex justify-center items-center'>
          <Image 
            src={post.image} 
            alt={post.title} 
            width={100}
            height={100}
            className="w-full h-28 object-cover rounded-2xl"
          />
        </div>
      </div>
  </div>
  );
}

export default PostCard;