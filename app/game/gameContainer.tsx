"use client";

import { BrickSettingsProps } from "@/BrickBreakerGame/HelperFunctions/GameTypes";
import game from "../../BrickBreakerGame/mainGameLoop";
import { GameInstance } from "@/interfaces/interfaces";
import { useEffect, useRef, useState } from "react";

const GameContainer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [level, setLevel] = useState<number[][]>([]);
  const defaultBrickSettings = {
    _padding: 50,
    _width: canvasRef.current?.width ? canvasRef.current.width / 15 : 75,
    _height: canvasRef.current?.height ? canvasRef.current.height / 20 : 50,
    _spacing: 10,
  };
  const [settings, setSettings] =
    useState<BrickSettingsProps>(defaultBrickSettings);
  const [gameInstance, setGameInstance] = useState<GameInstance | null>(null);
  const [activateDrawing, setActivateDrawing] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const instance = game(canvasRef.current, level, settings);
      setGameInstance(instance);
    }
  }, [level, settings]);
  useEffect(() => {
    if (gameInstance && activateDrawing) {
      gameInstance.drawImportedLevel();
    }
  }, [gameInstance]);
  useEffect(() => {
    console.log(gameInstance);
  }, [gameInstance]);

  return (
    <div className="center-container">
      <div className="game-container">
        <canvas ref={canvasRef} className="full-canvas"></canvas>
      </div>
      <div className="button-container">
        <button className="button" onClick={() => gameInstance?.startGame()}>
          Start Game
        </button>
        <button
          className="button"
          onClick={() => {
            setLevel([]);
            setSettings(defaultBrickSettings);
            setActivateDrawing(true);
          }}
        >
          Create random level
        </button>
      </div>
    </div>
  );
};
export default GameContainer;
