import React from 'react';

// The Transcription component is a simple functional component that receives props.
export default function Transcription(props) {
    // Destructure the textElement prop to access the transcription text content.
    const { textElement } = props;

    // Render the text content inside a div.
    return (
        <div>
            {/* Display the transcription text passed via the textElement prop */}
            {textElement}
        </div>
    );
}
