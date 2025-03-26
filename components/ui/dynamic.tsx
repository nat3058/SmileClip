import dynamic from 'next/dynamic';

// Dynamically import Radix UI components
export const Dialog = dynamic(() => import('@radix-ui/react-dialog').then(mod => mod.Root), { ssr: false });
export const DialogTrigger = dynamic(() => import('@radix-ui/react-dialog').then(mod => mod.Trigger), { ssr: false });
export const DialogContent = dynamic(() => import('@radix-ui/react-dialog').then(mod => mod.Content), { ssr: false });

export const Accordion = dynamic(() => import('@radix-ui/react-accordion').then(mod => mod.Root), { ssr: false });
export const AccordionItem = dynamic(() => import('@radix-ui/react-accordion').then(mod => mod.Item), { ssr: false });
export const AccordionTrigger = dynamic(() => import('@radix-ui/react-accordion').then(mod => mod.Trigger), { ssr: false });
export const AccordionContent = dynamic(() => import('@radix-ui/react-accordion').then(mod => mod.Content), { ssr: false });

// Add more dynamic imports as needed
