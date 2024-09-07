import React, { useState, useEffect, useRef } from 'react';
import Transcription from './Transcription';
import Translation from './Translation';

export default function Information(props) {
    // Destructuring props to get the transcription output and finished status
    const { output, finished } = props;
    
    // State to manage the active tab, translation result, target language, and translation status
    const [tab, setTab] = useState('transcription');
    const [translation, setTranslation] = useState(null);
    const [toLanguage, setToLanguage] = useState('Select language');
    const [translating, setTranslating] = useState(null);

    // Ref to store the web worker for translation tasks
    const worker = useRef();

    // useEffect to initialize the worker and set up message event listeners
    useEffect(() => {
        if (!worker.current) {
            // Creating a new Worker instance for handling translations
            worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
                type: 'module'
            });
        }

        // Handler for receiving messages from the worker
        const onMessageReceived = async (e) => {
            switch (e.data.status) {
                case 'initiate':
                    console.log('DOWNLOADING');
                    break;
                case 'progress':
                    console.log('LOADING');
                    break;
                case 'update':
                    // Updating the translation state with the worker's output
                    setTranslation(e.data.output);
                    console.log(e.data.output);
                    break;
                case 'complete':
                    // Translation complete, updating the translating status
                    setTranslating(false);
                    console.log('DONE');
                    break;
            }
        };

        // Adding the message event listener to the worker
        worker.current.addEventListener('message', onMessageReceived);

        // Cleaning up by removing the event listener on component unmount
        return () => worker.current.removeEventListener('message', onMessageReceived);
    }, []);

    // Determine the text content to display based on the active tab
    const textElement = tab === 'transcription' ? output.map(val => val.text) : translation || '';

    // Handle copying the text content to the clipboard
    function handleCopy() {
        navigator.clipboard.writeText(textElement);
    }

    // Handle downloading the text content as a file
    function handleDownload() {
        const element = document.createElement('a');
        const file = new Blob([textElement], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `VoiceFlow_${new Date().toString()}.txt`;
        document.body.appendChild(element);
        element.click();
    }

    // Function to trigger translation using the worker
    function generateTranslation() {
        // Prevent translation if it's already in progress or no language is selected
        if (translating || toLanguage === 'Select language') {
            return;
        }

        // Set translating state to true
        setTranslating(true);

        // Send the transcription text and target language to the worker for translation
        worker.current.postMessage({
            text: output.map(val => val.text),
            src_lang: 'eng_Latn',
            tgt_lang: toLanguage
        });
    }

    return (
        <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 bg-gray-900 text-gray-200'>
            {/* Title heading */}
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>
                Your <span className='text-teal-400 font-bold'>Transcription</span>
            </h1>

            {/* Tab buttons for switching between transcription and translation views */}
            <div className='grid grid-cols-2 sm:mx-auto bg-gray-800 rounded overflow-hidden items-center p-1 shadow-md border-[2px] border-solid border-teal-300'>
                <button 
                    onClick={() => setTab('transcription')} 
                    className={`px-4 rounded py-1 duration-200 ${tab === 'transcription' ? 'bg-teal-300 text-white' : 'text-teal-400 hover:text-teal-600'}`}
                >
                    Transcription
                </button>
                <button 
                    onClick={() => setTab('translation')} 
                    className={`px-4 rounded py-1 duration-200 ${tab === 'translation' ? 'bg-teal-300 text-white' : 'text-teal-400 hover:text-teal-600'}`}
                >
                    Translation
                </button>
            </div>

            {/* Display either the transcription or translation component based on the active tab */}
            <div className='my-8 flex flex-col-reverse max-w-prose w-full mx-auto gap-4'>
                {(!finished || translating) && (
                    <div className='grid place-items-center'>
                        <i className="fa-solid fa-spinner animate-spin text-teal-400"></i>
                    </div>
                )}
                {tab === 'transcription' ? (
                    <Transcription {...props} textElement={textElement} />
                ) : (
                    <Translation 
                        {...props} 
                        toLanguage={toLanguage} 
                        translating={translating} 
                        textElement={textElement} 
                        setTranslating={setTranslating} 
                        setTranslation={setTranslation} 
                        setToLanguage={setToLanguage} 
                        generateTranslation={generateTranslation} 
                    />
                )}
            </div>

            {/* Copy and download buttons */}
            <div className='flex items-center gap-4 mx-auto'>
                <button 
                    onClick={handleCopy} 
                    title="Copy" 
                    className='bg-gray-800 text-teal-400 hover:text-teal-600 duration-200 px-2 aspect-square grid place-items-center rounded shadow-md'
                >
                    <i className="fa-solid fa-copy"></i>
                </button>
                <button 
                    onClick={handleDownload} 
                    title="Download" 
                    className='bg-gray-800 text-teal-400 hover:text-teal-600 duration-200 px-2 aspect-square grid place-items-center rounded shadow-md'
                >
                    <i className="fa-solid fa-download"></i>
                </button>
            </div>
        </main>
    );
}
