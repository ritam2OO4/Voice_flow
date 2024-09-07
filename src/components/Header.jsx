import React from 'react';

export default function Header() {
    return (
        <header className='flex items-center justify-between gap-4 p-4 bg-gray-900 shadow-lg'>
            <a href="/"><h1 className='font-medium text-gray-200'>Voice<span className='text-teal-500 font-bold'>Flow</span></h1></a>
            <div className='gap-4 flex items-center '>
                <a href="/" className='flex items-center gap-2 specialBtn px-3 py-2 rounded-lg bg-teal-400 text-white shadow-md hover:bg-teal-500'>
                    <p>New</p>
                    <i className="fa-solid fa-plus"></i>
                </a>
            </div>
        </header>
    );
}
