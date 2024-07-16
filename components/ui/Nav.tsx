"use client";
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import { ModeToggle } from './themeToggle';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {

  const Links = [
    { title: 'Posts', link: '/posts' },
    { title: 'Memo', link: '/memo' },
    { title: 'Algorithm', link: '/algorithm' },
  ];

  return (
    <div className='z-20 top-0  dark:bg-zinc-900 text-white bg-violet-900 w-full h-20'>
      <div className='m-auto flex justify-between items-center max-w-[1200px] h-20 pl-4 pr-4 sm:pl-2 sm:pr-2 '>
        <h1>
          <Link href="/">
            <Image 
              className='rounded-full cursor-pointer'
              src="https://avatars.githubusercontent.com/u/91642972?v=4" 
              width="55" 
              height="55" 
              alt="home"
            />
          </Link>
        </h1>
        <div className='hidden gap-8 sm:flex items-center'>
          <ul className="flex gap-14 mr-10">
            {Links.map((link) => {
              return <li key={link.title} className='cursor-pointer text-2xl hover:text-gray-200 font-bold'>
                <Link href={link.link}>
                  {link.title}
                </Link>
              </li>
            })}
          </ul>
          <ModeToggle/>
        </div>
        <Sheet>
            <SheetTrigger className="block sm:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent className='dark:bg-zinc-900'>
              <SheetHeader>
                <SheetTitle className='text-2xl pt-8 font-bold text-white '>YJIN의 블로그입니다.</SheetTitle>
                <SheetDescription className='pt-10 pb-2 cursor-pointer text-xl text-white hover:underline dark:text-white dark:hover:underline underline-offset-8 dark:hover:text-gray-100 hover:text-gray-300'>
                  Home
                </SheetDescription>
                {Links.map((link) => {
                  return <SheetDescription key={link.title} className='cursor-pointer text-xl text-white hover:underline dark:text-white dark:hover:underline underline-offset-8 dark:hover:text-gray-100 hover:text-gray-300 pb-2'>
                    <Link href={link.link}>{link.title}</Link>
                  </SheetDescription>
                })}
              </SheetHeader>
              <SheetDescription className='fixed bottom-4 right-4'>
                <ModeToggle />
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
    </div>
  )
}

export default Nav
