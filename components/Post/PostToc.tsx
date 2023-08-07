"use client"

import { useEffect, useRef, useState } from "react";

type PostTocType = {
  toc: {
    level: string;
    text: string;
    slug: string;
  }[];
  slugs: string;
};

const PostToc = ({ toc, slugs }: PostTocType) => {
  const [currentHeading, setCurrentHeading] = useState<string>(""); 

  useEffect(() => {
    const headingsRef = toc.map((heading) => heading.slug);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      for (let i = headingsRef.length - 1; i >= 0; i--) {
        const headingSlug = headingsRef[i];
        const headingElement = document.getElementById(headingSlug);

        if (headingElement && headingElement.offsetTop <= scrollY) {
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

  return (
    <div className="fixed top-48 w-[230px] rounded-2xl p-4 bg-purple-400 drop-shadow-md dark:bg-slate-800 dark:text-white border-gray-200">
      <h3 className="font-bold pb-4 text-white">목차</h3>
      <ul className="flex flex-end w-full flex-col gap-[1px]">
        {toc.map((heading) => {
          const link = slugs + "#" + heading.slug;
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
    </div>
  );
};

export default PostToc;
