import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import Allposts from '@/components/Posts/Allposts'

export const metadata: Metadata = {
  description: 'Javascript, react, typescript, nextjs 등을 기록합니다.',
}

export default function Home() {
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
        <li className='underline underline-offset-8 text-white text-2xl font-bold'>
          <Link href="/posts">
            All post({allPosts.length})
          </Link>
        </li>
        {categoryArray.map((categoryItem, idx) => (
          <li className="text-white text-2xl" key={idx}>
            <Link href={`/posts/${categoryItem.name}`}>
              {categoryItem.name}({categoryItem.count})
            </Link>
          </li>
        ))}
      </ul>
      <Allposts />
    </div>
  )
}
