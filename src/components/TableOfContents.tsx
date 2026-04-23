"use client";

import { useEffect, useState, useRef } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const lines = content.split('\n');
    const extractedHeadings: TOCItem[] = [];
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const isHeader = 
        (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 100) || 
        /^\d+\.\s/.test(trimmed) || 
        (trimmed.endsWith('?') && trimmed.length < 80) || 
        (trimmed.endsWith(':') && trimmed.length < 80);

      if (isHeader) {
        const text = trimmed.replace(/\*\*/g, '').replace(/:$/, '').replace(/\?$/, '');
        const id = `heading-${index}`;
        extractedHeadings.push({ id, text, level: trimmed.startsWith('**') ? 2 : 3 });
      }
    });

    setHeadings(extractedHeadings);

    // Setup IntersectionObserver for active state
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0% -80% 0%" }
    );

    extractedHeadings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="bg-slate-50/80 backdrop-blur-md rounded-3xl p-6 border border-gray-100 sticky top-32">
      <div className="flex items-center gap-2 mb-6 text-blue-600">
        <List className="w-4 h-4" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Mục lục</h3>
      </div>
      
      <div className="relative">
        {/* Active Indicator Line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100"></div>
        
        <ul className="space-y-4 relative z-10">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li 
                key={heading.id} 
                className="group flex items-center"
              >
                <div className={`absolute left-0 w-0.5 h-4 -translate-x-[0.25px] transition-all duration-300 ${
                  isActive ? "bg-blue-600 opacity-100" : "bg-transparent opacity-0"
                }`}></div>
                
                <a 
                  href={`#${heading.id}`}
                  className={`text-[11px] transition-all duration-300 block pl-4 tracking-tight leading-snug ${
                    isActive 
                      ? "text-blue-600 font-bold translate-x-1" 
                      : "text-gray-400 hover:text-gray-600 font-medium"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      const offset = 120;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = element.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
