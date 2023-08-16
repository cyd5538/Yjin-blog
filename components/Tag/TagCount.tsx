import Link from "next/link"

interface TagCountProps {
  tagCounts : {
    tag : string
    count : number
  }
  search : string
  onClick : (tag:string) => void;
}

const TagCount:React.FC<TagCountProps> = ({tagCounts, search, onClick}) => {
  return (
    <Link 
      className={`
        pb-1
        pt-1
        flex 
        gap-2 
        rounded-md 
        bg-indigo-400
        text-white
        dark:bg-zinc-700 
        dark:hover:bg-zinc-900 
        pl-2 pr-2 
        justify-center 
        items-center 
        hover:bg-indigo-600
        text:black
        ${tagCounts.tag === search ? "bg-indigo-700 dark:bg-zinc-900": ""}
      `}
      href={{
        pathname: `/tag`,
        query: { tag: `${tagCounts.tag}` }
      }}
      onClick={() => onClick(tagCounts.tag)}
    >
      <div>
        {tagCounts.tag}
      </div>
      <div className="rounded-full bg-indigo-500 text-white  dark:bg-zinc-500 w-6 h-6 flex justify-center items-center">
        {tagCounts.count}
      </div>
    </Link>
  )
}

export default TagCount
