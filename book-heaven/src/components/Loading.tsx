import { Square } from 'ldrs/react'
import 'ldrs/react/Square.css'

const LoadingSquare = ()=>{

    return(
      <div className='mx-auto'>

<Square
  size="50"
  stroke="5"
  strokeLength="0.25"
  bgOpacity="0.1"
  speed="1.2"
  color="grey" 
/>
      </div>

    )
} 
export default LoadingSquare;
