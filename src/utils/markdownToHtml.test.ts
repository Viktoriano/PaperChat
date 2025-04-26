import { markdownToHtml } from './markdownToHtml';

describe('markdownToHtml', () => {
  test('converts empty string to empty string', () => {
    expect(markdownToHtml('')).toBe('');
  });

  test('converts headers', () => {
    expect(markdownToHtml('# Header 1')).toBe('<h1>Header 1</h1>');
    expect(markdownToHtml('## Header 2')).toBe('<h2>Header 2</h2>');
    expect(markdownToHtml('### Header 3')).toBe('<h3>Header 3</h3>');
  });

  test('converts code blocks', () => {
    const markdown = '```\nconst x = 1;\n```';
    expect(markdownToHtml(markdown)).toBe('<pre><code>const x = 1;</code></pre>');
  });

  test('converts inline code', () => {
    expect(markdownToHtml('Use `const` instead of `var`')).toBe(
      'Use <code>const</code> instead of <code>var</code>'
    );
  });

  test('converts bold text', () => {
    expect(markdownToHtml('This is **bold**')).toBe('This is <strong>bold</strong>');
    expect(markdownToHtml('This is __bold__')).toBe('This is <strong>bold</strong>');
  });

  test('converts italic text', () => {
    expect(markdownToHtml('This is *italic*')).toBe('This is <em>italic</em>');
    expect(markdownToHtml('This is _italic_')).toBe('This is <em>italic</em>');
  });

  test('converts blockquotes', () => {
    expect(markdownToHtml('> This is a quote')).toBe('<blockquote>This is a quote</blockquote>');
  });

  test('converts unordered lists', () => {
    const markdown = '- Item 1\n- Item 2\n- Item 3';
    const expected = '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('converts ordered lists', () => {
    const markdown = '1. First\n2. Second\n3. Third';
    const expected = '<ol><li>First</li><li>Second</li><li>Third</li></ol>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('converts links', () => {
    expect(markdownToHtml('[Google](https://google.com)')).toBe(
      '<a href="https://google.com">Google</a>'
    );
  });

  test('escapes HTML special characters', () => {
    expect(markdownToHtml('2 < 5 & 5 > 2')).toBe('2 &lt; 5 &amp; 5 &gt; 2');
  });

  test('converts paragraphs', () => {
    const markdown = 'First paragraph\n\nSecond paragraph';
    const expected = '<p>First paragraph</p><p>Second paragraph</p>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('handles complex markdown', () => {
    const markdown = `# Title
    
This is a **bold** and *italic* text with \`code\`.

> A blockquote

- List item 1
- List item 2

[Link](https://example.com)`;

    const expected = '<h1>Title</h1><p>This is a <strong>bold</strong> and <em>italic</em> text with <code>code</code>.</p><blockquote>A blockquote</blockquote><ul><li>List item 1</li><li>List item 2</li></ul><a href="https://example.com">Link</a>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('handles empty input', () => {
    expect(markdownToHtml('')).toBe('');
    expect(markdownToHtml(null as unknown as string)).toBe('');
  });

  test('converts bold and italic text', () => {
    expect(markdownToHtml('**bold**')).toBe('<strong>bold</strong>');
    expect(markdownToHtml('*italic*')).toBe('<em>italic</em>');
    expect(markdownToHtml('***bold italic***')).toBe('<strong><em>bold italic</em></strong>');
  });

  test('converts links', () => {
    expect(markdownToHtml('[link](https://example.com)')).toBe('<a href="https://example.com">link</a>');
  });

  test('converts code blocks', () => {
    expect(markdownToHtml('```\ncode block\n```')).toBe('<pre><code>code block</code></pre>');
    expect(markdownToHtml('`inline code`')).toBe('<code>inline code</code>');
  });

  test('converts blockquotes', () => {
    expect(markdownToHtml('> quote')).toBe('<blockquote>quote</blockquote>');
  });

  test('converts unordered lists', () => {
    const input = '- item 1\n- item 2';
    const expected = '<ul><li>item 1</li><li>item 2</li></ul>';
    expect(markdownToHtml(input)).toBe(expected);
  });

  test('converts ordered lists', () => {
    const input = '1. item 1\n2. item 2';
    const expected = '<ol><li>item 1</li><li>item 2</li></ol>';
    expect(markdownToHtml(input)).toBe(expected);
  });

  test('escapes HTML special characters', () => {
    expect(markdownToHtml('< > & "')).toBe('&lt; &gt; &amp; &quot;');
  });

  test('handles complex nested markdown', () => {
    const input = '# Title\n\n**Bold _italic_ text**\n\n```\ncode\n```\n\n> quote with [link](https://example.com)';
    const expected = '<h1>Title</h1><strong>Bold <em>italic</em> text</strong><pre><code>code</code></pre><blockquote>quote with <a href="https://example.com">link</a></blockquote>';
    expect(markdownToHtml(input)).toBe(expected);
  });
}); 