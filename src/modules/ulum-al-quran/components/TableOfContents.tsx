import React from 'react';
import type { TOCEntry } from '../types';

interface TableOfContentsProps {
  entries: TOCEntry[];
  onSelectEntry?: (id: string) => void;
}

function TOCEntryComponent({ entry, level = 0, onSelectEntry }: { entry: TOCEntry; level?: number; onSelectEntry?: (id: string) => void }) {
  const handleClick = () => {
    if (onSelectEntry) {
      onSelectEntry(entry.id);
    }
    const element = document.getElementById(entry.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className="block w-full text-right py-1 text-sm hover:text-blue-600 transition-colors truncate"
        style={{
          paddingRight: `${level * 12}px`,
          color: level === 0 ? '#111827' : '#6b7280',
          fontSize: level === 0 ? '0.875rem' : '0.8125rem',
          fontWeight: level === 0 ? '500' : '400',
        }}
      >
        {entry.title}
      </button>
      {entry.children.length > 0 && (
        <ul className="space-y-1">
          {entry.children.map((child) => (
            <TOCEntryComponent key={child.id} entry={child} level={level + 1} onSelectEntry={onSelectEntry} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TableOfContents({ entries, onSelectEntry }: TableOfContentsProps) {
  if (entries.length === 0) return null;
  return (
    <nav className="space-y-1">
      <ul className="space-y-1">
        {entries.map((entry) => (
          <TOCEntryComponent key={entry.id} entry={entry} onSelectEntry={onSelectEntry} />
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
