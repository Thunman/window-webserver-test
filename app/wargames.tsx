"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const Wargames = () => {
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("Hello, would you like to play a game?");
  const typingSpeed = 80;
  const [reply, setReply] = useState("");
  const validPrompts = ["yes", "no"];
  const handleEnter = () => {
    if (!validPrompts.includes(reply.toLowerCase())) {
      setShowPrompt(false);
      setText("Unknown Command");
    } else {
      //go to game
      router.push("/game");
    }
    setReply("");
  };

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
    <>
      <div className="main-container">
        <h3
          key={text}
          className="typed"
          style={{
            animation: `typing ${(text.length * typingSpeed) / 1000}s steps(${
              text.length
            }, end) forwards, blinking 1s ${
              (text.length * typingSpeed) / 1000
            }s 0 forwards`,
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
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEnter();
                }
              }}
              className="blinking-cursor"
              spellCheck="false"
            ></input>
          </div>
        )}
      </div>
    </>
  );
};
export default Wargames;
