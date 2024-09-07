import { useState, useRef, useEffect } from 'react';
import HomePage from './components/HomePage';
import Header from './components/Header';
import FileDisplay from './components/FileDisplay';
import Information from './components/Information';
import Transcribing from './components/Transcribing';
import { MessageTypes } from './utils/presets';

function App() {
  // State variables to manage file, audio stream, output, and loading status
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  // Check if audio is available either from file or audio stream
  const isAudioAvailable = file || audioStream;

  // Function to reset the audio file and stream
  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  // Worker to handle background processing for audio
  const worker = useRef(null);

  useEffect(() => {
    // Initialize the worker if not already created
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
        type: 'module',
      });
    }

    // Handler for messages received from the worker
    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true);
          console.log('DOWNLOADING');
          break;
        case 'LOADING':
          setLoading(true);
          console.log('LOADING');
          break;
        case 'RESULT':
          setOutput(e.data.results);
          console.log(e.data.results);
          break;
        case 'INFERENCE_DONE':
          setFinished(true);
          console.log('DONE');
          break;
      }
    };

    // Add event listener for worker messages
    worker.current.addEventListener('message', onMessageReceived);

    // Cleanup function to remove the event listener
    return () => worker.current.removeEventListener('message', onMessageReceived);
  }, []);

  // Function to read and decode audio data from a file or audio stream
  async function readAudioFrom(file) {
    const sampling_rate = 16000; // Set sampling rate for audio context
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    const audio = decoded.getChannelData(0); // Get the audio data
    return audio;
  }

  // Function to handle form submission and send audio data to the worker
  async function handleFormSubmission() {
    if (!file && !audioStream) return;

    // Read and decode the audio data
    const audio = await readAudioFrom(file ? file : audioStream);
    const model_name = 'openai,wisper-tiny.en'; // Model name for processing

    // Send audio data and model name to the worker
    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  }

  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full dark:bg-gray-900 dark:text-gray-200'>
      <section className='min-h-screen flex flex-col'>
        {/* Render the appropriate component based on the state */}
        <Header />
        {output ? (
          <Information output={output} finished={finished} />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay handleFormSubmission={handleFormSubmission} handleAudioReset={handleAudioReset} file={file} audioStream={audioStream} />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <footer className='bg-gray-900 text-white p-4 shadow-md'>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;
