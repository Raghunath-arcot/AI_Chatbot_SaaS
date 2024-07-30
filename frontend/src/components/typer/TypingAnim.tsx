import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chat With Your Own AI',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Built With OpenAI👽',
        2000,
        'Your Own Customized ChatGPT 💻',
        1500,
        '👨‍💼Raghunath',
        1800,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '60px', display: 'inline-block', color: "white", textShadow: "1px 1px 20px #000"}}
      repeat={Infinity}
    />
  )
}

export default TypingAnim
