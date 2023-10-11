import type { Metadata } from 'next'
import { allPosts } from "contentlayer/generated";
import Title from '@/components/etc/Title';
import SubTitle from '@/components/etc/SubTitle';
import Algorithms from '@/components/algorithm/Algorithms';

export const metadata: Metadata = {
  description: '프로그래머스와 백준의 있는 코딩테스트 문제들을 풉니다.',
}

export default function Home() {
  const programmers = allPosts.filter((post) => post._id.startsWith('코딩테스트/프로그래머스'));
  const backjoon = allPosts.filter((post) => post._id.startsWith('코딩테스트/백준'));
  
  return (
    <div className='pb-32'>
      <Title title="Algorithm" />
      <SubTitle subtitle="알고리즘 문제 풀이를 기록합니다." />
      <Algorithms algorithm={programmers} title="프로그래머스"/>
      <Algorithms algorithm={backjoon} title="백준"/>
    </div>
  )
}
