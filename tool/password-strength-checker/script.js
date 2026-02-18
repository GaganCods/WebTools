const passwordInput = document.querySelector('input[type="text"]');
const strengthBar = document.querySelector('.bg-red-500'); // The inner bar
const strengthText = document.querySelector('.font-bold.text-red-500'); // "Too Short" text
const checkListItems = document.querySelectorAll('ul li');

// Check list items
const lengthCheck = checkListItems[0].querySelector('span'); // Length
const upperCheck = checkListItems[1].querySelector('span'); // Uppercase
const numberSymbolCheck = checkListItems[2].querySelector('span'); // Number/Symbol

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const result = calculateStrength(password);
    updateUI(result, password);
});

function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score += 10;
    if (password.length >= 12) score += 10;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 30;
    return score;
}

function updateUI(score, password) {
    // Width
    strengthBar.style.width = `${Math.min(score, 100)}%`;

    // Color & Text
    if (score < 30) {
        strengthBar.className = 'h-full bg-red-500 transition-all duration-500';
        strengthText.className = 'font-bold text-red-500 w-24 text-right';
        strengthText.innerText = 'Weak';
    } else if (score < 60) {
        strengthBar.className = 'h-full bg-yellow-500 transition-all duration-500';
        strengthText.className = 'font-bold text-yellow-500 w-24 text-right';
        strengthText.innerText = 'Medium';
    } else if (score < 80) {
        strengthBar.className = 'h-full bg-blue-500 transition-all duration-500';
        strengthText.className = 'font-bold text-blue-500 w-24 text-right';
        strengthText.innerText = 'Strong';
    } else {
        strengthBar.className = 'h-full bg-green-500 transition-all duration-500';
        strengthText.className = 'font-bold text-green-500 w-24 text-right';
        strengthText.innerText = 'Secure';
    }

    // Checklist Updates
    // Length
    if (password.length >= 12) {
        lengthCheck.className = 'flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs';
        lengthCheck.innerText = '✓';
    } else {
        lengthCheck.className = 'flex items-center justify-center w-5 h-5 rounded-full bg-slate-600 text-slate-400 text-xs';
        lengthCheck.innerText = '○';
    }

    // Uppercase
    if (/[A-Z]/.test(password)) {
        upperCheck.className = 'flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs';
        upperCheck.innerText = '✓';
    } else {
        upperCheck.className = 'flex items-center justify-center w-5 h-5 rounded-full bg-slate-600 text-slate-400 text-xs';
        upperCheck.innerText = '○';
    }

    // Number/Symbol
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) {
        numberSymbolCheck.className = 'flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs';
        numberSymbolCheck.innerText = '✓';
    } else {
        numberSymbolCheck.className = 'flex items-center justify-center w-5 h-5 rounded-full bg-slate-600 text-slate-400 text-xs';
        numberSymbolCheck.innerText = '○';
    }
}
