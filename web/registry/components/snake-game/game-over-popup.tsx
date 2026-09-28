import type React from "react";

import { Button } from "@/components/ui/button";

interface GameOverPopupProps {
	score: number;
	onRestart: () => void;
	isDarkMode: boolean;
}

const GameOverPopup: React.FC<GameOverPopupProps> = ({
	score,
	onRestart,
	isDarkMode,
}) => {
	return (
		<div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50">
			<div
				className={`${
					isDarkMode ? "bg-background text-foreground" : "bg-background text-foreground"
				} p-8 rounded-lg shadow-lg text-center`}
			>
				<h2 className="text-3xl font-bold mb-4">Game Over</h2>
				<p className="text-xl mb-6">Your score: {score}</p>
				<Button
					onClick={onRestart}
					variant="default"
					className={`px-6 py-2 ${
						isDarkMode ? "bg-background hover:bg-background text-foreground" : ""
					}`}
				>
					Play Again
				</Button>
			</div>
		</div>
	);
};

export default GameOverPopup;
