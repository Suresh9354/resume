import { motion } from 'framer-motion';
import FAQSection from '../sections/FAQSection';

export default function FAQPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="pt-8 pb-4 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">FAQ</h1>
        <p className="text-slate-600 max-w-xl mx-auto">Answers to common questions about AI Resume Analyzer</p>
      </div>
      <FAQSection />
    </motion.div>
  );
}
