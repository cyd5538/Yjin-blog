interface SubTitleProps {
  subtitle : string
}

const SubTitle:React.FC<SubTitleProps> = ({subtitle}) => {
  return (
    <h2 className="text-3xl font-semibold  mb-12">
      {subtitle}
    </h2>
  )
}

export default SubTitle
