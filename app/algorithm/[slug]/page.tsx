import SinglePost from '@/components/slug/SinglePost';
import { Post, allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';

type Props = {
  params: { slug: string, slugs: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export const generateStaticParams = async () => {
  const staticParams = allPosts.map((post) => ({ slug: post._raw.flattenedPath.split('/').slice(1).join('/') }));
  return staticParams;
}

export const generateMetadata = ({ params }: Props): Metadata => {
  const post = allPosts.filter((post: Post) => post._raw.flattenedPath.split("/")[1] === params.slug)[0]

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      url: '',
      siteName: 'Yjin Blog' + post?.title,
      images: [
        {
          url: `${post?.image}`,
          width: 800,
          height: 600,
        },
        {
          url: `${post?.image}`,
          width: 1800,
          height: 1600,
          alt: post?.title,
        },
      ],
      locale: 'ko-KR',
      type: 'website',
    },
  };
};

export default function Home({ params }: Props) {
  const post = allPosts.filter((post: Post) => post._raw.flattenedPath.split("/")[1] === params.slug)[0];

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