"use client"
import { Post, allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import TagTitle from './TagTitle';
import { useEffect, useState } from 'react';
import PostCard from '../Home/PostCard';
import TagCount from './TagCount';

const Tag = () => {
  const [tagCounts, setTagCounts] = useState<{ tag: string; count: number }[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const tagParams = useSearchParams();
  const search = tagParams.get('tag');

  useEffect(() => {
    const filtered = allPosts
      .filter((post) => post.tags.includes(search as string))
      .sort((a,b) => compareDesc(new Date(a.date), new Date(b.date)))
    
    setFilteredPosts(filtered);
  }, [search]);

  useEffect(() => {
    const allTags = allPosts.flatMap(post => post.tags);
    const tagCount: { [tag: string]: number } = {};

    allTags.forEach(tag => {
      if (tagCount[tag]) {
        tagCount[tag]++;
      } else {
        tagCount[tag] = 1;
      }
    });

    const tagCountArray = Object.keys(tagCount).map(tag => ({
      tag,
      count: tagCount[tag],
    }));

    setTagCounts(tagCountArray);
  }, []);

  return (
    <div>
      <div className='flex gap-2 flex-wrap text-xl text-white pb-4 font-bold'>
        {tagCounts.map((tagcount) => (
          <TagCount key={tagcount.tag} tagCounts={tagcount} search={search as string}/>
        ))}
      </div>
      <TagTitle title={search as string} length={filteredPosts.length as number}/>
      <div className='mt-10 grid gap-4 justify-center md:grid-cols-2 grid-cols-1'>
        {filteredPosts.map((post: Post) => (
          <PostCard key={post.title} {...post} />
        ))}
      </div>
    </div>
  )
}

export default Tag;
