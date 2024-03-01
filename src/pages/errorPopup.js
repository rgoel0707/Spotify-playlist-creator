import React from "react";
import './error.css';

export default function ErrorPopup({showPopup, setShowPopup}) {
  return (
    <div className="popup-overlay" onClick={(e) => { if (e.target.classList.contains('popup-overlay')) { setShowPopup("") } }}>
      <div className="error-div">
        {/*<p className="error-header">Info</p>*/}
        <p className="error-text">{showPopup}</p>
        <button class="close-btn" onClick={() => { setShowPopup("") }}>X</button>
      </div>
    </div>
  )
}
