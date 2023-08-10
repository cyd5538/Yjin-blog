import Link from 'next/link'
import Allposts from '@/components/Posts/Allposts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Javascript, react, typescript, nextjs 등을 기록합니다.',
}

const Home = ({ params }: { params: { slug: string } }) =>  {
  
  return (
    <>
      <Allposts params={params}/>
    </>
  )
}

export default Home