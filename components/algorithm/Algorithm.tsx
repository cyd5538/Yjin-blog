import { Post } from "contentlayer/generated"
import Link from "next/link"

interface AlgorithmProps {
  algorithm: Post
}
const Algorithm:React.FC<AlgorithmProps> = ({algorithm}) => {
  const url = algorithm.url.split("/")[1]
  
  return (
    <Link href={`/algorithm/${url}`} className="cursor-pointer flex gap-2 pb-1 pt-1 justify-center items-center rounded-md bg-violet-400 hover:bg-violet-500 dark:hover:bg-slate-800 text-white dark:bg-slate-700">
      <div>{algorithm.description}</div>
      <div className="font-bold">{algorithm.title}</div>
    </Link>
  )
}

export default Algorithm
