import { pipeline } from '@xenova/transformers';

// Define a class for managing translation tasks using a transformer pipeline
class MyTranslationPipeline {
    // Define static properties for the translation task and model
    static task = 'translation';
    static model = 'Xenova/nllb-200-distilled-600M';
    static instance = null;

    // Method to get an instance of the translation pipeline
    static async getInstance(progress_callback = null) {
        // Create a new instance if one does not already exist
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }

        return this.instance;
    }
}

// Add an event listener for messages from the main thread
self.addEventListener('message', async (event) => {
    // Get the translator instance, with an optional progress callback
    let translator = await MyTranslationPipeline.getInstance(x => {
        // Post progress updates back to the main thread
        self.postMessage(x);
    });

    // Log the received message data for debugging
    console.log(event.data);

    // Perform translation using the translator
    let output = await translator(event.data.text, {
        tgt_lang: event.data.tgt_lang, // Target language for translation
        src_lang: event.data.src_lang, // Source language for translation

        // Callback function to handle intermediate results
        callback_function: x => {
            self.postMessage({
                status: 'update', // Status of the translation process
                output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true }) // Decode token IDs to text
            });
        }
    });

    // Log the final output for debugging
    console.log('HEHEHHERERE', output);

    // Post the final translation result back to the main thread
    self.postMessage({
        status: 'complete', // Status of the translation process
        output // Final translated text
    });
});
