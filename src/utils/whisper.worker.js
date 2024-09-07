import { pipeline } from '@xenova/transformers';
import { MessageTypes } from './presets';

// Class for managing the transcription pipeline
class MyTranscriptionPipeline {
    static task = 'automatic-speech-recognition'; // Define the task type for automatic speech recognition
    static model = 'openai/whisper-tiny.en'; // Define the model to be used
    static instance = null; // Singleton instance

    // Method to get an instance of the transcription pipeline
    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, null, { progress_callback });
        }

        return this.instance;
    }
}

// Event listener for messages received by the worker
self.addEventListener('message', async (event) => {
    const { type, audio } = event.data;
    if (type === MessageTypes.INFERENCE_REQUEST) {
        await transcribe(audio); // Trigger transcription if inference request is received
    }
});

// Function to handle transcription
async function transcribe(audio) {
    sendLoadingMessage('loading'); // Notify that the transcription is in progress

    let pipeline;

    try {
        pipeline = await MyTranscriptionPipeline.getInstance(load_model_callback); // Get pipeline instance
    } catch (err) {
        console.log(err.message); // Log any errors
    }

    sendLoadingMessage('success'); // Notify that the pipeline is ready

    const stride_length_s = 5; // Define stride length for processing audio chunks

    const generationTracker = new GenerationTracker(pipeline, stride_length_s);
    await pipeline(audio, {
        top_k: 0,
        do_sample: false,
        chunk_length: 30,
        stride_length_s,
        return_timestamps: true,
        callback_function: generationTracker.callbackFunction.bind(generationTracker),
        chunk_callback: generationTracker.chunkCallback.bind(generationTracker)
    });
    generationTracker.sendFinalResult(); // Send final result when processing is complete
}

// Callback function to handle model loading progress
async function load_model_callback(data) {
    const { status } = data;
    if (status === 'progress') {
        const { file, progress, loaded, total } = data;
        sendDownloadingMessage(file, progress, loaded, total); // Notify about model loading progress
    }
}

// Functions to send messages to the main thread
function sendLoadingMessage(status) {
    self.postMessage({
        type: MessageTypes.LOADING,
        status
    });
}

async function sendDownloadingMessage(file, progress, loaded, total) {
    self.postMessage({
        type: MessageTypes.DOWNLOADING,
        file,
        progress,
        loaded,
        total
    });
}

// Class for tracking generation of transcription results
class GenerationTracker {
    constructor(pipeline, stride_length_s) {
        this.pipeline = pipeline;
        this.stride_length_s = stride_length_s;
        this.chunks = [];
        this.time_precision = pipeline?.processor.feature_extractor.config.chunk_length / pipeline.model.config.max_source_positions;
        this.processed_chunks = [];
        this.callbackFunctionCounter = 0;
    }

    sendFinalResult() {
        self.postMessage({ type: MessageTypes.INFERENCE_DONE }); // Notify that inference is done
    }

    callbackFunction(beams) {
        this.callbackFunctionCounter += 1;
        if (this.callbackFunctionCounter % 10 !== 0) {
            return; // Process every 10th callback for efficiency
        }

        const bestBeam = beams[0];
        let text = this.pipeline.tokenizer.decode(bestBeam.output_token_ids, {
            skip_special_tokens: true
        });

        const result = {
            text,
            start: this.getLastChunkTimestamp(),
            end: undefined
        };

        createPartialResultMessage(result); // Send partial result
    }

    chunkCallback(data) {
        this.chunks.push(data);
        const [text, { chunks }] = this.pipeline.tokenizer._decode_asr(
            this.chunks,
            {
                time_precision: this.time_precision,
                return_timestamps: true,
                force_full_sequence: false
            }
        );

        this.processed_chunks = chunks.map((chunk, index) => {
            return this.processChunk(chunk, index);
        });

        createResultMessage(
            this.processed_chunks, false, this.getLastChunkTimestamp()
        ); // Send complete results
    }

    getLastChunkTimestamp() {
        if (this.processed_chunks.length === 0) {
            return 0;
        }
    }

    processChunk(chunk, index) {
        const { text, timestamp } = chunk;
        const [start, end] = timestamp;

        return {
            index,
            text: `${text.trim()}`,
            start: Math.round(start),
            end: Math.round(end) || Math.round(start + 0.9 * this.stride_length_s)
        };
    }
}

// Functions to create and send messages to the main thread
function createResultMessage(results, isDone, completedUntilTimestamp) {
    self.postMessage({
        type: MessageTypes.RESULT,
        results,
        isDone,
        completedUntilTimestamp
    });
}

function createPartialResultMessage(result) {
    self.postMessage({
        type: MessageTypes.RESULT_PARTIAL,
        result
    });
}
