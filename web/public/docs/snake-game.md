# Snake Game

- Categories: Games
- Import: `@/components/ui/snake-game/component`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/snake-game.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`

## Registry dependencies

- `button`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `snakeDots` *(required)* | `{ x: number; y: number; }[]` | — | — |
| `apple` *(required)* | `{ x: number; y: number; }` | — | — |
| `isRainbowMode` *(required)* | `boolean` | — | — |
| `rainbowColors` *(required)* | `string[]` | — | — |

## Usage

```tsx
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
				isDarkMode ? "bg-background text-secondary" : "bg-background text-secondary"
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
```

## Source

### `components/ui/snake-game/component.tsx`

```tsx
import type React from "react";

import { BOARD_SIZE, getSnakeColor, SCALE } from "./utils";

interface BoardProps {
	snakeDots: { x: number; y: number }[];
	apple: { x: number; y: number };
	isRainbowMode: boolean;
	rainbowColors: string[];
}

const Board: React.FC<BoardProps> = ({
	snakeDots,
	apple,
	isRainbowMode,
	rainbowColors,
}) => {
	return (
		<div
			style={{
				width: `${BOARD_SIZE * SCALE}px`,
				height: `${BOARD_SIZE * SCALE}px`,
				border: "1px solid #000",
				position: "relative",
			}}
		>
			{snakeDots.map((dot, i) => (
				<div
					key={i + "board"}
					style={{
						position: "absolute",
						width: `${SCALE}px`,
						height: `${SCALE}px`,
						backgroundColor: getSnakeColor(
							i,
							isRainbowMode,
							rainbowColors
						),
						left: `${dot.x * SCALE}px`,
						top: `${dot.y * SCALE}px`,
						zIndex: snakeDots.length - i,
					}}
				/>
			))}
			<div
				style={{
					position: "absolute",
					width: `${SCALE}px`,
					height: `${SCALE}px`,
					backgroundColor: "red",
					left: `${apple.x * SCALE}px`,
					top: `${apple.y * SCALE}px`,
				}}
			/>
		</div>
	);
};

export default Board;
```

### `components/ui/snake-game/utils.ts`

```tsx
export const BOARD_SIZE = 20
export const SNAKE_START = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
]
export const APPLE_START = { x: 5, y: 5 }
export const SCALE = 20
export const SPEED = 100
export const DIRECTIONS = {
    38: { x: 0, y: -1 }, // up
    40: { x: 0, y: 1 }, // down
    37: { x: -1, y: 0 }, // left
    39: { x: 1, y: 0 }, // right
}

export const checkCollision = (piece: { x: number; y: number }, snakeArray: { x: number; y: number }[]) =>
    snakeArray.some((segment) => segment.x === piece.x && segment.y === piece.y)

export const appleAte = (newSnake: { x: number; y: number }[], apple: { x: number; y: number }) =>
    newSnake[0].x === apple.x && newSnake[0].y === apple.y

export const generateApple = (snake: { x: number; y: number }[]) => {
    let newApple
    do {
        newApple = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE),
        }
    } while (checkCollision(newApple, snake))
    return newApple
}

export const getRandomColor = () => {
    return `hsl(${Math.random() * 360}, 100%, 50%)`
}

export const getSnakeColor = (index: number, isRainbow: boolean, rainbowColors: string[]) => {
    if (isRainbow) {
        return rainbowColors[index % rainbowColors.length]
    }
    return index === 0 ? "#00ff00" : "#00cc00"
}
```
