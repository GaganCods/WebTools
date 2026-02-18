const textInput = document.getElementById('text-input');
const wordCountEl = document.getElementById('word-count');
const charCountEl = document.getElementById('char-count');
const sentenceCountEl = document.getElementById('sentence-count');
const paragraphCountEl = document.getElementById('paragraph-count');
const readingTimeEl = document.getElementById('reading-time');
const clearBtn = document.getElementById('clear-btn');

textInput.addEventListener('input', updateStats);

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    updateStats();
});

function updateStats() {
    const text = textInput.value;

    // Words
    // Trim and split by whitespace, filter empty strings
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    wordCountEl.innerText = wordCount;

    // Characters
    charCountEl.innerText = text.length;

    // Sentences (approximate by ., !, ?)
    // Filter empty
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    sentenceCountEl.innerText = sentences.length;

    // Paragraphs
    const paragraphs = text.split(/\n+/).filter(para => para.trim().length > 0);
    paragraphCountEl.innerText = paragraphs.length;

    // Reading Time (avg 200 wpm)
    const minutes = Math.ceil(wordCount / 200);
    readingTimeEl.innerText = `${minutes} min${minutes !== 1 ? 's' : ''}`;
}
