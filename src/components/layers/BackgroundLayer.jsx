import React from 'react'
import './BackgroundLayer.css'
import bg from '../../assets/images/background.svg'

const BackgroundLayer = () => (
  <div className="background-layer">
    <img src={bg} alt="Background" className="background-image" />
  </div>
)

export default BackgroundLayer