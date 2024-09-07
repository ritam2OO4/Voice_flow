// MessageTypes defines different types of messages that the worker can send or receive.
export const MessageTypes = {
    DOWNLOADING: "DOWNLOADING",        // Indicates that the download process has started.
    LOADING: "LOADING",                // Indicates that the loading process is ongoing.
    RESULT: "RESULT",                  // Indicates that the transcription or translation result is available.
    RESULT_PARTIAL: "RESULT_PARTIAL",  // Indicates that a partial result is available during the process.
    INFERENCE_REQUEST: "INFERENCE_REQUEST", // Indicates that an inference request has been made.
    INFERENCE_DONE: "INFERENCE_DONE",  // Indicates that the inference process is completed.
};

// LoadingStatus defines various statuses for loading indicators.
export const LoadingStatus = {
    SUCCESS: "success",   // Indicates that the loading operation was successful.
    ERROR: "error",       // Indicates that an error occurred during the loading operation.
    LOADING: "loading",   // Indicates that the loading operation is in progress.
};

// ModelNames lists the available Whisper models for transcription.
export const ModelNames = {
    WHISPER_TINY_EN: "openai/whisper-tiny.en", // Whisper Tiny model optimized for English.
    WHISPER_TINY: "openai/whisper-tiny",       // Whisper Tiny model for general use.
    WHISPER_BASE: "openai/whisper-base",       // Whisper Base model for general use.
    WHISPER_BASE_EN: "openai/whisper-base.en", // Whisper Base model optimized for English.
    WHISPER_SMALL: "openai/whisper-small",     // Whisper Small model for general use.
    WHISPER_SMALL_EN: "openai/whisper-small.en", // Whisper Small model optimized for English.
};

