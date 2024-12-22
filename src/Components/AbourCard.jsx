import React from 'react'

const AbourCard = ({ source, name, role, desc }) => {
  return (
    <div className='rounded-2xl p-5 shadow-[-1px_1px_28px_-13px_rgba(0,_0,_0,_0.8)] w-[300px] flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 delay-150'>
        <img src={source} alt="image1" className='w-36 h-36 object-cover rounded-full'/>
        <h3 className='text-xl font-semibold mt-4 mb-2.5'>{name}</h3>
        <p className='text-center mb-4'>{role}</p>
        <p className='text-center mt-2.5'>{desc}</p>
    </div>
  )
}

export default AbourCard
