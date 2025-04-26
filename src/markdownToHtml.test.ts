import { markdownToHtml } from './markdownToHtml';

describe('markdownToHtml', () => {
  test('converts basic markdown to HTML', () => {
    const markdown = '# Hello\n\nThis is **bold** and *italic* text.';
    const expected = '<h1>Hello</h1><p>This is <strong>bold</strong> and <em>italic</em> text.</p>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('handles empty string', () => {
    expect(markdownToHtml('')).toBe('');
  });

  test('converts links and images', () => {
    const markdown = '[Link](https://example.com) ![Image](image.jpg)';
    const expected = '<p><a href="https://example.com">Link</a> <img src="image.jpg" alt="Image"></p>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('converts code blocks', () => {
    const markdown = '```\ncode block\n```\n`inline code`';
    const expected = '<pre><code>code block</code></pre><p><code>inline code</code></p>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });

  test('converts lists', () => {
    const markdown = '- Item 1\n- Item 2\n1. First\n2. Second';
    const expected = '<ul><li>Item 1</li><li>Item 2</li></ul><ol><li>First</li><li>Second</li></ol>';
    expect(markdownToHtml(markdown)).toBe(expected);
  });
}); 