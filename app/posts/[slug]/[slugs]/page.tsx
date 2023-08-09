import { Post, allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { compareDesc } from "date-fns";
import SinglePost from "@/components/slug/SinglePost";

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
  const post = allPosts.filter((post) => post._raw.flattenedPath.endsWith(params.slugs))[0];
  const postSort = allPosts
  .filter(post => !post._id.startsWith('memo'))
  .sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div>
      <SinglePost postmemo={true} post={post} postSort={postSort} params={params} />
    </div>
  )
}

export default PostLayout