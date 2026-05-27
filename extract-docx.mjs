import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

const downloadsDir = 'C:\\Users\\Ayuu\\Downloads';
const outputDir = 'C:\\Users\\Ayuu\\Desktop\\ts-web\\docx-extracted';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const docxFiles = fs.readdirSync(downloadsDir).filter(f => f.endsWith('.docx'));

for (const file of docxFiles) {
  const filePath = path.join(downloadsDir, file);
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    const outFile = path.join(outputDir, file.replace('.docx', '.txt'));
    fs.writeFileSync(outFile, result.value);
    console.log(`Extracted: ${file} -> ${outFile}`);
  } catch (e) {
    console.error(`Error extracting ${file}: ${e.message}`);
  }
}

console.log('Done extracting all docx files.');
