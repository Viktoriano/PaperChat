export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  const lines = markdown.split('\n');
  let html = '';
  let inCodeBlock = false;
  let codeBlockContent = '';
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;
  let listItems: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        continue;
      } else {
        html += `<pre><code>${escapeHtml(codeBlockContent.trim())}</code></pre>`;
        inCodeBlock = false;
        codeBlockContent = '';
        continue;
      }
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\n';
      continue;
    }

    // Handle lists
    if (line.match(/^[0-9]+\.\s/) || line.match(/^-\s/)) {
      const newListType = line.match(/^[0-9]+\.\s/) ? 'ol' : 'ul';
      
      if (!inList) {
        inList = true;
        listType = newListType;
      } else if (listType !== newListType) {
        html += `<${listType}>${listItems.map(item => `<li>${item}</li>`).join('')}</${listType}>`;
        listItems = [];
        listType = newListType;
      }
      
      listItems.push(line.replace(/^[0-9]+\.\s|-\s/, ''));
      continue;
    } else if (inList && line === '') {
      html += `<${listType}>${listItems.map(item => `<li>${item}</li>`).join('')}</${listType}>`;
      inList = false;
      listItems = [];
      listType = null;
    }

    // Skip empty lines
    if (!line) {
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s(.+)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const content = headerMatch[2];
      html += `<h${level}>${processInlineMarkdown(content)}</h${level}>`;
      continue;
    }

    // Blockquotes
    if (line.startsWith('>')) {
      const content = line.slice(1).trim();
      html += `<blockquote>${processInlineMarkdown(content)}</blockquote>`;
      continue;
    }

    // Regular paragraph
    html += processInlineMarkdown(line);
  }

  // Handle any remaining list items
  if (inList && listItems.length > 0) {
    html += `<${listType}>${listItems.map(item => `<li>${item}</li>`).join('')}</${listType}>`;
  }

  return html;
}

function processInlineMarkdown(text: string): string {
  // Process inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Process bold and italic
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Process links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  return escapeHtml(text);
}

function escapeHtml(text: string): string {
  const htmlEntities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return text.replace(/[&<>"']/g, char => htmlEntities[char]);
} 