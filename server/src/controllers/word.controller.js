const fs = require("fs");
const path = require("path");

// Valid words/dictionary lookup using Free Dictionary API
const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Backup list of 5-letter English words, used when the dictionary API is down (from an-array-of-english-words).
const FALLBACK_WORDS = new Set(
    fs.readFileSync(path.join(__dirname, "../data/words.txt"), "utf8").split("\n")
);

// Simple in-memory cache to prevent calling API too much
const cache = new Map();

const checkWord = async (req, res) => {
    const word = (req.params.word || "").toLowerCase();

    if (!/^[a-z]{5}$/.test(word))
        return res.status(400).json({ error: "Word must be exactly 5 letters." });

    if (cache.has(word))
        return res.json({ word, valid: cache.get(word), source: "cache" });

    try {
        const response = await fetch(DICTIONARY_API + word, {
            signal: AbortSignal.timeout(5000),
        });

        // 200 = word found, 404 = not a word
        if (response.status === 200 || response.status === 404) {
            const valid = response.status === 200;
            cache.set(word, valid);
            return res.json({ word, valid, source: "api" });
        }

        console.error(`Dictionary API returned status ${response.status}; using fallback word list.`);
    // API unavailable -> check local word list as fallback
    } catch (err) {
        console.error("Dictionary API request failed; using fallback word list:", err.cause || err.message);
    }
    res.json({ word, valid: FALLBACK_WORDS.has(word), source: "fallback" });
};

module.exports = { checkWord };
