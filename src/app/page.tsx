"use client";
import React, { useState, useEffect, use } from "react";
import VirtualEnvelope from "../components/VirtualEnvelope";
import "./globals.css";
// import CloseIcon from './close.jsx'
import letters from "./letters.json";

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const renderTextWithLineBreaks = (text: any) => {
  const textParts = text.split("\n");
  const elements = [];

  for (let i = 0; i < textParts.length; i++) {
    elements.push(
      <span
        key={`span-${i}`}
        className="delayed-fade-in"
        style={{ animationDelay: `${2.5 * i}s` }}
      >
        {textParts[i]}
      </span>
    );
    if (i < textParts.length - 1) {
      elements.push(
        <br key={`br1-${i}`} />,
        <br key={`br2-${i}`} />
      );
    }
  }

  return elements;
};

export default function Home() {
  const [activeLetter, setActiveLetter] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const content = letters.map((letter) => letter.content);

  useEffect(() => {
    setShuffledLetters(shuffleArray([...letters]));
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [modalOpen]);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-16 m-12">
      <div className="flex flex-row justify-center text-5xl text-center text-[#F8FCFF] leading-tight tracking-[-.0125em] mt-4">
        To the people who&apos;ve helped me <br /> become the way that I am
      </div>
      <div className="flex flex-row justify-center gap-16 flex-wrap">
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
          <div
            className="modal-overlay absolute w-screen h-screen bg-transparent"
            onClick={handleCloseModal}
          >
            <div className="modal w-screen lg:w-auto h-screen z-50 flex flex-col">
              <div className="flex justify-between items-start p-4">
                <span></span> {/* Empty span for spacing */}
                <div
                  className="modal-close cursor-pointer text-lg font-bold text-gray-700 hover:text-gray-900 mt-2"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="32px"
                    width="32px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z"></path>
                    <path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path>
                  </svg>
                </div>
              </div>
              <div className="w-full flex flex-row justify-center items-center mt-16">
                <div className="w-3/4 text-black fade-in text-xl overflow-y-auto max-h-[90vh]">
                  {renderTextWithLineBreaks(content[activeLetter])}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="text-2xl text-[#F8FCFF] flex flex-col items-center justify-center leading-tight mb-4">
        <div className="text-center text-[#F8FCFF] leading-tight">
          Made with ❤️&nbsp;by&nbsp;
          <a className="underline" href="https://twitter.com/aadillpickle">
            @aadillpickle
          </a>
        </div>
        <a
          className="underline text-center text-[#F8FCFF] leading-tight"
          href="https://github.com/aadillpickle/acknowledgements/tree/main"
        >
          Source code
        </a>
        <a
          className="underline text-center text-[#F8FCFF] leading-tight"
          href="https://aadillpickle.substack.com/p/an-8-year-old-just-t-posed-on-me"
        >
          Why I did this
        </a>
      </div>
    </div>
  );
}
