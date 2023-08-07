import Link from 'next/link'
import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import PostCard from '@/components/Home/PostCard'

export const metadata: Metadata = {
  description: 'Javascript, react, typescript, nextjs 등을 기록합니다.',
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const Path: any[] = allPosts.map((flattend) => flattend._raw.flattenedPath)

  const categories = Path.reduce((acc, path) => {
    const category = path.split('/')[0];
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryArray = Object.keys(categories).map((category) => ({
    name: category,
    count: categories[category],
  }));

  return (
    <div className='pb-32'>
      <ul className='flex gap-2 text-xl pt-10'>
        <li className='underline text-white font-bold'>
          <Link href="/posts">
            All post({posts.length})
          </Link>
        </li>
        {categoryArray.map((categoryItem, idx) => (
          <li className="text-white" key={idx}>
            <Link href={`/posts/${categoryItem.name}`}>
              {categoryItem.name}({categoryItem.count})
            </Link>
          </li>
        ))}
      </ul>
      <div className='mt-10 grid gap-4 justify-center md:grid-cols-2'>
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </div>
  )
}
