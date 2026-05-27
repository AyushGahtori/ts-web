import fs from 'fs';

// Read the source doc
const sourceText = fs.readFileSync('c:\\Users\\Ayuu\\Desktop\\ts-web\\docx-extracted\\BLOG 1.txt', 'utf-8');

// Parse individual blogs from source
const blogSections = [];
const lines = sourceText.split('\n');
let currentBlog = null;
let currentContent = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Detect blog boundaries
  if (/^BLOG\s*\d+\s*—?\s*$/i.test(line) || /^Blog\s*\d+\s*$/i.test(line) || /^Blog\s*\d+\s*—?\s*$/i.test(line)) {
    if (currentBlog) {
      blogSections.push({ label: currentBlog, content: currentContent.join('\n').trim() });
    }
    currentBlog = line;
    currentContent = [];
    continue;
  }
  
  if (currentBlog) {
    currentContent.push(lines[i]);
  }
}

if (currentBlog) {
  blogSections.push({ label: currentBlog, content: currentContent.join('\n').trim() });
}

// For each blog, count sections (headings) and paragraphs
for (const blog of blogSections) {
  const content = blog.content;
  const h1Match = content.match(/^H1:\s*(.+)$/m);
  const title = h1Match ? h1Match[1].trim() : 'UNKNOWN';
  
  // Count paragraphs (long lines)
  const paragraphs = content.split('\n').filter(l => l.trim().length > 100).length;
  
  // Check for CTA
  const hasCTA = content.includes('[CTA');
  
  console.log(`\n${blog.label}`);
  console.log(`  Title: ${title.substring(0, 80)}`);
  console.log(`  Paragraphs (>100 chars): ${paragraphs}`);
  console.log(`  Has CTA: ${hasCTA}`);
  console.log(`  Content length: ${content.length} chars`);
}
