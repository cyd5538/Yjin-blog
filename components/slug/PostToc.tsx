"use client"

import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation'
import { ClipboardCopy } from "lucide-react";
import useCopyClipBoard from "@/hooks/useCopy";
import { useToast } from "@/components/ui/use-toast"
import clsx from "clsx";
import useProgress from "@/hooks/useProgress";

type PostTocType = {
  height : number | undefined
  toc: {
    level: string;
    text: string;
    slug: string;
  }[];
  slugs: string;
};

const PostToc = ({ toc, slugs, height }: PostTocType) => {
  const [currentHeading, setCurrentHeading] = useState<string>(""); 
  const tocRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname()

  const [isCopy, onCopy] = useCopyClipBoard();
  const { progress } = useProgress();

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  const { toast } = useToast()

  useEffect(() => {
    const headingsRef = toc.map((heading) => heading.slug);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      for (let i = headingsRef.length - 1; i >= 0; i--) {
        const headingSlug = headingsRef[i];
        const headingElement = document.getElementById(headingSlug);

        if (headingElement && headingElement.offsetTop <= scrollY + 70) {
          setCurrentHeading(headingSlug);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc]); 

  useEffect(() => {
    const handleScroll = () => {
      if (tocRef.current && height) {
        const scrollY = window.scrollY;
        console.log(scrollY,height)
        if (scrollY >= height - 200) {
          tocRef.current.classList.add('hidden');
        } else {
          tocRef.current.classList.remove('hidden');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [height]);

  return (
    <div ref={tocRef} className="fixed top-28 w-[300px] rounded-2xl p-4 bg-violet-400 text-white drop-shadow-md dark:bg-zinc-900 dark:text-white border-black dark:border-white">
      <div className='fixed top-[5%] left-0 w-2 h-[92%] bg-violet-500 dark:bg-zinc-800'>
        <div
          className="w-full absolute bg-white"
          style={{ height: `${progress}%` }}
        ></div>
      </div>
      <h3 className="font-bold pb-4">목차</h3>
      <ul className="flex flex-end w-full flex-col gap-[1px] border-l-[1px] pl-2 border-white">
        {toc.map((heading) => {
          const link = slugs? slugs + "#" + heading.slug : "#" + heading.slug
          return (
            <li key={`#${heading.slug}`}>
              <div className={`flex items-start ${heading.slug === currentHeading ? "font-bold underline" : ""}`}>
                <a
                  className={clsx('p-[2px] text-base', heading.level === 'three' && 'pl-4 text-sm', heading.level === 'two' && 'pl-2 text-sm')}
                  data-level={heading.level}
                  href={link}
                >
                  {heading.text}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      <button 
      className="pt-6 flex justify-end w-full"
      onClick={() => {
        handleCopyClipBoard(`https://yjin.vercel.app${pathname}`)  
        if(!isCopy){
          toast({
            title: "링크를 복사했습니다.",
          })
        }else{
          toast({
            title: "이미 복사했습니다.",
          })
        }
      }}>
        {isCopy ? <span>복사 완료</span> : <p className="flex gap-2 hover:text-zinc-600 ">링크 복사<ClipboardCopy size={20}/></p>}
      </button>
    </div>
  );
};

export default PostToc;
