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
        <a className="zoom-link" href="https://zoom.us/">https://zoom.us</a>
        <img className="zoom-logo" alt='zoom-logo' src={zoomLogo}/>
        <span className="intro-span">If yes, then you may find this App to be interesting:</span>
        <span className="intro-span">"This app helps count the number of times a participant chatted during the meeting <b>waaaay</b> faster than you would do manually in Excel. It also sorts the chat both alphabetically, and by participation. You can also filter messages that were sent to host only. The goal of this App is to help teachers use Zoom's chat log to count towards students' particpation in a quicker manner. This would be really helpful if you want to grade participation for a lot of meetings, classes, days, and students."</span>
      </div>
    </div>
  )
}

export default IntroBanner
