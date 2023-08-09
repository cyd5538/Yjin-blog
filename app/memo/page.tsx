import type { Metadata } from 'next'
import MemoTitle from '@/components/memos/MemoTitle';
import Memoposts from '@/components/memos/Memoposts';

export const metadata: Metadata = {
  description: 'Javascript, react, typescript, nextjs 등의 코드들을 간단하게 메모합니다.',
}

export default function Home() {

  return (
    <div className='pb-32'>
      <MemoTitle />
      <Memoposts />
    </div>
  )
}
