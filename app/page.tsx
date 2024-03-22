"use client";
import { useState, useEffect, useRef } from "react";
import "../styles/styles.css";

export default function Home() {
  const [showPrompt, setShowPrompt] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const text = "Hello, would you like to play a game?";
  const typingSpeed = 80;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, text.length * typingSpeed);

    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (showPrompt && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPrompt]);

  return (
    <div className="main-container">
      <h3
        className="typed"
        style={{
          animation: `typing ${(text.length * typingSpeed) / 1000}s steps(${
            text.length
          }, end) forwards, blinking 1s ${
            (text.length * typingSpeed) / 1000
          }s 1 forwards`,
        }}
      >
        {text}
      </h3>
      {showPrompt && (
        <div style={{ display: "flex", color: "green" }}>
          <h3>#:</h3>
          <input
            ref={inputRef}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "green",
              fontSize: "1.17em",
              fontWeight: "bold",
            }}
            className="blinking-cursor"
            spellCheck="false"
          ></input>
        </div>
      )}
    </div>
  );
}
