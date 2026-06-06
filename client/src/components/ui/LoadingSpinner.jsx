import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md', text }) {
  const sizes = { sm: 'h-6 w-6', md: 'h-10 w-10', lg: 'h-14 w-14' };
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-[#27272A] border-t-[#8B5CF6]`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && <p className="text-[#9CA3AF] text-sm">{text}</p>}
    </div>
  );
}
