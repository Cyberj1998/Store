import React from 'react'
import Logo from '../assets/images/logo-3d.png'

const Marquee = () => {
  const phrases = ['test phrase 1', 'test phrase 2', 'test phrase 3']

  const MarqueeContent = () => (
    <div className="flex-shrink-0 flex flex-row items-center bg-[#4f83dd] whitespace-nowrap">
      {phrases.map((phrase, i) => (
        <React.Fragment key={i}>
          <h3 className="text-[50px] p-0 m-0 font-extrabold leading-none uppercase text-[#eed7af] [text-box: trim-both_cap_alphabetic]">
            {phrase}
          </h3>
          <img src={Logo} alt="logo" className="h-15 w-20 m-2 flex-shrink-0" />
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <div className="relative flex w-full items-center overflow-hidden select-none">
      <div className="animate-marquee flex">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  )
}

export default Marquee