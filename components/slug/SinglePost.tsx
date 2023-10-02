"use client";

import { useRef, useState, useEffect } from 'react';
import { format, parseISO } from "date-fns";
import { getMDXComponent } from "next-contentlayer/hooks";
import { useTheme } from 'next-themes';
import MDXComponents from "@/utils/mdxcomponents";
import PostToc from "@/components/slug/PostToc";
import NextPrev from "@/components/slug/PrevNext";
import { Post  } from "contentlayer/generated";
import useProgress from '@/hooks/useProgress';
import Link from 'next/link';

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
  const [divHeight, setDivHeight] = useState<number | undefined>(undefined);
  const heightRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useProgress();

  const { resolvedTheme } = useTheme() 
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {

    if (heightRef.current) {
      setDivHeight(heightRef.current.clientHeight);
    }
  }, []);

  const postIndex = postSort.findIndex(post => post._raw.flattenedPath.endsWith(params.slug ? params.slug : params.slugs));

  const prevPost = postIndex > 0 ? postSort[postIndex - 1] : null;
  const nextPost = postIndex < postSort.length - 1 ? postSort[postIndex + 1] : null;

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'cyd5538/Yjin-blog');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOKIzj_A');
    scriptElem.setAttribute('data-category', 'Announcements');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOKIzj_M4CYtG4');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '1');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', theme);
    scriptElem.setAttribute('data-lang', 'ko');
    scriptElem.setAttribute('crossorigin', 'anonymous');

    ref.current.appendChild(scriptElem);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]);
  

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
      <div  className="flex w-ful justify-center gap-2 ">
        <div ref={heightRef} className="w-[750px] h-fit flex flex-col pb-32">
          <div className="flex flex-col p-2 ">
            <p className="mb-4 text-left">
              {format(parseISO(post.date), "yy-MM-dd")}
            </p>
            <h1 className="md:text-5xl/snug text-4xl/snug font-bold pb-4 text-left ">
              {post.title}
            </h1>
            <h2 className=" md:text-2xl/snug text-xl/snug font-bold pb-4 text-left  dark:text-gray-200">
              {post.description}
            </h2>
            <ul className="pb-24 flex flex-wrap gap-2">
              {post.tags?.map((tag,index) => 
                <Link 
                  key={index}                       
                  href={{
                    pathname: `/tag`,
                    query: { tag: `${tag}` }
                  }}
                >
                  <li className='rounded-md bg-violet-600 text-white dark:bg-zinc-700 pl-2 pr-2 hover:bg-violet-400 dark:hover:bg-zinc-800'>{tag}</li>
                </Link>
              )}
            </ul>
            <article className="max-w-none w-[350px] min-[400px]:w-[390px] min-[500px]:w-[490px] min-[600px]:w-[560px] min-[700px]:w-[660px] min-[760px]:w-[750px]  prose dark:prose-invert">
              <MDXContent components={{ ...MDXComponents }} />
            </article>
          </div>
        </div>
        <div className="hidden min-[1120px]:block w-[200px] ml-4 relative">
          <PostToc height={divHeight} toc={post.headings} slugs={params.slugs}/>
        </div>
      </div>
      <NextPrev postmemo={postmemo} next={nextPost} prev={prevPost}/> 
      <section ref={ref} />
    </div>
  )
}

export default SinglePost