"use client"
import { Post, allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import TagTitle from './TagTitle';
import { useEffect, useState } from 'react';
import PostCard from '../Home/PostCard';
import TagCount from './TagCount';
import usePagination from '@/hooks/usePagination';
import Title from '../etc/Title';
import SubTitle from '../etc/SubTitle';
import Memopost from '../memos/Memopost';

const Tag = () => {
  const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [filteredMemo, setFilteredMemo] = useState<Post[]>([]);

  const tagParams = useSearchParams();
  const search = tagParams.get('tag');

  const [searchs, setSearchs] = useState<string | null>(search)

  const { currentPage, currentData, totalPages, handlePageChange } = usePagination(filteredPosts, searchs as string);

  useEffect(() => {
    const filteredPost = allPosts
      .filter(post => !post._id.startsWith('memo'))
      .filter((post) => post.tags?.includes(searchs as string))
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

    setFilteredPosts(filteredPost);

    const filteredMemo = allPosts
      .filter(post => post._id.startsWith('memo'))
      .filter((post) => post.tags?.includes(searchs as string))
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

    setFilteredMemo(filteredMemo);
  }, [searchs]);

  useEffect(() => {
    const allTags = allPosts.flatMap(post => post.tags);
    const tagCount: { [tag: string]: number } = {};

    allTags.forEach(tag => {
      if (tag !== undefined) {
        if (tagCount[tag as string]) {
          tagCount[tag as string]++;
        } else {
          tagCount[tag as string] = 1;
        }
      }
    });

    const tagCountArray = Object.keys(tagCount).map(tag => ({
      tag,
      count: tagCount[tag],
    }));

    setTagCounts(tagCountArray);
  }, []);


  const onTagClick = (tag : string) => {
    setSearchs(tag)
  }

  console.log(searchs)

  return (
    <div className='mb-16'>
      <Title title="Tag" />
      <SubTitle subtitle='태그 별로 볼 수 있는 페이지입니다' />
      <div className='flex gap-2 flex-wrap text-xl pb-4 font-bold'>
        {tagCounts.map((tagcount) => (
          <TagCount key={tagcount.tag} onClick={onTagClick} tagCounts={tagcount} search={search as string} />
        ))}
      </div>
      <TagTitle title={`${search as string} 태그에 대한 블로그`} length={filteredPosts.length as number} />
      <div className='mt-10 grid gap-4 justify-center md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
        {currentData.map((post: Post) => (
          <PostCard key={post.title} {...post} />
        ))}
      </div>
      <div className='flex justify-center pt-4 pb-4'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 p-1 pl-2 pr-2 rounded-full  ${currentPage === index + 1 ? 'bg-blue-700  text-white dark:bg-zinc-900' : 'bg-white text-blue-700 dark:text-zinc-800 dark:bg-zinc-500'
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <TagTitle title={`${search as string} 태그에 대한 메모`} length={filteredMemo.length as number} />
      <div className='mt-10 grid gap-4 justify-center md:grid-cols-3 grid-cols-1'>
        {filteredMemo.map((post: Post) => (
          <Memopost key={post.title} {...post} />
        ))}
      </div>
    </div>
  )
}

export default Tag;