// LANGUAGES maps language names to their respective codes used by the Whisper model.
export const LANGUAGES = {
    "Acehnese (Arabic script)": "ace_Arab",  // Acehnese language written in Arabic script.
    "Acehnese (Latin script)": "ace_Latn",   // Acehnese language written in Latin script.
    "Afrikaans": "afr_Latn",                 // Afrikaans language written in Latin script.
    "Akan": "aka_Latn",                     // Akan language written in Latin script.
    "Amharic": "amh_Ethi",                  // Amharic language written in Ethiopian script.
    "Armenian": "hye_Armn",                 // Armenian language written in Armenian script.
    "Assamese": "asm_Beng",                 // Assamese language written in Bengali script.
    "Asturian": "ast_Latn",                 // Asturian language written in Latin script.
    "Awadhi": "awa_Deva",                  // Awadhi language written in Devanagari script.
    "Ayacucho Quechua": "quy_Latn",         // Ayacucho Quechua language written in Latin script.
    "Balinese": "ban_Latn",                // Balinese language written in Latin script.
    "Bambara": "bam_Latn",                 // Bambara language written in Latin script.
    "Banjar (Arabic script)": "bjn_Arab",   // Banjar language written in Arabic script.
    "Banjar (Latin script)": "bjn_Latn",    // Banjar language written in Latin script.
    "Bashkir": "bak_Cyrl",                 // Bashkir language written in Cyrillic script.
    "Basque": "eus_Latn",                  // Basque language written in Latin script.
    "Belarusian": "bel_Cyrl",              // Belarusian language written in Cyrillic script.
    "Bemba": "bem_Latn",                  // Bemba language written in Latin script.
    "Bengali": "ben_Beng",                 // Bengali language written in Bengali script.
    "Bhojpuri": "bho_Deva",                // Bhojpuri language written in Devanagari script.
    "Bosnian": "bos_Latn",                // Bosnian language written in Latin script.
    "Buginese": "bug_Latn",               // Buginese language written in Latin script.
    "Bulgarian": "bul_Cyrl",              // Bulgarian language written in Cyrillic script.
    "Burmese": "mya_Mymr",               // Burmese language written in Myanmar script.
    "Catalan": "cat_Latn",               // Catalan language written in Latin script.
    "Cebuano": "ceb_Latn",               // Cebuano language written in Latin script.
    "Central Atlas Tamazight": "tzm_Tfng", // Central Atlas Tamazight language written in Tifinagh script.
    "Central Aymara": "ayr_Latn",        // Central Aymara language written in Latin script.
    "Central Kanuri (Arabic script)": "knc_Arab", // Central Kanuri language written in Arabic script.
    "Central Kanuri (Latin script)": "knc_Latn", // Central Kanuri language written in Latin script.
    "Central Kurdish": "ckb_Arab",        // Central Kurdish language written in Arabic script.
    "Chhattisgarhi": "hne_Deva",         // Chhattisgarhi language written in Devanagari script.
    "Chinese (Simplified)": "zho_Hans",  // Simplified Chinese language.
    "Chinese (Traditional)": "zho_Hant", // Traditional Chinese language.
    "Chokwe": "cjk_Latn",                // Chokwe language written in Latin script.
    "Crimean Tatar": "crh_Latn",         // Crimean Tatar language written in Latin script.
    "Croatian": "hrv_Latn",             // Croatian language written in Latin script.
    "Czech": "ces_Latn",                // Czech language written in Latin script.
    "Danish": "dan_Latn",               // Danish language written in Latin script.
    "Dari": "prs_Arab",                 // Dari language written in Arabic script.
    "Dutch": "nld_Latn",                // Dutch language written in Latin script.
    "Dyula": "dyu_Latn",                // Dyula language written in Latin script.
    "Dzongkha": "dzo_Tibt",             // Dzongkha language written in Tibetan script.
    "Eastern Panjabi": "pan_Guru",      // Eastern Panjabi language written in Gurmukhi script.
    "Eastern Yiddish": "ydd_Hebr",      // Eastern Yiddish language written in Hebrew script.
    "Egyptian Arabic": "arz_Arab",      // Egyptian Arabic language written in Arabic script.
    "English": "eng_Latn",              // English language written in Latin script.
    "Esperanto": "epo_Latn",            // Esperanto language written in Latin script.
    "Estonian": "est_Latn",             // Estonian language written in Latin script.
    "Ewe": "ewe_Latn",                 // Ewe language written in Latin script.
    "Faroese": "fao_Latn",              // Faroese language written in Latin script.
    "Fijian": "fij_Latn",              // Fijian language written in Latin script.
    "Finnish": "fin_Latn",              // Finnish language written in Latin script.
    "Fon": "fon_Latn",                 // Fon language written in Latin script.
    "French": "fra_Latn",               // French language written in Latin script.
    "Friulian": "fur_Latn",             // Friulian language written in Latin script.
    "Galician": "glg_Latn",             // Galician language written in Latin script.
    "Ganda": "lug_Latn",               // Ganda language written in Latin script.
    "Georgian": "kat_Geor",            // Georgian language written in Georgian script.
    "German": "deu_Latn",              // German language written in Latin script.
    "Greek": "ell_Grek",               // Greek language written in Greek script.
    "Guarani": "grn_Latn",             // Guarani language written in Latin script.
    "Gujarati": "guj_Gujr",            // Gujarati language written in Gujarati script.
    "Haitian Creole": "hat_Latn",       // Haitian Creole language written in Latin script.
    "Halh Mongolian": "khk_Cyrl",       // Halh Mongolian language written in Cyrillic script.
    "Hausa": "hau_Latn",               // Hausa language written in Latin script.
    "Hebrew": "heb_Hebr",              // Hebrew language written in Hebrew script.
    "Hindi": "hin_Deva",              // Hindi language written in Devanagari script.
    "Hungarian": "hun_Latn",           // Hungarian language written in Latin script.
    "Icelandic": "isl_Latn",           // Icelandic language written in Latin script.
    "Igbo": "ibo_Latn",               // Igbo language written in Latin script.
    "Ilocano": "ilo_Latn",            // Ilocano language written in Latin script.
    "Indonesian": "ind_Latn",          // Indonesian language written in Latin script.
    "Irish": "gle_Latn",
}