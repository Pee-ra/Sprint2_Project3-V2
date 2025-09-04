import React from 'react'
import Lottie from 'lottie-react'
import whale from '../components/lottie/whale.json'
import { TypingAnimation } from '../components/magicui/typing-animation'

const Loading = () => {
  return (
    <div>
        <Lottie animationData={whale}/>
        <TypingAnimation className={"text-center text-2xl "}>ยินดีต้อนรับครับสุดหล่อ สุดสวย</TypingAnimation>
    </div>
  )
}

export default Loading