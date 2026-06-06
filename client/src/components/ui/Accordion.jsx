import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Accordion({ items, className }) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className={cn('space-y-3', className)}>
      {items.map((item, i) => (
        <AccordionPrimitive.Item
          key={i}
          value={`item-${i}`}
          className="glass-card overflow-hidden border border-[#27272A] rounded-2xl"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-[#F8FAFC] hover:text-[#C4B5FD] transition-colors group">
              {item.q}
              <ChevronDown className="h-5 w-5 text-[#9CA3AF] transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="px-6 pb-4 text-[#9CA3AF] leading-relaxed">{item.a}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
