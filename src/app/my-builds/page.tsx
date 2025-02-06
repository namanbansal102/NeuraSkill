import React from 'react'
import { BentoGridDemo } from './My-builds'
import { TypewriterEffectSmoothDemo } from './effect'

const page = () => {
  return (
    <div className='mt-16 pt-5'>
      <TypewriterEffectSmoothDemo></TypewriterEffectSmoothDemo>
      <BentoGridDemo></BentoGridDemo>
    </div>
  )
}

export default page