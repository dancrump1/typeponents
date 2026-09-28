import VideoRoot, {
    VideoViewport,
    VideoControls,
    VideoPlayTrigger,
    VideoSoundControl,
    VideoProgressBar,
    VideoPipTrigger,
    VideoFullscreenTrigger
} from "./component";

export default function Usage() {
    return (
        <VideoRoot className="aspect-video overflow-hidden rounded-xl">
            <VideoViewport src="https://vjs.zencdn.net/v/oceans.mp4" fit="cover" />

            <VideoControls className="flex items-center justify-between gap-4">
                <VideoPlayTrigger />
                <VideoSoundControl />
                <VideoProgressBar />
                <VideoPipTrigger />
                <VideoFullscreenTrigger />
            </VideoControls>
        </VideoRoot>
    );
}