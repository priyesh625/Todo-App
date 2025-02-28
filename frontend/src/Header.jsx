import React from 'react'

function Header({title}) {
  return (
    <header className='text-center py-5 bg-gray-100'>
        <h1 className="text-3xl font-black">{title}</h1>
    </header>
  )
}

export default Header