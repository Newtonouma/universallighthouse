'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface SafeHTMLRendererProps {
  content: string;
  className?: string;
  allowedTags?: string[];
  allowedAttributes?: string[];
}

export default function SafeHTMLRenderer({ 
  content, 
  className,
  allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a'],
  allowedAttributes = ['href', 'target', 'rel']
}: SafeHTMLRendererProps) {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && content) {
      const sanitized = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: allowedAttributes
      });
      setSanitizedContent(sanitized);
    }
  }, [content, allowedTags, allowedAttributes]);

  // Fallback to plain text if DOMPurify hasn't processed yet or content is plain text
  if (!sanitizedContent) {
    return <div className={className}>{content}</div>;
  }

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
