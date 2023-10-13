"use client";

import { useEffect, useState } from 'react'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import Allpost from './Allpost';
import Title from '../etc/Title';
import SubTitle from '../etc/SubTitle';

const Allposts = ({ params }: { params: { slug: string } }) => {
  const [categoery, setCategory] = useState<string>('');

  const searchparams = useSearchParams()
  const categoryParams = searchparams.get('category')
  
  useEffect(() => {
    setCategory(categoryParams ? categoryParams : "")
  },[categoryParams])

  const Path:any[] = allPosts
  .filter(post => 
    !post._id.startsWith('memo') && !post._id.startsWith('코딩테스트')
  )
  .map((flattend) => flattend._raw.flattenedPath)

  const categories = Path.reduce((acc, path) => {
    const category = path.split('/')[0];
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryArray = Object.keys(categories).map((category) => ({
    name: category,
    count: categories[category],
  }));

  return (
    <div className='pb-32'>
      <Title title="Blog"/>
      <SubTitle subtitle="공부한 것을 기록하는 블로그 페이지입니다."/>
      <ul className='flex gap-4 text-2xl flex-wrap justify-center items-center'>
        <li className={`flex gap-2 items-center`}>
          <Link className='flex items-center gap-2' href="/posts">
            <p className={`${categoery === "" ? "underline underline-offset-8" : ""} font-bold`}>All post</p>
            <p className={`${categoery === "" ? "bg-violet-700 " : ""} bg-violet-400 rounded-md w-6 h-6 flex items-center justify-center text-white`}>{Path.length}</p>
          </Link>
        </li>
        {categoryArray.map((categoryItem, idx) => (
          <li className="" key={idx}>
            <Link className='flex items-center gap-2' href={`/posts?category=${categoryItem.name}`}>
              <p className={`${categoery === categoryItem.name ? "underline underline-offset-8" : ""} font-bold`} >{categoryItem.name}</p>
              <p className={`${categoery === categoryItem.name ? "bg-violet-700 " : ""} text-white bg-violet-400 rounded-md w-6 h-6 flex items-center justify-center`}>{categoryItem.count}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Allpost categoery={categoery}/>
    </div>
  )
}

export default Allposts
