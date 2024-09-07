import React from 'react';
import { LANGUAGES } from '../utils/presets';

export default function Translation(props) {
    // Destructure props to extract relevant variables and functions
    const { textElement, toLanguage, translating, setToLanguage, generateTranslation } = props;

    return (
        <>
            {/* Display the text content (transcription/translation) only if it exists and translation is not in progress */}
            {textElement && !translating && (
                <p className='text-gray-200'>{textElement}</p>
            )}
            {/* Display the language selection dropdown and translate button if not currently translating */}
            {!translating && (
                <div className='flex flex-col gap-1 mb-4'>
                    <p className='text-xs sm:text-sm font-medium text-gray-400 mr-auto'>To language</p>
                    <div className='flex items-stretch gap-2 sm:gap-4'>
                        {/* Dropdown to select the target language for translation */}
                        <select
                            value={toLanguage}
                            className='flex-1 outline-none w-full focus:outline-none bg-gray-800 text-gray-200 border border-gray-600 rounded p-2 duration-200'
                            onChange={(e) => setToLanguage(e.target.value)}
                        >
                            <option value='Select language'>Select language</option>
                            {/* Populate the dropdown with available languages */}
                            {Object.entries(LANGUAGES).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        {/* Button to initiate the translation process */}
                        <button
                            onClick={generateTranslation}
                            className='bg-teal-400 hover:bg-teal-500 text-gray-900 py-2 px-3 rounded-lg duration-200'
                        >
                            Translate
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
