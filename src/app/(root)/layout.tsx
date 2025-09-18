import React from 'react'
interface RootlayoutProps {
  children: React.ReactNode
}
const Rootlayout = ({ children }: RootlayoutProps) => {
  return (
    <div>{children}</div>
  )
}

export default Rootlayout