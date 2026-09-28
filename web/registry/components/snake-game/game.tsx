"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";

import Board from "./component";
import GameControls from "./game-controls";
import GameOverPopup from "./game-over-popup";
import {
	APPLE_START,
	appleAte,
	BOARD_SIZE,
	checkCollision,
	DIRECTIONS,
	generateApple,
	getRandomColor,
	SNAKE_START,
	SPEED,
} from "./utils";

const Game: React.FC = () => {
	const [snake, setSnake] = useState(SNAKE_START);
	const [apple, setApple] = useState(APPLE_START);
	const [dir, setDir] = useState<{ x: number; y: number }>(DIRECTIONS[39]);
	const [speed, setSpeed] = useState<number | null>(null);
	const [gameOver, setGameOver] = useState(false);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isRainbowMode, setIsRainbowMode] = useState(false);
	const [rainbowColors, setRainbowColors] = useState<string[]>([]);

	const moveSnake = useCallback(() => {
		const newSnake = [...snake];
		const newSnakeHead = {
			x: newSnake[0].x + dir.x,
			y: newSnake[0].y + dir.y,
		};

		if (
			newSnakeHead.x < 0 ||
			newSnakeHead.x >= BOARD_SIZE ||
			newSnakeHead.y < 0 ||
			newSnakeHead.y >= BOARD_SIZE ||
			checkCollision(newSnakeHead, snake)
		) {
			setGameOver(true);
			return;
		}

		newSnake.unshift(newSnakeHead);
		if (appleAte(newSnake, apple)) {
			setApple(generateApple(newSnake));
			setScore((prevScore) => prevScore + 1);
		} else {
			newSnake.pop();
		}
		setSnake(newSnake);
	}, [snake, dir, apple]);

	const startGame = useCallback(() => {
		setSnake(SNAKE_START);
		setApple(APPLE_START);
		setDir(DIRECTIONS[39]);
		setSpeed(SPEED);
		setGameOver(false);
		setScore(0);
		setRainbowColors(Array(SNAKE_START.length).fill("").map(getRandomColor));
	}, []);

	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	const toggleRainbow = () => {
		setIsRainbowMode((prev) => !prev);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const key = e.keyCode;
			if (key >= 37 && key <= 40) {
				setDir(DIRECTIONS[key]);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (gameOver) {
			setSpeed(null);
			setHighScore((prev) => Math.max(prev, score));
		}
	}, [gameOver, score]);

	useEffect(() => {
		if (!gameOver && speed) {
			const interval = setInterval(moveSnake, speed);
			return () => clearInterval(interval);
		}
	}, [moveSnake, gameOver, speed]);

	useEffect(() => {
		if (isRainbowMode) {
			const interval = setInterval(() => {
				setRainbowColors((prev) => {
					const newColors = [...prev];
					newColors.pop();
					newColors.unshift(getRandomColor());
					return newColors;
				});
			}, 200);
			return () => clearInterval(interval);
		}
	}, [isRainbowMode]);

	return (
		<div
			className={`flex flex-col items-center justify-center min-h-screen ${
				isDarkMode ? "bg-background text-foreground" : "bg-background text-foreground"
			}`}
		>
			<h1 className="text-4xl font-bold mb-4">Snake Game</h1>
			<div className="mb-4 text-xl">
				<span className="mr-4">Score: {score}</span>
				<span>High Score: {highScore}</span>
			</div>
			<Board
				snakeDots={snake}
				apple={apple}
				isRainbowMode={isRainbowMode}
				rainbowColors={rainbowColors}
			/>
			{gameOver && (
				<GameOverPopup
					score={score}
					onRestart={startGame}
					isDarkMode={isDarkMode}
				/>
			)}
			<GameControls
				onStartGame={startGame}
				onToggleTheme={toggleTheme}
				onToggleRainbow={toggleRainbow}
				isDarkMode={isDarkMode}
				isRainbowMode={isRainbowMode}
			/>
		</div>
	);
};

export default Game;
