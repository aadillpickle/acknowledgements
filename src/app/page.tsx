"use client";
import React, { useState, useEffect } from 'react'
import VirtualEnvelope from '../components/VirtualEnvelope'
import './globals.css'

import letters from './letters.json'

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const renderTextWithLineBreaks = (text) => {
  const textParts = text.split('\n');
  const elements = [];

  for (let i = 0; i < textParts.length; i++) {
    elements.push(
      <span 
        key={`span-${i}`} 
        className="delayed-fade-in"
        style={{ animationDelay: `${3 * i}s` }} // Set the delay here
      >
        {textParts[i]}
      </span>
    );
    if (i < textParts.length - 1) {
      elements.push(<><br key={`br-${i}`} /><br/></>);
    }
  }

  return elements;
}


export default function Home() {
  const [activeLetter, setActiveLetter] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const content = letters.map(letter => letter.content);

  useEffect(() => {
    setShuffledLetters(shuffleArray([...letters]));
  }, []);

  return (
    <div className="flex flex-col items-center gap-28 m-28">
        <div className='flex flex-row justify-center gap-28 flex-wrap'>
        {shuffledLetters.map((letter, index) => (
            <VirtualEnvelope 
              key={index}
              previewName={letter.name} 
              setActiveLetter={setActiveLetter}
              setModalOpen={setModalOpen} 
              isHidden={modalOpen}
              index={letter.index} 
            />
          ))}
          {modalOpen ? (
            <div className="modal w-screen lg:w-auto h-screen z-50 flex flex-col">
              <div className="flex justify-between items-start p-4">
                <span></span> {/* Empty span for spacing */}
                <div 
                  className="modal-close cursor-pointer text-lg font-bold text-gray-700 hover:text-gray-900"
                  onClick={() => {setModalOpen(false)}}
                >
                  X
                </div>
              </div>
              <div className="w-full flex flex-row justify-center items-center mt-20">
                <div className="w-3/4 text-black fade-in text-xl">{renderTextWithLineBreaks(content[activeLetter])}</div>
              </div>
            </div>
          ) : null}
        </div>
    </div>
  )
}
