import Link from "next/link"

interface PlusProps {
  url : string
  title : string
}

const Plus:React.FC<PlusProps> = ({url, title}) => {
  return (
    <Link 
      href={url}
      className='w-full pb-10 text-xl flex justify-end cursor-pointer hover:underline underline-offset-8 '
    >
      {title}
    </Link>
  )
}

export default Plus
