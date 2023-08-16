interface TitleProps {
  title : string
}

const Title:React.FC<TitleProps> = ({title}) => {
  return (
    <h1 className="text-4xl font-bold antialiased tracking-[.1em] mb-2">
      {title}
    </h1>
  )
}

export default Title
