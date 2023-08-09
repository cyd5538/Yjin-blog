interface HomeTitleProps {
  title : string
}

const HomeTitle:React.FC<HomeTitleProps> = ({title}) => {
  return (
    <h2 className='mb-4 text-white font-bold text-3xl'>
      {title}
    </h2>
  )
}

export default HomeTitle
