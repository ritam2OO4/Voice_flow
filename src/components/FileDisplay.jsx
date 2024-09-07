import React from 'react';
import { FaPenNib } from 'react-icons/fa6';

export default function FileDisplay(props) {
  // Destructuring props to get the file object and handler functions
  const { file, handleAudioReset, handleFormSubmission } = props;

  return (
    <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-20 bg-gray-900 text-gray-200'>
      {/* Main heading */}
      <h1 className='font-semibold text-4xl sm:text-5xl md:text-7xl'>
        Your<span className='text-teal-400 font-bold'>File</span>
      </h1>
      {/* Display file name or default text if no file is provided */}
      <div className='mx-auto py-5 text-sm flex flex-col w-fit w-max-full'>
        <p className='font-semibold flex'>Name</p>
        <p className='text-zinc-400 text-xs'>{file ? file.name : 'custom Audio'}</p>
      </div>
      {/* Buttons for resetting audio or submitting the form for transcription */}
      <div className='flex justify-center items-center gap-5'>
        {/* Reset button */}
        <button
          onClick={handleAudioReset}
          className='text-base cursor-pointer bg-gradient-to-r from-red-500 via-pink-500 to-red-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-400 transition duration-300'
        >
          Reset
        </button>
        {/* Transcribe button */}
        <button
          onClick={handleFormSubmission}
          className='flex items-center text-base cursor-pointer bg-teal-500 py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition duration-300 gap-2'
        >
          Transcribe
          <FaPenNib /> {/* Icon indicating the transcription action */}
        </button>
      </div>
    </main>
  );
}
