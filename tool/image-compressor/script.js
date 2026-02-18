const dropZone = document.getElementById('drop-zone');
const imageInput = document.getElementById('image-input');
const compressionSettings = document.getElementById('compression-settings');
const qualitySlider = document.getElementById('quality-slider');
const qualityVal = document.getElementById('quality-val');
const originalPreview = document.getElementById('original-preview');
const compressedPreview = document.getElementById('compressed-preview');
const originalSize = document.getElementById('original-size');
const compressedSize = document.getElementById('compressed-size');
const downloadBtn = document.getElementById('download-btn');

let originalImage = null;
let compressedImageUrl = null;

// Event Listeners
dropZone.addEventListener('click', () => imageInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-blue-500');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-blue-500');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-500');
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

imageInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFile(e.target.files[0]);
    }
});

qualitySlider.addEventListener('input', (e) => {
    qualityVal.innerText = `${e.target.value}%`;
    if (originalImage) {
        compressImage();
    }
});

downloadBtn.addEventListener('click', () => {
    if (compressedImageUrl) {
        const link = document.createElement('a');
        link.href = compressedImageUrl;
        link.download = 'compressed-image.jpg';
        link.click();
    }
});

function handleFile(file) {
    if (!file.type.match('image.*')) {
        alert('Please upload an image file (JPG, PNG, WEBP).');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        originalImage = new Image();
        originalImage.src = e.target.result;
        originalImage.onload = () => {
            // Show UI
            dropZone.classList.add('hidden');
            compressionSettings.classList.remove('hidden');

            // Show Original
            originalPreview.innerHTML = `<img src="${originalImage.src}" class="h-full object-contain" />`;
            originalSize.innerText = `Size: ${formatBytes(file.size)}`;

            // Compress
            compressImage();
        };
    };
    reader.readAsDataURL(file);
}

function compressImage() {
    const quality = qualitySlider.value / 100;
    const canvas = document.createElement('canvas');
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0);

    // To JPEG
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    compressedImageUrl = dataUrl;

    // Show Compressed
    compressedPreview.innerHTML = `<img src="${dataUrl}" class="h-full object-contain" />`;

    // Calculate size
    const head = 'data:image/jpeg;base64,';
    const size = Math.round((dataUrl.length - head.length) * 3 / 4);

    compressedSize.innerText = `Size: ${formatBytes(size)}`;
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
