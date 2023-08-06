type PostTocType = {
  toc : {
    level : string
    text : string
    slug : string
  }[]
  slugs : string
}

const PostToc = ({toc,slugs}:PostTocType) => {

  return (
    <div className="fixed top-72 w-[250px] rounded-md p-4 bg-slate-300 shadow-sm">
      <h3 className="font-bold pb-4">TOC</h3>
      <ul className="flex flex-end w-full flex-col">
        {toc.map(heading => {
            const link = slugs + "#" + heading.slug
            return (
              <li key={`#${heading.slug}`}>
                <a className="data-[level=two]:pl-2 data-[level=three]:pl-4" data-level={heading.level} href={link}>
                  {heading.text}
                </a>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default PostToc
