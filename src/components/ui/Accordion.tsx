import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  title: string;
  category?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  category,
  children,
  isOpen = false,
  onToggle,
}) => {
  return (
    <div className="border-b border-[#222222] last:border-b-0 py-4 transition-colors">
      <button
        id={`accordion-btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left py-2 gap-4 group focus-visible:outline-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          {category && (
            <span className="font-mono text-xs text-[#39FF14] uppercase tracking-wider shrink-0">
              [{category}]
            </span>
          )}
          <span className="text-base sm:text-lg font-medium text-white group-hover:text-[#39FF14] transition-colors">
            {title}
          </span>
        </div>
        <div className={`w-8 h-8 rounded-full border border-[#333333] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#39FF14]/10 border-[#39FF14]/40 text-[#39FF14]' : 'text-white/60 group-hover:text-white'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-btn-${id}`}
        className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2 pb-2' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}
      >
        <div className="overflow-hidden">
          <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed pr-6 font-normal">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface AccordionProps {
  items: {
    id: string;
    title: string;
    category?: string;
    content: React.ReactNode;
  }[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-[#222222] rounded-2xl bg-[#0A0A0A] border border-[#222222] p-4 sm:p-6 md:p-8">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          category={item.category}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
