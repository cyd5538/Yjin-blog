import { Post, allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { compareDesc } from "date-fns";
import SinglePost from "@/components/slug/SinglePost";

type Props = {
  params: { slug: string, slugs: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateStaticParams = async () => {
  const staticParams = allPosts.map((post) => ({ slug: post._raw.flattenedPath.split('/').slice(1).join('/') }));
  return staticParams;
}

export const generateMetadata = ({ params }: Props): Metadata => {
  const post =  allPosts.filter((post : Post) => post._raw.flattenedPath.endsWith(params.slug))[0];
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
          alt: 'My blog image',
        },
      ],
      locale: 'ko-KR',
      type: 'website',
    }, 
  };
};

const PostLayout = ({ params }: Props) => {
  const post = allPosts.filter((post) => post._raw.flattenedPath.endsWith(params.slug))[0];
  const postSort = allPosts
  .filter(post => !post._id.startsWith('memo'))
  .sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  if(!post){
    return 
  }

  return (
    <div>
      <SinglePost postmemo={true} post={post} postSort={postSort} params={params} />
    </div>
  )
}

export default PostLayout