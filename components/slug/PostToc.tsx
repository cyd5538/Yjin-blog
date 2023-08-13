"use client"

import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation'
import { ClipboardCopy } from "lucide-react";
import useCopyClipBoard from "@/hooks/useCopy";
import { useToast } from "@/components/ui/use-toast"

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

        if (scrollY >= height - 300) {
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
    <div ref={tocRef} className="fixed top-48 w-[230px] rounded-2xl p-4 bg-purple-400 drop-shadow-md dark:bg-zinc-900 dark:text-white border-gray-200">
      <h3 className="font-bold pb-4 text-white">목차</h3>
      <ul className="flex flex-end w-full flex-col gap-[1px] border-l-[1px] pl-2 border-white">
        {toc.map((heading) => {
          const link = slugs? slugs + "#" + heading.slug : "#" + heading.slug
          return (
            <li key={`#${heading.slug}`}>
              <a
                className={`${
                  heading.slug === currentHeading ? "font-bold text-white underline" : ""
                } data-[level=two]:pl-2 data-[level=three]:pl-4 text-sm`}
                data-level={heading.level}
                href={link}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
      <button 
      className="pt-6 flex justify-end w-full"
      onClick={() => {
        handleCopyClipBoard(`https://cyd5538.github.io${pathname}`)  
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
        {isCopy ? <span>복사 완료</span> : <p className="flex gap-2 hover:text-gray-300 ">링크 복사<ClipboardCopy size={20}/></p>}
      </button>
    </div>
  );
};

export default PostToc;
