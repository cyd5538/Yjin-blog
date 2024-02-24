interface SubTitleProps {
  subtitle : string
}

const SubTitle:React.FC<SubTitleProps> = ({subtitle}) => {
  return (
    <h2 className="text-2xl font-semibold text-shadow-base shadow-yellow-500 text-black dark:text-white mb-12">
      {subtitle}
    </h2>
  )
}

export default SubTitle
