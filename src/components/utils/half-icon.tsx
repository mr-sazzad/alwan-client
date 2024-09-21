import React from 'react'

interface HalfDotIconProps {
  size?: number
  color?: string
  className?: string
}

export const HalfDotIcon: React.FC<HalfDotIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = ""
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 12m-10 0a10 10 0 1 0 10 -10a10 10 0 1 0 -10 10" />
      <path d="M12 2v20" stroke={color} strokeWidth="2" />
      <path d="M2 12h10" stroke={color} strokeWidth="20" />
    </svg>
  )
}

export default function DotIcon() {
  return (
<div>
<HalfDotIcon size={16} className="" />
</div>
  )
}