function encrypt(event) { 
    event.preventDefault();
    const message = getText('decrypted__text');
    const encryptedMessage = encryptText(message);
    displayText('encrypted__text', encryptedMessage);
}

function decrypt(event) {
    event.preventDefault(); 
    const message = getText('encrypted__text');
    const decryptedMessage = decryptText(message);
    displayText('decrypted__text', decryptedMessage);
}

function getText(tag) {
    const item = document.getElementById(tag);
    if (item) {
        return item.value || ''; // Use .value for textarea elements
    }
    console.error(`Element with id ${tag} not found.`);
    return '';
}

function encryptText(text) {
    const substitutions = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };
    return text.split('').map(char => substitutions[char] || char).join('');
}

function decryptText(text) {
    const substitutions = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };
    const sortedKeys = Object.keys(substitutions).sort((a, b) => b.length - a.length);
    return sortedKeys.reduce((acc, key) => acc.split(key).join(substitutions[key]), text);
}

function displayText(tag, text) {
    const item = document.getElementById(tag);
    if (item) {
        item.value = text; // Use .value for textarea elements
    } else {
        console.error(`Element with id ${tag} not found.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const encryptButton = document.getElementById('encrypt');
    const decryptButton = document.getElementById('decrypt');

    if (encryptButton) {
        encryptButton.addEventListener('click', encrypt);
    } else {
        console.error('Encrypt button not found.');
    }

    if (decryptButton) {
        decryptButton.addEventListener('click', decrypt);
    } else {
        console.error('Decrypt button not found.');
    }
});

