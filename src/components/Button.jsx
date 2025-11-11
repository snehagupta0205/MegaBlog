import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className="",
    ...props
}) {
  return (
   <button className={`p-4 py- rounded-lg ${bgColor} ${textColor} ${className}`}{...props}>{children}</button>
  )
}

export default Button