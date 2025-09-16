import React from 'react'
import './BackgroundLayer.css'
import { useIsMobile } from '../../hooks/useIsMobile'
import bgDesktop from '../../assets/images/background.svg'
import bgMobile from '../../assets/images/background-mobile.svg'

const BackgroundLayer = () => {
  const isMobile = useIsMobile(1024)
  const src = isMobile ? bgMobile : bgDesktop
  return (
    <div className="background-layer">
      <img src={src} alt="Background" className="background-image" />
    </div>
  )
}

export default BackgroundLayer