const display = document.getElementById('password-display');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.querySelector('.btn-primary');

// Checkboxes
const uppercaseEl = document.querySelectorAll('input[type="checkbox"]')[0];
const lowercaseEl = document.querySelectorAll('input[type="checkbox"]')[1];
const numbersEl = document.querySelectorAll('input[type="checkbox"]')[2];
const symbolsEl = document.querySelectorAll('input[type="checkbox"]')[3];

const chars = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

function generatePassword() {
    let length = lengthSlider.value;
    let charSet = '';
    let password = '';

    if (uppercaseEl.checked) charSet += chars.upper;
    if (lowercaseEl.checked) charSet += chars.lower;
    if (numbersEl.checked) charSet += chars.number;
    if (symbolsEl.checked) charSet += chars.symbol;

    if (charSet === '') {
        display.innerText = 'Select at least one option!';
        display.classList.add('text-red-500');
        return;
    } else {
        display.classList.remove('text-red-500');
        display.classList.add('text-green-400');
    }

    for (let i = 0; i < length; i++) {
        password += charSet[Math.floor(Math.random() * charSet.length)];
    }

    display.innerText = password;
}

// Event Listeners
lengthSlider.addEventListener('input', (e) => {
    lengthVal.innerText = e.target.value;
    generatePassword();
});

[uppercaseEl, lowercaseEl, numbersEl, symbolsEl].forEach(el => {
    el.addEventListener('change', generatePassword);
});

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
    if (!display.innerText || display.innerText === 'Generating...') return;
    navigator.clipboard.writeText(display.innerText);

    // Feedback
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = `<span class="text-green-400">Copied!</span>`;
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
    }, 2000);
});

// Init
generatePassword();
