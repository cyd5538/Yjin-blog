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
  .filter(post => !post._id.startsWith('memo'))
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
      <ul className='flex gap-4 text-3xl'>
        <li className={`${categoery === "" ? "underline underline-offset-8 font-bold " : ""} text-white`}>
          <Link href="/posts">
            All post({Path.length})
          </Link>
        </li>
        {categoryArray.map((categoryItem, idx) => (
          <li className={`${categoery === categoryItem.name ? "underline underline-offset-8 font-bold " : ""} text-white`} key={idx}>
            <Link href={`/posts?category=${categoryItem.name}`}>
              {categoryItem.name} ({categoryItem.count})
            </Link>
          </li>
        ))}
      </ul>
      <Allpost categoery={categoery}/>
    </div>
  )
}

export default Allposts
