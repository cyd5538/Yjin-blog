import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import FolderPosts from '@/components/Posts/FolderPosts'

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
 
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
      <ul className='flex gap-4 text-3xl'>
        <li className='text-white '>
          <Link href="/posts">
            All post({Path.length})
          </Link>
        </li>
        {categoryArray.map((categoryItem, idx) => (
          <li className={`${params.slug === categoryItem.name ? 'underline underline-offset-8 font-bold text-white' : " text-white"}`} key={idx}>
            <Link href={`/posts/${categoryItem.name}`}>
              {categoryItem.name} ({categoryItem.count})
            </Link>
          </li>
        ))}
      </ul>
      <FolderPosts params={params}/>
    </div>
  )
}

export default PostLayout