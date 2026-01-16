

interface MarkdownRendererProps {
  content: string;
  onTOCGenerated?: (toc: any[]) => void;
}

function markdownToHtml(content: string): string {
  let html = content;
  html = html.replace(/^### (.*?)$/gm, '<h3 id="$1">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 id="$1">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 id="$1">$1</h1>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*)__/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*)_/g, '<em>$1</em>');
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  const paragraphs = html.split('\n\n');
  html = paragraphs.map(p => {
    if (!p.startsWith('<')) {
      return '<p>' + p + '</p>';
    }
    return p;
  }).join('');
  return html;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = markdownToHtml(content);
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default MarkdownRenderer;
