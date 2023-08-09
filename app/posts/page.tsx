import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import Allposts from '@/components/Posts/Allposts'
import { compareDesc } from 'date-fns'

export const metadata: Metadata = {
  description: 'Javascript, react, typescript, nextjs 등을 기록합니다.',
}

export default function Home() {
  const Path:any[] = allPosts
  .filter(post => !post._id.startsWith('memo'))
  .map((flattend) => flattend._raw.flattenedPath)

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
      <ul className='flex gap-4 text-xl'>
        <li className='underline underline-offset-8 text-white text-3xl font-bold'>
          <Link href="/posts">
            All post({Path.length})
          </Link>
        </li>
        {categoryArray.map((categoryItem, idx) => (
          <li className="text-white text-3xl" key={idx}>
            <Link href={`/posts/${categoryItem.name}`}>
              {categoryItem.name} ({categoryItem.count})
            </Link>
          </li>
        ))}
      </ul>
      <Allposts />
    </div>
  )
}
