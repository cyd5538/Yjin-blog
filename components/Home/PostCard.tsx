import Link from 'next/link';
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import Image from 'next/image';

function PostCard(post: Post) {
  
  return (
    <div className="max-w-sm w-80 rounded overflow-hidden shadow-lg mx-auto my-2">
      <div className='w-full h-48'>
        <Image
          src={post?.image as string}
          alt={post.title}
          width={100}
          height={100}
          className="w-full object-cover rounded-2xl h-48"
        />
      </div>
      <div className="px-6 py-4">
        <Link href={`posts/${post.url}`}>
          <h2 className="mb-1 mt-3 h-16 text-2xl pl-1 font-bold cursor-pointer hover:underline underline-offset-8">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-white text-base pt-4 h-24">
          {post.description}
        </p>
      </div>
      <ul className="px-6 py-4">
        {post.tags?.map((tag, index) =>
          <Link
            key={index}
            href={{
              pathname: `/tag`,
              query: { tag: `${tag}` }
            }}
          >
            <li className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">{tag}</li>
          </Link>
        )}
      </ul>
      <div className='px-6 py-4 text-right'>
        <time dateTime={post.date} className="block text-xs text-gray-600 dark:text-white">
          {format(parseISO(post.date), 'yy-MM-dd')}
        </time>
      </div>
    </div>
  );
}

export default PostCard;