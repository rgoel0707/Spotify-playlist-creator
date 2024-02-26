import React, { useState } from "react";

export default function Navigate() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <button className="menu-toggle" aria-label="Toggle Menu" onClick={toggleMenu}>☰</button>
      </div>
      <ul className={`navbar-menu ${(isOpen) ? 'active' : ""}`}>
        <li><a className='nav-link' href="https://manage-spotify.netlify.app" onClick={toggleMenu}><img src="./profile_pic.png" alt='rishabh' className="rounded-image"></img></a></li>
        <li><a className='nav-link' href  ="https://rgoel.netlify.app" onClick={toggleMenu}>About Me</a></li>
      </ul>
      <div className="nav-divider"></div>
    </nav>
  )
}
