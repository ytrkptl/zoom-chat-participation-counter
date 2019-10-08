import React, { useState, useRef } from 'react'
import zoomLogo from '../../assets/Zoom Blue Logo.png';
import './IntroBanner.css';

const IntroBanner = () => {

  let [dropdownDisplay, showDropdown] = useState('none');
  let [buttonTwo, showButtonTwo] = useState(false);
  let extraInfoRef = useRef();

  const dropdownFunction = () => {
    let isDroppedDown = extraInfoRef.current.style.display;
    if (isDroppedDown==='none') {
      showDropdown('flex')
      showButtonTwo(true);
      return 
    } 
    showDropdown('none')
    showButtonTwo(false)
    return
  }

  return (
    <div className="readable-background">
      <div className="dropdown-text">
        If you have no idea what this site is about and would like to learn more, click here:
        {
          !buttonTwo ?
          <button className="dropdown-button" onClick={()=>dropdownFunction()}>&or;</button>
          : <button className="dropdown-button" onClick={()=>dropdownFunction()}>&#10005;</button>
        }
      </div>
      <div className="extra-info" ref={extraInfoRef} style={{display: `${dropdownDisplay}`}}>
        <span className="intro-span">Have you used the Zoom App before?</span>
        <span className="intro-span">Yes, I am referring to the video conferencing app found at the following site:</span>
        <a className="zoom-link" href="https://zoom.us/">https://zoom.us</a>
        <span className="intro-span">Yes, the one whose logo is:</span>
        <img className="zoom-logo" alt='zoom-logo' src={zoomLogo}/>
        <span className="intro-span">{`Just made this site to make our lives easier by allowing for a simple way to tell how 
        many times did each participant chat with you (the host). The assumption here is that you only selected chatting with "host only"
        option during the video conference.`}</span>
      </div>
    </div>
  )
}

export default IntroBanner
