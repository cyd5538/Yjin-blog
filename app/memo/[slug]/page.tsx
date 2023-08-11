import Memo from '@/components/memo/Memo';
import { Post, allPosts } from 'contentlayer/generated';
import type { Metadata } from 'next'

type Props = {
  params: { slug: string, slugs: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export const generateStaticParams = async () =>
//   allPosts.map((post: Post) => ({ slug: post._raw.flattenedPath }));

<<<<<<< HEAD
  export const generateMetadata = ({ params }: Props): Metadata => {
  const post =  allPosts.filter((post : Post) => post._raw.flattenedPath.split("/")[1] === params.slug)[0]
=======
// export const generateMetadata = ({ params }: Props): Metadata => {
//   const post =  allPosts.filter((post : Post) => post._raw.flattenedPath.split("/")[1] === params.slug)[0]
>>>>>>> 8e7fcfb184b572c0b3387fc43bca83545442d2a5

//   return { 
//     title: post?.title, 
//     description: post?.description,
//     openGraph: {
//       title: post?.title,
//       description: post?.description,
//       url: '',
//       siteName: 'Yjin Blog' + post?.title,
//       images: [
//         {
//           url: `${post?.image}`,
//           width: 800,
//           height: 600,
//         },
//         {
//           url: `${post?.image}`,
//           width: 1800,
//           height: 1600,
//           alt: post?.title,
//         },
//       ],
//       locale: 'ko-KR',
//       type: 'website',
//     }, 
//   };
// };

export default async function Page({ params }: { params: { slug: string } }) {
  console.log(params);
  return <h1>My Page {params.slug}</h1>
}