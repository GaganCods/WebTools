const tabEncode = document.getElementById('tab-encode');
const tabDecode = document.getElementById('tab-decode');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const copyBtn = document.getElementById('copy-btn');

let mode = 'encode'; // 'encode' or 'decode'

tabEncode.addEventListener('click', () => setMode('encode'));
tabDecode.addEventListener('click', () => setMode('decode'));
inputText.addEventListener('input', processText);

function setMode(newMode) {
    mode = newMode;
    if (mode === 'encode') {
        tabEncode.className = 'px-8 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition';
        tabDecode.className = 'px-8 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition';
        inputText.placeholder = 'Paste text to encode...';
    } else {
        tabDecode.className = 'px-8 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-md transition';
        tabEncode.className = 'px-8 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition';
        inputText.placeholder = 'Paste Base64 to decode...';
    }
    processText();
}

function processText() {
    const input = inputText.value;
    if (!input) {
        outputText.value = '';
        return;
    }

    try {
        if (mode === 'encode') {
            outputText.value = btoa(input);
            outputText.classList.remove('text-red-400');
            outputText.classList.add('text-green-400');
        } else {
            outputText.value = atob(input);
            outputText.classList.remove('text-red-400');
            outputText.classList.add('text-green-400');
        }
    } catch (e) {
        outputText.value = 'Invalid input for ' + mode;
        outputText.classList.add('text-red-400');
        outputText.classList.remove('text-green-400');
    }
}

copyBtn.addEventListener('click', () => {
    if (!outputText.value) return;
    navigator.clipboard.writeText(outputText.value);

    const originalText = copyBtn.innerText;
    copyBtn.innerText = 'Copied!';
    setTimeout(() => {
        copyBtn.innerText = originalText;
    }, 2000);
});
