import React from 'react'
import zoomLogo from '../../assets/Zoom Blue Logo.png';
import './IntroBanner.css';

const IntroBanner = () => {
  return (
    <div className="readable-background">
      <span className="intro-span">Have you used the Zoom App before?</span>
      <span className="intro-span">Yes, I am referring to the video conferencing app found at the following site:</span>
      <a className="zoom-link" href="https://zoom.us/">https://zoom.us</a>
      <span className="intro-span">Yes, the one whose logo is:</span>
      <img className="zoom-logo" alt='zoom-logo' src={zoomLogo}/>
      <span className="intro-span">{`Just made this site to make our lives easier by allowing for a simple way to tell how 
      many times did each participant chat with you (the host). The assumption here is that you only selected chatting with "host only"
      option during the video conference.`}</span>
    </div>
  )
}

export default IntroBanner
