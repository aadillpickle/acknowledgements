"use client";
import React, { useState } from 'react';
import './VirtualEnvelope.css';

const VirtualEnvelope = ({previewName, setActiveLetter, setModalOpen, isHidden, index}) => {
  const [isClicked, setIsClicked] = useState(false);
  

  const handleClick = () => {
    console.log('clicked');
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
    setActiveLetter(index);
    setModalOpen(true);
  }

  return (
    <div className={`virtual-envelope ${isHidden ? 'fade-out' : ''}`} onClick={handleClick}>
      <div className="lid one"></div>
      <div className="lid two"></div>
      <div className="envelope"></div>
      <div  className={`letter ${isClicked ? 'clicked' : ''}`} >
        <p>To: {previewName}</p>
      </div>
    </div>
  );
}

export default VirtualEnvelope;
