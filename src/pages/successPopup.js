import React from "react";
import './error.css';

export default function SuccessPopup({showPopup, setShowPopup}) {
  return (
    <div className="popup-overlay" onClick={(e) => { if (e.target.classList.contains('popup-overlay')) { setShowPopup("") } }}>
      <div className="error-div">
        <p className="error-header">Error</p>
        <p className="error-text">{showPopup}</p>
        <button class="close-btn" onClick={() => { setShowPopup("") }}>X</button>
      </div>
    </div>
  )
}
