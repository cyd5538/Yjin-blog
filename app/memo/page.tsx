import type { Metadata } from 'next'
import MemoTitle from '@/components/memos/MemoTitle';
import Memoposts from '@/components/memos/Memoposts';
import Title from '@/components/etc/Title';
import SubTitle from '@/components/etc/SubTitle';

export const metadata: Metadata = {
  description: 'Javascript, react, typescript, nextjs 등의 코드들을 간단하게 메모합니다.',
}

export default function Home() {

  return (
    <div className='pb-32'>
      <Title title="Memo" />
      <SubTitle subtitle="블로그에 적기에는 짧은 코드나, 글을 메모하는 곳입니다" />
      <Memoposts />
    </div>
  )
}
