

import { Squonk, SquonkContent } from "./component";

export default function Page() {
    return (


        <Squonk
            size={96}
            elasticity={1.2}
            cycleDuration={4000}
            easing='linear'
            squashAmount={40}
            stretchAmount={25}
            bounceHeight={12}
            radius={22}
        >
            <SquonkContent index={0} className='bg-indigo-500'>
                <img
                    src='/itjustworks.jpg'
                    alt=''
                    className='w-full h-full object-cover'
                />
            </SquonkContent>
            <SquonkContent index={1} className='bg-violet-400'>
                <img
                    src='/itjustworks.jpg'
                    alt=''
                    className='w-full h-full object-cover'
                />
            </SquonkContent>
            <SquonkContent index={2} className='bg-red-400'>
                <img
                    src='/itjustworks.jpg'
                    alt=''
                    className='w-full h-full object-cover'
                />
            </SquonkContent>
        </Squonk>
    );
}
