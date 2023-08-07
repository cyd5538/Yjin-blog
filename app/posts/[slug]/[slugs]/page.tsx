import { Post, allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import SinglePost from "@/components/Post/SinglePost";

type Props = {
  params: { slug: string, slugs: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateStaticParams = async () =>
  allPosts.map((post: Post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: Props): Metadata => {
  const post =  allPosts.filter((post : Post) => post._raw.flattenedPath.endsWith(params.slugs))[0];
  return { title: post?.title, description: post?.description };
};

const PostLayout = ({ params }: Props) => {
  
  return (
    <div>
      <SinglePost params={params} />
    </div>
  )
}

export default PostLayout