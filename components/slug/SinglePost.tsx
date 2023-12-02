"use client";

import { useRef, useState, useEffect } from 'react';
import { format, parseISO } from "date-fns";
import { getMDXComponent } from "next-contentlayer/hooks";
import { useTheme } from 'next-themes';
import MDXComponents from "@/utils/mdxcomponents";
import PostToc from "@/components/slug/PostToc";
import NextPrev from "@/components/slug/PrevNext";
import { Post  } from "contentlayer/generated";
import PostCardTags from '../Home/PostCardTags';

interface SinglePostProps {
  postmemo : boolean
  post : Post
  postSort : Post[]
  params : {
    slugs : string
    slug : string
  }
  nextprev?: boolean
}

const SinglePost:React.FC<SinglePostProps> = ({ params, post, postSort, postmemo, nextprev }) => {
  const [divHeight, setDivHeight] = useState<number | undefined>(undefined);
  const heightRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

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
      <div className="flex w-ful justify-center gap-2 pl-1 pb-1">
        <div ref={heightRef} className="w-[750px] h-fit flex flex-col pb-32">
          <div className="flex flex-col">
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
                <PostCardTags key={tag} tag={tag}/>
              )}
            </ul>
            <article className="max-w-none w-[360px] min-[650px]:w-[630px] min-[630px]:w-[600px] min-[600px]:w-[550px] min-[550px]:w-[520px] min-[520px]:w-[500px] min-[500px]:w-[470px] min-[470px]:w-[440px] min-[440px]:w-[410px] min-[670px]:w-full m-auto prose dark:prose-invert">
              <MDXContent components={{ ...MDXComponents }} />
            </article>
          </div>
        </div>
        <div className="hidden min-[1120px]:block w-[200px] ml-4 relative">
          <PostToc height={divHeight} toc={post.headings} slugs={params.slugs}/>
        </div>
      </div>
      {nextprev && <NextPrev postmemo={postmemo} next={nextPost} prev={prevPost}/> }
      <section ref={ref} />
    </div>
  )
}

export default SinglePost