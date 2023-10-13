import { Post } from "contentlayer/generated"
import Link from "next/link"

interface AlgorithmProps {
  algorithm: Post
}
const Algorithm:React.FC<AlgorithmProps> = ({algorithm}) => {

  return (
    <Link href={`/algorithm/${algorithm.url.split("/")[1]}`} className="cursor-pointer flex pb-1 pt-1 justify-center items-center rounded-md bg-violet-400 hover:bg-violet-500 dark:hover:bg-slate-800 text-white dark:bg-slate-700">
      <div className="font-bold">{algorithm.title}</div>
    </Link>
  )
}

export default Algorithm
