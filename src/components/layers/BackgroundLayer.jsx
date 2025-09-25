import React from 'react'
import './BackgroundLayer.css'
import skyDesktop from '../../assets/images/sky-desktop.svg'
import snowDesktop from '../../assets/images/snow-desktop.svg'
import pathDesktop from '../../assets/images/path-desktop.svg'
import skyMobile from '../../assets/images/sky-mobile.svg'
import snowMobile from '../../assets/images/snow-mobile-road.svg'
import pathMobile from '../../assets/images/path-mobile.svg'

const BackgroundLayer = () => {
  return (
    <div className="background-layer" aria-hidden="true">
      <div className="bg-segment bg-sky">
        <picture>
          <source media="(max-width: 1024px)" srcSet={skyMobile} />
          <img src={skyDesktop} alt="" className="bg-img" draggable={false} />
        </picture>
      </div>
      <div className="bg-segment bg-snow">
        <picture>
          <source media="(max-width: 1024px)" srcSet={snowMobile} />
          <img src={snowDesktop} alt="" className="bg-img" draggable={false} />
        </picture>
      </div>
      <div className="bg-segment bg-path">
        <picture>
          <source media="(max-width: 1024px)" srcSet={pathMobile} />
          <img src={pathDesktop} alt="" className="bg-img" draggable={false} />
        </picture>
      </div>
    </div>
  )
}

export default BackgroundLayer