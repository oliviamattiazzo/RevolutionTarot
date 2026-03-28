'use client'

import { CSSProperties, ReactNode } from 'react'

interface HoverLinkProps {
  href: string
  ariaLabel?: string
  baseStyle: CSSProperties
  hoverStyle: CSSProperties
  children: ReactNode
}

export default function HoverLink({
  href,
  ariaLabel,
  baseStyle,
  hoverStyle,
  children,
}: HoverLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      style={baseStyle}
      onMouseEnter={e => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, baseStyle)}
    >
      {children}
    </a>
  )
}
