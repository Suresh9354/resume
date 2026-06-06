import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function GlassCard({ className, children, hover = true, spotlight = true, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!spotlight || !ref.current) return;
    const el = ref.current;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, [spotlight]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        'glass-card spotlight-card',
        hover && 'glass-card-hover',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
