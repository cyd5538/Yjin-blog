import Link from 'next/link';
import React from 'react'

interface PostCardTagsProps {
  tag: string
}

const PostCardTags:React.FC<PostCardTagsProps> = ({tag}) => {
  return (
    <Link
      href={{
        pathname: `/tag`,
        query: { tag: `${tag}` }
      }}
    >
      <li className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">{tag}</li>
    </Link>
  )
}

export default PostCardTags
