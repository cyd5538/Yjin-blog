import { Post } from "contentlayer/generated"
import Algorithm from "./Algorithm"

interface AlgorithmsProps {
  algorithm: Post[]
  title: string
}

const Algorithms:React.FC<AlgorithmsProps> = ({algorithm, title}) => {
  return (
    <div className="mt-12 mb-8">
      <h2 className="text-xl font-bold">{title} {algorithm.length}</h2>
      <div className="mt-4 grid gap-4 justify-center lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {algorithm.map((algo) => 
          <Algorithm 
            key={algo._id} 
            algorithm={algo}
          />
        )}
      </div>
    </div>
  )
}

export default Algorithms
