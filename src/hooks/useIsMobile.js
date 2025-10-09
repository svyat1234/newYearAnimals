import { useEffect, useState } from 'react'

export function useIsMobile(breakpointPx = 1024) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpointPx
  })

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < breakpointPx)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpointPx])

  return isMobile
}


