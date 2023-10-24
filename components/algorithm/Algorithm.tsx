import { Post } from "contentlayer/generated"
import Link from "next/link"

interface AlgorithmProps {
  algorithm: Post
}
const Algorithm:React.FC<AlgorithmProps> = ({algorithm}) => {
  const title = algorithm.title.replace(/프로그래머스 |백준 /g, '')
  
  const ClassName = `${
    title.startsWith("Silver") ? "bg-[#4E6A86]" :
    title.startsWith("Gold") ? "bg-[#c6fc16] text-zinc-700" :
    title.startsWith("Bronze") ? "bg-[#9D4900]" :
    title.startsWith("Lv2") ? "bg-blue-500" :
    title.startsWith("Lv1") ? "bg-blue-300" :
    ""
  }`;
  
  const commonClassName = `cursor-pointer flex pb-1 pt-1 justify-center items-center rounded-md text-white `
  
  const finalClassName = `${commonClassName} ${ClassName}`;
  return (
    <Link 
      href={`/algorithm/${algorithm.url}`} 
      className={finalClassName}
    >
      <div className="font-bold">{algorithm.title.replace(/프로그래머스|백준/g, '').replace(/\s+/g, ' ')}</div>
    </Link>
  )
}

export default Algorithm
