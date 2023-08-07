import Link from "next/link"

interface TagCountProps {
  tagCounts : {
    tag : string
    count : number
  }
  search : string
}

const TagCount:React.FC<TagCountProps> = ({tagCounts, search}) => {
  return (
    <Link 
      className={`
        pb-1
        pt-1
        flex 
        gap-2 
        rounded-md 
        bg-indigo-600 
        dark:bg-zinc-700 
        dark:hover:bg-zinc-900 
        pl-2 pr-2 
        justify-center 
        items-center 
        hover:bg-indigo-900
        ${tagCounts.tag === search ? "bg-indigo-900 dark:bg-black" : ""}
      `}
      href={{
        pathname: `/tag`,
        query: { tag: `${tagCounts.tag}` }
      }}
    >
      <div>
        {tagCounts.tag}
      </div>
      <div className="rounded-full bg-indigo-300  dark:bg-zinc-500 w-6 h-6 flex justify-center items-center">
        {tagCounts.count}
      </div>
    </Link>
  )
}

export default TagCount
