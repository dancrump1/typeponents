# Video Masking

- Categories: Videos
- Tags: autoplay
- Import: `@/components/ui/video-masking`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/video-masking.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
import VideoMasking from "./component";

export default function VideoMaskingUsage() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            <VideoMasking />
        </div>
    );
}
```

## Source

### `components/ui/video-masking.tsx`

```tsx
import React from 'react';

export default function VideoMasking() {
    return (
        <div className='flex flex-col gap-2'>
            <section
                className='relative'
                style={{
                    aspectRatio: '1213/667',
                    backgroundColor: 'tomato',
                    maskImage:
                        "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
                    WebkitMaskImage:
                        "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                }}
            >
                <video autoPlay muted loop className='w-full max-h-96 object-cover aspect-square'>
                    <source
                        src='/placeholder.mp4'
                        type='video/mp4'
                    />
                </video>
            </section>
            <section className='gap-2 dark:bg-black bg-white border rounded-lg p-5'>
                <figure className='relative  '>
                    <video
                        autoPlay
                        muted
                        loop
                        style={{
                            maskImage: "url('/splash-center.svg')",
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                        }}
                        className='w-full relative max-h-136 object-cover  aspect-square '
                    >
                        <source
                            src='https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4'
                            type='video/mp4'
                        />
                    </video>
                </figure>
            </section>
            <section className='gap-2 dark:bg-black bg-white border rounded-lg p-5'>
                <figure className=' relative w-full h-full bg-black'>
                    <svg
                        viewBox='0 0 285 80'
                        preserveAspectRatio='xMidYMid slice'
                        className='w-full absolute top-0 left-0 h-full '
                    >
                        <defs>
                            <mask id='mask' x='0' y='0' width={'100%'} height={'100%'}>
                                <rect
                                    x='0'
                                    y='0'
                                    width={'100%'}
                                    height={'100'}
                                    style={{ fill: 'white', mask: 'url(#mask)' }}
                                />
                                <text
                                    x='50%'
                                    y='50%'
                                    fill='red'
                                    textAnchor='middle'
                                    className=' italic underline font-bold'
                                >
                                    UI-LAYOUT
                                </text>
                            </mask>
                        </defs>
                        <rect
                            x='0'
                            y='0'
                            width={'100%'}
                            height={'100'}
                            style={{ fill: '#000105', mask: 'url(#mask)' }}
                        />
                    </svg>
                    <video autoPlay muted loop className='w-[80%] h-full '>
                        <source
                            src='https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4'
                            type='video/mp4'
                        />
                    </video>
                </figure>
            </section>

            <section className='gap-2 dark:bg-black bg-white border rounded-lg p-5'>
                <figure className='relative   '>
                    <video
                        autoPlay
                        muted
                        loop
                        style={{
                            maskImage: "url('/hexagon.svg')",
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                        }}
                        className='w-full relative h-full object-cover  aspect-square '
                    >
                        <source
                            src='https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4'
                            type='video/mp4'
                        />
                    </video>
                </figure>
            </section>
        </div>
    );
}
```
