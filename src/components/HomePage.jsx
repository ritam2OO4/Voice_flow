import React, { useEffect, useRef, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const HomePage = (props) => {
  // Destructuring props to get the setFile and setAudioStream functions
  const { setFile, setAudioStream } = props;

  // State variables to manage recording status, audio chunks, and duration
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  // useRef to keep a persistent reference to the MediaRecorder instance
  const mediaRecorder = useRef(null);
  const medType = 'audio/webm';  // Media type for the audio recording

  // Function to start recording audio
  async function startRecording() {
    let tempStream;
    try {
      // Request access to the user's microphone
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;  // Store the stream in tempStream
    } catch (err) {
      console.log(err.message);
      return;  // Exit if there's an error
    }

    setRecordingStatus('recording');  // Update recording status to 'recording'

    // Create a new MediaRecorder instance using tempStream
    mediaRecorder.current = new MediaRecorder(tempStream, { type: medType });
    mediaRecorder.current.start();  // Start recording

    let localAudioChunks = [];
    // Event listener to capture audio data chunks as they become available
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data !== 'undefined' && event.data.size > 0) {
        localAudioChunks.push(event.data);  // Add chunk to local storage
        setAudioChunks((prevChunks) => [...prevChunks, event.data]);  // Update state with new chunk
      }
    };

    // Event listener to handle actions when recording stops
    mediaRecorder.current.onstop = () => {
      if (localAudioChunks.length > 0) {  // Ensure there are chunks to create a blob
        const audioBlob = new Blob(localAudioChunks, { type: medType });
        setAudioStream(audioBlob);  // Pass the audio blob to setAudioStream
      } else {
        console.error("No audio data was recorded.");  // Error handling if no data was captured
      }
      setAudioChunks([]);  // Reset audio chunks after stopping
      setDuration(0);  // Reset duration
    };
  }

  // Function to stop recording audio
  function stopRecording() {
    if (mediaRecorder.current) {
      setRecordingStatus('inactive');  // Update recording status to 'inactive'
      mediaRecorder.current.stop();  // Stop the MediaRecorder instance
    }
  }

  // useEffect hook to manage the duration timer when recording
  useEffect(() => {
    if (recordingStatus === 'inactive') return;  // Exit if not recording
    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);  // Increment duration every second
    }, 1000);
    return () => clearInterval(interval);  // Clear the interval when component unmounts or recording stops
  }, [recordingStatus]);

  return (
    <main className="flex flex-col items-center justify-center p-6 text-center bg-gray-900 text-gray-200 min-h-screen">
      {/* Header section */}
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl text-teal-400 mb-6 shadow-md p-4 rounded-lg bg-gray-800">
        <span className='text-white'>Voice</span><span className="font-bold">Flow</span>
      </h1>
      {/* Subtitle */}
      <h3 className="font-medium text-lg md:text-xl mt-4 mb-6">
        Record <span className="text-teal-400">&rarr;</span> Transcribe <span className="text-teal-400">&rarr;</span> Translate
      </h3>
      {/* Record/Stop button */}
      <button
        onClick={recordingStatus === 'recording' ? stopRecording : startRecording}
        className="flex items-center justify-between gap-4 bg-teal-500 text-white py-2 px-4 rounded-xl shadow-md hover:bg-teal-600 transition duration-300 mb-4"
      >
        <p>{recordingStatus === 'inactive' ? 'Record' : 'Stop...'}</p>
        <span
          className={recordingStatus === 'recording' ? 'text-teal-900 duration-200 flex gap-1 items-center' : ''}
        >
          {duration >= 0 && recordingStatus === 'recording' && (
            <span className='text-sm'>{duration}s</span>  // Display recording duration
          )}
          <FaMicrophone />
        </span>
      </button>
      {/* File upload section */}
      <p className="mt-4 mb-4">Or <label className='text-teal-400 cursor-pointer hover:text-teal-500'>
        <input
          onChange={(e) => {
            const tempFile = e.target.files[0];
            setFile(tempFile);  // Pass the selected file to setFile
          }}
          className='hidden' type='file' accept='.mp3,.wave' />Upload</label> a mp3 file
      </p>
      <p className="mt-4 text-gray-400">Free now, free forever</p>
    </main>
  );
};

export default HomePage;
