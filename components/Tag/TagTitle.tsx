interface TagTitleProps {
  title : string
  length : number
}

const TagTitle:React.FC<TagTitleProps> = ({title, length}) => {
  return (
    <>
      {length !== 0 &&
        <h1 className="text-4xl font-bold text-white flex gap-2">
          # <p className="underline">{title}</p> <p>({length})</p>
        </h1>
      } 
    </>
  )
}

export default TagTitle
