import React from 'react'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}
export default function ButtonDefault({ text, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-lg bg-[#1E2B29] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#222222]
      ${props.disabled ? 'bg-[#1E2B39]' : ''}
      `}
    >
      {text}
    </button>
  )
}