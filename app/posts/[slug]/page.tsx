import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import PostCard from '@/components/Home/PostCard'

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const posts = allPosts.filter((post) => post._raw.flattenedPath.startsWith(params.slug + '/'));
  const Path:any[] = allPosts.map((flattend) => flattend._raw.flattenedPath)

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
    <div>
      <ul className='flex gap-2 text-xl pt-10'>
        <li>
          <Link href="/posts">
            All post({post.length})
          </Link>
        </li>
        {categoryArray.map((categoryItem, idx) => (
          <li className={`${params.slug === categoryItem.name ? 'underline font-bold' : ""}`} key={idx}>
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

export default PostLayout