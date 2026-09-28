import { Image, ImageZoom } from './component';
import NextImage from 'next/image';

export default function ImageZoomDemo() {
    return (
        <ImageZoom className="rounded-2xl">
            <Image
                src="/itjustworks.jpg"
                alt="Aerial View of the Great Lake of Almaty in Kazakhstan"
                as={NextImage}
                width={3840}
                height={2160}
            />
        </ImageZoom>
    );
};