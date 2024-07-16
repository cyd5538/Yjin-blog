import Link from 'next/link';
import React from 'react'

interface PostCardTagsProps {
  tag: string
}

const PostCardTags: React.FC<PostCardTagsProps> = ({tag}) => {
  return (
    <li className="inline-block mr-2">
      <Link
        href={{
          pathname: `/tag`,
          query: { tag: `${tag}` }
        }}
        className="block bg-gray-100 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-600"
      >
        {tag}
      </Link>
    </li>
  )
}

export default PostCardTags