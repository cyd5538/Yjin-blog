import SinglePost from '@/components/slug/SinglePost';
import { Post, allPosts } from 'contentlayer/generated';

type Props = {
  params: { slug: string, slugs: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export const generateStaticParams = async () => {
  const staticParams = allPosts.map((post) => ({ slug: post._raw.flattenedPath.split('/').slice(1).join('/') }));
  return staticParams;
}

export default function Home({ params }: Props) {
  const post = allPosts.filter((post: Post) => {
    const pathParts = post._raw.flattenedPath.split("/");
    return pathParts[2] === params.slug;
  })[0];

  return (
    <div className='pb-32'>
      <SinglePost 
        params={params} 
        post={post} 
        postSort={allPosts} 
        postmemo={true}
        nextprev={false}
      />
    </div>
  )
}