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

const Nav = () => {

  const Links = [
    { title: '블로그', link: '/posts' },
    { title: '메모', link: '/memo' },
    { title: '태그', link: '/tag' },
  ];

  return (
    <div className='z-20 top-0 border-b-[1px] dark:bg-zinc-900 dark:text-white border-black bg-white w-full h-20'>
      <div className='m-auto flex justify-between items-center max-w-[1200px] h-20 pl-4 pr-4 sm:pl-2 sm:pr-2 '>
        <h1 className='text-3xl font-bold cursor-pointer'>
          <Link href="/">Home</Link>
        </h1>
        <div className='hidden gap-8 sm:flex items-center'>
          <ul className="flex gap-10 mr-10">
            {Links.map((link) => {
              return <li key={link.title} className='cursor-pointer text-2xl'>
                <Link href={link.link}>
                  {link.title}
                </Link>
              </li>
            })}
          </ul>
          <ModeToggle/>
        </div>
        <Sheet >
            <SheetTrigger className="block sm:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>OOO BLOG입니다.</SheetTitle>
                <SheetDescription className='pt-4 cursor-pointer'>
                  Home
                </SheetDescription>
                {Links.map((link) => {
                  return <SheetDescription key={link.title} className='cursor-pointer'>
                    <Link href={link.link}>{link.title}</Link>
                  </SheetDescription>
                })}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
    </div>
  )
}

export default Nav
