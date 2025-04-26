export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  const lines = markdown.split('\n');
  let html = '';
  let inCodeBlock = false;
  let codeBlockContent = '';
  let inList = false;
  let listType = '';
  let inQuote = false;
  let inParagraph = false;
  let paragraphContent = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        if (inParagraph) {
          html += '<p>' + processInline(paragraphContent) + '</p>';
          inParagraph = false;
          paragraphContent = '';
        }
        inCodeBlock = true;
      } else {
        html += `<pre><code>${codeBlockContent.trim()}</code></pre>`;
        inCodeBlock = false;
        codeBlockContent = '';
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\n';
      continue;
    }

    // Handle blockquotes
    if (line.startsWith('>')) {
      if (inParagraph) {
        html += '<p>' + processInline(paragraphContent) + '</p>';
        inParagraph = false;
        paragraphContent = '';
      }
      if (!inQuote) {
        html += '<blockquote>';
        inQuote = true;
      }
      html += processInline(line.slice(1).trim()) + ' ';
      continue;
    } else if (inQuote) {
      html = html.trim() + '</blockquote>';
      inQuote = false;
    }

    // Handle headings
    if (line.startsWith('#')) {
      if (inParagraph) {
        html += '<p>' + processInline(paragraphContent) + '</p>';
        inParagraph = false;
        paragraphContent = '';
      }
      const match = line.match(/^#+/);
      if (!match) continue;
      const level = match[0].length;
      const text = line.slice(level).trim();
      html += `<h${level}>${processInline(text)}</h${level}>`;
      continue;
    }

    // Handle lists
    if (line.match(/^[-*]\s/)) {
      if (inParagraph) {
        html += '<p>' + processInline(paragraphContent) + '</p>';
        inParagraph = false;
        paragraphContent = '';
      }
      if (!inList || listType !== 'ul') {
        if (inList) html += `</${listType}>`;
        html += '<ul>';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${processInline(line.slice(2))}</li>`;
      continue;
    } else if (line.match(/^\d+\.\s/)) {
      if (inParagraph) {
        html += '<p>' + processInline(paragraphContent) + '</p>';
        inParagraph = false;
        paragraphContent = '';
      }
      if (!inList || listType !== 'ol') {
        if (inList) html += `</${listType}>`;
        html += '<ol>';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${processInline(line.slice(line.indexOf('.') + 2))}</li>`;
      continue;
    } else if (inList) {
      html += `</${listType}>`;
      inList = false;
      listType = '';
    }

    // Handle paragraphs and standalone text
    if (line) {
      if (!inParagraph) {
        inParagraph = true;
        paragraphContent = line;
      } else {
        paragraphContent += ' ' + line;
      }
    } else if (inParagraph) {
      html += '<p>' + processInline(paragraphContent) + '</p>';
      inParagraph = false;
      paragraphContent = '';
    }
  }

  // Close any open tags
  if (inList) html += `</${listType}>`;
  if (inQuote) html = html.trim() + '</blockquote>';
  if (inCodeBlock) html += `<pre><code>${codeBlockContent.trim()}</code></pre>`;
  if (inParagraph) {
    const processed = processInline(paragraphContent);
    if (!processed.startsWith('<') || processed.startsWith('&lt;')) {
      html += '<p>' + processed + '</p>';
    } else {
      html += processed;
    }
  }

  // Handle standalone text that's not wrapped in paragraphs
  if (!html.includes('<')) {
    html = '<p>' + html + '</p>';
  }

  return html;
}

function processInline(text: string): string {
  // Handle images first
  text = text.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, (_, alt, src) => 
    `<img src="${src}" alt="${alt}">`
  );
  
  // Handle links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => 
    `<a href="${href}">${text}</a>`
  );
  
  // Handle bold
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  
  // Handle italic
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // Handle code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Handle HTML entities
  text = text.replace(/[&<>"']/g, (match) => {
    const entities: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[match];
  });
  
  // Restore HTML tags
  text = text.replace(/&lt;(\/?(?:p|a|img|code|strong|em|h[1-6]|ul|ol|li|blockquote|pre)(?:\s+[^>]*)?\/?)&gt;/g, '<$1>');
  text = text.replace(/&quot;/g, '"');
  
  return text;
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