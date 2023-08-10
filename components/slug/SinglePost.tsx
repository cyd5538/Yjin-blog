"use client";

import { useRef, useState, useEffect } from 'react';
import { format, parseISO } from "date-fns";
import { getMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@/utils/mdxcomponents";
import PostToc from "@/components/slug/PostToc";
import NextPrev from "@/components/slug/PrevNext";
import { Post  } from "contentlayer/generated";
import useProgress from '@/hooks/useProgress';

interface SinglePostProps {
  postmemo : boolean
  post : Post
  postSort : Post[]
  params : {
    slugs : string
    slug : string
  }
}

const SinglePost:React.FC<SinglePostProps> = ({ params, post, postSort, postmemo }) => {
  const [slug, setSlug] = useState<string | undefined>(undefined)
  const [divHeight, setDivHeight] = useState<number | undefined>(undefined);
  const heightRef = useRef<HTMLDivElement>(null);
  
  const { progress } = useProgress();

  useEffect(() => {
    if(postmemo){
      setSlug(params.slugs)
    }else{
      setSlug(params.slug)
    }

    if (heightRef.current) {
      setDivHeight(heightRef.current.clientHeight);
    }
  }, [params, postmemo]);

  const postIndex = postSort.findIndex(post => post._raw.flattenedPath.endsWith(slug as string));

  const prevPost = postIndex > 0 ? postSort[postIndex - 1] : null;
  const nextPost = postIndex < postSort.length - 1 ? postSort[postIndex + 1] : null;

  let MDXContent;

  if (!post) {
    return
  } else {
    MDXContent = getMDXComponent(post!.body.code);
  }

  return (
    <div className="flex w-full flex-col gap-2 pb-32 p-2">
      <div className='fixed top-0 left-0 w-full h-1 bg-white dark:bg-zinc-300'>
        <div
          className="h-full bg-violet-600 absolute dark:bg-zinc-950"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div  className="flex w-ful justify-center gap-2 border-b-[1px] border-white dark:border-violet-700">
        <div ref={heightRef} className="w-[750px] h-fit flex flex-col pb-32">
          <div className="flex flex-col p-2 ">
            <p className="mb-4 text-left text-white">
              {format(parseISO(post.date), "yy-MM-dd")}
            </p>
            <h1 className="underline underline-offset-8 md:text-5xl/snug text-4xl/snug font-bold pb-4 text-left text-white">
              {post.title}
            </h1>
            <h2 className=" md:text-2xl/snug text-xl/snug font-bold pb-4 text-left text-gray-400 dark:text-gray-200">
              {post.description}
            </h2>
            <ul className="pb-24 flex flex-wrap gap-2">
              {post.tags?.map((tag,index) => {
                  return <li key={index} className='rounded-xl bg-slate-500 text-white cursor-pointer p-2 pl-3 pr-3 dark:bg-zinc-700 '>{tag}</li>
              })}
            </ul>
            <article className="max-w-none w-[350px] min-[400px]:w-[390px] min-[500px]:w-[490px] min-[600px]:w-[560px] min-[700px]:w-[660px] min-[760px]:w-[750px]  prose dark:prose-invert">
              <MDXContent components={{ ...MDXComponents }} />
            </article>
          </div>
        </div>
        <div className="hidden min-[1120px]:block w-[200px] relative">
          <PostToc height={divHeight} toc={post.headings} slugs={params.slugs}/>
        </div>
      </div>
      <NextPrev postmemo={postmemo} next={nextPost} prev={prevPost}/> 
    </div>
  )
}

export default SinglePost