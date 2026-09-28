import { MusicPlayer } from "./component";

export default function Demo() {
    return (
        <MusicPlayer
            src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            coverArt="https://i.scdn.co/image/ab67616d0000b27315ebbedaacef61af244262a8"
            className="w-full max-w-sm"
        />
    );
}