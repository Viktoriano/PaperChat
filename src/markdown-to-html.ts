export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

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

  function processInlineMarkdown(text: string): string {
    // Process inline code first to prevent interference with other patterns
    text = text.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
    
    // Process bold and italic combinations
    text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    
    // Process bold
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    
    // Process italic
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    text = text.replace(/_([^_]+)_/g, '<em>$1</em>');
    
    // Process links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    return text;
  }

  // Split markdown into blocks
  const blocks = markdown.split(/\n\n+/);
  let html = '';

  for (let block of blocks) {
    block = block.trim();
    if (!block) continue;

    // Code blocks
    if (block.startsWith('```')) {
      const code = block.replace(/^```\n?|\n?```$/g, '');
      html += `<pre><code>${code}</code></pre>`;
      continue;
    }

    // Headings
    const headingMatch = block.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = processInlineMarkdown(headingMatch[2]);
      html += `<h${level}>${content}</h${level}>`;
      continue;
    }

    // Blockquotes
    if (block.startsWith('>')) {
      const content = block.replace(/^>\s?/gm, '').trim();
      html += `<blockquote>${processInlineMarkdown(content)}</blockquote>`;
      continue;
    }

    // Lists
    if (block.match(/^[-*+]\s/m) || block.match(/^\d+\.\s/m)) {
      const lines = block.split('\n');
      let currentList = '';
      let isOrdered = false;
      
      for (const line of lines) {
        const listMatch = line.match(/^([-*+]|\d+\.)\s+(.+)$/);
        if (listMatch) {
          const [, marker, content] = listMatch;
          const isNewOrdered = /^\d+\./.test(marker);
          
          if (currentList && isOrdered !== isNewOrdered) {
            html += currentList + (isOrdered ? '</ol>' : '</ul>');
            currentList = '';
          }
          
          if (!currentList) {
            isOrdered = isNewOrdered;
            currentList = isOrdered ? '<ol>' : '<ul>';
          }
          
          currentList += `<li>${processInlineMarkdown(content)}</li>`;
        }
      }
      
      if (currentList) {
        html += currentList + (isOrdered ? '</ol>' : '</ul>');
      }
      continue;
    }

    // Regular paragraphs and inline elements
    const processed = processInlineMarkdown(block);
    if (!block.includes('\n') && (
      processed.match(/^<(strong|em|code|a)[^>]*>[^<]+<\/\1>$/) ||
      block.match(/^[&<>"'].*[&<>"']$/)
    )) {
      if (block.match(/^[&<>"'].*[&<>"']$/)) {
        html += escapeHtml(block);
      } else {
        html += processed;
      }
    } else {
      html += `<p>${processed}</p>`;
    }
  }

  return html;
}