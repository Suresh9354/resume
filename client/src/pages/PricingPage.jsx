import { motion } from 'framer-motion';
import PricingSection from '../sections/PricingSection';
import FAQSection from '../sections/FAQSection';

export default function PricingPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="pt-8 pb-4 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Pricing</h1>
        <p className="text-slate-600 max-w-xl mx-auto">Choose the plan that fits your job search journey</p>
      </div>
      <PricingSection showTitle={false} />
      <FAQSection compact />
    </motion.div>
  );
}
