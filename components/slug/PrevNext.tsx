"use client"
import { useState, useEffect } from 'react';
import { Post } from 'contentlayer/generated'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PrevNextProps {
  postmemo: boolean
  next: Post | null
  prev: Post | null
}

const PrevNext: React.FC<PrevNextProps> = ({ next, prev, postmemo }) => {
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  useEffect(() => {
    if (next) {
      const regex = /^\/posts(.*)$/;
      const result = next.url.replace(regex, '$1');
      setNextUrl(!postmemo ? result : next.url);
    }
    
    if (prev) {
      const regex = /^\/posts(.*)$/;
      const result = prev.url.replace(regex, '$1');
      setPrevUrl(!postmemo ? result : prev.url);
    }
  }, [next, prev, postmemo]);

  return (
    <div className='pb-24 flex justify-between w-full mt-8'>
      {/* next */}
      {next && nextUrl ? 
        <Link href={nextUrl} className="rounded-md w-36 md:w-80 justify-center items-center bg-indigo-400 hover:bg-purple-900 shadow-lg text-white cursor-pointer p-2 flex gap-4">
          <div><ChevronLeft /></div>
          <div className='font-bold text-xl'>{next?.title}</div>
        </Link>
        : <div></div>
      }
      {/* prev */}
      {prev && prevUrl ?
        <Link href={prevUrl} className="rounded-md w-36 md:w-80 justify-center items-center bg-indigo-400 hover:bg-purple-900 shadow-lg text-white cursor-pointer p-2 flex gap-4">
          <div><ChevronRight /></div>
          <div className='font-bold text-xl'>{prev?.title}</div>
        </Link>
        : <div></div>
      }
    </div>
  )
}

export default PrevNext;
