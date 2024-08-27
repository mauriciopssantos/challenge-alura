function encrypt(event) { 
    event.preventDefault();
    const message = getText('decrypted__text');
    const checkMessageCase = checkCase(message);
    if (checkMessageCase == 'Lowercase'){
        const encryptedMessage = encryptText(message);
        displayText('encrypted__text', encryptedMessage);
    }
    else{
        displayText(`decrypted__text`,`Enter a message only in lowercase and without special characters.`)        
    }
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
    const copyTextButton = document.getElementById('copy')

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

    if (copyTextButton){
        copyTextButton.addEventListener('click', copyText);
    } else{ 
        console.error('Copy button not found.');
    }

});

function checkCase(character) {
    return (/[A-Z]/.test(character)) ? 'Uppercase' : 'Lowercase';
}

function copyText(event) {
    const element = document.querySelector('#decrypted__text');
    
    if (navigator.clipboard) {
        // Modern approach using Clipboard API
        navigator.clipboard.writeText(element.value)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    } else {
        // Fallback for older browsers
        element.select();
        element.setSelectionRange(0, 99999); // For mobile devices

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
    }
}
