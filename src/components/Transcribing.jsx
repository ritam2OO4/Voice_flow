import React from 'react';

export default function Transcribing(props) {
    // Destructuring props to get the downloading status
    const { downloading } = props;

    return (
        <div className='flex items-center flex-1 flex-col justify-center gap-10 md:gap-14 text-center pb-24 p-4 bg-gray-900 text-gray-200'>
            {/* Transcribing status heading and dynamic message */}
            <div className='flex flex-col gap-2 sm:gap-4'>
                <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>
                    <span className='text-teal-400 font-bold'>Transcribing</span>
                </h1>
                {/* Conditional message based on downloading state */}
                <p>{!downloading ? 'Warming up cylinders' : 'Core cylinders engaged'}</p>
            </div>
            {/* Loading indicators displayed as animated bars */}
            <div className='flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full'>
                {/* Three loading bars rendered using map function */}
                {[0, 1, 2].map(val => (
                    <div
                        key={val}
                        className={`rounded-full h-2 sm:h-3 bg-teal-400 loading loading${val}`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
