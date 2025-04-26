import { markdownToHtml } from './markdown-to-html';

describe('markdownToHtml', () => {
  test('handles empty input', () => {
    expect(markdownToHtml('')).toBe('');
  });

  test('converts headings', () => {
    expect(markdownToHtml('# Heading 1')).toBe('<h1>Heading 1</h1>');
    expect(markdownToHtml('## Heading 2')).toBe('<h2>Heading 2</h2>');
    expect(markdownToHtml('### Heading 3')).toBe('<h3>Heading 3</h3>');
  });

  test('converts paragraphs', () => {
    expect(markdownToHtml('Normal text')).toBe('<p>Normal text</p>');
    expect(markdownToHtml('Line 1\nLine 2')).toBe('<p>Line 1\nLine 2</p>');
  });

  test('converts bold and italic text', () => {
    expect(markdownToHtml('**bold**')).toBe('<strong>bold</strong>');
    expect(markdownToHtml('*italic*')).toBe('<em>italic</em>');
  });

  test('converts links', () => {
    expect(markdownToHtml('[link](https://example.com)')).toBe('<a href="https://example.com">link</a>');
  });

  test('converts unordered lists', () => {
    const input = '- Item 1\n- Item 2\n- Item 3';
    const expected = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
    expect(markdownToHtml(input)).toBe(expected);
  });

  test('converts ordered lists', () => {
    const input = '1. First\n2. Second\n3. Third';
    const expected = '<ol><li>First</li><li>Second</li><li>Third</li></ol>';
    expect(markdownToHtml(input)).toBe(expected);
  });

  test('converts blockquotes', () => {
    expect(markdownToHtml('> Quote')).toBe('<blockquote>Quote</blockquote>');
  });

  test('converts code blocks', () => {
    const input = '```\nconst x = 1;\n```';
    const expected = '<pre><code>const x = 1;</code></pre>';
    expect(markdownToHtml(input)).toBe(expected);
  });

  test('converts inline code', () => {
    expect(markdownToHtml('`code`')).toBe('<code>code</code>');
  });

  test('escapes HTML characters', () => {
    const input = '< > & " \'';
    const expected = '&lt; &gt; &amp; &quot; &#39;';
    expect(markdownToHtml(input)).toBe(expected);
  });

  test('handles complex nested markdown', () => {
    const input = '# Title\n\n**Bold _italic_**\n\n- List item with [link](https://example.com)\n- Item with `code`';
    const expected = '<h1>Title</h1><strong>Bold <em>italic</em></strong><ul><li>List item with <a href="https://example.com">link</a></li><li>Item with <code>code</code></li></ul>';
    expect(markdownToHtml(input)).toBe(expected);
  });
}); 