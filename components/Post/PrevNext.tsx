"use client"
import { Post } from 'contentlayer/generated'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PrevNextProps {
  next : Post | null
  prev : Post | null
}

const PrevNext:React.FC<PrevNextProps> = ({next, prev}) => {
  
  return (
    <div className='pb-24 flex justify-between w-full mt-8'>
      {/* next */}
      {next ? 
        <Link href={next.url} className="rounded-md w-36 md:w-80 justify-center items-center bg-indigo-400 hover:bg-purple-900 shadow-lg text-white cursor-pointer p-2 flex gap-4">
          <div><ChevronLeft /></div>
          <div className='font-bold text-xl'>{next.title}</div>
        </Link>
        : <div></div>
      }
      {/* prev */}
      {prev ?
        <Link href={prev.url} className="rounded-md w-36 md:w-80 justify-center items-center bg-indigo-400 hover:bg-purple-900 shadow-lg text-white cursor-pointer p-2 flex gap-4">
          <div><ChevronRight /></div>
          <div className='font-bold text-xl'>{prev.title}</div>
        </Link>
        : <div></div>
      }
    </div>
  )
}

export default PrevNext
