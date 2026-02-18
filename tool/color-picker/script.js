const colorInput = document.getElementById('color-input');
const hexVal = document.getElementById('hex-val');
const rgbVal = document.getElementById('rgb-val');
const hslVal = document.getElementById('hsl-val');
const shadesContainer = document.getElementById('shades-container');

// Copy Buttons
const copyHex = document.getElementById('copy-hex');
const copyRgb = document.getElementById('copy-rgb');
const copyHsl = document.getElementById('copy-hsl');

colorInput.addEventListener('input', updateColor);

function updateColor() {
    const hex = colorInput.value;
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Update UI
    hexVal.innerText = hex.toUpperCase();
    rgbVal.innerText = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    hslVal.innerText = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;

    generateShades(hex);
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

function generateShades(hex) {
    shadesContainer.innerHTML = '';
    // Simple lightness manipulation to generate shades
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    for (let i = 10; i <= 90; i += 10) {
        const div = document.createElement('div');
        div.className = 'flex-1 h-full cursor-pointer hover:scale-110 transition';
        div.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${i}%)`;
        div.title = `Lightness: ${i}%`;
        shadesContainer.appendChild(div);
    }
}

// Copy Logic
function copyToClipboard(element, text) {
    navigator.clipboard.writeText(text);
    const original = element.innerHTML;
    const btn = element.querySelector('span:last-child');
    if (btn) btn.innerText = 'Copied!';
    setTimeout(() => {
        if (btn) btn.innerText = 'Copy';
    }, 2000);
}

copyHex.addEventListener('click', () => copyToClipboard(copyHex, hexVal.innerText));
copyRgb.addEventListener('click', () => copyToClipboard(copyRgb, rgbVal.innerText));
copyHsl.addEventListener('click', () => copyToClipboard(copyHsl, hslVal.innerText));

// Init
updateColor();
