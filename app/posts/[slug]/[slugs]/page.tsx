import { Post, allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import { getMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@/utils/mdxcomponents";
import PostToc from "@/components/Post/PostToc";

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

  let MDXContent;

  if (!post) {
    return
  } else {
    MDXContent = getMDXComponent(post!.body.code);
  }

  return (
    <div className="flex w-full justify-center gap-2">
      <div className="w-[750px] h-fit flex flex-col pb-32">
        <div className="flex flex-col  p-2 ">
          <p className="mb-4 text-left text-black dark:text-white">
            {format(parseISO(post.date), "yy-MM-dd")}
          </p>
          <h1 className="underline underline-offset-8 md:text-5xl/snug text-4xl/snug font-bold pb-4 text-left text-black dark:text-white">
            {post.title}
          </h1>
          <h2 className=" md:text-2xl/snug text-xl/snug font-bold pb-4 text-left text-gray-600 dark:text-gray-200">
            {post.description}
          </h2>
          <ul className="pb-24 flex flex-wrap gap-2">
            {post.tags?.map((tag,index) => {
                return <li key={index} className='rounded-xl bg-slate-500 text-white cursor-pointer p-2 pl-3 pr-3 dark:bg-zinc-700 '>{tag}</li>
            })}
          </ul>
          <article className="max-w-none w-[350px] min-[400px]:w-[330px] min-[500px]:w-[460px] min-[600px]:w-[560px] min-[700px]:w-[660px] min-[900px]:w-[730px]  prose dark:prose-invert">
            <MDXContent components={{ ...MDXComponents }} />
          </article>
        </div>
      </div>
      <div className="hidden min-[1120px]:block w-[200px] relative">
        <PostToc toc={post.headings} slugs={params.slugs}/>
      </div>
    </div>
  )
}

export default PostLayout