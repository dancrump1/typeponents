import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1024,
	height: 768,
	parent: "game-container",
	backgroundColor: "#028af8",
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [Boot, Preloader, Game],
};

const StartGame = (parent: string) => {
	return new Phaser.Game({ ...config, parent });
};

export default StartGame;
