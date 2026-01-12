const fs = require('fs');
const path = require('path');

const dataDir = './data';
const files = fs.readdirSync(dataDir);

files.forEach(file => {
    if (file.endsWith('.csv')) {
        const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
        const lines = content.split('\n');
        const header = lines[0].trim();
        console.log(`File: ${file}`);
        console.log(`Columns: ${header}`);
        console.log('---');
    }
});
