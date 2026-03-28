'use client'

import { CSSProperties, ReactNode } from 'react'

interface HoverCardProps {
  baseStyle: CSSProperties
  hoverStyle: CSSProperties
  children: ReactNode
}

export default function HoverCard({ baseStyle, hoverStyle, children }: HoverCardProps) {
  return (
    <div
      style={baseStyle}
      onMouseEnter={e => Object.assign((e.currentTarget as HTMLDivElement).style, hoverStyle)}
      onMouseLeave={e => Object.assign((e.currentTarget as HTMLDivElement).style, baseStyle)}
    >
      {children}
    </div>
  )
}
