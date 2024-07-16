import Link from 'next/link';
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import Image from 'next/image';
import PostCardTags from './PostCardTags';

function PostCard(post: Post) {
  const url = post?.title.startsWith("프로그래머스") || post?.title.startsWith("백준") ? `algorithm/${post.url}` : `posts/${post.url}`

  return (
    <div className="max-w-sm w-80 rounded overflow-hidden shadow-lg dark:bg-zinc-900 mx-auto my-2">
      <div className='w-full h-48'>
      <Image
        src={post?.image as string}
        alt={post.title}
        width={800}
        height={200}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full object-cover rounded-2xl h-[200px]"
        quality={80}
        loading="lazy"
        placeholder='blur'
      />
      </div>
      <div className="px-6 py-4">
        <Link href={url}>
          <h2 className="mb-1 mt-3 h-16 text-2xl pl-1 font-bold cursor-pointer hover:underline underline-offset-8">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-white text-base pt-4 h-24">
          {post.description}
        </p>
      </div>
      <ul className="px-6 py-4 h-24 flex gap-[3px] flex-wrap">
        {post.tags?.map((tag) =>
          <PostCardTags key={tag} tag={tag}/>
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