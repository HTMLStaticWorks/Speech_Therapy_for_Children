const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\sabarinath\\Desktop\\developer\\therapy';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const regex = /<i class="bi bi-chat-heart-fill"><\/i>\s*<span>SpeechCare<\/span>/gi;
const replacement = '<img src="assets/images/logo.svg" alt="Kinderly Logo" height="40">';

let count = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (regex.test(content)) {
        const newContent = content.replace(regex, replacement);
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${file}`);
        count++;
    }
});

console.log(`Total files updated: ${count}`);
